import { SpinnerCircular } from 'spinners-react';

const MiniSpinner = () => {
	return (
		<div role='status' className='w-full flex justify-center items-center'>
			<SpinnerCircular secondaryColor='#babecd' size={20} color='#000' />
		</div>
	);
};
export default MiniSpinner;
