'use client';
import FormatOption from '../FormatOption';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

import { RadioGroup } from '@headlessui/react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	format: z.string().min(2, {
		message: 'You must select a format option',
	}),
	quantity: z.string(),
	submit: z.string(),
});

const AddToForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			format: '',
			quantity: '1',
			submit: 'cart',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);

		if (values.submit === 'cart') {
			console.log('Send to Cart');
		}

		if (values.submit === 'wishlist') {
			console.log('Send to Wishlist');
		}

		if (form.formState.isSubmitSuccessful) {
			form.reset();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='format'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Format</FormLabel>
							<FormControl>
								<RadioGroup value={field.value} onChange={field.onChange}>
									<div className='flex gap-2 flex-wrap'>
										<RadioGroup.Option value='hardcover'>
											{({ checked }) => (
												<FormatOption
													checked={checked}
													format={'Hardcover'}
													price={27}
													discount={0.3}
												/>
											)}
										</RadioGroup.Option>
										<RadioGroup.Option value='paperback'>
											{({ checked }) => (
												<FormatOption
													checked={checked}
													format={'Paperback'}
													price={17}
													discount={0.2}
												/>
											)}
										</RadioGroup.Option>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='quantity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantity</FormLabel>
							<FormControl>
								<Input
									defaultValue='1'
									min={1}
									className='w-[70px]'
									type='number'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex gap-2'>
					<FormField
						control={form.control}
						name='submit'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup value={field.value} onChange={field.onChange}>
										<div className='flex gap-2'>
											<RadioGroup.Option value='cart'>
												{({ checked }) => (
													<Button type='submit'>Add To Cart</Button>
												)}
											</RadioGroup.Option>
											<RadioGroup.Option value='wishlist'>
												{({ checked }) => (
													<Button variant='outline' type='submit'>
														Add To Whishlist
													</Button>
												)}
											</RadioGroup.Option>
										</div>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	);
};
export default AddToForm;
