'use client';

import type { ComponentPropsWithRef } from 'react';
import Link from 'next/link';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';

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
      render={<Link {...props} />}
      nativeButton={false}
      variant='flat'
      className={cn(
        `h-14 flex-col justify-center p-0 md:h-16 lg:h-10 lg:flex-row lg:justify-start lg:px-4 [&>svg]:size-6`,
        active && 'bg-accent hover:bg-accent',
        className
      )}
    >
      {children}
    </Button>
  </li>
);
