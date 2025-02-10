import {
  ChannelStats,
  EarningsChart,
  EntryCallout,
  Highlights,
  TeamMeeting,
  OpenDeals,
  Teams,
  TotalPipelineValue,
  DealsByStage,
  RecentAssetView,
  RecentMessages,
  AccountEngagementSummary,
  UserActivityInsights,
  CombinedDealsComponent,
} from './blocks';

const Demo1LightSidebarContent = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-3">
          <CombinedDealsComponent />
        </div>
      </div>
      <div className="grid gap-5 lg:gap-7.5">
        <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-5.5 items-stretch">
          <div className="lg:col-span-3">
            <TotalPipelineValue />
          </div>
        </div>
    <div className="grid lg:grid-cols-3 gap-5 lg:gap-5.5 items-stretch">
    <div className="lg:col-span-3 h-full">
      <RecentAssetView />
    </div>
  </div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
          <div className="lg:col-span-3">
            <RecentMessages />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
          <div className="lg:col-span-3">
            <AccountEngagementSummary />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
          <div className="lg:col-span-3">
            <UserActivityInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Demo1LightSidebarContent };
