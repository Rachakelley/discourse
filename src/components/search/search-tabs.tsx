import { fetchPostsBySearchTerm } from '@/db/queries/posts';
import { fetchTopicsBySearchTerm } from '@/db/queries/topics';
import { fetchUsersByTerm } from '@/db/queries/users';
import SearchTabController from './search-tab-controller';

interface SearchTabsProps {
	term: string;
}

export default async function SearchTabs({ term }: SearchTabsProps) {
	const posts = await fetchPostsBySearchTerm(term);
	const topics = await fetchTopicsBySearchTerm(term);
	const users = await fetchUsersByTerm(term);

	return (
		<SearchTabController
			posts={posts}
			topics={topics}
			users={users}
		/>
	);
}
