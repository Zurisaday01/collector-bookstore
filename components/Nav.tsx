'use client';
import Link from 'next/link';
import { BookmarkIcon, ShoppingBagIcon } from 'lucide-react';
import Switcher from './Switcher';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { UserButton } from '@clerk/nextjs';

const Nav = () => {
	return (
		<header>
			<div className='relative z-20 border-b border-slate-400'>
				<div className='px-6 md:container md:mx-auto md:px-6 md:py-4'>
					<div className='flex items-center justify-between'>
						<div className='z-20'>
							<Link href='/'>
								<span className='logo px-2'>collector</span>
							</Link>
						</div>
						<div className='flex items-center gap-3'>
							<div className='flex gap-2 md:hidden'>
								<Switcher />
								<div className='relative'>
									<BookmarkIcon />
									<div className='absolute top-[-10px] right-[-5px] text-[10px] w-[20px] text-center  h-[20px] p-1 bg-gradient-to-r from-secondary to-primary text-white rounded-full'>
										5
									</div>
								</div>
								<div className='relative'>
									<ShoppingBagIcon />
									<div className='absolute top-[-10px] right-[-5px] text-[10px] w-[20px] text-center  h-[20px] p-1 bg-gradient-to-r from-secondary to-primary text-white rounded-full'>
										25
									</div>
								</div>
							</div>
							<div className='flex items-center justify-end border-l md:border-l-0'>
								<input
									type='checkbox'
									name='hamburger'
									id='hamburger'
									className='peer'
									hidden
								/>
								<label
									htmlFor='hamburger'
									className='peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer md:hidden'>
									<div
										aria-hidden='true'
										className='m-auto h-0.5 w-6 rounded bg-[#000] dark:bg-white transition duration-300'></div>
									<div
										aria-hidden='true'
										className='m-auto mt-2 h-0.5 w-6 rounded bg-[#000] dark:bg-white transition duration-300'></div>
								</label>

								<div className='bg-background md:bg-transparent peer-checked:translate-x-0 fixed inset-0 w-[calc(70%-4.5rem)] translate-x-[-100%] border-r shadow-xl transition duration-300 md:border-r-0 md:w-auto md:static md:shadow-none md:translate-x-0'>
									<div className='flex flex-col h-full justify-between md:items-center md:flex-row bg-transparent dark:bg-transparent'>
										<ul className='px-6 pt-32  space-y-8 md:px-12 md:space-y-0 md:flex md:space-x-12 md:pt-0'>
											<li>
												<NavigationMenu>
													<NavigationMenuList>
														<NavigationMenuItem>
															<NavigationMenuTrigger>
																Categories
															</NavigationMenuTrigger>
															<NavigationMenuContent className='w-32 text-sm overflow-hidden rounded-md'>
																<NavigationMenuLink>
																	<Link
																		className='flex w-32 select-none flex-col justify-end p-2 no-underline outline-none hover:bg-input'
																		href='/'>
																		All
																	</Link>
																</NavigationMenuLink>
																<NavigationMenuLink>
																	<Link
																		className='flex w-32 select-none flex-col justify-end p-2 no-underline outline-none hover:bg-input'
																		href='/'>
																		New releases
																	</Link>
																</NavigationMenuLink>
																<NavigationMenuLink>
																	<Link
																		className='flex w-32 select-none flex-col justify-end p-2 no-underline outline-none hover:bg-input'
																		href='/'>
																		Bestsellers
																	</Link>
																</NavigationMenuLink>
																<NavigationMenuLink>
																	<Link
																		className='flex w-32 select-none flex-col justify-end p-2 no-underline outline-none hover:bg-input'
																		href='/'>
																		Fiction
																	</Link>
																</NavigationMenuLink>
																<NavigationMenuLink>
																	<Link
																		className='flex w-32 select-none flex-col justify-end p-2 no-underline outline-none hover:bg-input'
																		href='/'>
																		Romance
																	</Link>
																</NavigationMenuLink>
																<NavigationMenuLink>
																	<Link
																		className='flex w-32 select-none flex-col justify-end p-2 no-underline outline-none hover:bg-input'
																		href='/'>
																		Science Fiction
																	</Link>
																</NavigationMenuLink>
															</NavigationMenuContent>
														</NavigationMenuItem>
													</NavigationMenuList>
												</NavigationMenu>
											</li>
										</ul>

										<div className='md:flex gap-2 mr-5 hidden'>
											<Switcher />
											<Link href='/whishlist' className='relative'>
												<BookmarkIcon />
												<div className='absolute top-[-10px] right-[-5px] text-[10px] w-[20px] text-center  h-[20px] p-1 bg-gradient-to-r from-secondary to-primary text-white rounded-full'>
													5
												</div>
											</Link>
											<Link href='/cart' className='relative'>
												<ShoppingBagIcon />
												<div className='absolute top-[-10px] right-[-5px] text-[10px] w-[20px] text-center  h-[20px] p-1 bg-gradient-to-r from-secondary to-primary text-white rounded-full'>
													25
												</div>
											</Link>
										</div>
										<div className='border-t border-slate-400 py-8 px-6 md:px-12  md:border-t-0 md:border-l md:py-0 md:pr-0 md:pl-6 '>
											<UserButton afterSignOutUrl='/' />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Nav;
