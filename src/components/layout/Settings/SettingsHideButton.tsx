'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export type SettingsHideButtonProps = {
  value?: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
};

export const SettingsHideButton = ({
  value,
  onToggle,
  disabled,
}: SettingsHideButtonProps) => {
  const Icon = value ? EyeIcon : EyeOffIcon;

  return (
    <Tooltip label={value ? 'Show' : 'Hide'}>
      <Button
        variant='flat'
        size='icon'
        onClick={() => onToggle?.(!value)}
        disabled={disabled}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
};
