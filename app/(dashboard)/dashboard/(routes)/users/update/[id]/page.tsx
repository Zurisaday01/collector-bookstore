'use client';
import UpdateUser from '@/components/forms/UpdateUser';

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

			<div>
				<UpdateUser user={user} />
			</div>
		</section>
	);
};
export default page;
