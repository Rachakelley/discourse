'use client';

import React from 'react';
import {
	Avatar,
	Button,
	NavbarItem,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@heroui/react';

import { useSession } from 'next-auth/react';
import * as actions from '@/actions';

export default function HeaderAuth() {
	const session = useSession();

	let authContent: React.ReactNode;
	if (session?.status === 'loading') {
		authContent = null;
	} else if (session?.data?.user) {
		authContent = (
			<div>
				<Popover placement='left'>
					<PopoverTrigger>
						<Avatar
							isBordered
							src={session.data.user.image || ''}
						/>
					</PopoverTrigger>
					<PopoverContent>
						<div className='p-4'>
							<form action={actions.signOut}>
								<Button
									type='submit'
									color='warning'
									variant='flat'
								>
									Sign Out
								</Button>
							</form>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		);
	} else {
		authContent = (
			<>
				<NavbarItem>
					<form action={actions.signIn}>
						<Button
							type='submit'
							color='secondary'
							variant='bordered'
						>
							Sign In
						</Button>
					</form>
				</NavbarItem>
			</>
		);
	}

	return authContent;
}
