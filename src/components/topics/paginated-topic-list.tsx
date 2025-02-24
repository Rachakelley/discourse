'use client';

import { Pagination } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TopicForListDisplay } from '@/db/queries/topics';
import TopicList from './topic-list';
import { Context } from '@/types';

interface PaginatedTopicListProps {
	topics: TopicForListDisplay[];
	currentPage: number;
	totalPages: number;
	baseUrl?: string;
	context?: Context;
}

export default function PaginatedTopicList({
	topics,
	currentPage,
	totalPages,
	baseUrl,
	context,
}: PaginatedTopicListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams);

		if (context === Context.Search) {
			params.set('tab', 'topics');
		}

		params.set('page', page.toString());

		const path = baseUrl ? baseUrl.split('?')[0] : `/topics`;
		const queryString = params.toString();
		const separator = queryString ? '?' : '';

		router.push(`${path}${separator}${queryString}`);
	};

	return (
		<div className='space-y-4'>
			<TopicList topics={topics} />
			<div className='flex justify-center'>
				<Pagination
					className='m-0'
					total={totalPages}
					initialPage={currentPage}
					page={currentPage}
					onChange={handlePageChange}
					showControls
					size='sm'
					color='success'
					showShadow
				/>
			</div>
		</div>
	);
}
