import { format } from 'timeago.js';
import Link from 'next/link';
import { Pagination } from '@heroui/react';
import paths from '@/paths';
import type { PostForListDisplay } from '@/db/queries/posts';
import UserAvatar from '@/components/common/user-avatar';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

interface PostListProps {
	posts: PostForListDisplay[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function PostList({
	posts,
	currentPage,
	totalPages,
	onPageChange,
}: PostListProps) {
	if (!Array.isArray(posts) || posts.length === 0) {
		return <h4 className='p-4'>No posts found</h4>;
	}

	const renderedPosts = posts?.map((post) => {
		const topicSlug = post?.topic?.slug;

		if (!topicSlug) {
			throw new Error('Need a slug to link to a post');
		}

		return (
			<Link
				href={paths.postShow(topicSlug, post.id)}
				key={post.id}
				className='flex items-center p-4 hover:bg-gray-100 transition border rounded border-gray-200'
			>
				<div className='flex flex-col gap-2 w-full'>
					<div className='flex flex-row justify-between'>
						<div className='flex items-center gap-2'>
							<div className='flex-shrink-0'>
								<UserAvatar
									src={post.user?.image || ''}
									alt={post.user?.name || 'Anonymous user'}
									size='sm'
								/>
							</div>
							<p className='text-xs text-gray-600'>{post.user.name}</p>
							<p className='text-xs text-gray-400 flex items-center'>•</p>
							<p className='text-xs text-gray-400'>
								Posted {post.createdAt ? format(new Date(post.createdAt)) : ''}
							</p>
						</div>
						<div className='flex items-center bg-gray-200 gap-1 border rounded-full py-1 px-2 w-max'>
							<ChatBubbleOvalLeftIcon className='size-4' />
							<p className='text-xs'>{post._count.comments}</p>
						</div>
					</div>
					<h3 className='text-md font-bold'>{post.title}</h3>
				</div>
			</Link>
		);
	});

	return (
		<div className='space-y-4'>
			<div className='space-y-2 bg-white border border-white rounded-lg p-5'>
				{renderedPosts}
			</div>
			<div className='flex justify-center'>
				<Pagination
					className='m-0'
					total={totalPages}
					initialPage={currentPage}
					page={currentPage}
					onChange={onPageChange}
					showControls
					size='sm'
					color='success'
					showShadow
				/>
			</div>
		</div>
	);
}
