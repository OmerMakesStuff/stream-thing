'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import { Skeleton } from '@/components/ui/Skeleton';

export const avatarVariants = cva(
  'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten'
);

type AvatarSize = 'default' | 'sm' | 'md' | 'lg';

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> &
  Pick<ComponentProps<typeof AvatarPrimitive.Image>, 'src' | 'alt'> & {
    fallback?: ReactNode;
    size?: AvatarSize;
  };

export const Avatar = ({
  className,
  size = 'default',
  src,
  alt,
  fallback,
  children,
  ...props
}: AvatarProps) => {
  const normalizedSize = size === 'md' ? 'default' : size;

  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      data-size={normalizedSize}
      className={cn(avatarVariants(), className)}
      {...props}
    >
      {src !== undefined && <AvatarImage src={src} alt={alt} />}
      {(src !== undefined || fallback !== undefined || alt !== undefined) && (
        <AvatarFallback>{fallback || alt?.[0]}</AvatarFallback>
      )}
      {children}
    </AvatarPrimitive.Root>
  );
};

export const AvatarImage = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) => (
  <AvatarPrimitive.Image
    data-slot='avatar-image'
    className={cn(
      'aspect-square size-full rounded-full object-cover',
      className
    )}
    {...props}
  />
);

export const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) => (
  <AvatarPrimitive.Fallback
    data-slot='avatar-fallback'
    className={cn(
      'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs',
      className
    )}
    {...props}
  />
);

export const AvatarBadge = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    data-slot='avatar-badge'
    className={cn(
      'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none',
      'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
      'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
      'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
      className
    )}
    {...props}
  />
);

export const AvatarGroup = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot='avatar-group'
    className={cn(
      'group/avatar-group flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background [&>[data-slot=avatar]+[data-slot=avatar]]:-ml-2',
      className
    )}
    {...props}
  />
);

export const AvatarGroupCount = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot='avatar-group-count'
    className={cn(
      'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
      className
    )}
    {...props}
  />
);

export type AvatarSkeletonProps = ComponentProps<'div'> &
  VariantProps<typeof avatarVariants> & { size?: AvatarSize };

export const AvatarSkeleton = ({
  size = 'default',
  className,
  ...props
}: AvatarSkeletonProps) => (
  <Skeleton
    data-size={size === 'md' ? 'default' : size}
    className={cn(avatarVariants(), className)}
    {...props}
  />
);
