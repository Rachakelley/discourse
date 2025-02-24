import { Link } from '@heroui/react';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import { TopicForListDisplay } from '@/db/queries/topics';
import paths from '@/paths';
import UserAvatar from '@/components/common/user-avatar';

interface TopicListProps {
	topics: TopicForListDisplay[];
}

export default function TopicList({ topics }: TopicListProps) {
	if (!topics || topics.length === 0) {
		return <h4 className='p-4'>No topics found</h4>;
	}

	const renderedTopics = topics.map((topic) => {
		return (
			<div key={topic.id}>
				<Link
					className='text-black text-md flex items-center p-4 my-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition'
					href={paths.topicShow(topic.slug)}
					key={topic.id}
				>
					<UserAvatar
						className='mr-4'
						fallback={<CommandLineIcon className='size-8' />}
						alt={`Topic Icon for ${topic.slug}`}
						size='sm'
					/>
					<div>
						<h3 className='text-lg font-semibold'>{topic?.slug}</h3>
						<p className='text-sm text-gray-600'>{topic?.description}</p>
						<p className='text-xs text-gray-600'>
							Posts: {topic?._count?.posts || 0}
						</p>
					</div>
				</Link>
			</div>
		);
	});

	return <div className='w-full'>{renderedTopics}</div>;
}
