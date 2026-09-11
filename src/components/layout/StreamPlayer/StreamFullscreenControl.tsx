'use client';

import { MaximizeIcon, MinimizeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/Tooltip';

export type StreamFullscreenControlProps = {
  isFullscreen?: boolean;
  onFullscreenChange?: (value: boolean) => void;
};

export const StreamFullscreenControl = ({
  isFullscreen = false,
  onFullscreenChange,
}: StreamFullscreenControlProps) => {
  const Icon = isFullscreen ? MinimizeIcon : MaximizeIcon;

  return (
    <Tooltip label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
      <Button
        variant='flat'
        size='icon'
        className='text-white hover:bg-white/15 hover:text-white'
        onClick={() => onFullscreenChange?.(!isFullscreen)}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
};
