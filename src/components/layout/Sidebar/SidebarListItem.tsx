'use client';

import type { ComponentPropsWithRef } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type SidebarListItemProps = ComponentPropsWithRef<typeof Link> & {
  active?: boolean;
};

export const SidebarListItem = ({
  active,
  className,
  children,
  ...props
}: SidebarListItemProps) => (
  <li>
    <Button
      variant='flat'
      className={cn(
        `h-14 flex-col justify-center p-0 md:h-16 lg:h-10 lg:flex-row lg:justify-start lg:px-4 [&>svg]:h-6 [&>svg]:w-6`,
        active && 'bg-accent hover:bg-accent',
        className
      )}
      asChild
    >
      <Link {...props}>{children}</Link>
    </Button>
  </li>
);
