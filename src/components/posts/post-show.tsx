import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { fetchPostsBySlugAndPostId } from '@/db/queries/posts';

interface PostShowProps {
	slug: string;
	postId: string;
}

export default async function PostShow({ slug, postId }: PostShowProps) {
	const post = await fetchPostsBySlugAndPostId(slug, postId);

	if (!post) {
		notFound();
	}

	return (
    <div className='m-4'>
      <h1 className='text-2xl font-bold my-2 break-words overflow-wrap-anywhere'>
        {post.title}
      </h1>
      <div className='p-4 border rounded prose max-w-none'>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="whitespace-pre-wrap">{children}</p>
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
	);
}
