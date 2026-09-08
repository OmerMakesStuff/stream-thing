import type { ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export const SidebarListItemIcon = ({
  className,
  children,
}: ComponentPropsWithoutRef<'svg'>) => (
  <Slot className={cn('mb-1 shrink-0 lg:me-4 lg:mb-0', className)}>
    {children}
  </Slot>
);
