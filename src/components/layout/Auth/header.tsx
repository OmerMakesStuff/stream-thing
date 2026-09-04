import type { ReactNode } from 'react';

type AuthHeaderProps = { description: ReactNode; title: ReactNode };

export const AuthHeader = ({ description, title }: AuthHeaderProps) => (
  <div className='mb-8 flex flex-col gap-1'>
    <h1 className='text-3xl font-bold tracking-tight text-foreground'>
      {title}
    </h1>
    <p className='text-sm text-muted-foreground'>{description}</p>
  </div>
);
