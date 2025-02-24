import { Skeleton } from '@heroui/react';

export default function PostListLoading() {
	const skeletonPosts = Array(5)
		.fill(null)
		.map((_, i) => (
			<div
				key={i}
				className='flex items-center p-4 border rounded border-gray-200'
			>
				<div className='flex flex-col gap-2 w-full'>
					<div className='flex flex-row justify-between'>
						<div className='flex items-center gap-2'>
							<Skeleton className='w-8 h-8 rounded-full' />
							<Skeleton className='h-4 w-24' />
							<p className='text-xs text-gray-400 flex items-center'>•</p>
							<Skeleton className='h-4 w-32' />
						</div>
						<div className='flex items-center bg-gray-200 gap-1 rounded-full py-1 px-2 w-max'>
							<Skeleton className='h-4 w-8' />
						</div>
					</div>
					<Skeleton className='h-6 w-3/4' />
				</div>
			</div>
		));

	return (
		<div className='space-y-4'>
			<div className='space-y-2 bg-white border border-white rounded-lg p-5'>
				{skeletonPosts}
			</div>
			<div className='flex justify-center'>
				<Skeleton className='h-10 w-64' />
			</div>
		</div>
	);
}
