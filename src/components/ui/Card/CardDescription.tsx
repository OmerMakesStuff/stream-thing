import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<'p'>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';
