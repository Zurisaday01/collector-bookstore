import Price from './Price';

interface Props {
	checked: boolean;
	format: string;
	price: number;
	discount: number;
}

const FormatOption = ({ checked, format, price, discount }: Props) => {
	return (
		<div
			className={`${
				checked && 'bg-accent !border-primary'
			}  transition-all duration-150 p-4 border-2 border-transparent bg-popover hover:bg-accent cursor-pointer rounded-sm w-[200px]`}>
			<h3>{format}</h3>
			<div className='flex justify-between items-center mt-3'>
				<Price price={price} discount={discount} location='single-page' />
				<Price price={price} location='single-page' />
			</div>
		</div>
	);
};
export default FormatOption;
