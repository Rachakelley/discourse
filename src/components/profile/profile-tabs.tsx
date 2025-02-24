'use client';

import React, { useState, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Divider, Skeleton, Tab, Tabs } from '@heroui/react';
import { PostForListDisplay } from '@/db/queries/posts';
import { CommentWithAuthor } from '@/db/queries/comments';
import paths from '@/paths';
import { Context } from '@/types';

const PaginatedCommentList = lazy(
	() => import('@/components/comments/paginated-comment-list')
);
const PaginatedPostList = lazy(
	() => import('@/components/posts/paginated-post-list')
);

interface ProfileTabsProps {
	posts: PostForListDisplay[];
	comments: CommentWithAuthor[];
	currentPage: number;
	totalPagesOfComments: number;
	totalPagesOfPosts: number;
	userId: string;
}

export default function ProfileTabs({
	posts,
	comments,
	currentPage,
	totalPagesOfComments,
	totalPagesOfPosts,
	userId,
}: ProfileTabsProps) {
	const [selectedTab, setSelectedTab] = useState('posts');
	const router = useRouter();

	const handleTabChange = (key: string) => {
		setSelectedTab(key);
		// Reset to page 1 when switching tabs
		const searchUrl = `${paths.userProfileShow(userId)}?tab=${key}&page=1`;
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
							<span>Posts</span>
						</div>
					}
					className='w-full md:w-auto'
				/>
				<Tab
					key='comments'
					title={
						<div className='flex items-center space-x-2'>
							<span>Comments</span>
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
							baseUrl={`${paths.userProfileShow(userId)}?`}
							context={Context.Profile}
						/>
					</Suspense>
				)}
				{selectedTab === 'comments' && (
					<Suspense fallback={<Skeleton className='h-6 w-32' />}>
						<PaginatedCommentList
							comments={comments}
							currentPage={currentPage}
							totalPages={totalPagesOfComments}
							baseUrl={`${paths.userProfileShow(userId)}?`}
							context={Context.Profile}
						/>
					</Suspense>
				)}
			</div>
		</div>
	);
}
