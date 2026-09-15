'use client';

import type { ComponentPropsWithRef } from 'react';
import { cn } from 'cn';
import { MessageCircleIcon, UsersRoundIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useChatSidebar } from '@/store/useChatSidebar';

export const StreamChatVariantToggle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof Button>) => {
  const { variant, setVariant } = useChatSidebar();
  const Icon = variant === 'community' ? MessageCircleIcon : UsersRoundIcon;

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() =>
          setVariant(variant === 'community' ? 'chat' : 'community')
        }
        render={
          <Button
            {...props}
            variant='flat'
            icon
            className={cn('hidden lg:inline-flex', className)}
          />
        }
      >
        <Icon />
      </TooltipTrigger>
      <TooltipContent>
        {variant === 'community' ? 'Back to chat' : 'Community'}
      </TooltipContent>
    </Tooltip>
  );
};
