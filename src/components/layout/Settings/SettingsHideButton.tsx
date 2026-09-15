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
      <TooltipTrigger asChild>
        <Button
          variant='flat'
          icon
          onClick={() => onToggle?.(!value)}
          disabled={disabled}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{value ? 'Show' : 'Hide'}</TooltipContent>
    </Tooltip>
  );
};
