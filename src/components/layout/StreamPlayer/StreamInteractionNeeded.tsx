'use client';

import { useMaybeRoomContext } from '@livekit/components-react';
import { PlayIcon } from 'lucide-react';

export const StreamInteractionNeeded = () => {
  const room = useMaybeRoomContext();

  return (
    <div className='absolute inset-s-0 top-0 flex h-full w-full items-center justify-center'>
      <button
        className='absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white transition-[background-color,opacity] hover:bg-black/65 active:opacity-50 active:duration-0'
        onClick={() => room && room.startAudio()}
      >
        <PlayIcon className='h-8 w-8' />
      </button>
    </div>
  );
};
