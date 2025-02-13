import { cache } from 'react';
import { db } from '@/db';
import { Topic } from '@prisma/client';

export function fetchAllTopics(): Promise<Topic[]> {
	return db.topic.findMany();
}

export interface TopicForListDisplay {
	id: string;
	slug: string;
	description: string;
	_count: { posts: number };
}

export const fetchTopicsBySearchTerm = cache(
	(term: string): Promise<TopicForListDisplay[]> => {
		return db.topic.findMany({
			where: {
				OR: [{ slug: { contains: term, mode: 'insensitive' } }],
			},
			select: {
				id: true,
				slug: true,
				description: true,
				_count: { select: { posts: true } },
			},
			orderBy: {
				slug: 'asc',
			},
		});
	}
);
