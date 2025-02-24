import { Skeleton } from '@heroui/react';

export default function PostShowLoading() {
	return (
		<div>
			<div className='flex items-center gap-2 mb-4'>
				<Skeleton className='w-10 h-10 rounded-full' />
				<Skeleton className='h-5 w-24' />
				<p className='text-sm flex items-center text-gray-700'>•</p>
				<Skeleton className='h-5 w-32' />
			</div>

			<div className='my-2'>
				<Skeleton className='h-8 w-3/4' />
			</div>

			<div className='px-3 py-2 border prose max-w-none'>
				<div className='space-y-4'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-5/6' />
					<Skeleton className='h-4 w-4/6' />
				</div>
			</div>
		</div>
	);
}
