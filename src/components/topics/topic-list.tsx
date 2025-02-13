import { Topic } from '@prisma/client';
import { TopicForListDisplay } from '@/db/queries/topics';
import DetailedTopicList from './detailed-topic-list';
import SimpleTopicList from './simple-topic-list';

interface TopicListProps {
	variant?: 'chip' | 'list';
	topics: TopicForListDisplay[] | Topic[];
}

export default function TopicList({
	topics,
	variant = 'list',
}: TopicListProps) {
	if (!topics || topics.length === 0) {
		return <h4>No topics found</h4>;
	}

	const renderedTopics = topics.map((topic) => {
		return (
			<div key={topic.id}>
				{variant === 'chip' ? (
					<SimpleTopicList topic={topic as Topic} />
				) : (
					<DetailedTopicList topic={topic as TopicForListDisplay} />
				)}
			</div>
		);
	});

	return <div className='w-full'>{renderedTopics}</div>;
}
