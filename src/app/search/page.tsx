import { redirect } from 'next/navigation';
import { Divider } from '@heroui/divider';
import SearchTabs from '@/components/search/search-tabs';

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
		<div className='container mx-auto px-4'>
			Search results for: <p className='font-bold inline'>{term}</p>
			<Divider className='my-4' />
			<SearchTabs term={term} />
		</div>
	);
}
