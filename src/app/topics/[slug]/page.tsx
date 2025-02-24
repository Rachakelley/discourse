import { Suspense } from 'react';
import PostCreateFormController from '@/components/posts/post-create-form-controller';
import PaginatedPostList from '@/components/posts/paginated-post-list';
import PostListLoading from '@/components/posts/post-list-loading';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import { fetchTopicDetailsBySlug } from '@/db/queries/topics';
import TopicDetails from '@/components/topics/topic-details';

interface TopicShowPageProps {
	params: Promise<{
		slug: string;
	}>;
	searchParams: Promise<{
		page?: string;
	}>;
}

export default async function TopicShowPage({
	params,
	searchParams,
}: TopicShowPageProps) {
	const { slug } = await params;
	const { page } = await searchParams;

	const { description, createdAt, postsCount } = await fetchTopicDetailsBySlug(
		slug
	);
	const currentPage = Number(page) || 1;

	return (
		<>
			<h1 className='text-2xl mb-1 hidden md:block'>{slug}</h1>
			<div className='flex flex-col gap-12 md:grid md:grid-cols-6'>
				<div className='order-2 md:order-1 md:col-span-4'>
					<Suspense fallback={<PostListLoading />}>
						<AsyncPostList
							slug={slug}
							currentPage={currentPage}
							postsPerPage={10}
						/>
					</Suspense>
				</div>
				<div className='order-1 md:order-2 md:col-span-2'>
					<div className='flex flex-col gap-2 pb-1 w-full'>
						<PostCreateFormController slug={slug} />
					</div>
					<TopicDetails
						description={description}
						createdAt={createdAt}
						postsCount={postsCount}
						slug={slug}
					/>
				</div>
			</div>
		</>
	);
}

async function AsyncPostList({
	slug,
	currentPage,
	postsPerPage,
}: {
	slug: string;
	currentPage: number;
	postsPerPage: number;
}) {
	const { posts, totalPosts } = await fetchPostsByTopicSlug(
		slug,
		(currentPage - 1) * postsPerPage,
		postsPerPage
	);

	const totalPages = Math.ceil(totalPosts / postsPerPage);

	return (
		<PaginatedPostList
			slug={slug}
			posts={posts}
			currentPage={currentPage}
			totalPages={totalPages}
			baseUrl={`/topics/${slug}?`}
			context='topic'
		/>
	);
}
