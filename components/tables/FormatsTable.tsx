'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import {
	DotsVerticalIcon,
	Pencil2Icon,
	TrashIcon,
} from '@radix-ui/react-icons';
import {
	DropdownMenu,
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
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import UpdateFormat from '../forms/UpdateFormat';

interface Props {
	formats: {
		id: string;
		name: string;
		price: string;
		discount: number;
		quantityInStock: number;
	}[];
}

const FormatsTable = ({ formats }: Props) => {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Name</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Discount</TableHead>
					<TableHead className='text-right'>Count In Stock</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{formats.map(format => (
					<TableRow key={format.id}>
						<TableCell className='font-medium'>{format.name}</TableCell>
						<TableCell>${format.price}</TableCell>
						<TableCell>{format.discount * 100}%</TableCell>
						<TableCell>{format.quantityInStock}</TableCell>
						<TableCell className='text-right'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='ghost' className='h-8 w-[20px] p-0'>
										<span className='sr-only'>Open menu</span>
										<DotsVerticalIcon className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
										<Button variant='ghost' className='flex items-center gap-1'>
											<Pencil2Icon />
											Update Format
										</Button>
									</DropdownMenuItem>

									<DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
										<Button variant='ghost' className='flex items-center gap-1'>
											<TrashIcon />
											Delete Format
										</Button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Dialog
								open={isEditDialogOpen}
								onOpenChange={setIsEditDialogOpen}>
								<DialogContent className='bg-dashboard'>
									<DialogHeader>
										<DialogTitle className='heading text-gradient text-2xl'>
											Update Format
										</DialogTitle>
									</DialogHeader>
									<div>
										<UpdateFormat formatId={format.id} />
									</div>
								</DialogContent>
							</Dialog>
							<Dialog
								open={isDeleteDialogOpen}
								onOpenChange={setIsDeleteDialogOpen}>
								<DialogContent className='bg-dashboard'>
									<DialogHeader>
										<DialogTitle className='heading text-gradient text-2xl'>
											Are you sure absolutely sure?
										</DialogTitle>
										<DialogDescription>
											This action cannot be undone. This will permanently delete
											this format.
										</DialogDescription>
									</DialogHeader>
									<Button className='sm:w-max w-full' variant='destructive'>
										Delete
									</Button>
								</DialogContent>
							</Dialog>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default FormatsTable;
