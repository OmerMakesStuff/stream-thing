'use server';

import { revalidatePath } from 'next/cache';

import { createFollow, deleteFollow } from '@/queries/follow';

export const followUser = async (userId: string) => {
  const newFollow = await createFollow(userId);
  revalidatePath('/');
  if (newFollow) revalidatePath(`/${newFollow.followedUser.username}`);
  return newFollow;
};

export const unfollowUser = async (userId: string) => {
  const deletedFollow = await deleteFollow(userId);
  revalidatePath('/');
  if (deletedFollow) revalidatePath(`/${deletedFollow.followedUser.username}`);
  return deletedFollow;
};
