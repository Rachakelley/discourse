'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavbarIcon } from '@/components/common/icons';

import { TopicForListDisplay } from '@/db/queries/topics';
import { Link } from '@heroui/react';

interface MobileNavigationProps {
	topics: TopicForListDisplay[];
}

export default function MobileNavigation({ topics }: MobileNavigationProps) {
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
		<div className='flex items-center w-full h-14 px-4 fixed md:hidden bg-white border-b border-stone-200 shadow-md'>
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
					<Link
						href='/'
						size='sm'
						className='text-black'
					>
						Home
					</Link>
				</li>
				{segments.map((segment) => (
					<li
						key={`${segment}-${segment.label}`}
						className='flex items-center gap-2'
					>
						<span className='text-gray-400'>/</span>
						<Link
							href={segment.href}
							size='sm'
							className='text-black'
						>
							{segment.label}
						</Link>
					</li>
				))}
			</ol>
			{isSidebarOpen && (
				<div className='fixed inset-0 top-[7rem] z-40 bg-white flex flex-col p-4 md:hidden overflow-y-auto'>
					<nav>
						<ul className='space-y-4'>
							<li className='border-b border-stone-200 pb-4'>
								<h1>Topics</h1>
							</li>
							{topics.map((topic) => (
								<li
									className='pl-4 border-l border-green-500'
									key={topic.id}
									onClick={toggleSidebar}
								>
									<Link
										size='sm'
										href={`/topics/${topic.slug}`}
										className='text-black hover:text-gray-600'
									>
										{topic.slug}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
}
