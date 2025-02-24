'use client';

import { ReactNode } from 'react';
import { Link, Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import paths from '@/paths';
import { TopicForListDisplay } from '@/db/queries/topics';

interface SidebarContentProps {
	topics: TopicForListDisplay[];
}

interface ListboxWrapperProps {
	children: ReactNode;
}

export const ListboxWrapper = ({ children }: ListboxWrapperProps) => (
	/* 
		On small screens less than 768px The navbar is hidden (display: none)
		On medium screens and larger ≥ 768px The navbar is visible (display: block)
	*/
	<div
		className='fixed left-0 top-[64px] h-[calc(100vh-64px)] border-r border-stone-200 bg-white hidden md:block overflow-y-auto
    md:w-60 lg:w-72 xl:w-80'
	>
		{children}
	</div>
);

export default function SidebarContent({ topics }: SidebarContentProps) {
	return (
		<ListboxWrapper>
			<Listbox
				aria-label='Navigation'
				variant='flat'
				className='p-0 gap-0 divide-y divide-default-300/50 bg-content1 max-w-[300px] overflow-visible'
				itemClasses={{
					base: 'pl-4 py-0 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 data-[hover=true]:bg-default-100/80',
				}}
			>
				<ListboxSection
					className='mt-2'
					showDivider
					items={[{ key: 'home', textValue: 'Home', label: 'Home' }]}
				>
					{(item) => (
						<ListboxItem
							className='h-12'
							key={item.key}
							textValue={item.textValue}
						>
							<Link
								className='text-black h-full w-full'
								href={paths.home()}
							>
								{item.label}
							</Link>
						</ListboxItem>
					)}
				</ListboxSection>
				<ListboxSection
					classNames={{
						heading: 'px-3 py-2 text-md font-semibold text-default-600',
						divider: 'bg-default-200 dark:bg-default-100',
					}}
					title='Topics'
					items={topics.map((item) => ({
						key: `topic-${item.slug}`,
						textValue: item.slug,
						label: item.slug,
					}))}
				>
					{(item) => (
						<ListboxItem
							key={item.key}
							textValue={item.textValue}
						>
							<div
								key={item.key}
								className='w-full h-full border-l-2 border-green-500 flex flex-col flex-wrap gap-2 pl-4'
							>
								<Link
									color='foreground'
									size='sm'
									href={paths.topicShow(item.label)}
									className='h-12'
								>
									{item.label}
								</Link>
							</div>
						</ListboxItem>
					)}
				</ListboxSection>
			</Listbox>
		</ListboxWrapper>
	);
}
