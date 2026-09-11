import { cn } from 'cn';

import { Avatar, type AvatarProps } from '@/components/ui/avatar';

export type UserAvatarProps = Omit<
  AvatarProps,
  'src' | 'alt' | 'fallback' | 'children'
> & {
  username: string;
  imageUrl?: string;
  isLive?: boolean;
};

export const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  className,
  ...props
}: UserAvatarProps) => (
  <Avatar
    {...props}
    src={imageUrl}
    alt={username}
    fallback={username[0]}
    className={cn(
      isLive && 'ring-2 ring-destructive ring-offset-2 ring-offset-background',
      className
    )}
  />
);
