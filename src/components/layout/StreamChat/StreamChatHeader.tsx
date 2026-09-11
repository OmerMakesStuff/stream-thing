'use client';

import { CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useChatSidebar } from '@/store/useChatSidebar';

import { StreamChatCollapseToggle } from './StreamChatCollapseToggle';
import { StreamChatVariantToggle } from './StreamChatVariantToggle';

export const StreamChatHeader = () => {
  const { variant } = useChatSidebar();

  return (
    <div className='relative flex flex-row items-center gap-2'>
      <StreamChatCollapseToggle />
      <CardTitle className='grow'>
        {variant === 'community' ? 'Community' : 'Chat'}
      </CardTitle>
      <StreamChatVariantToggle />
    </div>
  );
};

export const StreamChatHeaderSkeleton = () => (
  <div className='relative flex flex-row items-center gap-2'>
    <Skeleton className='m-2 hidden size-5 rounded-full lg:block' />
    <CardTitle className='grow'>
      <Skeleton className='my-1 h-em w-24' />
    </CardTitle>
    <Skeleton className='m-2 hidden size-5 rounded-full lg:block' />
  </div>
);
