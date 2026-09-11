import type { PropsWithChildren } from 'react';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

import { Spinner } from '@/components/ui/spinner';
import { Logo } from '@/components/layout/Logo';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className='grid w-full grid-cols-1 grid-rows-[--spacing(64)_1fr] flex-col place-items-center lg:min-h-dvh lg:grid-cols-2 lg:grid-rows-1'>
    <div className='mx-auto w-full max-w-92 p-6'>
      <ClerkLoading>
        <Spinner className='mx-auto size-8' />
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </div>
    <div className='relative -order-1 grid size-full place-items-center bg-primary lg:order-1 dark:bg-primary-foreground dark:from-primary/30 dark:to-primary/0'>
      <Logo className='relative size-48 fill-primary-foreground dark:fill-primary' />
    </div>
  </div>
);

export default AuthLayout;
