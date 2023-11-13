import BookImage from '@/components/BookImage';
import AddToForm from '@/components/forms/AddToForm';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const page = () => {
	return (
		<section className='mt-12'>
			<div className='flex flex-col md:flex-row  gap-10'>
				<div className='w-full flex justify-center md:justify-start md:w-min'>
					<BookImage
						imgUrl='/book-1.jpeg'
						size='w-[300px] h-[430px] '
						newRelease={false}
						bestseller={true}
						alt='book 1'
					/>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='mb-6'>
						<h1 className='heading text-gradient text-4xl sm:text-5xl !leading-[1.2]'>
							Skyward
						</h1>
						<p>
							by{' '}
							<Link
								href='/'
								className='transition-all duration-150 hover:text-gradient'>
								Brandon Sanderson
							</Link>
						</p>
						<p className='text-primary uppercase font-bold flex gap-1 mt-3'>
							<span>
								<CheckCircle2 className='w-[20px]' />
							</span>
							Available
						</p>
					</div>
					<AddToForm />
				</div>
			</div>
			<div className='mt-7 mb-8'>
				<h2 className='text-gradient text-2xl heading mb-3'>Description</h2>
				<div className='flex flex-col space-y-3'>
					<p>
						A virtuoso journey into networks of power, our embroilment with new
						technologies, and the dangers of corruption, by an electrifying
						debut novelist.
					</p>
					<p>
						When the investigative reporter Quentin Jones story about covert
						military interrogation practices in the Desert War is buried, he is
						spurred to dig deeper, and he unravels a trail that leads to VIRTUE:
						cutting-edge technology that simulates reality during interrogation.
					</p>
					<p>
						As the shadowy labyrinths of governmental corruption unfurl and
						tighten around him, unnerving links to his protégé Bruce--who, like
						Joseph Conra Kurtz, disappeared into the war several years
						earlier--keep emerging.
					</p>
					<p>
						Greg Jackson The Dimensions of a Cave is a virtuoso journey into
						networks of power, our embroilment with new technologies, and the
						dangers of corruption. It explores our drive toward war, violence,
						and venality, placing humanity and idealism under the spotlight.
					</p>
				</div>
			</div>
		</section>
	);
};
export default page;
