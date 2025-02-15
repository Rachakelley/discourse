const paths = {
	home() {
		return '/';
	},
	postCreate(slug: string) {
		return `/topics/${slug}/posts/new`;
	},
	postShow(slug: string, postId: string) {
		return `/topics/${slug}/posts/${postId}`;
	},
	topicShow(slug: string) {
		return `/topics/${slug}`;
	},
	searchTerm(term: string) {
		return `/search?term=${term}`;
	},
	userProfileShow(userId: string) {
		return `/users/${userId}`;
	},
};

export default paths;
