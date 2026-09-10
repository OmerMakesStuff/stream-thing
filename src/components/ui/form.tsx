import type { ComponentProps } from 'react';
import { cn } from 'cn';
import { Slot } from 'radix-ui';

import { Label } from '@/components/ui/label';

export type FormDescriptionProps = ComponentProps<'p'> & { error?: boolean };

export const FormDescription = ({
  error,
  className,
  ...props
}: FormDescriptionProps) => (
  <p
    data-slot='form-description'
    className={cn(
      'mt-2 text-xs text-muted-foreground',
      error && 'text-destructive',
      className
    )}
    {...props}
  />
);

export type FormLabelProps = ComponentProps<typeof Label> & {
  error?: boolean;
};

export const FormLabel = ({ error, className, ...props }: FormLabelProps) => (
  <Label
    data-slot='form-label'
    className={cn('mb-1.5 inline-flex', error && 'text-destructive', className)}
    {...props}
  />
);

export type FormFieldProps = ComponentProps<'div'> & {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
};

export const FormField = ({
  id,
  label,
  description,
  error,
  children,
  ref,
  ...props
}: FormFieldProps) => (
  <div
    ref={ref}
    data-slot='form-field'
    data-invalid={error || undefined}
    {...props}
  >
    {label && (
      <FormLabel htmlFor={id} error={error}>
        {label}
      </FormLabel>
    )}
    <Slot.Root id={id} aria-invalid={!!error}>
      {children}
    </Slot.Root>
    {description && (
      <FormDescription error={error}>{description}</FormDescription>
    )}
  </div>
);
