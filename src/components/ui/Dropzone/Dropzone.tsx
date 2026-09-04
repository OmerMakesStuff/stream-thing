'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import { UploadIcon } from 'lucide-react';
import type { DropzoneOptions } from '@uploadthing/react';

import { cn } from '@/lib/utils';

export type DropzoneProps = DropzoneOptions &
  Omit<ComponentPropsWithoutRef<'div'>, keyof DropzoneOptions>;

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      accept,
      disabled,
      maxFiles,
      maxSize,
      minSize,
      onDrop,
      className,
      ...props
    },
    ref
  ) => {
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
  }
);
Dropzone.displayName = 'Dropzone';
