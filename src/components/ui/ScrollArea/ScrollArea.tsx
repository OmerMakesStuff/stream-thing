'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type RefObject,
} from 'react';
import {
  ScrollArea as ScrollAreaRoot,
  ScrollAreaCorner,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

import { ScrollBar } from './ScrollBar';

export type ScrollAreaProps = ComponentPropsWithoutRef<
  typeof ScrollAreaRoot
> & {
  viewportRef?: RefObject<HTMLDivElement | null>;
};

export const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaRoot>,
  ScrollAreaProps
>(({ className, asChild, children, viewportRef, ...props }, ref) => (
  <ScrollAreaRoot
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaViewport
      ref={viewportRef}
      asChild={asChild}
      className='h-full w-full rounded-[inherit]'
    >
      {children}
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
));
ScrollArea.displayName = ScrollAreaRoot.displayName;
