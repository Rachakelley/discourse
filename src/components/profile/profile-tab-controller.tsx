import { fetchPostsByUserId } from '@/db/queries/posts';
import { fetchCommentsByUserId } from '@/db/queries/comments';
import ProfileTabs from './profile-tabs';

interface ProfileTabControllerProps {
	userId: string;
	currentPage: number;
	commentsPerPage: number;
	postsPerPage: number;
}

export default async function ProfileTabController({
	userId,
	currentPage,
	commentsPerPage,
	postsPerPage,
}: ProfileTabControllerProps) {
	const { posts, totalPosts } = await fetchPostsByUserId(
		userId,
		(currentPage - 1) * postsPerPage,
		postsPerPage
	);
	const { comments, totalComments } = await fetchCommentsByUserId(
		userId,
		(currentPage - 1) * commentsPerPage,
		commentsPerPage
	);

	const totalPagesOfPosts = Math.ceil(totalPosts / postsPerPage);
	const totalPagesOfComments = Math.ceil(totalComments / commentsPerPage);

	return (
		<ProfileTabs
			posts={posts}
			comments={comments}
			currentPage={currentPage}
			totalPagesOfComments={totalPagesOfComments}
			totalPagesOfPosts={totalPagesOfPosts}
			userId={userId}
		/>
	);
}
