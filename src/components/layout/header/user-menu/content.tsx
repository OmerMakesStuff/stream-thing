'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/utils';

export const UserMenuContent = () => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  return (
    <DropdownMenuContent align='end'>
      <DropdownMenuLabel className={cn(user?.fullName && 'pb-0')}>
        {user?.fullName || `@${user?.username}`}
      </DropdownMenuLabel>
      {user?.fullName && (
        <DropdownMenuLabel className='pt-0 text-xs font-normal text-muted-foreground'>
          {`@${user.username}`}
        </DropdownMenuLabel>
      )}
      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => openUserProfile()}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href='/dashboard'>Dashboard</Link>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => signOut(() => router.push('/'))}>
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
