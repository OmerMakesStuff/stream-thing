'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    <Tooltip>
      <TooltipTrigger
        onClick={() => onToggle?.(!value)}
        disabled={disabled}
        render={<Button variant='flat' icon disabled={disabled} />}
      >
        <Icon />
      </TooltipTrigger>
      <TooltipContent>{value ? 'Show' : 'Hide'}</TooltipContent>
    </Tooltip>
  );
};
