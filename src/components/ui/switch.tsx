'use client';

import type { ComponentProps } from 'react';
import { cn } from 'cn';

export type SwitchProps = Omit<
  ComponentProps<'input'>,
  'onChange' | 'role' | 'size' | 'type'
> & {
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'default';
};

export const Switch = ({
  className,
  onCheckedChange,
  size = 'default',
  ...props
}: SwitchProps) => (
  <input
    {...props}
    type='checkbox'
    role='switch'
    data-slot='switch'
    data-size={size}
    onChange={event => onCheckedChange?.(event.currentTarget.checked)}
    className={cn(
      "peer relative inline-flex shrink-0 appearance-none items-center rounded-full border-2 transition-all outline-none not-checked:border-transparent not-checked:bg-input/90 group-has-focus-visible/field-label:ring-0 group-has-focus-visible/field-label:not-checked:border-transparent before:pointer-events-none before:block before:shrink-0 before:rounded-full before:bg-background before:bg-clip-padding before:shadow-sm before:ring-0 before:transition-transform before:content-[''] after:absolute after:-inset-x-3 after:-inset-y-2 checked:border-primary checked:bg-primary group-has-focus-visible/field-label:checked:border-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-6 data-[size=default]:w-11 data-[size=default]:before:size-5 checked:data-[size=default]:before:translate-x-5 data-[size=sm]:h-4 data-[size=sm]:w-7 data-[size=sm]:before:size-3 checked:data-[size=sm]:before:translate-x-3 dark:not-checked:before:bg-foreground dark:checked:before:bg-primary-foreground dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      className
    )}
  />
);
