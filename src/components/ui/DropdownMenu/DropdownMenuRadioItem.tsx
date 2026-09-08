'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu';
import { CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      `relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50`,
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <ItemIndicator>
        <CircleIcon className='size-2 fill-current' />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;
