import { db } from '@/lib/db';

import { getCurrentUser } from './auth';
import { getUserById } from './users';

export const getBlockedUsers = async () => {
  const currentUser = await getCurrentUser({ throwIfNotFound: true });
  return await db.block.findMany({
    where: { blockingUserId: currentUser.id },
    include: { blockedUser: true },
  });
};

export const isBlockingUser = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser({ throwIfNotFound: true }),
      otherUser = await getUserById(userId, { throwIfNotFound: true });
    if (otherUser.id === currentUser.id) return false;

    const existingBlock = await db.block.findUnique({
      where: {
        blockingUserId_blockedUserId: {
          blockingUserId: currentUser.id,
          blockedUserId: otherUser.id,
        },
      },
    });
    return !!existingBlock;
  } catch {
    return false;
  }
};

export const isBlockedByUser = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser({ throwIfNotFound: true }),
      otherUser = await getUserById(userId, { throwIfNotFound: true });
    if (otherUser.id === currentUser.id) return false;

    const existingBlock = await db.block.findUnique({
      where: {
        blockingUserId_blockedUserId: {
          blockingUserId: otherUser.id,
          blockedUserId: currentUser.id,
        },
      },
    });
    return !!existingBlock;
  } catch {
    return false;
  }
};

export const createBlock = async (userId: string) => {
  const currentUser = await getCurrentUser({ throwIfNotFound: true }),
    otherUser = await getUserById(userId, { throwIfNotFound: true });
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot block yourself.');

  const existingBlock = await db.block.findFirst({
    where: { blockingUserId: currentUser.id, blockedUserId: otherUser.id },
  });
  if (existingBlock) throw new Error("You've already blocked this user.");

  const newBlock = await db.block.create({
    data: { blockingUserId: currentUser.id, blockedUserId: otherUser.id },
    include: { blockedUser: true },
  });
  return newBlock;
};

export const deleteBlock = async (userId: string) => {
  const currentUser = await getCurrentUser({ throwIfNotFound: true }),
    otherUser = await getUserById(userId, { throwIfNotFound: true });
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot unblock yourself.');

  const existingBlock = await db.block.findUnique({
    where: {
      blockingUserId_blockedUserId: {
        blockingUserId: currentUser.id,
        blockedUserId: otherUser.id,
      },
    },
  });
  if (!existingBlock) throw new Error("You haven't blocked this user.");

  const deletedBlock = await db.block.delete({
    where: { id: existingBlock.id },
    include: { blockedUser: true },
  });
  return deletedBlock;
};
