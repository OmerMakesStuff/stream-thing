import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

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
