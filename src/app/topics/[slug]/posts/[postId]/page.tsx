import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@heroui/react';
import { db } from '@/db';
import paths from '@/paths';
import PostShow from '@/components/posts/post-show';
import PostShowLoading from '@/components/posts/post-show-loading';
import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';

interface PostShowPageProps {
	params: Promise<{
		slug: string;
		postId: string;
	}>;
}

export default async function PostShowPage(props: PostShowPageProps) {
	const { slug, postId } = await props.params;

	const post = await db.post.findFirst({
		where: { id: postId },
	});

	if (!post) {
		return notFound();
	}

	return (
		<div className='space-y-3'>
			<Link
				className='underline decoration-solid'
				href={paths.topicShow(slug)}
			>
				{'< '}Back to {slug}
			</Link>
			<Suspense fallback={<PostShowLoading />}>
				<PostShow
					slug={slug}
					postId={postId}
				/>
			</Suspense>
			<CommentCreateForm
				postId={postId}
				startOpen
			/>
			<CommentList postId={postId} />
		</div>
	);
}
