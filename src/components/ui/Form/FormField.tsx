import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { FormDescription } from './FormDescription';
import { FormLabel } from './FormLabel';

export type FormFieldProps = ComponentPropsWithoutRef<'div'> & {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id, label, description: description, error, children, ...props }, ref) => (
    <div {...props} ref={ref}>
      {label && (
        <FormLabel htmlFor={id} error={error}>
          {label}
        </FormLabel>
      )}
      <Slot id={id} aria-invalid={!!error}>
        {children}
      </Slot>
      {description && (
        <FormDescription error={error}>{description}</FormDescription>
      )}
    </div>
  )
);
FormField.displayName = 'FormField';
