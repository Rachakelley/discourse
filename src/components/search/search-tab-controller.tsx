import { fetchPostsBySearchTerm } from '@/db/queries/posts';
import { fetchTopicsBySearchTerm } from '@/db/queries/topics';
import { fetchUsersByTerm } from '@/db/queries/users';
import SearchTabs from './search-tabs';

interface SearchTabControllerProps {
	term: string;
}

export default async function SearchTabController({ term }: SearchTabControllerProps) {
	const posts = await fetchPostsBySearchTerm(term);
	const topics = await fetchTopicsBySearchTerm(term);
	const users = await fetchUsersByTerm(term);

	return (
		<SearchTabs
			posts={posts}
			topics={topics}
			users={users}
		/>
	);
}
