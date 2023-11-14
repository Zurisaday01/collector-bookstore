'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

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
	name: z.string().min(3, {
		message: 'Name must have at least 3 characters',
	}),
});

const CreateGenre = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const genre = await fetch('/api/genres', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			console.log(genre);
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} disabled={form.formState.isSubmitting} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex space-x-2'>
					<Button type='submit' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? <MiniSpinner /> : 'Create Genre'}
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
export default CreateGenre;
