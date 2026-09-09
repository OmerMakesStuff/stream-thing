'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { cn } from 'cn';

export type MainProps = ComponentPropsWithoutRef<'main'> & { full?: boolean };

export const Main = ({ full, className, children, ...props }: MainProps) => (
  <main
    {...props}
    className={cn(
      'min-h-[calc(100%-4rem)] p-4 md:ps-24 lg:ps-[21rem]',
      !full && 'mx-auto max-w-screen-2xl',
      className
    )}
  >
    {children}
  </main>
);
