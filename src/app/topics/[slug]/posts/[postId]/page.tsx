import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@heroui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
		<div className='m-4'>
			<Link
				className='flex items-center text-black underline decoration-solid pb-8'
				href={paths.topicShow(slug)}
			>
				<ArrowLeftIcon className='bg-[#d4d4d8] border border-gray-300 p-1 rounded-3xl size-8 mr-2' />
				{slug}
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
