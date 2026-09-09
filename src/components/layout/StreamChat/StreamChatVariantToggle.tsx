'use client';

import type { ComponentPropsWithRef } from 'react';
import { cn } from 'cn';
import { MessageCircleIcon, UsersRoundIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { useChatSidebar } from '@/store/useChatSidebar';

export const StreamChatVariantToggle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof Button>) => {
  const { variant, setVariant } = useChatSidebar();
  const Icon = variant === 'community' ? MessageCircleIcon : UsersRoundIcon;

  return (
    <Tooltip label={variant === 'community' ? 'Back to chat' : 'Community'}>
      <Button
        {...props}
        variant='flat'
        size='icon'
        onClick={() =>
          setVariant(variant === 'community' ? 'chat' : 'community')
        }
        className={cn('hidden lg:inline-flex', className)}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
};
