import { Avatar } from '@heroui/react';
import { fetchUserById } from '@/db/queries/users';
import { FaceSmileIcon } from '@heroicons/react/24/solid';
import ProfileTabController from '@/components/profile/profile-tab-controller';

interface UserProfilePageProps {
	params: Promise<{
		userId: string;
	}>;
	searchParams: Promise<{
		page?: string;
	}>;
}

export default async function UserProfilePage({
	params,
	searchParams,
}: UserProfilePageProps) {
	const { userId } = await params;
	const { page } = await searchParams;

	const currentPage = Number(page) || 1;
	const postsPerPage = 10;
	const commentsPerPage = 10;

	const user = await fetchUserById(userId);

	if (!user) {
		return <h1>User not found</h1>;
	}

	return (
		<div className='p-4 my-2 bg-white rounded-lg shadow-md'>
			<div className='flex items-center'>
				<Avatar
					className='mr-4'
					src={user?.image || ''}
					size='lg'
					fallback={<FaceSmileIcon className='size-8' />}
				/>
				<div>
					<h3 className='text-lg font-semibold'>{user?.name}</h3>
					<p className='text-sm text-gray-600'>{user?.email}</p>
				</div>
			</div>
			<ProfileTabController
				userId={user?.id}
				currentPage={currentPage}
				postsPerPage={postsPerPage}
				commentsPerPage={commentsPerPage}
			/>
		</div>
	);
}
