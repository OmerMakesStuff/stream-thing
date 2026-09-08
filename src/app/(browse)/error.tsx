'use client';

import { FrownIcon } from 'lucide-react';

import { Main } from '@/components/layout/Main';

const ErrorPage = ({ error }: { error: Error }) => (
  <Main className='flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4'>
    <FrownIcon className='h-16 w-16 text-destructive' />
    <p className='mx-8 my-0 text-center text-base text-muted-foreground md:text-xl'>
      {error?.message || 'Something went wrong.'}
    </p>
  </Main>
);

export default ErrorPage;
