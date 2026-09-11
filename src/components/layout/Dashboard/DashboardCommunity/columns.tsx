'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon } from 'lucide-react';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

import { CommunityUnblockButton } from './CommunityUnblockButton';
import { communityTableFeatures } from './features';

/** In this case, `createdAt` is not from the user but from block/follow, but
 * they're both Dates so it doesn't really matter where we pick it from. */
export type TableUser = Pick<
  User,
  'id' | 'imageUrl' | 'username' | 'createdAt'
>;

export const columns: ColumnDef<typeof communityTableFeatures, TableUser>[] = [
  {
    accessorKey: 'username',
    filterFn: 'includesString',
    sortFn: 'text',
    header: ({ column }) => (
      <Button
        variant='flat'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Username
        <ArrowUpDownIcon className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='flex flex-row items-center gap-2'>
        <Avatar src={row.original.imageUrl} alt={row.original.username} />
        {row.original.username}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    sortFn: 'datetime',
    header: ({ column }) => (
      <Button
        variant='flat'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date blocked
        <ArrowUpDownIcon className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => format(row.original.createdAt, 'MMM d, y'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CommunityUnblockButton userId={row.original.id} />,
  },
];
