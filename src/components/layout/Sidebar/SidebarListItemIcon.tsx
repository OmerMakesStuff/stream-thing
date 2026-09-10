import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'cn';
import { Slot } from 'radix-ui';

export const SidebarListItemIcon = ({
  className,
  children,
}: ComponentPropsWithoutRef<'svg'>) => (
  <Slot.Root className={cn('mb-1 shrink-0 lg:me-4 lg:mb-0', className)}>
    {children}
  </Slot.Root>
);
