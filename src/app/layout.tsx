import './globals.css';
import { Providers } from './providers';
import Header from '@/components/header/header';
import SidebarNavigation from '@/components/nav/sidebar/sidebar-navigation';
import MobileNavigation from '@/components/nav/mobile-navigation';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<div className='w-full min-h-screen bg-stone-100/90'>
					<Providers>
						<Header />
						<div className='flex'>
							<SidebarNavigation />
							<MobileNavigation />
							<main className='ml-0 md:ml-48 w-full mx-auto'>
								<div className='container px-6 pt-20 md:py-4 max-w-2xl'>
									{children}
								</div>
							</main>
						</div>
					</Providers>
				</div>
			</body>
		</html>
	);
}
