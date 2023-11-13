'use client';

import * as React from 'react';
import {
	ChevronDownIcon,
	DotsVerticalIcon,
	EyeOpenIcon,
	Pencil2Icon,
	TrashIcon,
} from '@radix-ui/react-icons';
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
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const data: User[] = [
	{
		id: 'INV0013232uhwdAD',
		name: 'Zurisaday Espadas Martínez',
		email: 'zurisaday_01@hotmail.com',
		image:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		isAdmin: true,
	},
	{
		id: 'INV0013232uhwdAD',
		name: 'Zurisaday Espadas Martínez',
		email: 'zurisaday_01@hotmail.com',
		image:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		isAdmin: false,
	},
	{
		id: 'INV0013232uhwdAD',
		name: 'Zurisaday Espadas Martínez',
		email: 'zurisaday_01@hotmail.com',
		image:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		isAdmin: true,
	},
	{
		id: 'INV0013232uhwdAD',
		name: 'Zurisaday Espadas Martínez',
		email: 'zurisaday_01@hotmail.com',
		image:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		isAdmin: true,
	},
];

export type User = {
	id: string;
	name: string;
	email: string;
	image: string;
	isAdmin: boolean;
};

export const columns: ColumnDef<User>[] = [
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
		accessorKey: 'image',
		header: 'Photo',
		cell: ({ row }) => (
			<div className='w-[50px] h-[50px] relative rounded-full overflow-hidden'>
				<Image
					src={row.getValue('image')}
					alt='user'
					fill
					className='object-cover w-full h-full'
				/>
			</div>
		),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => <div>{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => <div>{row.getValue('email')}</div>,
	},

	{
		accessorKey: 'isAdmin',
		header: 'status',
		cell: ({ row }) => (
			<div>
				{row.getValue('isAdmin') ? (
					<Badge className='uppercase'>Admin</Badge>
				) : (
					<Badge className='uppercase' variant='secondary'>
						Customer
					</Badge>
				)}
			</div>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const user = row.original;

			return (
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-[20px] p-0'>
								<span className='sr-only'>Open menu</span>
								<DotsVerticalIcon className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem>
								<Link
									href={`users/view/${user.id}`}
									className='flex items-center gap-1'>
									<EyeOpenIcon />
									View User
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href={`users/update/${user.id}`}
									className='flex items-center gap-1'>
									<Pencil2Icon />
									Update User
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<DialogTrigger className='flex items-center gap-1'>
									<TrashIcon />
									Delete User
								</DialogTrigger>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent className='bg-dashboard'>
						<DialogHeader>
							<DialogTitle className='heading text-gradient'>
								Are you sure absolutely sure?
							</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete this
								account.
							</DialogDescription>
						</DialogHeader>
						<Button className='sm:w-max w-full' variant='destructive'>
							Delete
						</Button>
					</DialogContent>
				</Dialog>
			);
		},
	},
];

const UsersTable = () => {
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
					placeholder='Filter name...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('name')?.setFilterValue(event.target.value)
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

export default UsersTable;