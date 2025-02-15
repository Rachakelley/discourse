'use client';

import { Link, Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import paths from '@/paths';
import SidebarTopicItem from './sidebar-topic-item';
import { TopicForListDisplay } from '@/db/queries/topics';

interface SidebarContentProps {
	topics: TopicForListDisplay[];
}

export default function SidebarContent({ topics }: SidebarContentProps) {
	const handleAction = (key: string) => {
		switch (key) {
			case 'Home':
				console.log('Home');
				break;
		}
	};

	return (
		<div className='h-[calc(100vh-64px)]'>
			<Listbox
				aria-label='Navigation'
				variant='flat'
				isVirtualized
				virtualization={{
					maxListboxHeight: 2000,
					itemHeight: 40,
				}}
				className='p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small'
				itemClasses={{
					base: 'px-4 py-0 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80',
				}}
				onAction={(key) => handleAction(key.toString())}
			>
				<ListboxSection showDivider>
					<ListboxItem
						key='home'
						textValue='Home'
					>
						<Link
							className='text-black h-full w-full'
							href={paths.home()}
						>
							Home
						</Link>
					</ListboxItem>
				</ListboxSection>
				<ListboxSection
					classNames={{
						heading: 'px-3 py-2 text-md font-semibold text-default-600',
						divider: 'bg-default-200 dark:bg-default-100',
					}}
					title='Topics'
				>
					{topics?.map((topic) => (
						<ListboxItem
							key={topic.slug}
							textValue={topic.slug}
						>
							<SidebarTopicItem topic={topic} />
						</ListboxItem>
					))}
				</ListboxSection>
			</Listbox>
		</div>
	);
}
