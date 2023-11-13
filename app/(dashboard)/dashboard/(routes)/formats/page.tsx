import FormatsTable from '@/components/tables/BooksTable';

const page = () => {
	return (
		<section>
			<h1 className='heading text-gradient text-3xl !leading-[1.2]'>Formats</h1>

			<div>
				<FormatsTable />
			</div>
		</section>
	);
};
export default page;
