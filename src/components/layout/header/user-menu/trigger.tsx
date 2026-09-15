'use client';

import { useUser } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';

export const UserMenuTrigger = () => {
  const { isLoaded, user } = useUser();
  if (isLoaded && !user) return null;

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant='flat'
        icon
        className='justify-self-end rounded-full p-2'
        disabled={!isLoaded}
      >
        {!isLoaded || !user?.id ? (
          <Spinner className='size-7 text-inherit' />
        ) : (
          <Avatar className='size-9'>
            <AvatarImage
              src={user.imageUrl}
              alt={user.primaryEmailAddress?.emailAddress || 'User'}
            />
            <AvatarFallback>{user.username || ''}</AvatarFallback>
          </Avatar>
        )}
      </Button>
    </DropdownMenuTrigger>
  );
};
