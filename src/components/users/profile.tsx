'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
	const session = useSession();

	if (session.data?.user) {
		return (
			<div>
				<h1>From client: user is signed in</h1>
				<p>{session.data.user.name}</p>
				<p>{session.data.user.email}</p>
			</div>
		);
	}

	return (
		<div>
			<h1>From client: user is not signed in</h1>
		</div>
	);
}
