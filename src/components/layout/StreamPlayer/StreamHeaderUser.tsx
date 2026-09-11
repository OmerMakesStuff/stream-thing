'use client';

import { useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useRemoteParticipant } from '@livekit/components-react';
import { toast } from 'sonner';

import { AvatarSkeleton } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';
import { UserAvatar } from '@/components/layout/User';
import { useStream } from '@/hooks';
import { followUser, unfollowUser } from '@/actions/follow';
import { SIGN_IN_URL } from '@/constants/clerk';

export type StreamHeaderActionsProps = { imageUrl: string };

export const StreamHeaderUser = ({ imageUrl }: StreamHeaderActionsProps) => {
  const { userId } = useAuth();
  const { isFollowing, hostName, hostId, viewerId } = useStream();
  const hostParticipant = useRemoteParticipant(hostId);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isLive = !!hostParticipant;
  const isHost = viewerId === `host-${hostId}`;

  const handleFollowClick = useCallback(() => {
    if (isHost) return;

    startTransition(async () => {
      try {
        const follow = await (isFollowing
          ? unfollowUser(hostId)
          : followUser(hostId));
        toast.success(
          isFollowing
            ? `You are no longer following ${follow.followedUser.username}.`
            : `You are now following ${follow.followedUser.username}!`
        );
      } catch (err) {
        toast.error(
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
  }, [hostId, isFollowing, isHost]);

  return (
    <div className='flex h-10 flex-row items-center gap-2'>
      <UserAvatar username={hostName} imageUrl={imageUrl} isLive={isLive} />
      <span className='grow text-sm font-semibold'>{hostName}</span>
      {!userId ? (
        <Tooltip label={`To follow ${hostName}, you must log in first.`}>
          <Button variant='primary' onClick={() => router.push(SIGN_IN_URL)}>
            Follow
          </Button>
        </Tooltip>
      ) : (
        !isHost && (
          <Button
            variant={isFollowing ? 'default' : 'primary'}
            onClick={handleFollowClick}
            disabled={isPending}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )
      )}
    </div>
  );
};

export const StreamHeaderUserSkeleton = () => (
  <div className='flex h-10 flex-row items-center gap-2'>
    <AvatarSkeleton />
    <Skeleton className='h-em w-24 text-sm' />
  </div>
);
