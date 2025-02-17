import { Skeleton } from '@heroui/react';

export default function PostListLoading() {
	return (
		<div className='m-4'>
			<div className='my-2'>
				<Skeleton className='h-8 w-48' />
			</div>
			<div className='p-4 border rounded space-y-2'>
				<Skeleton className='h-6 w-80' />
				<Skeleton className='h-6 w-80' />
				<Skeleton className='h-6 w-80' />
				<Skeleton className='h-6 w-80' />
				<Skeleton className='h-6 w-80' />
				<Skeleton className='h-6 w-80' />
			</div>
		</div>
	);
}
