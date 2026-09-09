import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'cn';

export const LiveBadge = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) => (
  <span
    {...props}
    className={cn(
      `rounded-sm bg-destructive px-1.5 py-1 text-xs font-medium text-destructive-foreground uppercase`,
      className
    )}
  >
    Live
  </span>
);
