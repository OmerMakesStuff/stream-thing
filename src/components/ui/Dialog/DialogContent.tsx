'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Close, Content, Portal } from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { DialogOverlay } from './DialogOverlay';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const DialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={cn(
        `fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-card`,
        className
      )}
      {...props}
    >
      {children}
      <Close asChild>
        <Button
          variant='flat'
          size='icon'
          className='absolute top-4 right-4 h-8 w-8'
        >
          <XIcon />
          <span className='sr-only'>Close</span>
        </Button>
      </Close>
    </Content>
  </Portal>
));
DialogContent.displayName = Content.displayName;
