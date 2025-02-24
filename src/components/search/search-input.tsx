'use client';

import { Input } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';
import { SearchIcon } from '@/components/common/icons';

export default function SearchInput() {
	const searchParams = useSearchParams();

	return (
		<form action={actions.search}>
			<Input
				name='term'
				classNames={{
					base: 'max-w-full w-full sm:max-w-[20rem] h-10',
					mainWrapper: 'h-full',
					input: 'text-small',
					inputWrapper: 'h-full font-normal text-green-500 bg-default-400/20',
				}}
				defaultValue={searchParams.get('term') || ''}
				placeholder='Type to search...'
				size='sm'
				startContent={<SearchIcon size={18} />}
				type='search'
			/>
		</form>
	);
}
