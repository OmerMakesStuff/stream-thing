import { Suspense } from 'react';

import { BrowseResults, BrowseResultsSkeleton } from '@/components/layout';

const Home = async () => (
  <>
    <h2 className='mb-4 text-2xl font-bold tracking-tight'>
      Streams we think you&apos;ll like
    </h2>
    <Suspense fallback={<BrowseResultsSkeleton />}>
      <BrowseResults />
    </Suspense>
  </>
);

export default Home;
