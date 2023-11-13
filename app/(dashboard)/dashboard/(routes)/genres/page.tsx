import GenresTable from '@/components/tables/GenresTable';
import { Button } from '@/components/ui/button';

const page = () => {
	return (
		<section>
			<div className='flex justify-between items-center gap-2 mb-6'>
				<h1 className='heading text-gradient text-3xl !leading-[1.2]'>
					Genres
				</h1>

				<Button>Add book</Button>
			</div>

			<div>
				<GenresTable />
			</div>
		</section>
	);
};
export default page;
