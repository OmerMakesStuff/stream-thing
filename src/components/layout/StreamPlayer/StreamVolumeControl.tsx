'use client';

import { useCallback } from 'react';
import {
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type StreamVolumeControlProps = {
  value?: number;
  onValueChange?: (value: number) => void;
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
};

export const StreamVolumeControl = ({
  value = 0,
  onValueChange,
  muted = false,
  onMutedChange,
}: StreamVolumeControlProps) => {
  const Icon = muted
    ? VolumeXIcon
    : value < 1
      ? VolumeIcon
      : value < 50
        ? Volume1Icon
        : Volume2Icon;

  const handleValueChange = useCallback(
    (value: number[]) => onValueChange?.(value[0]),
    [onValueChange]
  );

  return (
    <div className='flex items-center gap-2'>
      <Tooltip>
        <TooltipTrigger
          onClick={() => onMutedChange?.(!muted)}
          render={
            <Button
              variant='flat'
              icon
              className='text-white hover:bg-white/15 hover:text-white'
            />
          }
        >
          <Icon />
        </TooltipTrigger>
        <TooltipContent>
          {muted || value < 1 ? 'Unmute' : 'Mute'}
        </TooltipContent>
      </Tooltip>
      <Slider
        variant='light'
        value={[muted ? 0 : value]}
        onValueChange={handleValueChange}
        max={100}
        step={1}
        className='w-32'
      />
    </div>
  );
};
