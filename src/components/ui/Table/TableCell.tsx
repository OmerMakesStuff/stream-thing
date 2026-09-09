import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from 'cn';

export const TableCell = forwardRef<
  HTMLTableCellElement,
  ComponentPropsWithoutRef<'td'>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';
