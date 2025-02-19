'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea, Button, Tooltip } from '@heroui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';
import { getFormattedErrors } from '@/utils';

interface CommentCreateFormProps {
	postId: string;
	parentId?: string;
	startOpen?: boolean;
}

export default function CommentCreateForm({
	postId,
	parentId,
	startOpen,
}: CommentCreateFormProps) {
	const [open, setOpen] = useState(startOpen);
	const ref = useRef<HTMLFormElement | null>(null);
	const { register } = useForm({
		defaultValues: {
			content: '',
		},
	});
	const [formState, action, isPending] = useActionState(
		actions.createComment.bind(null, { postId, parentId }),
		{ errors: {} }
	);

	useEffect(() => {
		if (formState.success) {
			ref.current?.reset();

			if (!startOpen) {
				setOpen(false);
			}
		}
	}, [formState, startOpen]);

	const form = (
		<form
			action={action}
			ref={ref}
		>
			<div className='space-y-2'>
				<Textarea
					{...register('content')}
					label={
						<div className='flex items-center gap-2'>
							<p>Reply (Markdown supported)</p>
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
											<li>```code block```</li>
										</ul>
									</div>
								}
								placement='right-start'
							>
								<InformationCircleIcon className='size-6' />
							</Tooltip>
						</div>
					}
					classNames={{
						inputWrapper: 'rounded-none',
					}}
					placeholder='Enter your comment'
					isInvalid={!!formState.errors.content}
					errorMessage={getFormattedErrors(formState?.errors?.content)}
				/>

				{formState.errors._form ? (
					<div className='p-2 bg-red-200 border rounded border-red-400'>
						{getFormattedErrors(formState?.errors?._form)}
					</div>
				) : null}

				<FormButton isLoading={isPending}>Post Comment</FormButton>
			</div>
		</form>
	);

	return (
		<div>
			<Button
				size='sm'
				variant='light'
				onPress={() => setOpen(!open)}
			>
				Reply
			</Button>
			{open && form}
		</div>
	);
}
