import { Divider } from '@heroui/react';
import { fetchTopPosts } from '@/db/queries/posts';
import TopicCreateForm from '@/components/topics/topic-create-form';
import PostCreateFormController from '@/components/posts/post-create-form-controller';
import PaginatedPostList from '@/components/posts/paginated-post-list';

interface HomePageProps {
	searchParams: Promise<{
		page: string;
	}>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { page } = await searchParams;

	const currentPage = Number(page) || 1;
	const postsPerPage = 10;

	const { posts, totalPosts } = await fetchTopPosts(
		(currentPage - 1) * postsPerPage,
		postsPerPage
	);

	const totalPages = Math.ceil(totalPosts / postsPerPage);

	return (
		<div>
			<div className='flex gap-2 px-2 min-w-fit'>
				<TopicCreateForm />
				<PostCreateFormController />
			</div>
			<Divider className='my-2' />
			<h1 className='text-xl m-2'>Top Posts</h1>
			<div>
				<div className='md:col-span-3 min-w-fit'>
					<PaginatedPostList
						posts={posts}
						currentPage={currentPage}
						totalPages={totalPages}
						baseUrl='/'
						context='home'
					/>
				</div>
			</div>
		</div>
	);
}
