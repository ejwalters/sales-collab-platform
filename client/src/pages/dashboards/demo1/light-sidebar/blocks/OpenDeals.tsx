import { KeenIcon } from '@/components';

const OpenDeals = () => {
  return (
    <div className="card h-full">
      <div className="card-body flex flex-col items-center justify-center gap-4 text-center p-6">
        {/* Large Number Display */}
        <span className="text-5xl font-bold text-gray-900">25</span>

        {/* Descriptive Text */}
        <span className="text-sm text-gray-600">Deals in progress</span>

        {/* Clickable Link */}
        <a
          href="/deals"
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          View Deals
          <KeenIcon icon="arrow-right" className="text-primary" />
        </a>
      </div>
    </div>
  );
};

export { OpenDeals };
