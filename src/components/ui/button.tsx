import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--color-secondary),var(--color-foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        flat: 'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
      },
      size: {
        sm: 'h-8 gap-1 px-3',
        md: 'h-9 gap-1.5 px-3',
        lg: 'h-10 gap-1.5 px-4',
      },
      icon: { true: 'px-0' },
    },
    compoundVariants: [
      {
        icon: false,
        size: 'sm',
        className:
          'has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
      },
      {
        icon: false,
        size: 'md',
        className:
          'has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5',
      },
      {
        icon: false,
        size: 'lg',
        className:
          'has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3',
      },
      { icon: true, size: 'sm', className: 'size-8' },
      { icon: true, size: 'md', className: 'size-9' },
      { icon: true, size: 'lg', className: 'size-10' },
    ],
    defaultVariants: { variant: 'default', size: 'md', icon: false },
  }
);

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  className,
  variant = 'default',
  size = 'md',
  icon = false,
  ...props
}: ButtonProps) => (
  <ButtonPrimitive
    data-slot='button'
    data-variant={variant}
    data-size={size}
    data-icon={icon || undefined}
    className={cn(buttonVariants({ variant, size, icon, className }))}
    {...props}
  />
);
