import { Spinner } from '@/components/ui/spinner';

export const StreamLoadingState = () => (
  <div className='flex h-full items-center justify-center'>
    <Spinner className='size-10' />
  </div>
);
