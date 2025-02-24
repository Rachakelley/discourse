import { cache } from 'react';
import type { Post } from '@prisma/client';
import { db } from '@/db';
import { SortOption } from '@/types';

export type PostForListDisplay = Post & {
	topic: { slug: string };
	user: { id?: string | null; name: string | null; image?: string | null };
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
				user: { select: { id: true, name: true, image: true } },
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
					user: { select: { name: true, image: true } },
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

export const fetchPostsByTopicSlug = cache(
	async (
		slug: string,
		skip: number = 0,
		take: number = 10,
		sort: SortOption = 'recent'
	): Promise<PostsWithPagination> => {
		const sortOptions: {
			[key: string]: {
				createdAt?: 'asc' | 'desc';
				comments?: {
					_count: 'asc' | 'desc';
				};
			}[];
		} = {
			recent: [{ createdAt: 'desc' }],
			oldest: [{ createdAt: 'asc' }],
			popular: [{ comments: { _count: 'desc' } }, { createdAt: 'desc' }],
		};

		const [posts, totalPosts] = await Promise.all([
			db.post.findMany({
				where: { topic: { slug } },
				include: {
					topic: { select: { slug: true } },
					user: { select: { name: true, image: true } },
					_count: { select: { comments: true } },
				},
				orderBy: sortOptions[sort],
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
);

export const fetchPostsBySortSelection = cache(
	async (
		skip: number = 0,
		take: number = 10,
		sort: SortOption = 'popular'
	): Promise<PostsWithPagination> => {
		const sortOptions: {
			[key: string]: {
				createdAt?: 'asc' | 'desc';
				comments?: {
					_count: 'asc' | 'desc';
				};
			}[];
		} = {
			recent: [{ createdAt: 'desc' }],
			oldest: [{ createdAt: 'asc' }],
			popular: [{ comments: { _count: 'desc' } }, { createdAt: 'desc' }],
		};

		const [posts, totalPosts] = await Promise.all([
			db.post.findMany({
				take,
				skip,
				orderBy: sortOptions[sort],
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
);
