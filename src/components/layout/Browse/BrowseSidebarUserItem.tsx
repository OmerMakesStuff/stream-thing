'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';
import { useMediaQuery } from 'usehooks-ts';

import { AvatarSkeleton } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { UserAvatar, type UserAvatarProps } from '@/components/layout/User';

import { LiveBadge } from './LiveBadge';

export type UserItemProps = Pick<
  UserAvatarProps,
  'username' | 'imageUrl' | 'isLive'
>;

export const BrowseSidebarUserItem = ({
  username,
  imageUrl,
  isLive,
}: UserItemProps) => {
  const pathname = usePathname();
  const matchesLg = useMediaQuery('(min-width: 1024px)');

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant='flat'
      size={matchesLg ? 'md' : 'icon'}
      className={cn('gap-2 lg:justify-start', isActive && 'bg-accent')}
    >
      <Link href={href}>
        <UserAvatar
          username={username}
          imageUrl={imageUrl}
          isLive={isLive}
          className='ring-offset-card'
        />
        <span className='hidden grow lg:inline'>{username}</span>
        {isLive && <LiveBadge className='hidden lg:inline' />}
      </Link>
    </Button>
  );
};

export const BrowseSidebarUserItemSkeleton = () => (
  <li className='inline-flex h-9 flex-row items-center justify-start gap-2 px-3'>
    <AvatarSkeleton />
    <Skeleton className='hidden h-5 grow lg:block' />
  </li>
);
