'use client';

import { MaximizeIcon, MinimizeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    <Tooltip>
      <TooltipTrigger
        onClick={() => onFullscreenChange?.(!isFullscreen)}
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
        {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      </TooltipContent>
    </Tooltip>
  );
};
