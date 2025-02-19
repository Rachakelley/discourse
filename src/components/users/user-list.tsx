import { Link } from '@heroui/react';
import paths from '@/paths';
import { UserForListDisplay } from '@/db/queries/users';
import UserAvatar from '@/components/common/user-avatar';

interface UserListProps {
	users: UserForListDisplay[];
}

export default function UserList({ users }: UserListProps) {
	if (!users || users.length === 0) {
		return <h4 className='p-4'>No users found</h4>;
	}

	const renderedUsers = users.map((user) => {
		return (
			<Link
				className='flex items-center p-4 my-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition'
				href={paths.userProfileShow(user?.id)}
				key={user.id}
			>
				<UserAvatar
					className='mr-4'
					src={user?.image || ''}
					size='sm'
					alt={`User Avatar for ${user.name}`}
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
