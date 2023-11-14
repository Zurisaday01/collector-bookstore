import Image from 'next/image';

import * as React from 'react';
import {
	ChevronDownIcon,
	DotsVerticalIcon,
	EyeOpenIcon,
	Pencil2Icon,
	TrashIcon,
	AccessibilityIcon,
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

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Genre, Book, Author, Format } from '@/lib/types';

const data: Book[] = [
	{
		id: 'swe23ewqeqwe',
		title: 'A Light in the Flame',
		authors: [
			{
				id: 'rewrwe3e32',
				name: 'Jennifer L. Armentrout',
				image: 'example',
				books: [],
			},
		],
		bestseller: false,
		newRelease: false,
		isFeatured: true,
		formats: [
			{ name: 'Hardcover', price: 20, discount: 0.3, quantityInStock: 10 },
		],
		genres: [
			{ id: 'dsdasd', name: 'Fantasy', books: [] },
			{ id: 'dsdasd', name: 'Romance', books: [] },
			{ id: 'dsdasd', name: 'Fiction', books: [] },
		],
		image:
			'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1685797258i/172133046.jpg',
	},
	{
		id: 'swe23ewqeqwe',
		title: 'A Light in the Flame',
		authors: [
			{
				id: 'rewrwe3e32',
				name: 'Jennifer L. Armentrout',
				image: 'example',
				books: [],
			},
		],
		bestseller: true,
		newRelease: false,
		isFeatured: true,
		formats: [
			{ name: 'Hardcover', price: 20, discount: 0.3, quantityInStock: 10 },
			{ name: 'Paperback', price: 30, discount: 0.4, quantityInStock: 8 },
		],
		genres: [
			{ id: 'dsdasd', name: 'Romance', books: [] },
			{ id: 'dsdasd', name: 'Fiction', books: [] },
		],
		image:
			'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1685797258i/172133046.jpg',
	},

	{
		id: 'swe23ewqeqwe',
		title: 'A Light in the Flame',
		authors: [
			{
				id: 'rewrwe3e32',
				name: 'Jennifer L. Armentrout',
				image: 'example',
				books: [],
			},
		],
		bestseller: true,
		newRelease: false,
		isFeatured: true,
		formats: [
			{ name: 'Hardcover', price: 20, discount: 0.3, quantityInStock: 10 },
		],
		genres: [
			{ id: 'dsdasd', name: 'Fantasy', books: [] },
			{ id: 'dsdasd', name: 'Romance', books: [] },
			{ id: 'dsdasd', name: 'Fiction', books: [] },
		],
		image:
			'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1685797258i/172133046.jpg',
	},
];

export const columns: ColumnDef<Book>[] = [
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
		header: 'Image',
		cell: ({ row }) => (
			<div>
				<Image width={60} height={30} src={row.getValue('image')} alt='book' />
			</div>
		),
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('title')}</div>
		),
	},
	{
		accessorKey: 'authors',
		header: 'Authors',
		cell: ({ row }) => {
			const authors: Author[] | [] = row.getValue('authors');
			return (
				<div>
					{authors?.map((author: Author) => author.name).length > 1
						? authors
								?.map((author: Author) => author.name)
								.slice(0, -1)
								.join(', ') +
						  ' and ' +
						  authors?.map((author: Author) => author.name).slice(-1)
						: (row.getValue('authors') as Author[])[0]?.name || 'No authors'}
				</div>
			);
		},
	},
	{
		accessorKey: 'bestseller',
		header: 'Bestseller',
		cell: ({ row }) => (
			<div>
				{row.getValue('bestseller') ? (
					<Badge>TRUE</Badge>
				) : (
					<Badge variant='secondary'>FALSE</Badge>
				)}
			</div>
		),
	},
	{
		accessorKey: 'newRelease',
		header: 'New Release',
		cell: ({ row }) => (
			<div>
				{row.getValue('newRelease') ? (
					<Badge>TRUE</Badge>
				) : (
					<Badge variant='secondary'>FALSE</Badge>
				)}
			</div>
		),
	},
	{
		accessorKey: 'isFeatured',
		header: 'Featured?',
		cell: ({ row }) => (
			<div>
				{row.getValue('isFeatured') ? (
					<Badge>TRUE</Badge>
				) : (
					<Badge variant='secondary'>FALSE</Badge>
				)}
			</div>
		),
	},
	{
		accessorKey: 'formats',
		header: 'Formats',
		cell: ({ row }) => {
			const formats: Format[] | [] = row.getValue('formats');
			return (
				<div>
					{' '}
					{formats?.map((format: Format) => format.name).length > 1
						? formats
								?.map((format: Format) => format.name)
								.slice(0, -1)
								.join(', ') +
						  ' and ' +
						  formats?.map((format: Format) => format.name).slice(-1)
						: formats?.map((format: Format) => format.name)[0] || 'No formats'}
				</div>
			);
		},
	},
	{
		accessorKey: 'price',
		header: 'Price(s)',
		cell: ({ row }) => {
			const formats: Format[] | [] = row.getValue('formats');
			return <div>{formats?.map(format => '$' + format.price).join(', ')}</div>;
		},
	},
	{
		accessorKey: 'discount',
		header: 'Discount',
		cell: ({ row }) => {
			const formats: Format[] | [] = row.getValue('formats');
			return (
				<div>
					{formats
						?.map((format: Format) => 100 * +format.discount + '%')
						.join(', ')}
				</div>
			);
		},
	},
	{
		accessorKey: 'genres',
		header: 'Genres',
		cell: ({ row }) => {
			const genres: Genre[] | [] = row.getValue('genres');
			return (
				<div>
					{genres?.map((genre: Genre) => genre.name).length > 1
						? genres
								?.map((genre: Genre) => genre.name)
								.slice(0, -1)
								.join(', ') +
						  ' and ' +
						  genres?.map((genre: Genre) => genre.name).slice(-1)
						: genres?.map((genre: Genre) => genre.name)[0] || 'No genres'}
				</div>
			);
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const book = row.original;
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
									href={`books/view/${book.id}`}
									className='flex items-center gap-1'>
									<EyeOpenIcon />
									View Book
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href={`books/update/${book.id}`}
									className='flex items-center gap-1'>
									<Pencil2Icon />
									Update Book
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href={`books/formats/${book.id}`}
									className='flex items-center gap-1'>
									<AccessibilityIcon />
									Admin Formats
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<DialogTrigger className='flex items-center gap-1'>
									<TrashIcon />
									Delete Book
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
								book.
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

const BooksTable = () => {
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
					placeholder='Filter title...'
					value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('title')?.setFilterValue(event.target.value)
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

export default BooksTable;
