import { Suspense } from 'react';
import PostCreateFormController from '@/components/posts/post-create-form-controller';
import PaginatedPostList from '@/components/posts/paginated-post-list';
import PostListLoading from '@/components/posts/post-list-loading';
import TopicDetails from '@/components/topics/topic-details';
import SortSelect from '@/components/common/sort-select';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import { fetchTopicDetailsBySlug } from '@/db/queries/topics';
import { Context, SortOption } from '@/types';
import paths from '@/paths';

interface TopicShowPageProps {
	params: Promise<{
		slug: string;
	}>;
	searchParams: Promise<{
		page?: string;
		sort?: string;
	}>;
}

export default async function TopicShowPage({
	params,
	searchParams,
}: TopicShowPageProps) {
	const { slug } = await params;
	const { page, sort } = await searchParams;
	const currentSort = (sort as SortOption) || 'popular';
	const currentPage = Number(page) || 1;
	const baseUrl = `${paths.topicShow(slug)}`;

	const { description, createdAt, postsCount } = await fetchTopicDetailsBySlug(
		slug
	);

	return (
		<>
			<div className='flex flex-col gap-4 md:gap-6 lg:gap-12 md:grid md:grid-cols-6'>
				<div className='order-2 md:order-1 md:col-span-4'>
					<div className='flex justify-between items-center gap-2'>
						<h1 className='text-2xl mb-1 hidden md:block'>{slug}</h1>
						<SortSelect
							selectedKey={currentSort}
							baseUrl={baseUrl}
						/>
					</div>
					<Suspense fallback={<PostListLoading />}>
						<AsyncPostList
							slug={slug}
							currentPage={currentPage}
							postsPerPage={10}
							sort={currentSort}
							baseUrl={baseUrl}
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
	sort,
	baseUrl,
}: {
	slug: string;
	currentPage: number;
	postsPerPage: number;
	sort: SortOption;
	baseUrl: string;
}) {
	const { posts, totalPosts } = await fetchPostsByTopicSlug(
		slug,
		(currentPage - 1) * postsPerPage,
		postsPerPage,
		sort
	);

	const totalPages = Math.ceil(totalPosts / postsPerPage);

	return (
		<PaginatedPostList
			slug={slug}
			posts={posts}
			currentPage={currentPage}
			totalPages={totalPages}
			baseUrl={baseUrl}
			context={Context.Topic}
		/>
	);
}
