import { ReactNode } from 'react';

interface Props {
	discount?: number;
	price: number;
	location: 'other' | 'single-page';
}

const Price = ({ discount, price, location }: Props) => {
	if (discount) {
		return (
			<span
				className={`text-red-500 line-through ${
					location === 'single-page' && 'text-xl'
				}`}>
				${(price - price * discount).toFixed(2)}
			</span>
		);
	}

	return (
		<span className={`${location === 'single-page' && 'text-xl'}`}>
			${price.toFixed(2)}
		</span>
	);
};
export default Price;
