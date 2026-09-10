'use client';

import {
  type FormEventHandler,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import type { DropzoneProps } from '@/components/ui/Dropzone';
import { FormField } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { SpinnerButton } from '@/components/ui/SpinnerButton';
import { useStream, useUploadThing } from '@/hooks';
import { updateStreamSettings } from '@/actions/stream';

import { StreamThumbnailDropzone } from './StreamThumbnailDropzone';

export type StreamInfoProps = {
  initialThumbnailUrl: string | null;
};

export const StreamInfoDialog = ({ initialThumbnailUrl }: StreamInfoProps) => {
  const { hostId, viewerId, title: initialTitle } = useStream();
  const isHost = viewerId === `host-${hostId}`;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle),
    [thumbnailFile, setThumbnailFile] = useState<File | null>(null),
    [thumbnailFileUrl, setThumbnailFileUrl] = useState(initialThumbnailUrl);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { routeConfig, startUpload } = useUploadThing('thumbnailUploader', {
    onUploadProgress: setUploadProgress,
    onUploadError: () => setUploadProgress(0),
  });

  const maxFileSizeMb = useMemo(
    () =>
      routeConfig?.[Object.keys(routeConfig)[0] as keyof typeof routeConfig]
        ?.maxFileSize,
    [routeConfig]
  );

  const handleDropzoneAccept = useCallback<
    NonNullable<DropzoneProps['onDrop']>
  >(([file]) => {
    setThumbnailFile(file);
    setThumbnailFileUrl(URL.createObjectURL(file));
  }, []);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      startTransition(async () => {
        try {
          let thumbnailUrl = thumbnailFileUrl;
          if (thumbnailFile) {
            const uploadedFiles = await startUpload([thumbnailFile]);
            const uploadedFile = uploadedFiles?.[0];
            if (!uploadedFile)
              throw new Error(
                'Something went wrong while uploading thumbnail.'
              );
            thumbnailUrl = uploadedFile.ufsUrl;
            setThumbnailFileUrl(thumbnailUrl);
          }

          await updateStreamSettings({ title, thumbnailUrl });
          toast.success('Stream info updated.');
          setDialogOpen(false);
          router.refresh();
          setTimeout(() => setUploadProgress(0), 200);
        } catch (err) {
          toast.error("Couldn't update stream info", {
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while updating the stream info.',
          });
        }
      });
    },
    [router, startUpload, thumbnailFile, thumbnailFileUrl, title]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (isPending) return;
      setDialogOpen(open);

      if (open) return;
      setTimeout(() => {
        setTitle(initialTitle);
        setThumbnailFile(null);
        setThumbnailFileUrl(initialThumbnailUrl);
        setUploadProgress(0);
      }, 200);
    },
    [initialThumbnailUrl, initialTitle, isPending]
  );

  if (!isHost) return null;

  return (
    <>
      <Button className='ms-2' onClick={() => setDialogOpen(true)}>
        Edit stream info
      </Button>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stream info</DialogTitle>
          </DialogHeader>
          <form className='flex w-full flex-col gap-2' onSubmit={handleSubmit}>
            <FormField id='title' label='Title'>
              <Input
                value={title}
                onChange={e => !isPending && setTitle(e.target.value)}
              />
            </FormField>
            <FormField
              id='thumbnailUrl'
              label='Thumbnail'
              description={`Drop file here, or click to select it (max ${maxFileSizeMb})`}
              className='relative h-[6.5rem] [&>p]:mt-0'
            >
              <StreamThumbnailDropzone
                fileUrl={thumbnailFileUrl}
                uploadProgress={uploadProgress}
                disabled={isPending}
                onDrop={handleDropzoneAccept}
                onFileRemoved={() => {
                  setThumbnailFile(null);
                  setThumbnailFileUrl(null);
                }}
              />
            </FormField>

            <DialogFooter className='mt-2'>
              <DialogClose asChild>
                <Button type='button'>Cancel</Button>
              </DialogClose>
              <SpinnerButton
                type='submit'
                variant='primary'
                disabled={isPending}
                showSpinner={isPending}
              >
                Save
              </SpinnerButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
