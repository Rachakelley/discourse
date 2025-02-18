import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import PaginatedPostList from '@/components/posts/paginated-post-list';

export async function AsyncPostList({
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
		/>
	);
}
