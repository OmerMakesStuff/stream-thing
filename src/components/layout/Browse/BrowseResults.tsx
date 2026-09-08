import { getStreams } from '@/queries/stream';

import { BrowseResult, BrowseResultSkeleton } from './BrowseResult';

export const BrowseResults = async () => {
  const data = await getStreams();

  return data.length < 1 ? (
    <p>No streams found.</p>
  ) : (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
      {data.map(stream => (
        <BrowseResult key={stream.id} data={stream} />
      ))}
    </div>
  );
};

export const BrowseResultsSkeleton = () => (
  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
    {[...Array(8).keys()].map(key => (
      <BrowseResultSkeleton key={key} />
    ))}
  </div>
);
