import Link from 'next/link';
import paths from '@/paths';
import { TopicForListDisplay } from '@/db/queries/topics';

interface SidebarTopicItemProps {
	topic: TopicForListDisplay;
}

export default function SidebarTopicItem({ topic }: SidebarTopicItemProps) {
	return (
		<div
			key={topic.id}
			className='w-full h-full border-l-2 border-green-500 flex flex-col flex-wrap gap-2 p-1 px-3'
		>
			<Link href={paths.topicShow(topic.slug)}>{topic.slug}</Link>
		</div>
	);
}
