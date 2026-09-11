'use client';

import { type FormEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

export const HeaderSearch = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      if (!value) return;

      const searchParams = new URLSearchParams();
      searchParams.set('query', value);
      router.push(`/search?${searchParams.toString()}`);
    },
    [router, value]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className='relative top-0 left-1/2 grid h-full w-full -translate-x-1/2 place-items-center sm:absolute sm:w-96'
    >
      <SearchIcon className='absolute inset-y-0 inset-s-3 h-full w-em text-base text-muted-foreground' />
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Search...'
        className='w-full ps-9'
      />
    </form>
  );
};
