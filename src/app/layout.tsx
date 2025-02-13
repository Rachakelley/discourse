import './globals.css';
import { Providers } from './providers';
import Header from '@/components/header';

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
						<div className='container mx-auto pt-6 max-w-2xl'>{children}</div>
					</Providers>
				</div>
			</body>
		</html>
	);
}
