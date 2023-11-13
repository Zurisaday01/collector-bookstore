'use client';
import BookCard from './BookCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TrendingList = () => {
	const DUMMY_DATA = [
		{
			id: 'wqeqwe234234wrwer',
			imgUrl: '/book-1.jpeg',
			title: 'Title name of the book',
			author: 'Jessica Brown',
			price: 27.0,
			discount: 0.3,
		},
		{
			id: 'wqeqwe234234wrwer',
			imgUrl: '/book-1.jpeg',
			title: 'Title name of the book',
			author: 'Jessica Brown',
			price: 27.0,
			discount: 0.3,
		},
		{
			id: 'wqeqwe234234wrwer',
			imgUrl: '/book-1.jpeg',
			title: 'Title name of the book',
			author: 'Jessica Brown',
			price: 27.0,
			discount: 0.3,
		},
		{
			id: 'wqeqwe234234wrwer',
			imgUrl: '/book-1.jpeg',
			title: 'Title name of the book',
			author: 'Jessica Brown',
			price: 27.0,
			discount: 0.3,
		},
		{
			id: 'wqeqwe234234wrwer',
			imgUrl: '/book-1.jpeg',
			title: 'Title name of the book',
			author: 'Jessica Brown',
			price: 27.0,
			discount: 0.3,
		},
	];

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 4,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1160,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 470,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<section className='mt-20 mb-20'>
			<h2 className='text-gradient heading text-center text-3xl'>
				Trending Books
			</h2>
			<div className='mt-6 flex w-full'>
				<Slider className='w-full' {...settings}>
					{DUMMY_DATA.map(book => (
						<BookCard
							key={book.id}
							id={book.id}
							imgUrl={book.imgUrl}
							title={book.title}
							author={book.author}
							price={book.price}
							discount={book.discount ?? null}
						/>
					))}
				</Slider>
			</div>
		</section>
	);
};
export default TrendingList;
