'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import 'react-quill/dist/quill.snow.css';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import MiniSpinner from '../MiniSpinner';

const formSchema = z.object({
	name: z.string().min(5, {
		message: 'Name must have at least 5 characters',
	}),
	price: z.string(),
	discount: z.string(),
	quantityInStock: z.string(),
});

interface Format {
	id: string;
	name: string;
	price: string;
	discount: string;
	countInStock: string;
}

const format = {
	id: 'sewrwerd',
	name: 'Paperback',
	price: '30.00',
	discount: 0.2,
	quantityInStock: 6,
};

const UpdateFormat = ({ formatId }: { formatId: string }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: format.name,
			price: format.price,
			discount: format.discount.toString(),
			quantityInStock: format.quantityInStock.toString(),
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log({
			...values,
			price: values.price,
			discount: +values.discount,
			quantityInStock: +values.quantityInStock,
		});
		// ensure the values are numbers
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									defaultValue={format.name}
									{...field}
									disabled={form.formState.isSubmitting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									type='number'
									step='.01'
									defaultValue={format.price}
									{...field}
									disabled={form.formState.isSubmitting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='discount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Discount</FormLabel>
							<FormControl>
								<Input
									type='number'
									min='0'
									max='1'
									step='0.1'
									defaultValue={format.discount}
									{...field}
									disabled={form.formState.isSubmitting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='quantityInStock'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantity In Stock</FormLabel>
							<FormControl>
								<Input
									type='number'
									defaultValue={format.quantityInStock}
									{...field}
									disabled={form.formState.isSubmitting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex space-x-2'>
					<Button type='submit' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? <MiniSpinner /> : 'Update Format'}
					</Button>
					<Button
						type='reset'
						variant='outline'
						onClick={() => form.reset()}
						disabled={form.formState.isSubmitting}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default UpdateFormat;
