import type { ComponentProps } from 'react';
import { cn } from 'cn';
import { Loader2Icon } from 'lucide-react';

export const Spinner = ({ className, ...props }: ComponentProps<'svg'>) => (
  <Loader2Icon
    data-slot='spinner'
    role='status'
    aria-label='Loading'
    className={cn('spinner size-4 animate-spin', className)}
    {...props}
  />
);
