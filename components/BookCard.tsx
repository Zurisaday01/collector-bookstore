import Image from 'next/image';
import Price from './Price';
import Link from 'next/link';
import BookImage from './BookImage';

interface Props {
	id: string;
	imgUrl: string;
	title: string;
	author: string;
	price: number;
	discount?: number;
}

const BookCard = ({ id, imgUrl, title, author, price, discount }: Props) => {
	return (
		<Link href={`/books/${id}`} className='w-[200px]'>
			<BookImage
				imgUrl={imgUrl}
				size='w-full h-[350px]'
				newRelease={true}
				bestseller={false}
				alt={`${title}-${id}`}
			/>

			<div className='mt-2'>
				<div>
					<h3 className='text-gradient heading text-xl'>{title}</h3>
					<p>by {author}</p>
				</div>
				<div className='flex w-full justify-between items-center mt-3'>
					<Price discount={discount} price={price} location='other' />
					<Price price={price} location='other' />
				</div>
			</div>
		</Link>
	);
};
export default BookCard;
