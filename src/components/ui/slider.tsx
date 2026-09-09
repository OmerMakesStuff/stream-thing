'use client';

import { type ComponentProps, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Slider as SliderPrimitive } from 'radix-ui';

export const sliderTrackVariants = cva(
  'relative grow overflow-hidden rounded-full data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2',
  {
    variants: {
      variant: { default: 'bg-input/90', light: 'bg-white/25' },
    },
    defaultVariants: { variant: 'default' },
  }
);

export const sliderRangeVariants = cva(
  'absolute select-none data-horizontal:h-full data-vertical:w-full',
  {
    variants: { variant: { default: 'bg-primary', light: 'bg-white' } },
    defaultVariants: { variant: 'default' },
  }
);

export const sliderThumbVariants = cva(
  'block size-4 shrink-0 rounded-full shadow-md ring-1 ring-black/10 transition-[color,box-shadow,background-color] select-none hover:ring-4 hover:ring-ring/30 focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
  {
    variants: { variant: { default: 'bg-white', light: 'bg-white' } },
    defaultVariants: { variant: 'default' },
  }
);

export type SliderProps = ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderThumbVariants>;

export const Slider = ({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant,
  ...props
}: SliderProps) => {
  const values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={sliderTrackVariants({ variant })}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={sliderRangeVariants({ variant })}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className={sliderThumbVariants({ variant })}
        />
      ))}
    </SliderPrimitive.Root>
  );
};
