import { fetchTopPosts } from '@/db/queries/posts';
import TopicCreateForm from '@/components/topics/topic-create-form';
import PostCreateFormController from '@/components/posts/post-create-form-controller';
import PaginatedPostList from '@/components/posts/paginated-post-list';
import PostListLoading from '@/components/posts/post-list-loading';
import { Suspense } from 'react';

interface HomePageProps {
	searchParams: Promise<{
		page: string;
	}>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { page } = await searchParams;

	const currentPage = Number(page) || 1;
	const postsPerPage = 10;

	return (
		<div className='flex flex-col justify-between mx-auto'>
			<div className='flex justify-between'>
				<h1 className='text-xl m-2'>Top Posts</h1>
				<div className='flex gap-2 px-2 min-w-fit'>
					<TopicCreateForm />
					<PostCreateFormController />
				</div>
			</div>
			<div>
				<div className='md:col-span-3 min-w-fit'>
					<Suspense fallback={<PostListLoading />}>
						<AsyncPostList
							currentPage={currentPage}
							postsPerPage={postsPerPage}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
}

async function AsyncPostList({
	currentPage,
	postsPerPage,
}: {
	currentPage: number;
	postsPerPage: number;
}) {
	const { posts, totalPosts } = await fetchTopPosts(
		(currentPage - 1) * postsPerPage,
		postsPerPage
	);

	const totalPages = Math.ceil(totalPosts / postsPerPage);

	return (
		<PaginatedPostList
			posts={posts}
			currentPage={currentPage}
			totalPages={totalPages}
			baseUrl='/'
			context='home'
		/>
	);
}
