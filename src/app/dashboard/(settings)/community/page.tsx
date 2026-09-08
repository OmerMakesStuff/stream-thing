import { columns, CommunityDataTable } from '@/components/layout';
import { getBlockedUsers } from '@/queries/block';

const DashboardCommunityPage = async () => {
  const blockedUsers = await getBlockedUsers();
  const formattedData = blockedUsers.map(
    ({ blockedUser: { id, imageUrl, username }, createdAt }) => ({
      id,
      imageUrl,
      username,
      createdAt,
    })
  );

  return (
    <>
      <h1 className='mb-4 text-4xl font-bold tracking-tight'>Community</h1>
      <CommunityDataTable columns={columns} data={formattedData} />
    </>
  );
};

export default DashboardCommunityPage;
