import type { ComponentPropsWithRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

import { avatarVariants } from './variants';

export type AvatarSkeletonProps = ComponentPropsWithRef<'div'> &
  VariantProps<typeof avatarVariants>;

export const AvatarSkeleton = ({
  size,
  className,
  ...props
}: AvatarSkeletonProps) => (
  <Skeleton
    className={cn(avatarVariants({ size, className }), className)}
    {...props}
  />
);
