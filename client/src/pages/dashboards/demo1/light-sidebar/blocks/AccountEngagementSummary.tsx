import React from 'react';
import { KeenIcon } from '@/components';

interface EngagementSummaryProps {
  accounts: {
    accountName: string;
    lastEngagement: string;
    interactions: number;
    trend: 'up' | 'down' | 'neutral';
  }[];
}

const AccountEngagementSummary = () => {
    const sampleEngagementData = [
      {
        account: "Acme Corp",
        lastEngaged: "2/8/2025, 3:30:00 PM",
        interactions: 25,
        trend: "up", // options: 'up', 'down', 'neutral'
      },
      {
        account: "Global Tech",
        lastEngaged: "2/7/2025, 11:15:00 AM",
        interactions: 18,
        trend: "neutral", // options: 'up', 'down', 'neutral'
      },
      {
        account: "Innovative Solutions",
        lastEngaged: "2/9/2025, 9:00:00 AM",
        interactions: 35,
        trend: "down", // options: 'up', 'down', 'neutral'
      },
      {
        account: "Bright Future Inc.",
        lastEngaged: "2/6/2025, 4:45:00 PM",
        interactions: 10,
        trend: "up", // options: 'up', 'down', 'neutral'
      },
    ];
  
    const renderTrendIcon = (trend: string) => {
      switch (trend) {
        case "up":
          return <KeenIcon icon="arrow-up" className="text-success" />;
        case "down":
          return <KeenIcon icon="arrow-down" className="text-danger" />;
        default:
          return <KeenIcon icon="minus" className="text-gray-500" />;
      }
    };
  
    return (
      <div className="card h-full">
        <div className="card-header">
          <h3 className="card-title">Account Engagement Summary</h3>
        </div>
        <div className="card-body flex flex-col gap-4 p-5 lg:p-7.5">
          <table className="table table-borderless align-middle">
            <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-800">
                <th className="text-gray-600 text-xs font-semibold uppercase">Account</th>
                <th className="text-gray-600 text-xs font-semibold uppercase">Last Engaged</th>
                <th className="text-gray-600 text-xs font-semibold uppercase">Interactions</th>
                <th className="text-gray-600 text-xs font-semibold uppercase">Trend</th>
              </tr>
            </thead>
            <tbody>
              {sampleEngagementData.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="py-2 text-sm text-gray-900">{item.account}</td>
                  <td className="py-2 text-sm text-gray-900">{item.lastEngaged}</td>
                  <td className="py-2 text-sm text-gray-900">{item.interactions}</td>
                  <td className="py-2 text-sm">{renderTrendIcon(item.trend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export { AccountEngagementSummary };