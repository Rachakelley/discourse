import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

interface TopicShowPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
	const { slug } = await params;
	const postsByTopic = await fetchPostsByTopicSlug(slug);

	return (
		<div className='container mx-auto px-4'>
			<div className='grid grid-cols-4 gap-4 p-4'>
				<div className='col-span-3'>
					<h1 className='text-2xl font-bold mb-2'>{slug}</h1>
					<PostList posts={postsByTopic} />
				</div>

				<div>
					<PostCreateForm slug={slug} />
				</div>
			</div>
		</div>
	);
}
