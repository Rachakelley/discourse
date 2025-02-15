'use client';

import React, { useState, lazy, Suspense } from 'react';
import { Divider, Link, Skeleton, Tab, Tabs } from '@heroui/react';
import { PostForListDisplay } from '@/db/queries/posts';
import { CommentWithAuthor } from '@/db/queries/comments';

const PostList = lazy(() => import('@/components/posts/post-list'));

interface ProfileTabsProps {
	posts: PostForListDisplay[];
	comments: CommentWithAuthor[];
}

export default function ProfileTabs({ posts, comments }: ProfileTabsProps) {
	const [selectedTab, setSelectedTab] = useState('posts');

	return (
		<div>
			<Tabs
				aria-label='Options'
				color='success'
				variant='underlined'
				selectedKey={selectedTab}
				onSelectionChange={(key) => setSelectedTab(key.toString())}
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
						<PostList posts={posts} />
					</Suspense>
				)}
				{selectedTab === 'comments' && (
					<Suspense fallback={<Skeleton className='h-6 w-32' />}>
						{comments.map((comment) => (
							<div
								key={comment.id}
								className='flex flex-col gap-2 pl-4'
							>
								<Link
									className='text-black block'
									key={comment.id}
									href={`/posts/${comment.postId}`}
								>
									<div className='flex gap-2 items-center'>
										<p className='font-bold text-xs text-gray-600'>
											{comment?.post?.topic?.slug}
										</p>
										<span className='text-xs'>{' - '}</span>
										<p className='text-xs text-gray-400'>
											{comment?.post?.title}
										</p>
									</div>
									<p>{comment?.content}</p>
									<p className='text-xs text-gray-600'>
										Commented on {comment?.createdAt?.toLocaleDateString()}
									</p>
									
								</Link>
								<Divider />
							</div>
						))}
					</Suspense>
				)}
			</div>
		</div>
	);
}
