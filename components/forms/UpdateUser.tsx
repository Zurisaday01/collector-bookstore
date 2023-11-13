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

import { Checkbox } from '@/components/ui/checkbox';
import { ChangeEvent, useState } from 'react';
import { isBase64Image, useUploadThing } from '@/lib/utils';
import MiniSpinner from '../MiniSpinner';

const formSchema = z.object({
	name: z.string().min(5, {
		message: 'Name must have at least 5 characters',
	}),
	email: z.string(),
	image: z.string(),
	isAdmin: z.boolean(),
});

const UpdateUser = ({
	user,
}: {
	user: {
		id: string;
		name: string;
		email: string;
		image: string;
		isAdmin: boolean;
	};
}) => {
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing('media');
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const blob = values.image;

		const hasImageChange = isBase64Image(blob);

		if (hasImageChange) {
			const imgResponse = await startUpload(files);

			if (imgResponse && imgResponse[0].url) {
				// Update the value
				values.image = imgResponse[0].url;
			}
		}

		console.log(values);
	};

	// handle image from uploadthing
	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setFiles(Array.from(e.target.files));

			if (!file.type.includes('image')) return;

			fileReader.onload = async event => {
				const imageDataUrl = event.target?.result?.toString() || '';
				fieldChange(imageDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input defaultValue={user.email} disabled {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									defaultValue={user.name}
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
					name='image'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1 text-start w-full sm:w-[300px]'>
							<FormLabel className='form__label block mb-2  text-dark-1 dark:text-light-1'>
								New Photo
							</FormLabel>
							<FormControl className='flex-1'>
								<Input
									type='file'
									className='relative m-0 block w-full min-w-0 flex-auto rounded border border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary border-none'
									accept='image/*'
									placeholder='Choose cover image'
									disabled={form.formState.isSubmitting}
									onChange={e => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='isAdmin'
					render={({ field }) => (
						<FormItem className='flex items-center space-x-2'>
							<FormLabel>isAdmin?</FormLabel>
							<FormControl className='flex !mt-0'>
								<Checkbox
									disabled={form.formState.isSubmitting}
									defaultChecked={user.isAdmin}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex space-x-2'>
					<Button type='submit' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? <MiniSpinner /> : 'Update User'}
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
export default UpdateUser;
