'use client';

import type { ComponentProps } from 'react';
import { useDropzone } from '@uploadthing/react';
import { cn } from 'cn';
import { UploadIcon } from 'lucide-react';

type DropzoneOptions = Parameters<typeof useDropzone>[0];

export type DropzoneProps = DropzoneOptions &
  Omit<ComponentProps<'div'>, keyof DropzoneOptions>;

export const Dropzone = ({
  accept,
  disabled,
  maxFiles,
  maxSize,
  minSize,
  onDrop,
  className,
  ref,
  ...props
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    disabled,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  });

  return (
    <div
      {...props}
      {...getRootProps()}
      ref={ref}
      className={cn(
        `flex h-10 flex-col items-center justify-center rounded-lg bg-background px-6 py-10 whitespace-nowrap text-muted-foreground ring-offset-background outline-1 outline-border transition-colors duration-75 outline-dashed hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50`,
        isDragActive && 'bg-accent/50',
        className
      )}
    >
      <input {...getInputProps()} />
      <UploadIcon className='h-6 w-6 transition-opacity' />
    </div>
  );
};
