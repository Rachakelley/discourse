import { Suspense } from 'react';
import { fetchAllTopics } from '@/db/queries/topics';
import SidebarContent from './sidebar-content';
import SidebarLoading from './sidebar-loading';

async function TopicsLoader() {
	const topics = (await fetchAllTopics()) || [];
	return <SidebarContent topics={topics} />;
}

export default function SidebarNavigation() {
	return (
		<Suspense fallback={<SidebarLoading />}>
			<TopicsLoader />
		</Suspense>
	);
}
