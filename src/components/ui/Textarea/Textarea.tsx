import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<'textarea'>
>(({ className, ...props }, ref) => (
  <textarea
    {...props}
    ref={ref}
    className={cn(
      `flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50`,
      className
    )}
  />
));
Textarea.displayName = 'Textarea';
