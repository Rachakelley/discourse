import Link from 'next/link';
import { Button } from '@heroui/react';
import paths from '@/paths';
import type { PostForListDisplay } from '@/db/queries/posts';

interface PostListProps {
	posts: PostForListDisplay[];
}

export default function PostList({ posts }: PostListProps) {
	if (!posts || posts.length === 0) {
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
				<div>
					<h3 className='text-md font-bold'>{post.title}</h3>
					<div className='flex flex-row gap-8'>
						<p className='text-xs text-gray-400'>By {post.user.name}</p>
						<p className='text-xs text-gray-400'>
							{post._count.comments}{' '}
							{post._count.comments === 1 ? 'comment' : 'comments'}
						</p>
					</div>
				</div>
			</Link>
		);
	});

	return (
		<div className='space-y-2'>
			{renderedPosts}
			<Button>Load More</Button>
		</div>
	);
}
