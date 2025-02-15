import { Avatar, Link } from '@heroui/react';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import { TopicForListDisplay } from '@/db/queries/topics';
import paths from '@/paths';

interface TopicListProps {
	topic: TopicForListDisplay;
}

export default function DetailedTopicList({ topic }: TopicListProps) {
	return (
		<Link
			className='flex items-center p-4 my-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition'
			href={paths.topicShow(topic.slug)}
			key={topic.id}
		>
			<Avatar
				className='mr-4'
				fallback={<CommandLineIcon className='size-8' />}
			/>
			<div>
				<h3 className='text-lg font-semibold'>{topic?.slug}</h3>
				<p className='text-sm text-gray-600'>{topic?.description}</p>
				<p className='text-xs text-gray-600'>Posts: {topic?._count?.posts || 0}</p>
			</div>
		</Link>
	);
}
