import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { revalidatePath } from 'next/cache';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';
import paths from './paths';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
	throw new Error('Missing github oauth client credentials');
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	trustHost: true,
	adapter: PrismaAdapter(db),
	providers: [
		GitHub({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
	callbacks: {
		// not usually needed, fixes a nextauth bug with session id
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async session({ session, user }: any) {
			if (session && user) {
				session.id = user.id;
				revalidatePath(paths.userProfileShow(user.id));
			}

			return session;
		},
	},
});
