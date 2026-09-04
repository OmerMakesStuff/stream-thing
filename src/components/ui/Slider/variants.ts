import { cva } from 'class-variance-authority';

export const sliderTrackVariants = cva(
  'relative h-1 w-full grow overflow-hidden rounded-full',
  {
    variants: {
      variant: { default: 'bg-secondary', light: 'bg-white/25' },
    },
    defaultVariants: { variant: 'default' },
  }
);

export const sliderThumbVariants = cva(
  `block h-4 w-4 rounded-full ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: { variant: { default: 'bg-background', light: 'bg-white' } },
    defaultVariants: { variant: 'default' },
  }
);

export const sliderRangeVariants = cva('absolute h-full', {
  variants: { variant: { default: 'bg-primary', light: 'bg-white' } },
  defaultVariants: { variant: 'default' },
});
