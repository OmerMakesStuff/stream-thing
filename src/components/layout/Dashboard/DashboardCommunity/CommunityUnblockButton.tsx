'use client';

import { useCallback, useTransition } from 'react';

import { SpinnerButton } from '@/components/ui/spinner-button';
import { toast } from '@/components/ui/toast';
import { unblockUser } from '@/actions/block';

type CommunityUnblockButtonProps = {
  userId: string;
};

export const CommunityUnblockButton = ({
  userId,
}: CommunityUnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(() => {
    startTransition(async () => {
      try {
        const deletedBlock = await unblockUser(userId);
        toast.add({
          type: 'success',
          title: `You've unblocked ${deletedBlock.blockedUser.username}.`,
        });
      } catch (err) {
        toast.add({
          type: 'error',
          title: `Couldn't unblock this user`,
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to unblock this user.',
        });
      }
    });
  }, [userId]);

  return (
    <SpinnerButton
      onClick={handleClick}
      disabled={isPending}
      showSpinner={isPending}
    >
      Unblock
    </SpinnerButton>
  );
};
