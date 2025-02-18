'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PostForListDisplay } from '@/db/queries/posts';
import PostList from './post-list';

interface PaginatedPostListProps {
	slug?: string;
	posts: PostForListDisplay[];
	currentPage: number;
	totalPages: number;
	baseUrl?: string;
	context?: 'home' | 'search' | 'profile' | 'topic';
}

export default function PaginatedPostList({
	slug,
	posts,
	currentPage,
	totalPages,
	baseUrl,
	context,
}: PaginatedPostListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams);

		if (context === 'search' || context === 'profile') {
			params.set('tab', 'posts');
		}

		params.set('page', page.toString());

		const path = baseUrl ? baseUrl.split('?')[0] : `/topics/${slug}`;
		const queryString = params.toString();
		const separator = queryString ? '?' : '';

		router.push(`${path}${separator}${queryString}`);
	};

	return (
		<PostList
			posts={posts}
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={handlePageChange}
		/>
	);
}
