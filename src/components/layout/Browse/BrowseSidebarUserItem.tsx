'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';
import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
      render={<Link href={href} />}
      nativeButton={false}
      variant='flat'
      icon={!matchesLg}
      className={cn('gap-2 lg:justify-start', isActive && 'bg-accent')}
    >
      <UserAvatar
        username={username}
        imageUrl={imageUrl}
        isLive={isLive}
        className='ring-offset-card'
      />
      <span className='hidden grow lg:inline'>{username}</span>
      {isLive && <LiveBadge className='hidden lg:inline' />}
    </Button>
  );
};

export const BrowseSidebarUserItemSkeleton = () => (
  <li className='inline-flex h-9 flex-row items-center justify-start gap-2 px-3'>
    <Skeleton className='size-8 rounded-full' />
    <Skeleton className='hidden h-5 grow lg:block' />
  </li>
);
