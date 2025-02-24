'use client';

import { Pagination } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CommentWithAuthor } from '@/db/queries/comments';
import { Context } from '@/types';
import CommentListProfileTab from './comment-list-profile-tab';

interface PaginatedCommentListProps {
	comments: CommentWithAuthor[];
	currentPage: number;
	totalPages: number;
	baseUrl?: string;
	context?: Context;
}

export default function PaginatedCommentList({
	comments,
	currentPage,
	totalPages,
	baseUrl,
	context,
}: PaginatedCommentListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams);

		if (context === Context.Search) {
			params.set('tab', 'comments');
		}

		params.set('page', page.toString());

		const path = baseUrl && baseUrl.split('?')[0];
		const queryString = params.toString();
		const separator = queryString ? '?' : '';

		router.push(`${path}${separator}${queryString}`);
	};

	return (
		<div className='space-y-4'>
			<CommentListProfileTab comments={comments} />
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
