'use client';

import React, { useState, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Chip, Divider, Skeleton, Tab, Tabs } from '@heroui/react';
import {
	RectangleGroupIcon,
	RectangleStackIcon,
	UserCircleIcon,
} from '@heroicons/react/24/solid';
import { PostForListDisplay } from '@/db/queries/posts';
import { TopicForListDisplay } from '@/db/queries/topics';
import { UserForListDisplay } from '@/db/queries/users';
import paths from '@/paths';
import { Context } from '@/types';

const PaginatedPostList = lazy(
	() => import('@/components/posts/paginated-post-list')
);
const PaginatedTopicList = lazy(
	() => import('@/components/topics/paginated-topic-list')
);
const UserList = lazy(() => import('@/components/users/user-list'));

interface SearchTabsProps {
	posts: PostForListDisplay[];
	topics: TopicForListDisplay[];
	users: UserForListDisplay[];
	currentPage: number;
	totalTopics: number;
	totalPosts: number;
	topicsPerPage: number;
	postsPerPage: number;
	searchTerm: string;
}

export default function SearchTabs({
	posts,
	topics,
	users,
	currentPage,
	totalTopics,
	totalPosts,
	topicsPerPage,
	postsPerPage,
	searchTerm,
}: SearchTabsProps) {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState('posts');
	const userCount = users?.length;
	const totalPagesOfPosts = Math.ceil(totalPosts / postsPerPage);
	const totalPagesOfTopics = Math.ceil(totalTopics / topicsPerPage);

	const handleTabChange = (key: string) => {
		setSelectedTab(key);
		// Reset to page 1 when switching tabs
		const searchUrl = `${paths.searchTerm(searchTerm)}&tab=${key}&page=1`;
		router.push(searchUrl);
	};

	return (
		<div>
			<Tabs
				aria-label='Options'
				color='success'
				variant='underlined'
				selectedKey={selectedTab}
				onSelectionChange={(key) => handleTabChange(key.toString())}
				className='flex flex-col md:flex-row'
			>
				<Tab
					key='posts'
					title={
						<div className='flex items-center space-x-2'>
							<RectangleStackIcon className='size-6' />
							<span>Posts</span>
							<Chip
								size='sm'
								variant='faded'
							>
								{totalPosts}
							</Chip>
						</div>
					}
					className='w-full md:w-auto'
				/>
				<Tab
					key='topics'
					title={
						<div className='flex items-center space-x-2'>
							<RectangleGroupIcon className='size-6' />
							<span>Topics</span>
							<Chip
								size='sm'
								variant='faded'
							>
								{totalTopics}
							</Chip>
						</div>
					}
					className='w-full md:w-auto'
				/>
				<Tab
					key='users'
					title={
						<div className='flex items-center space-x-2'>
							<UserCircleIcon className='size-6' />
							<span>Users</span>{' '}
							<Chip
								size='sm'
								variant='faded'
							>
								{userCount}
							</Chip>
						</div>
					}
					className='w-full md:w-auto'
				/>
			</Tabs>
			<Divider className='my-2' />
			<div className='flex flex-col gap-4 pt-4'>
				{selectedTab === 'posts' && (
					<Suspense fallback={<Skeleton className='h-6 w-32' />}>
						<PaginatedPostList
							posts={posts}
							currentPage={currentPage}
							totalPages={totalPagesOfPosts}
							baseUrl={`${paths.searchTerm(searchTerm)}&`}
							context={Context.Search}
						/>
					</Suspense>
				)}
				{selectedTab === 'topics' && (
					<Suspense fallback={<Skeleton className='h-6 w-32' />}>
						<PaginatedTopicList
							topics={topics}
							currentPage={currentPage}
							totalPages={totalPagesOfTopics}
							baseUrl={`${paths.searchTerm(searchTerm)}&`}
							context={Context.Search}
						/>
					</Suspense>
				)}
				{selectedTab === 'users' && (
					<Suspense fallback={<Skeleton className='h-6 w-32' />}>
						<UserList users={users} />
					</Suspense>
				)}
			</div>
		</div>
	);
}
