'use client';

import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { User, UserFollowerCount } from '@/types';

import { UserProfileDialog } from './UserProfileDialog';

export type UserAboutProps = {
  user: User & UserFollowerCount;
  withHeader?: boolean;
};

export const UserAbout = ({ user, withHeader = false }: UserAboutProps) => {
  const { user: currentUser } = useUser();
  const isCurrentUser = currentUser?.username === user.username;
  const followerCount = user._count?.followedBy;

  return (
    <Card className='relative'>
      {withHeader && (
        <CardHeader>
          <CardTitle>About {user.username}</CardTitle>
          {typeof followerCount === 'number' && (
            <CardDescription>
              {followerCount < 1
                ? 'No followers'
                : followerCount === 1
                  ? `${followerCount} follower`
                  : `${followerCount} followers`}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {isCurrentUser && (
        <UserProfileDialog
          initialValues={{ bio: user.bio }}
          className='absolute end-4 top-4'
        >
          Edit
        </UserProfileDialog>
      )}
      <CardContent className={cn('space-y-2', !withHeader && 'pt-6')}>
        <p className={cn(!user.bio && 'text-muted-foreground')}>
          {user.bio ||
            'This user is so mysterious, that even we don’t know who they are.'}
        </p>
        <p className='text-sm text-muted-foreground'>
          Joined {format(user.createdAt, 'MMM d, y')}
        </p>
      </CardContent>
    </Card>
  );
};
