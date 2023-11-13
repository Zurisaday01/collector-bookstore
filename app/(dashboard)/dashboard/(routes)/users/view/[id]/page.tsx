'use client';
import OrdersTable from '@/components/tables/OrdersTable';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const user = {
	id: 'INV0013232uhwdAD',
	name: 'Zurisaday Espadas Martínez',
	email: 'zurisaday_01@hotmail.com',
	image:
		'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	isAdmin: true,
};

const page = ({ params }: { params: { id: string } }) => {
	return (
		<section>
			<div className='flex justify-between items-center gap-2 mb-6'>
				<h1 className='heading text-gradient text-3xl !leading-[1.2]'>
					User #{params.id}
				</h1>
			</div>

			<div className='flex items-center gap-3'>
				<div className='relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] overflow-hidden rounded-full'>
					<Image
						src={user.image}
						fill
						alt={user.name}
						className='w-full h-full object-cover'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>Name:</h2>
						<p>{user.name}</p>
					</div>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>Email:</h2>
						<p>{user.email}</p>
					</div>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>Status:</h2>
						<p>
							{user.isAdmin ? (
								<Badge className='uppercase'>Admin</Badge>
							) : (
								<Badge className='uppercase' variant='secondary'>
									Customer
								</Badge>
							)}
						</p>
					</div>
				</div>
			</div>

			<div className='mt-6'>
				{/* TODO: pass filted data to only view the orders of the current user */}
				<OrdersTable />
			</div>
		</section>
	);
};
export default page;
