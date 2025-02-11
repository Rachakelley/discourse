'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function search(formData: FormData) {
	const term = formData.get('term');

	if (typeof term !== 'string' || !term) {
		redirect('/');
	}

	revalidatePath('/');
	revalidatePath(`/search`);
	redirect(`/search?term=${term}`);
}
