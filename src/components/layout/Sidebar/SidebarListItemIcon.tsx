import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef } from 'react';

export const SidebarListItemIcon = ({
  className,
  children,
}: ComponentPropsWithoutRef<'svg'>) => (
  <Slot className={cn('mb-1 shrink-0 lg:me-4 lg:mb-0', className)}>
    {children}
  </Slot>
);
