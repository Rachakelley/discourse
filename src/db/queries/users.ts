import { cache } from 'react';
import { db } from '..';

export interface UserForListDisplay {
	id: string;
	email: string | null;
	name: string | null;
	image: string | null;
}

export const fetchUsersByTerm = cache(
	(term: string): Promise<UserForListDisplay[]> => {
		return db.user.findMany({
			where: {
				AND: [
					{
						OR: [{ name: { not: null } }, { email: { not: null } }],
					},
					{
						OR: [
							{ name: { contains: term, mode: 'insensitive' } },
							{ email: { contains: term, mode: 'insensitive' } },
						],
					},
				],
			},
			select: {
				id: true,
				email: true,
				name: true,
				image: true,
			},
		});
	}
);

export interface UserForProfileDisplay {
	id: string;
	email: string | null;
	name: string | null;
	image: string | null;
}

export const fetchUserById = async (
	userId: string
): Promise<UserForProfileDisplay | null> => {
	return await db.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			name: true,
			image: true,
		},
	});
};
