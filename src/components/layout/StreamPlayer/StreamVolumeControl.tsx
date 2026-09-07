'use client';

import { useCallback } from 'react';
import {
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Tooltip } from '@/components/ui/Tooltip';

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
      <Tooltip label={muted || value < 1 ? 'Unmute' : 'Mute'}>
        <Button
          variant='flat'
          size='icon'
          className='text-white hover:bg-white/15 hover:text-white'
          onClick={() => onMutedChange?.(!muted)}
        >
          <Icon />
        </Button>
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
