import { Divider } from '@heroui/react';
import { fetchTopPosts } from '@/db/queries/posts';
import TopicCreateForm from '@/components/topics/topic-create-form';
import PostList from '@/components/posts/post-list';
import PostCreateFormController from '@/components/posts/post-create-form-controller';

export default async function HomePage() {
	const topPosts = await fetchTopPosts();

	return (
		<div>
			<div className='flex gap-2 py-3 px-2 min-w-fit'>
				<TopicCreateForm />
				<PostCreateFormController />
			</div>
			<Divider className='my-2' />
			<h1 className='text-xl m-2'>Top Posts</h1>
			<div>
				<div className='md:col-span-3 min-w-fit'>
					<PostList posts={topPosts} />
				</div>
			</div>
		</div>
	);
}
