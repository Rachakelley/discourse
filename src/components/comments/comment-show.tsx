import { format } from 'timeago.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import UserAvatar from '@/components/common/user-avatar';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import paths from '@/paths';

interface CommentShowProps {
	commentId: string;
	postId: string;
}

export default async function CommentShow({
	commentId,
	postId,
}: CommentShowProps) {
	const comments = await fetchCommentsByPostId(postId);
	const comment = comments.find((c) => c.id === commentId);

	if (!comment) {
		return null;
	}

	const children = comments.filter((c) => c.parentId === commentId);
	const renderedChildren = children.map((child) => {
		return (
			<CommentShow
				key={child.id}
				commentId={child.id}
				postId={postId}
			/>
		);
	});

	return (
		<div className='p-4 border mt-2 mb-1'>
			<div className='flex gap-3'>
				<Link href={paths.userProfileShow(comment.user.id)}>
					<UserAvatar
						className='w-10 h-10 rounded-full hover:opacity-80 hover:shadow-lg transition duration-200'
						src={comment.user?.image || ''}
						alt={`${comment.user.name}'s profile`}
						size='sm'
					/>
				</Link>
				<div className='flex-1 space-y-3'>
					<div className='flex items-center gap-2'>
						<p className='text-sm font-medium text-gray-500'>
							{comment.user.name}
						</p>
						<p className='text-sm flex items-center text-gray-700'>•</p>
						<p className='text-sm font-medium text-gray-500'>
							Commented{' '}
							{comment.createdAt ? format(new Date(comment.createdAt)) : ''}
						</p>
					</div>
					<div className='prose max-w-none'>
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								p: ({ children }) => (
									<p className='whitespace-pre-wrap'>{children}</p>
								),
							}}
						>
							{comment.content}
						</ReactMarkdown>
					</div>
					<CommentCreateForm
						postId={comment.postId}
						parentId={comment.id}
					/>
				</div>
			</div>
			<div className='pl-4'>{renderedChildren}</div>
		</div>
	);
}
