'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Topic } from '@prisma/client';
import { db } from '@/db';
import { auth } from '@/auth';
import paths from '@/paths';

interface CreateTopicFormState {
	errors: {
		name?: string[];
		description?: string[];
		_form?: string[];
	};
}

const createTopicSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Must contain at least 3 characters',
		})
		.regex(/^[a-z-]+$/, {
			message: 'Must be lowercase letters or dashes without spaces',
		}),
	description: z
		.string()
		.min(10, {
			message: 'Description must be at least 10 characters',
		})
		.max(255, {
			message: 'Description must be less than 255 characters',
		}),
});

export async function createTopic(
	formState: CreateTopicFormState,
	formData: FormData
): Promise<CreateTopicFormState> {
	const result = createTopicSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
	});

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	const session = await auth();

	if (!session || !session?.user) {
		return {
			errors: {
				_form: ['You must be signed in to create a topic'],
			},
		};
	}

	let topic: Topic;
	try {
		topic = await db.topic.create({
			data: {
				slug: result.data.name,
				description: result.data.description,
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
					_form: ['An error occurred'],
				},
			};
		}
	}

	revalidatePath('/');
	redirect(paths.topicShow(topic.slug));
}
