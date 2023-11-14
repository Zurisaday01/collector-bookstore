'use client';

import GenresTable from '@/components/tables/GenresTable';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

const Page = () => {
	const router = useRouter();
	const path = usePathname();
	return (
		<section>
			<div className='flex justify-between items-center gap-2 mb-6'>
				<h1 className='heading text-gradient text-3xl !leading-[1.2]'>
					Genres
				</h1>

				<Button onClick={() => router.push(`${path}/create`)}>Add Genre</Button>
			</div>

			<div>
				<GenresTable />
			</div>
		</section>
	);
};
export default Page;
