'use client';

import { useCallback, useTransition } from 'react';
import { cn } from 'cn';
import { BanIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useStream } from '@/hooks';
import { blockUser } from '@/actions/block';

export type StreamChatParticipantProps = {
  id: string;
  name?: string;
};

export const StreamChatParticipant = ({
  id,
  name,
}: StreamChatParticipantProps) => {
  const [isPending, startTransition] = useTransition();
  const { hostName, viewerName } = useStream();

  const isSelf = name === viewerName,
    isHost = viewerName === hostName;

  const handleBlock = useCallback(() => {
    if (!name || isSelf || !isHost) return;
    startTransition(async () => {
      try {
        await blockUser(id);
        toast.add({
          type: 'success',
          title: `${name} has been blocked.`,
        });
      } catch (err) {
        toast.add({
          type: 'error',
          title: "Couldn't block user",
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to block this user.',
        });
      }
    });
  }, [id, isHost, isSelf, name]);

  return (
    <li
      className={cn(
        `group flex h-10 w-full flex-row items-center justify-between rounded-md ps-4 pe-2 text-sm transition-colors duration-75 hover:bg-accent/50`,
        isPending && 'pointer-events-none'
      )}
    >
      <span className={cn(isPending && 'opacity-50')}>{name || id}</span>
      {isHost && !isSelf && (
        <Tooltip>
          <TooltipTrigger
            className='opacity-0 transition-[opacity,background-color] group-hover:opacity-100'
            onClick={handleBlock}
            disabled={isPending}
            render={<Button variant='flat' icon disabled={isPending} />}
          >
            <BanIcon />
          </TooltipTrigger>
          <TooltipContent>Block</TooltipContent>
        </Tooltip>
      )}
    </li>
  );
};
