import { Children, type ElementRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { Button, type ButtonProps } from '../Button';
import { Spinner } from '../Spinner';

export type SpinnerButtonProps = ButtonProps & { showSpinner?: boolean };

export const SpinnerButton = forwardRef<
  ElementRef<typeof Button>,
  SpinnerButtonProps
>(({ showSpinner, className, children, ...props }, ref) => (
  <Button
    {...props}
    ref={ref}
    className={cn(
      'relative',
      showSpinner && '[&>:not(.spinner)]:invisible',
      className
    )}
  >
    {Children.map(children, child =>
      typeof child === 'string' || typeof child === 'number' ? (
        <span>{child}</span>
      ) : (
        child
      )
    )}
    {showSpinner && <Spinner className='absolute' />}
  </Button>
));
SpinnerButton.displayName = 'SpinnerButton';
