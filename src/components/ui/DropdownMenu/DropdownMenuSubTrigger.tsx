import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { SubTrigger } from '@radix-ui/react-dropdown-menu';
import { cn } from 'cn';
import { ChevronRightIcon } from 'lucide-react';

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      `flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent data-[state=open]:bg-accent`,
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className='ms-auto size-4' />
  </SubTrigger>
));
DropdownMenuSubTrigger.displayName = SubTrigger.displayName;
