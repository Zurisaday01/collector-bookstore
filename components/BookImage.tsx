import Image from 'next/image';

interface Props {
	imgUrl: string;
	size: string;
	newRelease: boolean;
	bestseller: boolean;
	alt: string;
}

const BookImage = ({ imgUrl, size, newRelease, bestseller, alt }: Props) => {
	return (
		<div className='relative'>
			<div className='absolute rounded-sm top-[-5px] left-[-5px] text-white p-1 text-xs bg-gradient-to-r from-secondary  to-primary '>
				{bestseller && <span>Bestseller</span>}
				{newRelease && <span>New Release</span>}
			</div>
			<div className={`relative ${size} z-[-1]`}>
				<Image
					fill
					className='object-cover object-center'
					src={imgUrl}
					alt={alt}
				/>
			</div>
		</div>
	);
};
export default BookImage;
