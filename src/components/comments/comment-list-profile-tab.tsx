import { Divider, Link } from '@heroui/react';
import { CommentWithAuthor } from '@/db/queries/comments';
import paths from '@/paths';

interface CommentListProfileTabProps {
	comments: CommentWithAuthor[];
}

export default function CommentListProfileTab({
	comments,
}: CommentListProfileTabProps) {
	return comments.map((comment) => (
		<div
			key={comment.id}
			className='flex flex-col gap-2 pl-4'
		>
			<Link
				className='text-black block'
				key={comment.id}
				href={paths.postShow(comment.post.topic.slug, comment.postId)}
			>
				<div className='flex gap-2 items-center'>
					<p className='font-bold text-xs text-gray-600'>
						{comment?.post?.topic?.slug}
					</p>
					<span className='text-xs'>•</span>
					<p className='text-xs text-gray-400'>{comment?.post?.title}</p>
				</div>
				<p className='pt-2'>{comment?.content}</p>
				<p className='pt-2 text-xs text-gray-600'>
					Commented on {comment?.createdAt?.toLocaleDateString()}
				</p>
			</Link>
			<Divider />
		</div>
	));
}
