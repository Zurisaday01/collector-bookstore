import type { Metadata } from 'next';
import { Nunito, Rouge_Script, Quicksand } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '../theme-provider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';

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
					className={`${nunito.variable} ${rouge.variable} ${quicksand.variable} flex flex-col`}>
					<ThemeProvider attribute='class'>
						<Nav />
						<main className='px-6 md:container  md:mx-auto md:px-7 flex-1'>
							{children}
						</main>
						<Footer />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
