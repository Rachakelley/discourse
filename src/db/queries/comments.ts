import type { Comment } from '@prisma/client';
import { cache } from 'react';
import { db } from '@/db';

export type CommentWithAuthor = Comment & {
	user: { id: string; name: string | null; image: string | null };
	post: {
		title: string;
		topic: {
			slug: string;
		};
	};
};

export const fetchCommentsByPostId = cache(
	(postId: string): Promise<CommentWithAuthor[]> => {
		return db.comment.findMany({
			where: { postId },
			include: {
				user: { select: { id: true, name: true, image: true } },
				post: {
					select: {
						title: true,
						topic: {
							select: { slug: true },
						},
					},
				},
			},
		});
	}
);

export const fetchCommentsByUserId = cache(
	(userId: string): Promise<CommentWithAuthor[]> => {
		return db.comment.findMany({
			where: { userId },
			include: {
				user: { select: { id: true, name: true, image: true } },
				post: {
					select: {
						title: true,
						topic: {
							select: { slug: true },
						},
					},
				},
			},
		});
	}
);
