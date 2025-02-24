'use client';

import { Select, SelectItem } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortOption } from '@/types';

interface SortSelectProps {
	selectedKey: SortOption;
	baseUrl?: string;
}

const sortOptions = [
	{ label: 'Most Recent', value: 'recent' },
	{ label: 'Popular', value: 'popular' },
	{ label: 'Oldest', value: 'oldest' },
];

export default function SortSelect({
	selectedKey = 'popular',
	baseUrl = '/',
}: SortSelectProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSortChange = (newSort: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('sort', newSort);
		params.set('page', '1'); // Reset to first page when sorting changes

		const queryString = params.toString();
		const separator = queryString ? '?' : '';

		router.push(`${baseUrl}${separator}${queryString}`);
	};

	return (
		<Select
			size='sm'
			label='Sort by'
			selectedKeys={[selectedKey]}
			onChange={(e) => handleSortChange(e.target.value)}
			variant='bordered'
			className='w-40 mb-2'
		>
			{sortOptions.map((option) => (
				<SelectItem
					key={option.value}
					value={option.value}
					className='text-small'
				>
					{option.label}
				</SelectItem>
			))}
		</Select>
	);
}
