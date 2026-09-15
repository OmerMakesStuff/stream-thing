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
      <TooltipTrigger asChild>
        <Button
          {...props}
          variant='flat'
          icon
          onClick={() =>
            setVariant(variant === 'community' ? 'chat' : 'community')
          }
          className={cn('hidden lg:inline-flex', className)}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {variant === 'community' ? 'Back to chat' : 'Community'}
      </TooltipContent>
    </Tooltip>
  );
};
