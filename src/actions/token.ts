'use server';

import { AccessToken } from 'livekit-server-sdk';
import { v4 } from 'uuid';

import { getCurrentUser } from '@/queries/auth';
import { isBlockedByUser } from '@/queries/block';
import { getUserById } from '@/queries/users';
import type { User } from '@/types';

export const createViewerToken = async (hostId: string) => {
  let currentUser: Pick<User, 'id' | 'username'> | null =
    await getCurrentUser();
  if (!currentUser) {
    const id = v4(),
      username = `guest#${Math.floor(Math.random() * 1000)}`;
    currentUser = { id, username };
  }

  const hostUser = await getUserById(hostId);
  if (!hostUser) throw new Error('Host user not found.');

  const isBlocked = await isBlockedByUser(hostId);
  if (isBlocked) throw new Error('You are blocked by this user.');

  const isHost = currentUser.id === hostId;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${hostId}` : currentUser.id,
      name: currentUser.username,
    }
  );
  token.addGrant({
    room: hostId,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
