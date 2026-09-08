'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { Title } from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

export const DialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn(
      'text-lg leading-none font-semibold tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = Title.displayName;
