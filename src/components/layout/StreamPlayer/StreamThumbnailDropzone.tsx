import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { cn } from 'cn';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { Button } from '@/components/ui/Button';
import { Dropzone, type DropzoneProps } from '@/components/ui/Dropzone';
import { Tooltip } from '@/components/ui/Tooltip';
import { useUploadThing } from '@/hooks';

export type StreamThumbnailDropzoneProps = {
  fileUrl: string | null;
  uploadProgress?: number;
  onDrop: DropzoneProps['onDrop'];
  onFileRemoved: () => void;
  disabled?: boolean;
};

export const StreamThumbnailDropzone = ({
  fileUrl,
  disabled,
  uploadProgress = 0,
  onDrop,
  onFileRemoved,
}: StreamThumbnailDropzoneProps) => {
  const { routeConfig } = useUploadThing('thumbnailUploader');

  const [maxFileSize, maxFileSizeMb] = useMemo(() => {
    const maxSizeMb =
        routeConfig?.[Object.keys(routeConfig)[0] as keyof typeof routeConfig]
          ?.maxFileSize,
      maxSize = Number(maxSizeMb?.replace('MB', '')) * 1e6;
    return [maxSize, maxSizeMb];
  }, [routeConfig]);

  const [allowedMimetypes, allowedFileExtensions] = useMemo(() => {
    const mimetypes = routeConfig ? Object.keys(routeConfig) : [],
      extensions = mimetypes.map(mimetype =>
        mimetype.split('/').slice(1).join('/')
      );
    return [mimetypes, extensions];
  }, [routeConfig]);

  const handleDrop = useCallback<NonNullable<DropzoneProps['onDrop']>>(
    acceptedFiles => {
      if (acceptedFiles.length > 0) return onDrop?.(acceptedFiles);

      const uppercaseExtensions = allowedFileExtensions.map(ext =>
        ext.toUpperCase()
      );
      toast.error("Couldn't upload this file", {
        description: `Only ${uppercaseExtensions
          .slice(0, -1)
          .join(', ')} and ${uppercaseExtensions.at(
          -1
        )} files under ${maxFileSizeMb} are supported.`,
      });
    },
    [allowedFileExtensions, maxFileSizeMb, onDrop]
  );

  return fileUrl ? (
    <div className='absolute inset-e-0 top-2 ms-auto aspect-video h-24 overflow-hidden rounded-lg outline-1 outline-border'>
      <Image
        src={fileUrl}
        alt='Stream thumbnail'
        fill
        className={cn(
          'object-cover transition-opacity',
          disabled && 'opacity-50'
        )}
      />
      <div
        className='absolute bottom-0 h-1 bg-primary transition-[width] duration-75'
        style={{ width: `${uploadProgress}%` }}
      />
      {!disabled && (
        <Tooltip label='Remove thumbnail'>
          <Button
            size='icon'
            type='button'
            className='absolute inset-e-2 top-2'
            onClick={onFileRemoved}
          >
            <TrashIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  ) : (
    <Dropzone
      className='absolute inset-e-0 top-2 ms-auto aspect-video h-24 p-0'
      multiple={false}
      maxSize={maxFileSize}
      accept={generateClientDropzoneAccept(allowedMimetypes)}
      onDrop={handleDrop}
    />
  );
};
