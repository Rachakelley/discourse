import { Suspense } from 'react';
import { Divider } from '@heroui/react';
import PostCreateFormController from '@/components/posts/post-create-form-controller';
import PostList from '@/components/posts/post-list';
import PostListLoading from '@/components/posts/post-list-loading';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

interface TopicShowPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
	const { slug } = await params;

	return (
		<div>
			<div className='flex gap-2 py-3 px-2 min-w-fit'>
				<PostCreateFormController slug={slug} />
			</div>
			<Divider className='my-2' />
			<div className='col-span-3'>
				<h1 className='text-xl m-2'>{slug}</h1>
				<Suspense fallback={<PostListLoading />}>
					<AsyncPostList slug={slug} />
				</Suspense>
			</div>
		</div>
	);
}

async function AsyncPostList({ slug }: { slug: string }) {
	const postsByTopic = await fetchPostsByTopicSlug(slug);
	return <PostList posts={postsByTopic} />;
}
