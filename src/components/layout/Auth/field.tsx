import type { ComponentPropsWithoutRef } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AuthError } from './error';

type AuthFieldProps = Omit<ComponentPropsWithoutRef<typeof Input>, 'id'> & {
  error?: string;
  id: string;
  label: string;
};

export const AuthField = ({ error, id, label, ...props }: AuthFieldProps) => (
  <div className='flex flex-col gap-2'>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={!!error}
      {...props}
    />
    {error && <AuthError id={`${id}-error`}>{error}</AuthError>}
  </div>
);
