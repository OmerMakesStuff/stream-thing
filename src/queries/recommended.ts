import { db } from '@/lib/db';

import { getCurrentUser } from './auth';

export const getRecommended = async () => {
  const currentUserId = (await getCurrentUser())?.id || null;

  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { stream: { select: { isLive: true } } },
    ...(currentUserId
      ? {
          where: {
            AND: [
              { NOT: { id: currentUserId } },
              {
                NOT: {
                  followedBy: { some: { followingUserId: currentUserId } },
                },
              },
              { NOT: { blocking: { some: { blockedUserId: currentUserId } } } },
            ],
          },
        }
      : {}),
  });
  return users;
};
