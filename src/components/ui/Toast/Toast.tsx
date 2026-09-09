'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { Provider, Root } from '@radix-ui/react-toast';
import { type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

import { toastVariants } from './variants';

export const ToastProvider = Provider;

export const Toast = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = Root.displayName;
