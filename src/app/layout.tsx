import './globals.css';
import { Providers } from './providers';
import Header from '@/components/header';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className='dark'
		>
			<body>
				<div className='container mx-auto px-4 max-w-6xl'>
					<Providers>
						<Header />
						{children}
					</Providers>
				</div>
			</body>
		</html>
	);
}
