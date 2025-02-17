'use client';

import { useForm } from 'react-hook-form';
import { useActionState, startTransition } from 'react';
import {
	Button,
	Form,
	Input,
	Textarea,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Select,
	SelectItem,
	Tooltip,
} from '@heroui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Topic } from '@prisma/client';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { getFormattedErrors } from '@/utils';

interface PostCreateFormProps {
	slug?: string;
	topics?: Topic[];
}

export default function PostCreateForm({ slug = '', topics = [] }: PostCreateFormProps) {
	const { register } = useForm({
		defaultValues: {
			topic: slug,
			content: '',
			title: '',
		},
	});

	const [formState, action, isPending] = useActionState(actions.createPost, {
		errors: {},
	});


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
						<Select
							{...register('topic')}
							className='max-w-xs'
							selectionMode='single'
							items={topics}
							label='Topic'
							labelPlacement='outside'
							placeholder='Select a topic'
							defaultSelectedKeys={[slug]}
							isInvalid={!!formState.errors?.topic}
							errorMessage={getFormattedErrors(formState?.errors?.topic)}
						>
							{topics?.map((topic) => (
								<SelectItem
									key={`select-${topic.slug}`}
									value={topic.slug}
								>
									{topic.slug}
								</SelectItem>
							))}
						</Select>
						<Input
							{...register('title')}
							label='Title'
							labelPlacement='outside'
							placeholder='Enter a title'
							isInvalid={!!formState.errors?.title}
							errorMessage={getFormattedErrors(formState?.errors?.title)}
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
								errorMessage={getFormattedErrors(formState?.errors?.content)}
							/>
						</div>
						{formState.errors?._form ? (
							<div className='p-2 bg-red-200 border border-red-400 rounded text-black'>
								{getFormattedErrors(formState?.errors?._form)}
							</div>
						) : null}
						<FormButton isLoading={isPending}>Create</FormButton>
					</div>
				</Form>
			</PopoverContent>
		</Popover>
	);
}
