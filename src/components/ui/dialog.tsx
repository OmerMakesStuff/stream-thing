'use client';

import type { ComponentProps } from 'react';
import { cn } from 'cn';
import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { Button } from '@/components/ui/button';

export const Dialog = (props: ComponentProps<typeof DialogPrimitive.Root>) => (
  <DialogPrimitive.Root data-slot='dialog' {...props} />
);

export const DialogTrigger = (
  props: ComponentProps<typeof DialogPrimitive.Trigger>
) => <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;

export const DialogPortal = (
  props: ComponentProps<typeof DialogPrimitive.Portal>
) => <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;

export const DialogClose = (
  props: ComponentProps<typeof DialogPrimitive.Close>
) => <DialogPrimitive.Close data-slot='dialog-close' {...props} />;

export const DialogOverlay = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    data-slot='dialog-overlay'
    className={cn(
      'fixed inset-0 isolate z-50 bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
      className
    )}
    {...props}
  />
);

export const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      data-slot='dialog-content'
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-popover p-6 text-sm text-popover-foreground shadow-xl ring-1 ring-foreground/5 duration-100 outline-none sm:max-w-md dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close data-slot='dialog-close' asChild>
          <Button
            variant='flat'
            className='absolute top-4 right-4 size-8'
            size='icon'
          >
            <XIcon data-icon='inline-start' />
            <span className='sr-only'>Close</span>
          </Button>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
);

export const DialogHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot='dialog-header'
    className={cn('flex flex-col gap-1.5', className)}
    {...props}
  />
);

export const DialogFooter = ({
  className,
  showCloseButton = false,
  children,
  ...props
}: ComponentProps<'div'> & { showCloseButton?: boolean }) => (
  <div
    data-slot='dialog-footer'
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  >
    {children}
    {showCloseButton && (
      <DialogPrimitive.Close asChild>
        <Button>Close</Button>
      </DialogPrimitive.Close>
    )}
  </div>
);

export const DialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    data-slot='dialog-title'
    className={cn('text-base leading-none font-medium', className)}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    data-slot='dialog-description'
    className={cn(
      'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
      className
    )}
    {...props}
  />
);
