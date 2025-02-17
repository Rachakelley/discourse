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
import { getFormattedErrors } from '@/utils';

export default function TopicCreateForm() {
	const [formState, action, isPending] = useActionState(actions.createTopic, {
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
					Create Topic
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4 p-4 w-80'>
						<h3 className='text-lg'>Create a Topic</h3>
						<Input
							name='name'
							label='Topic'
							labelPlacement='outside'
							placeholder='Enter a topic'
							isInvalid={!!formState.errors?.name}
							errorMessage={getFormattedErrors(formState?.errors?.name)}
						/>
						<Textarea
							name='description'
							label='Description'
							labelPlacement='outside'
							placeholder='Describe your topic'
							isInvalid={!!formState.errors?.description}
							errorMessage={getFormattedErrors(formState?.errors?.description)}
						/>
						{formState.errors?._form ? (
							<div className='p-2 bg-red-200 border border-red-400 rounded text-black'>
								{getFormattedErrors(formState.errors?._form)}
							</div>
						) : null}
						<FormButton isLoading={isPending}>Save</FormButton>
					</div>
				</Form>
			</PopoverContent>
		</Popover>
	);
}
