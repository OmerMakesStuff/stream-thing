'use client';

import type { ComponentPropsWithRef } from 'react';
import { cn } from 'cn';
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useChatSidebar } from '@/store/useChatSidebar';

export const StreamChatCollapseToggle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof Button>) => {
  const { collapsed, setCollapsed } = useChatSidebar();
  const Icon = collapsed ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon;

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() => setCollapsed(!collapsed)}
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
      <TooltipContent side='left'>
        {collapsed ? 'Expand chat' : 'Collapse chat'}
      </TooltipContent>
    </Tooltip>
  );
};
