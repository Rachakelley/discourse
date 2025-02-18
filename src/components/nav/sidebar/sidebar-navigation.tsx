import { TopicForListDisplay } from '@/db/queries/topics';
import SidebarContent from './sidebar-content';

interface SidebarNavigationProps {
	topics: TopicForListDisplay[];
}

export default function SidebarNavigation({ topics }: SidebarNavigationProps) {
	return <SidebarContent topics={topics} />;
}
