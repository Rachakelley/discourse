import { Suspense } from 'react';
import { fetchPostsBySortSelection } from '@/db/queries/posts';
import TopicCreateForm from '@/components/topics/topic-create-form';
import PostCreateFormController from '@/components/posts/post-create-form-controller';
import PaginatedPostList from '@/components/posts/paginated-post-list';
import PostListLoading from '@/components/posts/post-list-loading';
import SortSelect from '@/components/common/sort-select';
import { Context, SortOption } from '@/types';

interface HomePageProps {
	searchParams: Promise<{
		page: string;
		sort: string;
	}>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { page, sort } = await searchParams;
	const currentSort = (sort as SortOption) || 'popular';
	const currentPage = Number(page) || 1;
	const postsPerPage = 10;

	const getTitle = (currentSort: SortOption): string => {
		switch (currentSort) {
			case 'popular':
				return 'Top';
			case 'recent':
				return 'Recent';
			default:
				return 'Oldest';
		}
	};

	return (
		<div className='flex flex-col justify-between mx-auto w-full'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
				<h1 className='text-xl m-2'>{getTitle(currentSort)} Posts</h1>
				<div className='flex flex-wrap gap-2 items-center px-2 min-w-fit'>
					<TopicCreateForm />
					<PostCreateFormController />
					<SortSelect selectedKey={currentSort} />
				</div>
			</div>
			<div>
				<div className='md:col-span-3 min-w-fit'>
					<Suspense fallback={<PostListLoading />}>
						<AsyncPostList
							currentPage={currentPage}
							postsPerPage={postsPerPage}
							sort={currentSort}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
}

async function AsyncPostList({
	currentPage,
	postsPerPage,
	sort,
}: {
	currentPage: number;
	postsPerPage: number;
	sort: SortOption;
}) {
	const { posts, totalPosts } = await fetchPostsBySortSelection(
		(currentPage - 1) * postsPerPage,
		postsPerPage,
		sort
	);
	const totalPages = Math.ceil(totalPosts / postsPerPage);

	return (
		<PaginatedPostList
			posts={posts}
			currentPage={currentPage}
			totalPages={totalPages}
			baseUrl='/'
			context={Context.Home}
		/>
	);
}
