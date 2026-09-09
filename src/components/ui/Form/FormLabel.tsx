import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { cn } from 'cn';

import { Label } from '@/components/ui/Label';

export type FormLabelProps = ComponentPropsWithoutRef<typeof Label> & {
  error?: boolean;
};

export const FormLabel = forwardRef<ElementRef<typeof Label>, FormLabelProps>(
  ({ error, className, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn(
        'mb-1.5 inline-block',
        error && 'text-destructive',
        className
      )}
      {...props}
    />
  )
);
FormLabel.displayName = 'FormLabel';
