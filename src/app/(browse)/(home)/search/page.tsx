import { redirect } from 'next/navigation';

import { SearchResult } from '@/components/layout';
import { getSearchStreams } from '@/queries/stream';

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { query } = await searchParams;

  if (!query) redirect('/');
  const data = await getSearchStreams(query);

  return (
    <>
      <h2 className='mb-4 text-2xl font-bold tracking-tight'>
        Results for &quot;{query}&quot;
      </h2>
      {data.length < 1 ? (
        <p className='text-sm text-muted-foreground'>No result found.</p>
      ) : (
        <div className='flex flex-col gap-px'>
          {data.map(result => (
            <SearchResult key={result.id} data={result} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchPage;
