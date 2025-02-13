import Link from 'next/link';
import { Chip } from '@heroui/react';
import paths from '@/paths';
import { Topic } from '@prisma/client';

interface SimpleTopicListProps {
	topic: Topic;
}

export default function SimpleTopicList({ topic }: SimpleTopicListProps) {
	return (
		<div
			key={topic.id}
			className='flex flex-row flex-wrap gap-2 p-1'
		>
			<Link href={paths.topicShow(topic.slug)}>
				<Chip
					color='warning'
					variant='shadow'
				>
					{topic.slug}
				</Chip>
			</Link>
		</div>
	);
}
