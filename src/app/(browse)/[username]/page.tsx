import { notFound } from 'next/navigation';

import { isFollowingUser } from '@/queries/follow';
import { isBlockedByUser } from '@/queries/block';
import { getUserByUsername } from '@/queries/users';
import { StreamPlayer } from '@/components/layout';

type UserPageProps = {
  params: Promise<{ username: string }>;
};

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username, { includeStream: true });
  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id),
    isBlocked = await isBlockedByUser(user.id);
  if (isBlocked) notFound();

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
};

export default UserPage;
