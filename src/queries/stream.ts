import { db } from '@/lib/db';
import type { Stream } from '@/types';

import { getCurrentUser } from './auth';

export const getStreams = async () => {
  const currentUser = await getCurrentUser();
  return await db.stream.findMany({
    orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      isLive: true,
      thumbnailUrl: true,
      title: true,
      updatedAt: true,
      user: true,
    },
    ...(currentUser
      ? {
          where: {
            user: {
              NOT: { blocking: { some: { blockedUserId: currentUser.id } } },
            },
          },
        }
      : {}),
  });
};

export const getSearchStreams = async (query: string) => {
  const currentUser = await getCurrentUser();
  return await db.stream.findMany({
    where: {
      ...(currentUser
        ? {
            user: {
              NOT: { blocking: { some: { blockedUserId: currentUser.id } } },
            },
          }
        : {}),
      OR: [
        { title: { contains: query } },
        { user: { username: { contains: query } } },
      ],
    },
    orderBy: [
      { _relevance: { fields: ['title'], search: query, sort: 'desc' } },
      { isLive: 'desc' },
      { updatedAt: 'desc' },
    ],
    select: {
      id: true,
      isLive: true,
      thumbnailUrl: true,
      title: true,
      updatedAt: true,
      user: true,
    },
  });
};

export const getStreamByUserId = async (userId: string) =>
  await db.stream.findUnique({ where: { userId } });

export const updateStreamByUserId = async (
  userId: string,
  data: Partial<Stream>
) => await db.stream.update({ where: { userId }, data });
