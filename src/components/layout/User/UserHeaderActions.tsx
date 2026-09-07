'use client';

import { useTransition } from 'react';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks';
import { blockUser, unblockUser } from '@/actions/block';
import { followUser, unfollowUser } from '@/actions/follow';

export type UserHeaderActionsProps = {
  userId: string;
  isFollowing: boolean;
  isBlocking: boolean;
};

export const UserHeaderActions = ({
  userId,
  isFollowing,
  isBlocking,
}: UserHeaderActionsProps) => {
  const { user } = useUser();
  const { displayToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleFollowClick = async () => {
    startTransition(async () => {
      try {
        const follow = await (isFollowing
          ? unfollowUser(userId)
          : followUser(userId));
        displayToast(
          isFollowing
            ? `You are no longer following ${follow.followedUser.username}.`
            : `You are now following ${follow.followedUser.username}!`
        );
      } catch (err) {
        displayToast(
          isFollowing
            ? `Couldn't unfollow this user`
            : `Couldn't follow this user`,
          {
            description:
              err instanceof Error
                ? err.message
                : isFollowing
                  ? 'Something went wrong while trying to unfollow this user.'
                  : 'Something went wrong while trying to follow this user.',
          }
        );
      }
    });
  };

  const handleBlockClick = async () => {
    startTransition(async () => {
      try {
        const block = await (isBlocking
          ? unblockUser(userId)
          : blockUser(userId));
        // No message, will use the default
        if (!block) throw new Error();

        displayToast(
          isBlocking
            ? `You've unblocked ${block.blockedUser.username}.`
            : `You've blocked ${block.blockedUser.username}.`
        );
      } catch (err) {
        displayToast(
          isBlocking
            ? `Couldn't unblock this user`
            : `Couldn't block this user`,
          {
            description:
              err instanceof Error
                ? err.message
                : isBlocking
                  ? 'Something went wrong while trying to unblock this user.'
                  : 'Something went wrong while trying to block this user.',
          }
        );
      }
    });
  };

  if (!user || user.id === userId) return null;

  return (
    <div className='mt-4 flex flex-row gap-2 md:ms-auto md:mt-0'>
      <Button
        variant={isFollowing ? 'default' : 'primary'}
        onClick={handleFollowClick}
        disabled={isPending}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleBlockClick} disabled={isPending}>
        {isBlocking ? 'Unblock' : 'Block'}
      </Button>
    </div>
  );
};
