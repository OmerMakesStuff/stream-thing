import type { Stream, User } from '@/generated/prisma/browser';
export type { Block, Follow, Stream, User } from '@/generated/prisma/browser';

export type UserFollowerCount = { _count: { followedBy: number } };
export type UserStream = { stream: (StreamBase & StreamSettings) | null };

export type StreamBase = Pick<
  Stream,
  'id' | 'isLive' | 'thumbnailUrl' | 'title' | 'updatedAt'
>;
export type StreamSettings = Pick<
  Stream,
  | 'isChatDelayed'
  | 'isChatDisabledOffline'
  | 'isChatEnabled'
  | 'isChatFollowersOnly'
>;
export type StreamUser = { user: User };
