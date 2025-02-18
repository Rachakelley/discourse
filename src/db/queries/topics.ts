import { cache } from 'react';
import { db } from '@/db';

export function fetchAllTopics(
	limit: number = 10
): Promise<TopicForListDisplay[]> {
	return db.topic.findMany({
		select: {
			id: true,
			createdAt: true,
			updatedAt: true,
			slug: true,
			description: true,
			_count: {
				select: {
					posts: true,
				},
			},
		},
		orderBy: {
			slug: 'asc',
		},
		take: limit,
	});
}

export interface TopicForListDisplay {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	slug: string;
	description: string;
	_count: { posts: number };
}

interface TopicsWithPagination {
	topics: TopicForListDisplay[];
	totalTopics: number;
}
export const fetchTopicsBySearchTerm = cache(
	async (
		term: string,
		skip: number = 0,
		take: number = 10
	): Promise<TopicsWithPagination> => {
		const topics = await db.topic.findMany({
			where: {
				OR: [{ slug: { contains: term, mode: 'insensitive' } }],
			},
			select: {
				id: true,
				createdAt: true,
				updatedAt: true,
				slug: true,
				description: true,
				_count: { select: { posts: true } },
			},
			orderBy: {
				slug: 'asc',
			},
			skip,
			take,
		});
		const totalTopics = await db.topic.count({
			where: {
				OR: [{ slug: { contains: term, mode: 'insensitive' } }],
			},
		});
		return { topics, totalTopics };
	}
);
