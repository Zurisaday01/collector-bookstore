'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// Multi select
import Select from 'react-select';

import { Checkbox } from '@/components/ui/checkbox';
import { ChangeEvent, useState } from 'react';
import { isBase64Image, useUploadThing } from '@/lib/utils';
import MiniSpinner from '../MiniSpinner';
import { MultiSelect } from '../ui/MultiSelect';

const formSchema = z.object({
	title: z.string().min(5, {
		message: 'Title must have at least 5 characters',
	}),
	authors: z.string().min(3, {
		message: 'Select at least one author',
	}),
	genres: z.string().min(3, {
		message: 'Select at least one genre',
	}),
	description: z.string().min(10, {
		message: 'Description must be at least 10 characters',
	}),
	bestseller: z.boolean(),
	newRelease: z.boolean(),
	isFeatured: z.boolean(),
	image: z.string(),
});

interface Book {
	id: string;
	title: string;
	authors: { id: string; name: string }[];
	description?: string;
	bestseller: boolean;
	newRelease: boolean;
	isFeatured: boolean;
	formats: object[];
	genres: { id: string; name: string }[];
	image: string;
}

const UpdateBook = ({ book }: { book: Book }) => {
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing('media');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: book.title,
			authors: book.authors.map(author => author.name).join(', '),
			genres: book.genres.map(genre => genre.name).join(', '),
			description: book.description,
			bestseller: book.bestseller,
			newRelease: book.newRelease,
			isFeatured: book.isFeatured,
			image: book.image,
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

		const authorsFormat = values.authors.split(', ');

		const authors = authorsFormat.map(author => {
			let id = author.slice(author.indexOf('#') + 1, author.indexOf(':'));
			let name = author.slice(author.indexOf(':') + 1);
			return { id, name };
		});

		console.log({ ...values, authors });
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
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									defaultValue={book.title}
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
					name='authors'
					render={({ field }) => (
						// NOTE; the options are the options that come from the DB
						<FormItem className='w-full'>
							<FormLabel>Author(s)</FormLabel>
							<FormControl>
								<MultiSelect
									placeholder='Select author(s)...'
									options={book.authors.map(author => ({
										value: author.id,
										label: author.name,
									}))}
									defaultSelected={book.authors.map(author => ({
										value: author.id,
										label: author.name,
									}))}
									onChange={field.onChange}
									disabled={form.formState.isSubmitting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='genres'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Genres</FormLabel>
							<FormControl>
								<MultiSelect
									placeholder='Select genres...'
									options={book.genres.map(genre => ({
										value: genre.id,
										label: genre.name,
									}))}
									defaultSelected={book.genres.map(genre => ({
										value: genre.id,
										label: genre.name,
									}))}
									onChange={field.onChange}
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
								New Image
							</FormLabel>
							<FormControl className='flex-1'>
								<Input
									type='file'
									className='relative m-0 block w-full min-w-0 flex-auto   border-neutral-300 bg-clip-padding text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary group border border-input px-3 py-2  rounded-md '
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
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<ReactQuill
									defaultValue={book.description}
									onChange={field.onChange}
									modules={{
										toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic']],
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bestseller'
					render={({ field }) => (
						<FormItem className='flex items-center space-x-2'>
							<FormLabel>Bestseller</FormLabel>
							<FormControl className='flex !mt-0'>
								<Checkbox
									disabled={form.formState.isSubmitting}
									defaultChecked={book.bestseller}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='newRelease'
					render={({ field }) => (
						<FormItem className='flex items-center space-x-2'>
							<FormLabel>New Release</FormLabel>
							<FormControl className='flex !mt-0'>
								<Checkbox
									disabled={form.formState.isSubmitting}
									defaultChecked={book.newRelease}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='isFeatured'
					render={({ field }) => (
						<FormItem className='flex items-center space-x-2'>
							<FormLabel>isFeatured?</FormLabel>
							<FormControl className='flex !mt-0'>
								<Checkbox
									disabled={form.formState.isSubmitting}
									defaultChecked={book.isFeatured}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex space-x-2'>
					<Button type='submit' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? <MiniSpinner /> : 'Update Book'}
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
export default UpdateBook;
