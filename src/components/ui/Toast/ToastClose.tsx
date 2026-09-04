'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Close } from '@radix-ui/react-toast';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const ToastClose = forwardRef<
  ElementRef<typeof Close>,
  ComponentPropsWithoutRef<typeof Close>
>(({ className, ...props }, ref) => (
  <Close
    ref={ref}
    className={cn(
      `absolute top-2 right-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:ring-2 focus:outline-hidden group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600`,
      className
    )}
    toast-close=''
    {...props}
  >
    <XIcon />
  </Close>
));
ToastClose.displayName = Close.displayName;
