'use client';

export default function SidebarLoading() {
	return (
		<div className='p-3 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible'>
			<div className='animate-pulse'>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/5 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/5 my-4'></div>
				<div className='px-3 py-2 h-4 bg-gray-200 rounded w-3/4 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/2 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/6 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/4 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/4 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/4 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-2/3 my-4'></div>
				<div className='px-3 h-4 bg-gray-200 rounded w-1/4 my-4'></div>
			</div>
		</div>
	);
}
