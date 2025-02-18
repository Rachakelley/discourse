'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavbarIcon } from '@/components/common/icons';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function MobileNavigation() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();
	const segments = pathname
		.split('/')
		.filter(Boolean)
		.reduce<Array<{ label: string; href: string }>>(
			(acc, segment, index, array) => {
				let href = `${
					acc.length > 0 ? acc[acc.length - 1].href : ''
				}/${segment}`;

				// Check if the current segment is 'posts' and the previous segment is under 'topics'
				if (segment === 'posts' && array[index - 2] === 'topics') {
					href = `/topics/${array[index - 1]}`;
				}

				acc.push({
					label: segment.charAt(0).toUpperCase() + segment.slice(1),
					href,
				});
				return acc;
			},
			[]
		);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className='z-50 flex items-center w-full h-14 px-4 fixed md:hidden bg-white border-b border-stone-200 shadow-md'>
			<button
				type='button'
				aria-label='Open navigation menu'
				onClick={toggleSidebar}
				className='relative inline-grid size-7 place-items-center rounded-md text-gray-950 hover:bg-gray-950/5'
			>
				<NavbarIcon />
			</button>
			<ol className='sticky ml-4 flex min-w-0 items-center gap-2 text-sm/6 whitespace-nowrap'>
				<li className='flex items-center gap-2'>
					<Link href='/'>Home</Link>
				</li>
				{segments.map((segment) => (
					<li
						key={`${segment}-${segment.label}`}
						className='flex items-center gap-2'
					>
						<span className='text-gray-400'>/</span>
						<Link href={segment.href}>{segment.label}</Link>
					</li>
				))}
			</ol>
			{isSidebarOpen && (
				<div className='fixed inset-0 z-50 bg-white flex flex-col p-4'>
					<button
						type='button'
						aria-label='Close navigation menu'
						className='self-end'
						onClick={toggleSidebar}
					>
						<XMarkIcon
							className='size-6'
							aria-label='Close'
						/>
					</button>
					<nav className='mt-4'>
						<ul>
							<li>
								<Link href='/'>Home</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
}
