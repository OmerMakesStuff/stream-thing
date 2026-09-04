'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import {
  Slider as SliderRoot,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@radix-ui/react-slider';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  sliderTrackVariants,
  sliderThumbVariants,
  sliderRangeVariants,
} from './variants';

export type SliderProps = ComponentPropsWithoutRef<typeof SliderRoot> &
  VariantProps<typeof sliderThumbVariants>;

export const Slider = forwardRef<ElementRef<typeof SliderRoot>, SliderProps>(
  ({ variant, className, ...props }, ref) => (
    <SliderRoot
      ref={ref}
      className={cn(
        'relative flex w-full touch-none items-center select-none',
        className
      )}
      {...props}
    >
      <SliderTrack className={sliderTrackVariants({ variant })}>
        <SliderRange className={sliderRangeVariants({ variant })} />
      </SliderTrack>
      <SliderThumb className={sliderThumbVariants({ variant })} />
    </SliderRoot>
  )
);
Slider.displayName = SliderRoot.displayName;
