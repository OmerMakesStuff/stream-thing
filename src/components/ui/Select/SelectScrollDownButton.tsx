'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { ScrollDownButton } from '@radix-ui/react-select';
import { cn } from 'cn';
import { ChevronDownIcon } from 'lucide-react';

export const SelectScrollDownButton = forwardRef<
  ElementRef<typeof ScrollDownButton>,
  ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </ScrollDownButton>
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
