'use client';

import React, { useState, lazy, Suspense } from 'react';
import { Chip, Divider, Skeleton, Tab, Tabs } from '@heroui/react';
import {
	RectangleGroupIcon,
	RectangleStackIcon,
	UserCircleIcon,
} from '@heroicons/react/24/solid';
import { PostForListDisplay } from '@/db/queries/posts';
import { TopicForListDisplay } from '@/db/queries/topics';
import { UserForListDisplay } from '@/db/queries/users';

const PostList = lazy(() => import('@/components/posts/post-list'));
const TopicList = lazy(() => import('@/components/topics/topic-list'));
const UserList = lazy(() => import('@/components/users/user-list'));

interface TabControllerProps {
	posts: PostForListDisplay[];
	topics: TopicForListDisplay[];
	users: UserForListDisplay[];
}

export default function SearchTabController({
	posts,
	topics,
	users,
}: TabControllerProps) {
	const [selectedTab, setSelectedTab] = useState('posts');
	const postCount = posts?.length;
	const topicCount = topics?.length;
	const userCount = users?.length;

	return (
		<div>
			<Tabs
				aria-label='Options'
				color='success'
				variant='light'
				selectedKey={selectedTab}
				onSelectionChange={(key) => setSelectedTab(key.toString())}
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
								{postCount}
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
								{topicCount}
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
						<PostList posts={posts} />
					</Suspense>
				)}
				{selectedTab === 'topics' && (
					<Suspense fallback={<Skeleton className='h-6 w-32' />}>
						<TopicList topics={topics} />
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
