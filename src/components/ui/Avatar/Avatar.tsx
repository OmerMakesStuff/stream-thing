'use client';

import { type ElementRef, forwardRef } from 'react';
import {
  Avatar as AvatarRoot,
  AvatarFallback,
  AvatarImage,
  type AvatarImageProps,
  type AvatarProps as AvatarRootProps,
} from '@radix-ui/react-avatar';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { avatarVariants } from './variants';

export type AvatarProps = AvatarRootProps &
  AvatarImageProps &
  VariantProps<typeof avatarVariants> & { fallback?: string };

export const Avatar = forwardRef<ElementRef<typeof AvatarRoot>, AvatarProps>(
  ({ src, alt, fallback, size, className, ...props }, ref) => (
    <AvatarRoot
      {...props}
      ref={ref}
      className={cn(avatarVariants({ size, className }))}
    >
      <AvatarImage
        src={src}
        alt={alt}
        className='aspect-square h-full w-full'
      />
      <AvatarFallback className='flex h-full w-full items-center justify-center rounded-full bg-muted'>
        {fallback || alt?.[0]}
      </AvatarFallback>
    </AvatarRoot>
  )
);
Avatar.displayName = AvatarRoot.displayName;
