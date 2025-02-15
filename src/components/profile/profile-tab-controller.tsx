import { fetchPostsByUserId } from '@/db/queries/posts';
import { fetchCommentsByUserId } from '@/db/queries/comments';
import ProfileTabs from './profile-tabs';

interface ProfileTabControllerProps {
	userId: string;
}

export default async function ProfileTabController({ userId }: ProfileTabControllerProps) {
	const posts = await fetchPostsByUserId(userId);
	const comments = await fetchCommentsByUserId(userId);

	return (
		<ProfileTabs
			posts={posts}
			comments={comments}
		/>
	);
}
