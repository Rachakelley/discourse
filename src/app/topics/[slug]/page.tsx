import { Suspense } from 'react';
import { Divider } from '@heroui/react';
import PostCreateFormController from '@/components/posts/post-create-form-controller';
import PaginatedPostList from '@/components/posts/paginated-post-list';
import PostListLoading from '@/components/posts/post-list-loading';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

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
	const currentPage = Number(page) || 1;

	return (
		<div>
			<div className='flex gap-2 px-2 min-w-fit'>
				<PostCreateFormController slug={slug} />
			</div>
			<Divider className='my-2' />
			<div className='col-span-3'>
				<h1 className='text-xl m-2'>{slug}</h1>
				<Suspense fallback={<PostListLoading />}>
					<AsyncPostList
						slug={slug}
						currentPage={currentPage}
						postsPerPage={10}
					/>
				</Suspense>
			</div>
		</div>
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
