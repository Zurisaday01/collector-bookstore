'use client';
import FormatsTable from '@/components/tables/FormatsTable';

const formats = [
	{
		id: 'sewrwer',
		name: 'Hardcover',
		price: '20.00',
		discount: 0.3,
		quantityInStock: 10,
	},
	{
		id: 'sewrwerd',
		name: 'Paperback',
		price: '30.00',
		discount: 0.2,
		quantityInStock: 6,
	},
];

const Page = ({ params }: { params: { id: string } }) => {
	const bookTitle = 'A light in the flesh';

	return (
		<section>
			<div className='flex justify-between items-center gap-2 mb-6'>
				<h1 className='heading text-gradient text-3xl !leading-[1.2]'>
					Formats: {bookTitle}
				</h1>
			</div>
			<FormatsTable formats={formats} />
		</section>
	);
};
export default Page;
