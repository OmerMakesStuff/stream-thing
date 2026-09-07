import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const SidebarListItemText = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'span'>) => (
  <span
    {...props}
    className={cn('text-xs font-medium lg:text-sm lg:font-normal', className)}
  >
    {children}
  </span>
);
