import type { User, UserFollowerCount } from '@/types';

import { UserAvatar } from './UserAvatar';
import { UserHeaderActions } from './UserHeaderActions';

export type UserHeaderProps = {
  user: User & UserFollowerCount;
  isFollowing: boolean;
  isBlocking: boolean;
};

export const UserHeader = ({
  user,
  isFollowing,
  isBlocking,
}: UserHeaderProps) => (
  <div className='flex flex-col md:flex-row'>
    <div>
      <div className='mb-2 flex flex-row items-center gap-4'>
        <UserAvatar
          size='lg'
          username={user.username}
          imageUrl={user.imageUrl}
        />
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold tracking-tight sm:text-3xl'>
            {user.username}
          </h1>
          <span className='text-sm text-muted-foreground'>
            {user._count.followedBy < 1
              ? 'No followers'
              : user._count.followedBy === 1
                ? `${user._count.followedBy} follower`
                : `${user._count.followedBy} followers`}
          </span>
        </div>
      </div>
    </div>
    <UserHeaderActions
      userId={user.id}
      isFollowing={isFollowing}
      isBlocking={isBlocking}
    />
  </div>
);
