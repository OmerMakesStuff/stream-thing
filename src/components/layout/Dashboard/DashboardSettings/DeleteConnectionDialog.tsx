'use client';

import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { SpinnerButton } from '@/components/ui/SpinnerButton';
import { deleteUserIngress } from '@/actions/ingress';

export const DeleteConnectionDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = useCallback(() => {
    startTransition(async () => {
      try {
        await deleteUserIngress();

        toast.success('Ingress deleted.');
        setDialogOpen(false);
      } catch (err) {
        toast.error("Couldn't delete connection", {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to delete this ingress.',
        });
      }
    });
  }, []);

  return (
    <>
      <Button
        variant='destructive'
        onClick={() => setDialogOpen(true)}
        className='ms-auto'
      >
        Delete
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete connection?</DialogTitle>
            <DialogDescription>
              Your current connection will be deleted, and you won&apos;t be
              able to stream again until you generate a new one.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending}>Cancel</Button>
            </DialogClose>
            <SpinnerButton
              variant='destructive'
              onClick={handleConfirm}
              disabled={isPending}
              showSpinner={isPending}
            >
              Delete
            </SpinnerButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
