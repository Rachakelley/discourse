import { Avatar, Link } from '@heroui/react';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { UserForListDisplay } from '@/db/queries/users';

interface UserListProps {
	users: UserForListDisplay[];
}

export default function UserList({ users }: UserListProps) {
	if (!users || users.length === 0) {
		return <h4>No users found</h4>;
	}

	const renderedUsers = users.map((user) => {
		return (
			<Link
				className='flex items-center p-4 my-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition'
				href={'/'}
				key={user.id}
			>
				<Avatar
					className='mr-4'
					src={user?.image || ''}
					fallback={<FaceSmileIcon className='size-8' />}
				/>
				<div>
					<h3 className='text-lg font-semibold'>{user.name}</h3>
					<p className='text-sm text-gray-600'>{user.email}</p>
				</div>
			</Link>
		);
	});

	return <div className='w-full'>{renderedUsers}</div>;
}
