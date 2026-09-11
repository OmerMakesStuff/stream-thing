'use client';

import { SignInButton, useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/DropdownMenu';

import { UserMenuContent } from './content';
import { UserMenuTrigger } from './trigger';

export const HeaderUserMenu = () => {
  const { isLoaded, user } = useUser();

  if (isLoaded && !user)
    return (
      <SignInButton>
        <Button variant='primary'>Sign in</Button>
      </SignInButton>
    );

  return (
    <DropdownMenu>
      <UserMenuTrigger />
      <UserMenuContent />
    </DropdownMenu>
  );
};
