'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const book = {
	id: 'swe23ewqeqwe',
	title: 'A Light in the Flame',
	authors: [{ id: 'rewrwe3e32', name: 'Jennifer L. Armentrout' }],
	bestseller: false,
	newRelease: false,
	isFeatured: true,
	formats: [
		{
			id: 'sewrwer',
			name: 'Hardcover',
			price: 20,
			discount: 0.3,
			quantityInStock: 10,
		},
		{
			id: 'sewrwerd',
			name: 'Paperback',
			price: 30,
			discount: 0.2,
			quantityInStock: 6,
		},
	],
	genres: [
		{ id: 'dsdasd', name: 'Fantasy' },
		{ id: 'dsdasd', name: 'Romance' },
		{ id: 'dsdasd', name: 'Fiction' },
	],
	image:
		'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1685797258i/172133046.jpg',
};

const page = ({ params }: { params: { id: string } }) => {
	return (
		<section>
			<div className='flex justify-between items-center gap-2 mb-6'>
				<h1 className='heading text-gradient text-3xl !leading-[1.2]'>
					{book.title}
				</h1>
			</div>

			<div className='flex items-center gap-3'>
				<div className='shadow-sm'>
					<Image
						src={book.image}
						width={150}
						height={150}
						alt={book.title}
						className='w-full h-full object-cover'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>Name:</h2>
						<p>{book.title}</p>
					</div>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>Authors:</h2>
						<p>
							{book.authors.map(author => author.name).length > 1
								? book.authors
										.map(author => author.name)
										.slice(0, -1)
										.join(', ') +
								  ' and ' +
								  book.authors.map(author => author.name).slice(-1)
								: book.authors.map(author => author.name)[0] || 'No authors'}
						</p>
					</div>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>Genres:</h2>
						<p>
							{book.genres.map(book => book.name).length > 1
								? book.genres
										.map(book => book.name)
										.slice(0, -1)
										.join(', ') +
								  ' and ' +
								  book.genres.map(book => book.name).slice(-1)
								: book.genres.map(book => book.name)[0] || 'No books'}
						</p>
					</div>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>Bestseller:</h2>
						<p>
							{book.bestseller ? (
								<Badge>TRUE</Badge>
							) : (
								<Badge variant='secondary'>FALSE</Badge>
							)}
						</p>
					</div>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>New Release:</h2>
						<p>
							{book.newRelease ? (
								<Badge>TRUE</Badge>
							) : (
								<Badge variant='secondary'>FALSE</Badge>
							)}
						</p>
					</div>
					<div className='flex gap-2'>
						<h2 className='heading font-bold'>isFeatured:</h2>
						<p>
							{book.isFeatured ? (
								<Badge>TRUE</Badge>
							) : (
								<Badge variant='secondary'>FALSE</Badge>
							)}
						</p>
					</div>
				</div>
			</div>

			<div className='mt-6'>
				<h2 className='heading font-bold'>Formats:</h2>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Name</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Discount</TableHead>
							<TableHead className='text-right'>Count In Stock</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{book.formats.map(format => (
							<TableRow key={format.id}>
								<TableCell className='font-medium'>{format.name}</TableCell>
								<TableCell>${format.price.toFixed(2)}</TableCell>
								<TableCell>{format.discount * 100}%</TableCell>
								<TableCell className='text-right last:justify-start'>
									{format.quantityInStock}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
};
export default page;
