import { redirect } from 'next/navigation';
import { Divider } from '@heroui/divider';
import SearchTabController from '@/components/search/search-tab-controller';

interface SearchPageProps {
	searchParams: Promise<{
		term: string;
	}>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { term } = await searchParams;

	if (!term) {
		redirect('/');
	}

	return (
		<div>
			Search results for: <p className='font-bold inline'>{term}</p>
			<Divider className='my-4' />
			<SearchTabController term={term} />
		</div>
	);
}
