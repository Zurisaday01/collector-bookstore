'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsFillImageFill, BsFillBagCheckFill } from 'react-icons/bs';
import { PiBooksFill } from 'react-icons/pi';
import { HiUsers } from 'react-icons/hi2';
import { SiBookstack } from 'react-icons/si';
import { RiSettings3Fill } from 'react-icons/ri';
import Switcher from './Switcher';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='fixed left-0 top-0 z-[800]'>
			<div
				className={`${
					isOpen && '!block'
				} bg-foreground w-[100vw] transition-all h-[100vh] duration-200 opacity-60 hidden sm:!hidden backdrop-blur-md`}
				onClick={() => setIsOpen(false)}></div>
			<div className='fixed left-0 top-0 z-[9999]'>
				<Button
					variant='outline'
					className='p-2 mt-4 ml-3 border-none bg-none'
					onClick={() => setIsOpen(true)}>
					<svg
						className='w-6 h-6'
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'></path>
					</svg>
				</Button>

				<aside
					className={`${
						isOpen && 'translate-x-0'
					} fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0`}>
					<div className='h-full px-3 py-4 overflow-y-auto bg-dashboard-accent flex flex-col'>
						<div>
							<Link href='/'>
								<span className='logo px-2'>collector</span>
							</Link>
						</div>
						<ul className='space-y-2 font-medium mt-4'>
							<li>
								<Link
									href='/dashboard'
									className='flex items-center p-2 rounded-sm  hover:bg-dashboard transition-colors duration-150'>
									<BiSolidDashboard />
									<span className='ml-3'>Dashboard</span>
								</Link>
							</li>

							<li>
								<Link
									href='/dashboard/users'
									className='flex items-center p-2 rounded-sm  hover:bg-dashboard transition-colors duration-150'>
									<HiUsers />
									<span className='ml-3'>Users</span>
								</Link>
							</li>
							<li>
								<Link
									href='/dashboard/genres'
									className='flex items-center p-2 rounded-sm  hover:bg-dashboard transition-colors duration-150'>
									<PiBooksFill />
									<span className='ml-3'>Genres</span>
								</Link>
							</li>
							<li>
								<Link
									href='/dashboard/genres'
									className='flex items-center p-2 rounded-sm  hover:bg-dashboard transition-colors duration-150'>
									<PiBooksFill />
									<span className='ml-3'>Authors</span>
								</Link>
							</li>

							<li>
								<Link
									href='/dashboard/books'
									className='flex items-center p-2 rounded-sm  hover:bg-dashboard transition-colors duration-150'>
									<SiBookstack />
									<span className='ml-3'>Books</span>
								</Link>
							</li>
							<li>
								<Link
									href='/dashboard/orders'
									className='flex items-center p-2 rounded-sm  hover:bg-dashboard transition-colors duration-150'>
									<BsFillBagCheckFill />
									<span className='ml-3'>Orders</span>
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='flex items-center p-2 rounded-sm  hover:bg-dashboard transition-colors duration-150'>
									<RiSettings3Fill />
									<span className='ml-3'>Settings</span>
								</Link>
							</li>
						</ul>

						<div className='flex-1 flex items-end'>
							<Switcher />
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
};
export default Sidebar;
