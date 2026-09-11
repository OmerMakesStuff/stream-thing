import { Skeleton } from '@/components/ui/skeleton';

export type SettingsItemSkeletonProps = {
  withDescription?: boolean;
};

export const SettingsItemSkeleton = ({
  withDescription = false,
}: SettingsItemSkeletonProps) => (
  <li className='grid grid-cols-[auto_--spacing(16)] items-center py-3'>
    <div className='flex flex-col gap-0'>
      <Skeleton className='my-1 h-4 w-full sm:w-32' />
      {withDescription && <Skeleton className='my-1 h-3 w-60 md:w-96' />}
    </div>
  </li>
);
