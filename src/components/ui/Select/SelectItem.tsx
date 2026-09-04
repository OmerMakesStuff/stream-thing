'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Item, ItemIndicator, ItemText } from '@radix-ui/react-select';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      `relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50`,
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <ItemIndicator>
        <CheckIcon className='size-4' />
      </ItemIndicator>
    </span>

    <ItemText>{children}</ItemText>
  </Item>
));
SelectItem.displayName = Item.displayName;
