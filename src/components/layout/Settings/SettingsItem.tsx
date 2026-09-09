import type { ComponentPropsWithoutRef } from 'react';
import { cn } from 'cn';

export type SettingsItemCoreProps = {
  field?: string;
  label: string;
  description?: string;
  htmlFor?: string;
  orientation?: 'horizontal' | 'vertical';
};

export type SettingsItemProps = ComponentPropsWithoutRef<'li'> &
  SettingsItemCoreProps;

export const SettingsItem = ({
  field,
  label,
  description,
  htmlFor,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: SettingsItemProps) => (
  <li
    {...props}
    className={cn(
      'grid grid-cols-[auto_--spacing(16)] items-center gap-2 py-3',
      orientation === 'vertical' && 'flex flex-col items-start',
      className
    )}
  >
    <div className='flex flex-col gap-0'>
      <label htmlFor={htmlFor || field} className='text-base font-medium'>
        {label}
      </label>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
    {children}
  </li>
);
