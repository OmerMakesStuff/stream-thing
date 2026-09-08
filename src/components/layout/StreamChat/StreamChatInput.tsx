'use client';

import {
  type FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useUser } from '@clerk/nextjs';
import { useChat } from '@livekit/components-react';
import { InfoIcon, SendHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';
import { useStream } from '@/hooks';
import { cn } from '@/lib/utils';

export const StreamChatInput = () => {
  const [value, setValue] = useState(''),
    [isDelayBlocked, setIsDelayBlocked] = useState(false),
    [justSent, setJustSent] = useState(false);
  const [isSending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useUser();
  const {
    isOnline,
    isChatEnabled,
    isChatDisabledOffline,
    isChatFollowersOnly,
    isChatDelayed,
    isFollowing,
  } = useStream();
  const { send } = useChat();

  const disabled =
    isSending ||
    isDelayBlocked ||
    !user ||
    (isChatFollowersOnly && !isFollowing);

  const infoMsg = useMemo(() => {
      switch (true) {
        case isChatDelayed && isChatDelayed:
          return 'Followers only & slow mode';
        case isChatDelayed:
          return 'Slow mode';
        case isChatFollowersOnly:
          return 'Followers only';
        default:
          return null;
      }
    }, [isChatDelayed, isChatFollowersOnly]),
    infoTooltip = useMemo(() => {
      switch (true) {
        case isChatDelayed && isChatDelayed:
          return 'Messages can only be sent every 3 seconds, by followers only.';
        case isChatDelayed:
          return 'Messages can only be sent every 3 seconds.';
        case isChatFollowersOnly:
          return 'Only followers can chat.';
        default:
          return null;
      }
    }, [isChatDelayed, isChatFollowersOnly]);

  const handleSubmit = useCallback<FormEventHandler>(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!send || value.length < 1) return;

      const submitMessage = async () => {
        setJustSent(true);
        await send(value);
        setValue('');
      };

      if (isChatDelayed && !isDelayBlocked) {
        setIsDelayBlocked(true);
        setTimeout(() => {
          setIsDelayBlocked(false);
          startTransition(submitMessage);
        }, 3000);
      } else startTransition(submitMessage);
    },
    [isDelayBlocked, isChatDelayed, send, value]
  );

  useEffect(() => {
    if (isSending || !justSent || !inputRef.current) return;
    setTimeout(() => inputRef.current?.focus?.(), 50);
    setJustSent(false);
  }, [isSending, justSent]);

  if (!isChatEnabled || (!isOnline && isChatDisabledOffline)) return null;
  if (!user)
    return (
      <span className='mb-2 flex flex-row items-center gap-2 px-2 text-sm text-muted-foreground'>
        <InfoIcon className='h-4 w-4 shrink-0' />
        You must log in to chat.
      </span>
    );

  return (
    <form onSubmit={handleSubmit}>
      {infoMsg && (
        <span className='mb-2 flex flex-row items-center gap-2 px-2 text-sm text-muted-foreground'>
          <Tooltip label={infoTooltip}>
            <InfoIcon className='h-4 w-4 shrink-0' />
          </Tooltip>
          {infoMsg}
        </span>
      )}
      <div className='relative w-full'>
        <Input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Send a message...'
          disabled={disabled}
        />
        {
          <Tooltip label='Send'>
            <Button
              variant='flat'
              size='icon'
              type='submit'
              disabled={disabled}
              className={cn(
                `pointer-events-none absolute end-0 top-0 opacity-0 transition-[opacity,background-color] duration-75`,
                value.length > 0 && 'pointer-events-auto opacity-100'
              )}
            >
              <SendHorizontalIcon />
            </Button>
          </Tooltip>
        }
      </div>
    </form>
  );
};

export const StreamChatInputSkeleton = () => (
  <Skeleton className='h-10 w-full' />
);
