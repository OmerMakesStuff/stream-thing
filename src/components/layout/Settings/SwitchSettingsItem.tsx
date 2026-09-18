'use client';

import {
  type ComponentPropsWithoutRef,
  useCallback,
  useTransition,
} from 'react';

import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/toast';
import { updateStreamSettings } from '@/actions/stream';

import { SettingsItem, type SettingsItemProps } from './SettingsItem';

export type SwitchSettingsItemProps = Omit<SettingsItemProps, 'children'> &
  ComponentPropsWithoutRef<typeof Switch>;

export const SwitchSettingsItem = ({
  field,
  label,
  description,
  checked = false,
  disabled,
  ...props
}: SwitchSettingsItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      if (!field) return;
      startTransition(async () => {
        try {
          await updateStreamSettings({ [field]: checked });
        } catch (err) {
          toast.add({
            type: 'error',
            title: "Couldn't update stream settings",
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while trying to update this setting.',
          });
        }
      });
    },
    [field]
  );

  return (
    <SettingsItem
      field={field}
      label={label}
      description={description}
      htmlFor={`switch-${field}`}
    >
      <Switch
        {...props}
        id={`switch-${field}`}
        className='ms-auto'
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled || isPending}
      />
    </SettingsItem>
  );
};
