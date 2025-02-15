import TopicList from '@/components/topics/topic-list';
import { fetchAllTopics } from '@/db/queries/topics';

export default async function TopicShowPage() {
  const topics = await fetchAllTopics();

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <TopicList topics={topics} />
      </div>
    </div>
  );
}
