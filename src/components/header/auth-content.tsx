import {
	Avatar,
	Divider,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Link,
	User,
} from '@heroui/react';
import {
	ArrowLeftEndOnRectangleIcon,
	FaceSmileIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import * as actions from '@/actions';
import paths from '@/paths';

interface AuthContentProps {
	userData: {
		id?: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

export default function AuthContent({ userData }: AuthContentProps) {
	const { id = '', name = '', email = '', image = '' } = userData;

	return (
		<div>
			<Popover placement='left'>
				<PopoverTrigger>
					<Avatar
						isBordered
						fallback={<FaceSmileIcon className='size-8' />}
						src={image || ''}
					/>
				</PopoverTrigger>
				<PopoverContent>
					<div className='p-2'>
						<User
							avatarProps={{
								src: image || '',							
								fallback: <FaceSmileIcon className='size-8' />,
							}}
							description={email}
							name={name}
						/>
						<Divider />
						<div className='flex flex-col gap-2 pt-4'>
							<div className='hover:bg-gray-100 transition rounded border-gray-200'>
								<Link
									href={paths.userProfileShow(id)}
									color='foreground'
									size='sm'
									className='hover:bg-gray-100 transition rounded border-gray-200'
								>
									<div className='flex items-center gap-2'>
										<UserIcon className='size-4' />
										<span>Your Profile</span>
									</div>
								</Link>
							</div>

							<Divider className='mt-2' />
							<div className='hover:bg-gray-100 transition rounded border-gray-200'>
								<form action={actions.signOut}>
									<button type='submit'>
										<div className='flex items-center gap-2'>
											<ArrowLeftEndOnRectangleIcon className='size-4' />
											<span>Sign Out</span>
										</div>
									</button>
								</form>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
