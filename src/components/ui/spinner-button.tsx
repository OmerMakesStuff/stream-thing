import { Children } from 'react';
import { cn } from 'cn';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export type SpinnerButtonProps = ButtonProps & { showSpinner?: boolean };

export const SpinnerButton = ({
  showSpinner,
  className,
  children,
  ref,
  ...props
}: SpinnerButtonProps) => (
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
    {showSpinner && <Spinner data-icon='inline-start' className='absolute' />}
  </Button>
);
