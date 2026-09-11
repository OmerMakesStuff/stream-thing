'use client';

import {
  type FormEventHandler,
  useCallback,
  useState,
  useTransition,
} from 'react';
import { cn } from 'cn';
import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangleIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { FormField } from '@/components/ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { SpinnerButton } from '@/components/ui/SpinnerButton';
import { createUserIngress } from '@/actions/ingress';

export type ConnectionDialogProps = { isReset?: boolean };

export const ConnectionDialog = ({ isReset }: ConnectionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ingressType, setIngressType] = useState<number>(
    IngressInput.RTMP_INPUT
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      startTransition(async () => {
        try {
          await createUserIngress(ingressType);

          toast.success('Ingress created.');
          setDialogOpen(false);
        } catch (err) {
          toast.error("Couldn't generate connection", {
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while trying to create an ingress.',
          });
        }
      });
    },
    [ingressType]
  );

  return (
    <>
      <Button
        variant={isReset ? 'default' : 'primary'}
        onClick={() => setDialogOpen(true)}
        className={cn(isReset && 'ms-auto')}
      >
        {isReset ? 'Reset' : 'Generate'}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isReset ? 'Reset connection' : 'Generate connection'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <FormField id='select-ingressType' label='Connection protocol'>
              <Select
                value={`${ingressType}`}
                onValueChange={value => setIngressType(Number(value))}
                disabled={isPending}
              >
                <SelectTrigger id='select-ingressType'>
                  <SelectValue placeholder='Protocol' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={`${IngressInput.RTMP_INPUT}`}>
                    RTMP
                  </SelectItem>
                  <SelectItem value={`${IngressInput.WHIP_INPUT}`}>
                    WHIP
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            {isReset && (
              <Alert variant='destructive'>
                <AlertTriangleIcon />
                <AlertDescription>
                  This action will invalidate your current connection, and reset
                  all active streams using it.
                </AlertDescription>
              </Alert>
            )}
            <DialogFooter className='mt-2'>
              <DialogClose asChild>
                <Button type='button' disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <SpinnerButton
                type='submit'
                variant='primary'
                disabled={isPending}
                showSpinner={isPending}
              >
                Confirm
              </SpinnerButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
