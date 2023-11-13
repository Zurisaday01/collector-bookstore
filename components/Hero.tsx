import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const Hero = () => {
	return (
		<div className='md:pr-[100px] lg:pr-7 md:py-4 h-[80vh] lg:h-[70vh] flex items-center gap-5 justify-between flex-col lg:flex-row'>
			<div className='w-full lg:w-[40%] flex flex-col gap-3 items-start mt-20 lg:mt-0 relative'>
				<Image
					width={60}
					height={60}
					src='/stars.svg'
					className='absolute top-[-60px] left-[-25px] lg:top-[-40px] md:left-[-40px] z-[-1]'
					alt='stars'
				/>
				<h1 className='text-gradient heading  text-4xl sm:text-5xl'>
					Crafting Your Epic Tale, One Book at a Time
				</h1>
				<p>
					We have an incredible selection of books that promise to take you on
					extraordinary journeys, one page at a time. Discover your next epic
					tale here.
				</p>
				<Link href='/books'>
					<Button>Discover books</Button>
				</Link>
				<Image
					width={70}
					height={70}
					src='/paper-plane.svg'
					className='absolute bottom-[-50px] right-0  md:bottom-[-30px] md:right-[-60px] z-[-1]'
					alt='plane'
				/>
			</div>
			<div className='w-[50%] h-full mt-12 lg:mt-0 flex justify-center items-center'>
				<div className='relative h-full flex items-center w-[300px]'>
					<Image
						fill
						src='/book-1.jpeg'
						className='object-contain'
						alt='hero book 1'
					/>
					<Image
						className='absolute z-[-1] left-[-40%]'
						width={180}
						height={30}
						src='/book-2.jpg'
						alt='hero book 2'
					/>
					<Image
						className='absolute z-[-1] right-[-40%] '
						width={180}
						height={30}
						src='/book-3.jpg'
						alt='hero book 3'
					/>
				</div>
			</div>
		</div>
	);
};
export default Hero;
