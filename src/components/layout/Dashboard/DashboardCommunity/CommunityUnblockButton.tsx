'use client';

import { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

import { SpinnerButton } from '@/components/ui/SpinnerButton';
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
        toast.success(`You've unblocked ${deletedBlock.blockedUser.username}.`);
      } catch (err) {
        toast.error(`Couldn't unblock this user`, {
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
