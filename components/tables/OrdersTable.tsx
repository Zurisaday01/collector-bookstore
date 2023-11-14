'use client';

import * as React from 'react';
import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

import { format } from 'date-fns';

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { User, OrderItems, Order } from '@/lib/types';

const data: Order[] = [
	{
		id: 'order001',
		user: {
			id: 'user123',
			name: 'Alice Johnson',
			email: 'alice.johnson@example.com',
			image: 'example',
			isAdmin: true,
		},
		total: 49.99,
		phone: '555-123-4567',
		address: '456 Elm St, Cityville, USA',
		orderItems: [
			{
				id: 'item1',
				book: {
					id: 'book101',
					title: 'Book X',
					author: 'Author A',
				},
				quantity: 2,
				price: 19.99,
			},
			{
				id: 'item2',
				book: {
					id: 'book102',
					title: 'Book Y',
					author: 'Author B',
				},
				quantity: 1,
				price: 29.99,
			},
		],
		createdAt: new Date('2023-11-05T14:30:00.000Z'),
		paidAt: null,
	},
	{
		id: 'order002',
		user: {
			id: 'user456',
			name: 'Bob Smith',
			email: 'bob.smith@example.com',
			image: 'example',
			isAdmin: false,
		},
		total: 35.75,
		phone: '555-987-6543',
		address: '789 Oak Dr, Townsville, USA',
		orderItems: [
			{
				id: 'item3',
				book: {
					id: 'book201',
					title: 'Book Z',
					author: 'Author C',
				},
				quantity: 4,
				price: 8.99,
			},
		],
		createdAt: new Date('2023-11-06T10:15:00.000Z'),
		paidAt: new Date('2023-11-08T09:00:00.000Z'),
	},
	{
		id: 'order003',
		user: {
			id: 'user789',
			name: 'Charlie Brown',
			email: 'charlie.brown@example.com',
			image: 'example',
			isAdmin: false,
		},
		total: 55.25,
		phone: '555-555-5555',
		address: '123 Main St, City, Country',
		orderItems: [
			{
				id: 'item4',
				book: {
					id: 'book301',
					title: 'Book D',
					author: 'Author E',
				},
				quantity: 3,
				price: 12.99,
			},
			{
				id: 'item5',
				book: {
					id: 'book302',
					title: 'Book F',
					author: 'Author G',
				},
				quantity: 2,
				price: 14.99,
			},
		],
		createdAt: new Date('2023-11-07T12:30:00.000Z'),
		paidAt: new Date('2023-11-08T09:00:00.000Z'),
	},
	{
		id: 'order004',
		user: {
			id: 'user246',
			name: 'David Wilson',
			email: 'david.wilson@example.com',
			image: 'example',
			isAdmin: false,
		},
		total: 42.0,
		phone: '555-111-2222',
		address: '567 Pine Ave, Villagetown, USA',
		orderItems: [
			{
				id: 'item6',
				book: {
					id: 'book401',
					title: 'Book G',
					author: 'Author H',
				},
				quantity: 5,
				price: 8.4,
			},
		],
		createdAt: new Date('2023-11-08T09:00:00.000Z'),
		paidAt: new Date('2023-11-08T09:00:00.000Z'),
	},
];

export const columns: ColumnDef<Order>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: 'Order ID',
		cell: ({ row }) => <div>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'user',
		header: 'User',
		cell: ({ row }) => {
			const user: User = row.getValue('user');
			return <div>{user?.name}</div>;
		},
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		cell: ({ row }) => <div>{row.getValue('phone')}</div>,
	},
	{
		accessorKey: 'address',
		header: 'Address',
		cell: ({ row }) => <div>{row.getValue('address')}</div>,
	},
	{
		accessorKey: 'orderItems',
		header: '# Items',
		cell: ({ row }) => {
			const orderItems: OrderItems[] | [] = row.getValue('orderItems');
			return <div>{orderItems?.length}</div>;
		},
	},
	{
		accessorKey: 'total',
		header: 'Total',
		cell: ({ row }) => {
			const total: number = row.getValue('total');
			return <div>${total.toFixed(2)}</div>;
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => (
			<div>{format(row.getValue('createdAt'), 'MMMM dd, yyyy HH:mm:ss')}</div>
		),
	},
	{
		accessorKey: 'paidAt',
		header: 'Paid At',
		cell: ({ row }) => (
			<div>
				{row.getValue('paidAt')
					? format(row.getValue('paidAt'), 'MMMM dd, yyyy HH:mm:ss')
					: '-'}
			</div>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-[20px] p-0'>
							<span className='sr-only'>Open menu</span>
							<DotsHorizontalIcon className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View Order</DropdownMenuItem>
						<DropdownMenuItem>Delete Order</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const OrdersTable = () => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className='w-full'>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter order ID'
					value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('id')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter(column => column.getCanHide())
							.map(column => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={value => column.toggleVisibility(!!value)}>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center last:!justify-center last-child:!justify-center items-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OrdersTable;
