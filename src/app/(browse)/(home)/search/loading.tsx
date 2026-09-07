import { Skeleton } from '@/components/ui/Skeleton';
import { SearchResultSkeleton } from '@/components/layout';

const SearchPageLoading = () => (
  <>
    <Skeleton className='mt-1 mb-4 h-em w-64 text-2xl' />
    <div className='flex flex-col gap-px'>
      {[...Array(5).keys()].map(key => (
        <SearchResultSkeleton key={key} />
      ))}
    </div>
  </>
);

export default SearchPageLoading;
