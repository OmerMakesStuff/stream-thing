import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  `relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg+div]:-translate-y-0.75 [&>svg~*]:pl-8`,
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: `border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive`,
      },
    },
    defaultVariants: { variant: 'default' },
  }
);
