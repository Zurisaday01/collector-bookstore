'use client';
import { Button } from '@/components/ui/button';

const page = () => {
	return (
		<section className='mt-12 flex flex-col space-y-4 items-start'>
			<h1 className='heading text-gradient text-4xl sm:text-5xl !leading-[1.2]'>
				Shopping Cart
			</h1>

			<div>Your cart is empty</div>

			<Button>Continue Shopping</Button>
		</section>
	);
};
export default page;
