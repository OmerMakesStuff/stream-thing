'use client';

import { useUser } from '@clerk/nextjs';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/Spinner';

export const UserMenuTrigger = () => {
  const { isLoaded, user } = useUser();
  if (isLoaded && !user) return null;

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant='flat'
        size='icon'
        className='justify-self-end rounded-full p-2'
        disabled={!isLoaded}
      >
        {!isLoaded || !user?.id ? (
          <Spinner className='size-7 text-inherit' />
        ) : (
          <Avatar
            className='size-9'
            src={user?.imageUrl}
            alt={user?.primaryEmailAddress?.emailAddress || 'User'}
            fallback={user?.username || ''}
          />
        )}
      </Button>
    </DropdownMenuTrigger>
  );
};
