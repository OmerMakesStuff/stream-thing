import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/layout/User';

import { LiveBadge } from './LiveBadge';

export type BrowseThumbnailProps = {
  src: string | null;
  fallback: string;
  username: string;
  isLive: boolean;
};

export const BrowseThumbnail = ({
  src,
  fallback,
  username,
  isLive,
}: BrowseThumbnailProps) => (
  <div className='relative aspect-video w-full rounded-md'>
    {isLive && <LiveBadge className='absolute end-2 top-2 z-10' />}
    {src ? (
      <Image
        src={src}
        alt={username}
        fill
        className='rounded-md object-cover'
      />
    ) : (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-md bg-muted'>
        <UserAvatar size='lg' imageUrl={fallback} username={username} />
      </div>
    )}
  </div>
);

export const BrowseThumbnailSkeleton = () => (
  <Skeleton className='aspect-video w-full rounded-md' />
);
