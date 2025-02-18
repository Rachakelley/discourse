import { Suspense } from 'react';
import { fetchAllTopics } from '@/db/queries/topics';
import SidebarNavigation from './sidebar/sidebar-navigation';
import MobileNavigation from './mobile-navigation';
import SidebarLoading from './sidebar/sidebar-loading';

async function NavigationLoader() {
	const topics = (await fetchAllTopics()) || [];

	return (
		<>
			<SidebarNavigation topics={topics} />
			<MobileNavigation topics={topics} />
		</>
	);
}

export default function NavigationWrapper() {
	return (
		<Suspense fallback={<SidebarLoading />}>
			<NavigationLoader />
		</Suspense>
	);
}
