import { cache } from 'react';
import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostForListDisplay = Post & {
	topic: { slug: string };
	user: { name: string | null };
	_count: { comments: number };
};

export const fetchPostsBySlugAndPostId = cache(
	(slug: string, postId: string): Promise<PostForListDisplay | null> => {
		return db.post.findFirst({
			where: {
				id: postId,
				topic: { slug },
			},
			include: {
				topic: true,
				user: { select: { name: true } },
				_count: { select: { comments: true } },
			},
		});
	}
);

export const fetchPostsByUserId = cache(
	(
		userId: string,
		skip: number = 0,
		take: number = 10
	): Promise<PostsWithPagination> => {
		return db.post
			.findMany({
				where: { userId },
				include: {
					topic: { select: { slug: true } },
					user: { select: { name: true } },
					_count: { select: { comments: true } },
				},
				orderBy: { createdAt: 'desc' },
				skip,
				take,
			})
			.then((posts) => {
				return db.post
					.count({
						where: { userId },
					})
					.then((totalPosts) => {
						return { posts, totalPosts };
					});
			});
	}
);

export const fetchPostsBySearchTerm = cache(
	async (searchTerm: string, skip: number, take: number) => {
		const [posts, totalPosts] = await db.$transaction([
			db.post.findMany({
				where: {
					OR: [
						{
							title: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
						{
							content: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
				},
				include: {
					topic: {
						select: {
							slug: true,
						},
					},
					user: {
						select: {
							name: true,
							image: true,
						},
					},
					_count: {
						select: {
							comments: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
				skip,
				take,
			}),
			db.post.count({
				where: {
					OR: [
						{
							title: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
						{
							content: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
				},
			}),
		]);

		return {
			posts,
			totalPosts,
		};
	}
);

export interface PostsWithPagination {
	posts: PostForListDisplay[];
	totalPosts: number;
}

export async function fetchPostsByTopicSlug(
	slug: string,
	skip: number = 0,
	take: number = 10
): Promise<PostsWithPagination> {
	const [posts, totalPosts] = await Promise.all([
		db.post.findMany({
			where: { topic: { slug } },
			include: {
				topic: { select: { slug: true } },
				user: { select: { name: true } },
				_count: { select: { comments: true } },
			},
			orderBy: { createdAt: 'desc' },
			skip,
			take,
		}),
		db.post.count({
			where: { topic: { slug } },
		}),
	]);

	return {
		posts,
		totalPosts,
	};
}

export async function fetchTopPosts(
	skip: number = 0,
	take: number = 10
): Promise<PostsWithPagination> {
	const [posts, totalPosts] = await Promise.all([
		db.post.findMany({
			take,
			skip,
			orderBy: [{ comments: { _count: 'desc' } }],
			include: {
				topic: { select: { slug: true } },
				user: { select: { name: true, image: true } },
				_count: { select: { comments: true } },
			},
		}),
		db.post.count(),
	]);

	return {
		posts,
		totalPosts,
	};
}
