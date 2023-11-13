'use client';
import UsersTable from '@/components/tables/UsersTable';

const page = () => {
	return (
		<section>
			<div className='flex justify-between items-center gap-2 mb-6'>
				<h1 className='heading text-gradient text-3xl !leading-[1.2]'>Users</h1>
			</div>

			<div>
				<UsersTable />
			</div>
		</section>
	);
};
export default page;
