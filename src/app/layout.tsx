import './globals.css';
import { Providers } from './providers';
import Header from '@/components/header/header';
import NavigationWrapper from '@/components/nav/navigation-wrapper';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<div className='w-screen min-h-screen bg-gradient-to-r from-[#1e271f12] to-[#d6d3d136]'>
						<div className='z-50 fixed'>
							<Header />
							<NavigationWrapper />
						</div>
						<main className='ml-0 md:ml-80 flex-1 flex justify-center'>
							<div className='container px-6 md:py-4 max-w-4xl mt-[8.5rem] md:mt-[4rem]'>
								{children}
							</div>
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
