'use client';

export default function SidebarLoading() {
	return (
		<div className='w-64 fixed left-0 top-[64px] h-[calc(100vh-64px)] border-r border-stone-200 bg-white hidden md:block'>
			<div className='p-3 gap-0'>
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
		</div>
	);
}
