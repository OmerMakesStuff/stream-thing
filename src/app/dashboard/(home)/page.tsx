import { redirect } from 'next/navigation';

import { StreamPlayer } from '@/components/layout';
import { getCurrentUser } from '@/queries/auth';

const DashboardHomePage = async () => {
  let currentUser;

  try {
    currentUser = await getCurrentUser({
      includeStream: true,
      throwIfNotFound: true,
    });
    if (!currentUser.stream) throw new Error("You don't have a stream.");
  } catch {
    redirect('/login');
  }

  const { stream, ...user } = currentUser;

  return (
    <div className='h-full'>
      <StreamPlayer user={user} stream={stream} isFollowing={true} />
    </div>
  );
};

export default DashboardHomePage;
