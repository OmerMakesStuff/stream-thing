import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'cn';

export const SidebarSkeletonBase = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'aside'>) => (
  <aside
    {...props}
    className={cn(
      `fixed inset-s-0 bottom-0 z-10 flex h-full w-20 flex-col items-center gap-1 bg-card p-2 pt-16 lg:w-80`,
      className
    )}
  >
    {children}
  </aside>
);
