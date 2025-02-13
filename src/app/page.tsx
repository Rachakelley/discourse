import { Divider } from '@heroui/react';
import { fetchTopPosts } from '@/db/queries/posts';
import { fetchAllTopics } from '@/db/queries/topics';
import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import PostList from '@/components/posts/post-list';

export default async function HomePage() {
	const topPosts = await fetchTopPosts();
	const topics = await fetchAllTopics();

	return (
		<div className='container mx-auto px-4'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4'>
				<div className='md:col-span-3 min-w-fit'>
					<h1 className='text-xl m-2'>Top Posts</h1>
					<PostList posts={topPosts} />
				</div>
				<div className='border rounded shadow py-3 px-2 min-w-fit'>
					<TopicCreateForm />
					<Divider className='my-2' />

					<h3 className='text-lg'>Topics</h3>
					<TopicList
						topics={topics}
						variant='chip'
					/>
				</div>
			</div>
		</div>
	);
}
