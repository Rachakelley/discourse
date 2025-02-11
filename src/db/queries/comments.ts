import type { Comment } from '@prisma/client';
import { cache } from 'react';
import { db } from '@/db';

export type CommentWithAuthor = Comment & {
	user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache(
	(postId: string): Promise<CommentWithAuthor[]> => {
		return db.comment.findMany({
			where: { postId }, // all comments tied to a given postId
			include: {
				user: { select: { name: true, image: true } }, // from the user of the comment, select just the name and image properties
			},
		});
	}
);
