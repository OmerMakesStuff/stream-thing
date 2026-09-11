'use client';

import type { ComponentPropsWithRef } from 'react';
import { cn } from 'cn';
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useChatSidebar } from '@/store/useChatSidebar';

export const StreamChatCollapseToggle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof Button>) => {
  const { collapsed, setCollapsed } = useChatSidebar();
  const Icon = collapsed ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon;

  return (
    <Tooltip label={collapsed ? 'Expand chat' : 'Collapse chat'} side='left'>
      <Button
        {...props}
        variant='flat'
        size='icon'
        onClick={() => setCollapsed(!collapsed)}
        className={cn('hidden lg:inline-flex', className)}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
};
