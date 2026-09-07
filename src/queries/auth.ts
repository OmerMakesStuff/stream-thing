import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

import type { GetUserOptions, GetUserResult } from './users';

export const getCurrentUser = async <T extends GetUserOptions>(
  options?: T
): Promise<GetUserResult<T>> => {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.username) {
    if (options?.throwIfNotFound) throw new Error("You're not logged in.");
    return null as GetUserResult<T>;
  }

  const dbUser = await db.user.findUnique({
    where: { externalUserId: clerkUser.id },
    include: {
      stream: !!options?.includeStream && {
        select: {
          id: true,
          isChatDelayed: true,
          isChatDisabledOffline: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          isLive: true,
          thumbnailUrl: true,
          title: true,
        },
      },
      _count: { select: { followedBy: true } },
    },
  });
  if (!dbUser && options?.throwIfNotFound) {
    console.error(
      `User ${clerkUser.username} (external ID: ${clerkUser.id}) exists but isn't found in the DB. This shouldn't happen!`
    );
    throw new Error("You're not logged in.");
  }

  return dbUser as GetUserResult<T>;
};
