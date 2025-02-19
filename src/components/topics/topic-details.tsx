import { format } from 'timeago.js';
import {
	FolderPlusIcon,
	RectangleStackIcon,
} from '@heroicons/react/24/outline';

interface TopicDetailsProps {
	description: string;
	createdAt: Date;
	postsCount: number;
	slug?: string;
}

export default function TopicDetails({
	description,
	createdAt,
	postsCount,
	slug,
}: TopicDetailsProps) {
	return (
		<div className='h-fit col-span-2 rounded-lg border rounded border-gray-200'>
			<div className='py-2 px-4'>
				<p className='text-md font-bold'>{slug}</p>
				<p className='text-sm text-gray-500'>{description}</p>
				<div className='flex flex-row items-center text-gray-500 gap-2 pt-2'>
					<FolderPlusIcon className='size-4' />
					<p className='text-sm'>
						{createdAt && `Created ${format(new Date(createdAt))}`}
					</p>
				</div>
				<div className='flex flex-row items-center text-gray-500 gap-2 pt-2'>
					<RectangleStackIcon className='size-4' />
					<p className='text-xs'>
						{postsCount} {postsCount === 1 ? 'post' : 'posts'}
					</p>
				</div>
			</div>
		</div>
	);
}
