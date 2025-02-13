'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

export async function search(formData: FormData) {
	const term = formData.get('term');

	if (typeof term !== 'string' || !term) {
		redirect('/');
	}

	revalidatePath('/');
	revalidatePath(paths.searchTerm(term));
	redirect(paths.searchTerm(term));
}
