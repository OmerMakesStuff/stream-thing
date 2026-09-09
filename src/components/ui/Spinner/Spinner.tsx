import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from 'cn';
import { Loader2Icon } from 'lucide-react';

export const Spinner = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<typeof Loader2Icon>
>(({ className, ...props }, ref) => (
  <Loader2Icon
    {...props}
    ref={ref}
    className={cn('spinner animate-spin', className)}
  />
));
Spinner.displayName = 'LoadingSpinner';
