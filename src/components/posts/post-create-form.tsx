'use client';

import { useForm } from 'react-hook-form';
import { useActionState, startTransition, useState } from 'react';
import {
	Button,
	Form,
	Input,
	Textarea,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Tooltip,
} from '@heroui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Topic } from '@prisma/client';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import TopicSelect from '../topics/topic-select';

interface PostCreateFormProps {
	slug?: string;
	topics?: Topic[];
}

export default function PostCreateForm({ slug = '', topics = [] }: PostCreateFormProps) {
	const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

	// Update useForm to include register
	const { register } = useForm({
		defaultValues: {
			content: '',
			title: '',
		},
	});

	// For server-side submission
	const [formState, action, isPending] = useActionState(
		actions.createPost.bind(null, slug || selectedTopic || ''),
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
					color='success'
					variant='flat'
				>
					Create Post
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4 p-4 w-80'>
						<h3 className='text-lg'>Create a Post</h3>
						<TopicSelect
							defaultValue={slug || ''}
							topics={topics}
							onSelect={setSelectedTopic}
						/>
						<Input
							{...register('title')}
							label='Title'
							labelPlacement='outside'
							placeholder='Enter a title'
							isInvalid={!!formState.errors?.title}
							errorMessage={formState.errors?.title?.join(', ')}
						/>
						<div>
							<Textarea
								{...register('content')}
								label={
									<div className='flex items-center gap-2'>
										<p>Content (Markdown supported)</p>
										<Tooltip
											content={
												<div className='w-48 p-2'>
													<h3 className='font-bold'>Markdown options:</h3>
													<ul>
														<li># Heading</li>
														<li>**bold**</li>
														<li>*italic*</li>
														<li>- bullet points</li>
														<li>1. numbered list</li>
														<li>[link](url)</li>
														<li>\`\`\`code block\`\`\`</li>
													</ul>
												</div>
											}
											placement='left-start'
										>
											<InformationCircleIcon className='size-6' />
										</Tooltip>
									</div>
								}
								classNames={{
									input: 'h-20 overflow-y-auto',
								}}
								labelPlacement='outside'
								placeholder='Write your post here...'
								isInvalid={!!formState.errors?.content}
								errorMessage={formState.errors?.content?.join(', ')}
							/>
						</div>
						{formState.errors?._form ? (
							<div className='p-2 bg-red-200 border border-red-400 rounded text-black'>
								{formState.errors?._form?.join(', ')}
							</div>
						) : null}
						<FormButton isLoading={isPending}>Create</FormButton>
					</div>
				</Form>
			</PopoverContent>
		</Popover>
	);
}
