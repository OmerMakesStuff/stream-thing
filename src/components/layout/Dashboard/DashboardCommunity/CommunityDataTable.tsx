'use client';

import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
  useTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

import { communityTableFeatures } from './features';

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<typeof communityTableFeatures, TData>[];
  data: TData[];
}

export const CommunityDataTable = <TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]),
    [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useTable({
    features: communityTableFeatures,
    columns,
    data,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: { columnFilters, sorting },
  });

  return (
    <>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter users...'
          value={
            (table.getColumn('username')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('username')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getAllCells().map(cell => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end gap-2 py-4'>
        <Button
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};
