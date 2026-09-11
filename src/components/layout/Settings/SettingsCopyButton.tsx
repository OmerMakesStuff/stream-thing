'use client';

import { type ComponentPropsWithoutRef, useCallback, useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/Tooltip';

export type SettingsCopyButtonProps = {
  value?: ComponentPropsWithoutRef<'input'>['value'];
};

export const SettingsCopyButton = ({ value }: SettingsCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const Icon = isCopied ? CheckIcon : CopyIcon;

  const handleClick = useCallback(() => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value.toString());
    setTimeout(() => setIsCopied(false), 1500);
  }, [value]);

  return (
    <Tooltip label='Copy'>
      <Button
        variant='flat'
        size='icon'
        onClick={handleClick}
        disabled={!value || isCopied}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
};
