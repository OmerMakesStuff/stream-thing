import Link from 'next/link';

import { AvatarSkeleton } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/layout/User';
import type { StreamBase, StreamUser } from '@/types';

import { BrowseThumbnail, BrowseThumbnailSkeleton } from './BrowseThumbnail';

export type BrowseResultProps = { data: StreamBase & StreamUser };

export const BrowseResult = ({ data }: BrowseResultProps) => (
  <Button
    asChild
    variant='flat'
    className='group relative flex h-auto flex-col p-2'
  >
    <Link href={`/${data.user.username}`}>
      <BrowseThumbnail
        src={data.thumbnailUrl}
        fallback={data.user.imageUrl}
        username={data.user.username}
        isLive={data.isLive}
      />
      <div className='mt-2 flex w-full flex-row gap-2'>
        <UserAvatar
          username={data.user.username}
          imageUrl={data.user.imageUrl}
          isLive={data.isLive}
        />
        <div className='flex flex-col overflow-hidden'>
          <span className='truncate text-base font-medium'>{data.title}</span>
          <span className='text-sm text-muted-foreground'>
            {data.user.username}
          </span>
        </div>
      </div>
    </Link>
  </Button>
);

export const BrowseResultSkeleton = () => (
  <div>
    <BrowseThumbnailSkeleton />
    <div className='mt-2 flex flex-row gap-2'>
      <AvatarSkeleton />
      <div className='flex grow flex-col'>
        <Skeleton className='my-1 h-em w-full truncate font-medium' />
        <Skeleton className='my-0.5 h-em w-1/3 text-sm' />
      </div>
    </div>
  </div>
);
