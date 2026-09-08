import type { NextRequest } from 'next/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';

import { db } from '@/lib/db';
import { resetIngresses } from '@/lib/ingress';

export const POST = async (req: NextRequest) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET)
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.'
    );

  let evt;

  try {
    evt = await verifyWebhook(req, { signingSecret: WEBHOOK_SECRET });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('An error occurred', { status: 400 });
  }

  switch (evt.type) {
    case 'user.created': {
      if (!evt.data.username)
        return new Response('A username is required', { status: 400 });

      await db.user.create({
        data: {
          externalUserId: evt.data.id,
          username: evt.data.username,
          imageUrl: evt.data.image_url,
          stream: { create: { title: `${evt.data.username}'s stream` } },
        },
      });
      break;
    }

    case 'user.updated': {
      if (!evt.data.username)
        return new Response('A username is required', { status: 400 });

      await db.user.update({
        where: { externalUserId: evt.data.id },
        data: {
          username: evt.data.username,
          imageUrl: evt.data.image_url,
        },
      });
      break;
    }

    case 'user.deleted': {
      const deletedUser = await db.user.delete({
        where: { externalUserId: evt.data.id },
      });
      if (deletedUser) await resetIngresses(deletedUser.id);
      break;
    }
  }

  return new Response('', { status: 200 });
};
