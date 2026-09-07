'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { Card } from '@/components/ui/Card';
import { useChatSidebar } from '@/store/useChatSidebar';

import { StreamChatCommunity } from './StreamChatCommunity';
import { StreamChatHeader, StreamChatHeaderSkeleton } from './StreamChatHeader';
import { StreamChatInput, StreamChatInputSkeleton } from './StreamChatInput';
import {
  StreamChatMessages,
  StreamChatMessagesSkeleton,
} from './StreamChatMessages';

export const StreamChat = () => {
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const { variant, setCollapsed } = useChatSidebar();

  useEffect(() => {
    if (!matchesLg) setCollapsed(false);
  }, [matchesLg, setCollapsed]);

  return (
    <Card className='sticky top-20 flex h-full max-h-[calc(100vh-6rem)] flex-col gap-2 p-2'>
      <StreamChatHeader />
      {variant === 'community' ? (
        <StreamChatCommunity />
      ) : (
        <>
          <StreamChatMessages />
          <StreamChatInput />
        </>
      )}
    </Card>
  );
};

export const StreamChatSkeleton = () => (
  <Card className='flex h-full max-h-[calc(100vh-6rem)] flex-col gap-2 p-2'>
    <StreamChatHeaderSkeleton />
    <StreamChatMessagesSkeleton />
    <StreamChatInputSkeleton />
  </Card>
);
