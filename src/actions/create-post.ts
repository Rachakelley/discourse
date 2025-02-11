'use server';

import type { Post } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import { auth } from '@/auth';
import paths from '@/paths';

interface CreatePostFormState {
	errors: {
		title?: string[];
		content?: string[];
		_form?: string[];
	};
}

const createPostSchema = z.object({
	title: z.string().min(3),
	content: z.string().min(10).max(255),
});

export async function createPost(
	slug: string,
	formState: CreatePostFormState,
	formData: FormData
): Promise<CreatePostFormState> {
	const result = createPostSchema.safeParse({
		title: formData.get('title'),
		content: formData.get('content'),
	});

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	const session = await auth();

	if (!session || !session?.user || !session.user.id) {
		return {
			errors: {
				_form: ['You must be signed in to create a post'],
			},
		};
	}

	const topic = await db.topic.findFirst({
		where: { slug },
	});

	if (!topic) {
		return {
			errors: {
				_form: ['Topic not found'],
			},
		};
	}

	let post: Post;
	try {
		post = await db.post.create({
			data: {
				title: result.data.title,
				content: result.data.content,
				userId: session.user.id,
				topicId: topic.id,
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				errors: {
					_form: [error.message],
				},
			};
		} else {
			return {
				errors: {
					_form: ['An error occurred. Failed to create post.'],
				},
			};
		}
	}

	revalidatePath('/');
	revalidatePath(paths.topicShow(slug));
	redirect(paths.postShow(slug, post.id));
}
