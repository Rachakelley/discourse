import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostForListDisplay = Post & {
	topic: { slug: string };
	user: { name: string | null };
	_count: { comments: number };
};

export function fetchPostsBySearchTerm(
	term: string
): Promise<PostForListDisplay[]> {
	return db.post.findMany({
		where: {
			OR: [{ title: { contains: term } }, { content: { contains: term } }],
		},
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true, image: true } },
			_count: { select: { comments: true } },
		},
	});
}

export function fetchPostsByTopicSlug(
	slug: string
): Promise<PostForListDisplay[]> {
	return db.post.findMany({
		where: { topic: { slug } }, // all posts tied to a given slug
		include: {
			topic: { select: { slug: true } }, // select just the slug property
			user: { select: { name: true } }, // from the user of the post, select just the name property
			_count: { select: { comments: true } }, // from the post, select just the comments count
		},
	});
}

export function fetchTopPosts(): Promise<PostForListDisplay[]> {
	return db.post.findMany({
		take: 5,
		orderBy: [{ comments: { _count: 'desc' } }],
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true, image: true } },
			_count: { select: { comments: true } },
		},
	});
}
