import { fetchAllTopics } from "@/db/queries/topics";
import PostCreateForm from "./post-create-form";

export default async function PostCreateFormController({ slug }: { slug?: string }) {
  const topics = await fetchAllTopics();
  
  return <PostCreateForm slug={slug} topics={topics} />;
}