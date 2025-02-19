import { format } from 'timeago.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Link } from '@heroui/react';
import { fetchPostsBySlugAndPostId } from '@/db/queries/posts';
import paths from '@/paths';
import UserAvatar from '@/components/common/user-avatar';

interface PostShowProps {
	slug: string;
	postId: string;
}

export default async function PostShow({ slug, postId }: PostShowProps) {
	const post = await fetchPostsBySlugAndPostId(slug, postId);

	if (!post) {
		notFound();
	}

	return (
		<div>
			<div className='flex items-center gap-2 mb-4'>
				{post.user?.image && (
					<Link href={paths.userProfileShow(post.user.id || '')}>
						<UserAvatar
							src={post.user.image}
							alt={`${post.user.name}'s profile`}
							size='sm'
							className='w-10 h-10 rounded-full hover:opacity-80 hover:shadow-lg transition duration-200'
						/>
					</Link>
				)}
				<p className='text-sm font-medium text-gray-800'>
					{post.user.name || 'Anonymous'}
				</p>
				<p className='text-sm flex items-center text-gray-700'>•</p>
				<p className='text-sm font-medium text-gray-500'>
					Posted {post.createdAt ? format(new Date(post.createdAt)) : ''}
				</p>
			</div>
			<h1 className='text-2xl font-bold my-2 break-words overflow-wrap-anywhere'>
				{post.title}
			</h1>
			<div className='px-3 py-2 border prose max-w-none'>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={{
						p: ({ children }) => (
							<p className='whitespace-pre-wrap p-2'>{children}</p>
						),
					}}
				>
					{post.content}
				</ReactMarkdown>
			</div>
		</div>
	);
}
