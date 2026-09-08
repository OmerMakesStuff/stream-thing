import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<'p'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
