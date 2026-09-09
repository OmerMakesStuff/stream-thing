import type { ComponentPropsWithRef } from 'react';
import { cn } from 'cn';

export const Skeleton = ({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted/70', className)}
    {...props}
  />
);
