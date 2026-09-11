'use client';

import {
  type ComponentPropsWithoutRef,
  type FormEventHandler,
  useCallback,
  useState,
  useTransition,
} from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormField } from '@/components/ui/form';
import { SpinnerButton } from '@/components/ui/spinner-button';
import { Textarea } from '@/components/ui/textarea';
import { updateCurrentUser } from '@/actions/user';
import type { User } from '@/types';

export type UserProfileDialogProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  'onClick'
> & {
  initialValues: Partial<User>;
};

export const UserProfileDialog = ({
  initialValues,
  ...props
}: UserProfileDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [values, setValues] = useState(initialValues);

  const [isSaving, startTransition] = useTransition();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setDialogOpen(open);
      if (!open) setTimeout(() => setValues(initialValues), 200);
    },
    [initialValues]
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      startTransition(async () => {
        try {
          await updateCurrentUser(values);
          toast.success('Profile updated.');
          setDialogOpen(false);
        } catch (err) {
          toast.error("Couldn't update profile", {
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while updating your profile.',
          });
        }
      });
    },
    [values]
  );

  return (
    <>
      <Button {...props} onClick={() => setDialogOpen(true)}>
        Edit
      </Button>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <FormField id='bio' label='Bio'>
              <Textarea
                placeholder='Write something about yourself...'
                value={values.bio || ''}
                onChange={e =>
                  setValues(prev => ({ ...prev, bio: e.target.value }))
                }
                className='resize-none'
              />
            </FormField>

            <DialogFooter className='mt-4'>
              <DialogClose asChild>
                <Button type='button'>Cancel</Button>
              </DialogClose>
              <SpinnerButton
                type='submit'
                variant='primary'
                disabled={isSaving}
                showSpinner={isSaving}
              >
                Update
              </SpinnerButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
