'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import AuthContent from './auth-content';
import UnauthContent from './unauth-content';

export default function HeaderAuth() {
	const session = useSession();

	let headerContent: React.ReactNode;

	if (session?.status === 'loading') {
		headerContent = null;
	} else if (session?.data?.user) {
		headerContent = (
			<AuthContent userData={session?.data?.user} />
		);
	} else {
		headerContent = (
			<UnauthContent />
		);
	}

	return headerContent;
}
