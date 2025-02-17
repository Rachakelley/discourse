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
		topic?: string[];
		title?: string[];
		content?: string[];
		_form?: string[];
	};
}

const createPostSchema = z.object({
	topic: z.string().min(1, { message: 'Please select a topic' }),
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long' }),
	content: z
		.string()
		.min(10, { message: 'Content must be at least 10 characters long' })
		.max(10000, {
			message: 'Content must be less than 10,000 characters long',
		}),
});

export async function createPost(
	formState: CreatePostFormState,
	formData: FormData
): Promise<CreatePostFormState> {
	const result = createPostSchema.safeParse({
		topic: formData.get('topic'),
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

	const selectedTopic = formData.get('topic') as string;
	const matchedTopic = await db.topic.findFirst({
		where: { slug: selectedTopic },
	});

	if (!matchedTopic) {
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
				topicId: matchedTopic.id,
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
	revalidatePath(paths.topicShow(matchedTopic.slug));
	redirect(paths.postShow(matchedTopic.slug, post.id));
}
