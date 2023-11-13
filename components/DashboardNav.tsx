import Link from 'next/link';
import Switcher from './Switcher';
import ComboboxGenre from './ComboboxGenre';
import { UserButton } from '@clerk/nextjs';

const DashboardNav = () => {
	return (
		<header>
			<div className='relative z-20 bg-dashboard ml-10 sm:ml-64'>
				<div className='md:container mx-auto px-6 py-4'>
					<div className='flex items-center justify-end'>
						<UserButton />
					</div>
				</div>
			</div>
		</header>
	);
};
export default DashboardNav;
