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
							{/* On small screens less than 768px The navbar is hidden (display: none)
							On medium screens and larger ≥ 768px The navbar is visible (display: block) */}
							<aside className='w-48 fixed left-0 top-[64px] h-[calc(100vh-64px)] border-r border-stone-200 bg-white hidden md:block'>
								<SidebarNavigation />
							</aside>
							<MobileNavigation />
							<main className='ml-0 md:ml-48 w-full mx-auto'>
								<div className='container px-6 pt-20 md:py-4 max-w-2xl'>{children}</div>
							</main>
						</div>
					</Providers>
				</div>
			</body>
		</html>
	);
}
