'use client';
import UpdateBook from '@/components/forms/UpdateBook';
import UpdateUser from '@/components/forms/UpdateUser';

const book = {
	id: 'swe23ewqeqwe',
	title: 'A Light in the Flame',
	authors: [
		{ id: 'rewrwe3e32', name: 'Jennifer L. Armentrout' },
		{ id: 'rewrwe3e34', name: 'Jennifer L. Armentrout' },
	],
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
	description:
		'<p><strong>The only one who can save Sera now is the one she spent her life planning to kill. </strong></p><p>The truth about Sera’s plan is out, shattering the fragile trust forged between her and Nyktos. Surrounded by those distrustful of her, all Sera has is her duty. She will do anything to end Kolis, the false King of Gods, and his tyrannical rule of Iliseeum, thus stopping the threat he poses to the mortal realm.</p><p>Nyktos has a plan, though, and as they work together, the last thing they need is the undeniable, scorching passion that continues to ignite between them. Sera cannot afford to fall for the tortured Primal, not when a life no longer bound to a destiny she never wanted is more attainable than ever. But memories of their shared pleasure and unrivaled desire are a siren’s call impossible to resist.</p><p>And as Sera begins to realize that she wants to be more than a Consort in name only, the danger surrounding them intensifies. The attacks on the Shadowlands are increasing, and when Kolis summons them to Court, a whole new risk becomes apparent. The Primal power of Life is growing inside her, pushing her closer to the end of her Culling. And without Nyktos’s love—an emotion he’s incapable of feeling—she won’t survive her Ascension. That is if she even makes it to her Ascension and Kolis doesn’t get to her first. Because time is running out. For both her and the realms.</p>',
	genres: [
		{ id: 'dsdas4', name: 'Fantasy' },
		{ id: 'dsdas3', name: 'Romance' },
		{ id: 'dsdas1', name: 'Fiction' },
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

			<div>
				<UpdateBook book={book} />
			</div>
		</section>
	);
};
export default page;
