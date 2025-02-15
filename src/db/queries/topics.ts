import { cache } from 'react';
import { db } from '@/db';

export function fetchAllTopics(): Promise<TopicForListDisplay[]> {
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

export const fetchTopicsBySearchTerm = cache(
	(term: string): Promise<TopicForListDisplay[]> => {
		return db.topic.findMany({
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
		});
	}
);
