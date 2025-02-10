import { Statistics } from '@/pages/public-profile/profiles/company/blocks/Statistics';

const DealOverviewContent = () => {
  const items = [
    { number: '$50,000', label: 'Deal Value' },
    { number: '45', label: 'Days in Pipeline' },
    { number: '80%', label: 'Win Probability' },
    { number: '12', label: 'Activities' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1 lg:col-span-3">
        <Statistics items={items} />
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export { DealOverviewContent };