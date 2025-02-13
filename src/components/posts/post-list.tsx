import Link from 'next/link';
import paths from '@/paths';
import type { PostForListDisplay } from '@/db/queries/posts';

interface PostListProps {
	posts: PostForListDisplay[];
}

export default function PostList({ posts }: PostListProps) {
	if (!posts || posts.length === 0) {
		return <h4>No posts found</h4>;
	}

	const renderedPosts = posts?.map((post) => {
		const topicSlug = post.topic.slug;

		if (!topicSlug) {
			throw new Error('Need a slug to link to a post');
		}

		return (
			<div
				key={post.id}
				className='flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition'
			>
				<Link href={paths.postShow(topicSlug, post.id)}>
					<h3 className='text-lg font-bold'>{post.title}</h3>
					<div className='flex flex-row gap-8'>
						<p className='text-xs text-gray-400'>By {post.user.name}</p>
						<p className='text-xs text-gray-400'>
							{post._count.comments}{' '}
							{post._count.comments === 1 ? 'comment' : 'comments'}
						</p>
					</div>
				</Link>
			</div>
		);
	});

	if (renderedPosts?.length === 0) {
		return <h4>No posts found</h4>;
	}

	return <div className='space-y-2'>{renderedPosts}</div>;
}
