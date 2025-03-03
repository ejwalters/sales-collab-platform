import { Statistics } from '@/pages/public-profile/profiles/company/blocks/Statistics';
import { Activities } from '@/pages/public-profile/profiles/creator/blocks/Activities';
import { RecentUploads } from '@/pages/public-profile/profiles/default/blocks/RecentUploads';
import { Container } from '@/components/container';
import { RecentConversations } from '@/pages/RecentConversations';
import { ToDoList } from '@/pages/ToDoList';

const DealOverviewContent = () => {
  console.log('DealOverviewContent');
    const items = [
    { number: '50', label: 'Document Views Last 30 Days' },
    { number: '45', label: 'Messages Received Last 30 Days' },
    { number: '4/10', label: 'Milestones Completed' },
    { number: '12', label: 'Days Since Last Activity' }
  ];

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
        <div className="col-span-1 lg:col-span-2">
          <Statistics items={items} />
        </div>
        <div className="col-span-1">
          <Activities />
        </div>
        <div className="col-span-1">
          <RecentUploads title="Recent Uploads" />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <RecentConversations />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ToDoList />
        </div>
      </div>
    </Container>
  );
};

export { DealOverviewContent };