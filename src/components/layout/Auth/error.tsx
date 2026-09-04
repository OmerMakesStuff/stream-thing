import type { ComponentPropsWithoutRef } from 'react';

export const AuthError = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'p'>) =>
  children ? (
    <p className='text-sm text-destructive' role='alert' {...props}>
      {children}
    </p>
  ) : null;
