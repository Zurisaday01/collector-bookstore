import type { Metadata } from 'next';
import { Nunito, Rouge_Script, Quicksand } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '../theme-provider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import Switcher from '@/components/Switcher';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });
const rouge = Rouge_Script({
	weight: '400',
	variable: '--font-rouge-script',
	subsets: ['latin'],
});
const quicksand = Quicksand({
	variable: '--font-quicksand',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Collector',
	description: 'Bookshop',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body
					className={`${nunito.variable} ${rouge.variable} ${quicksand.variable} flex justify-center items-center flex-col`}>
					<ThemeProvider attribute='class'>
						<div className='flex items-center gap-1'>
							<span className='logo px-2 text-5xl'>collector</span>
						</div>

						<main className='flex justify-center items-center'>{children}</main>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
