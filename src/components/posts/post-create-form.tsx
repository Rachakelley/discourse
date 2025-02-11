'use client';

import { useActionState, startTransition } from 'react';
import {
	Button,
	Form,
	Input,
	Textarea,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@heroui/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

interface PostCreateFormProps {
	slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
	const [formState, action, isPending] = useActionState(
		actions.createPost.bind(null, slug),
		{
			errors: {},
		}
	);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		startTransition(() => {
			action(formData);
		});
	}
	return (
		<Popover placement='left'>
			<PopoverTrigger>
				<Button
					color='primary'
					variant='flat'
				>
					Create a Post
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4 p-4 w-80'>
						<h3 className='text-lg'>Create a Post</h3>
						<Input
							name='title'
							label='Title'
							labelPlacement='outside'
							placeholder='Enter a title'
							isInvalid={!!formState.errors.title}
							errorMessage={formState.errors?.title?.join(', ')}
						/>
						<Textarea
							name='content'
							label='Content'
							labelPlacement='outside'
							placeholder='Write your post'
							isInvalid={!!formState.errors.content}
							errorMessage={formState.errors?.content?.join(', ')}
						/>
						{formState.errors?._form ? (
							<div className='p-2 bg-red-200 border border-red-400 rounded text-black'>
								{formState.errors._form?.join(', ')}
							</div>
						) : null}
						<FormButton isLoading={isPending}>Create</FormButton>
					</div>
				</Form>
			</PopoverContent>
		</Popover>
	);
}
