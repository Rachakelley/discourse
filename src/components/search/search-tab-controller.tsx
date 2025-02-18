import { fetchPostsBySearchTerm } from '@/db/queries/posts';
import { fetchTopicsBySearchTerm } from '@/db/queries/topics';
import { fetchUsersByTerm } from '@/db/queries/users';
import SearchTabs from './search-tabs';

interface SearchTabControllerProps {
	term: string;
	page: string;
}

export default async function SearchTabController({
	term,
	page,
}: SearchTabControllerProps) {
	const currentPage = Number(page) || 1;
	const postsPerPage = 10;
	const topicsPerPage = 10;
	const offset = (currentPage - 1) * postsPerPage;

	const { posts, totalPosts } = await fetchPostsBySearchTerm(
		term,
		offset,
		postsPerPage
	);
	const { topics, totalTopics } = await fetchTopicsBySearchTerm(
		term,
		(currentPage - 1) * topicsPerPage,
		topicsPerPage
	);

	const users = await fetchUsersByTerm(term);

	return (
		<SearchTabs
			posts={posts}
			topics={topics}
			users={users}
			currentPage={currentPage}
			totalTopics={totalTopics}
			totalPosts={totalPosts}
			postsPerPage={postsPerPage}
			topicsPerPage={topicsPerPage}
			searchTerm={term}
		/>
	);
}
