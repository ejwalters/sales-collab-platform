import { KeenIcon } from "@/components";

const UserActivityInsights = () => {
  const sampleUserActivityData = [
    {
      name: "John Doe",
      lastActivity: "2/9/2025, 10:15:00 AM",
      activityType: "Viewed Asset",
      engagementCount: 15,
      avatar: "https://via.placeholder.com/150", // Replace with real image URL
    },
    {
      name: "Alice Brown",
      lastActivity: "2/8/2025, 3:45:00 PM",
      activityType: "Message Sent",
      engagementCount: 12,
      avatar: "https://via.placeholder.com/150",
    },
    {
      name: "Charlie White",
      lastActivity: "2/7/2025, 5:30:00 PM",
      activityType: "Attended Meeting",
      engagementCount: 8,
      avatar: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">User Activity Insights</h3>
      </div>
      <div className="card-body flex flex-col gap-4 p-5 lg:p-7.5">
        <table className="table table-borderless align-middle">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-800">
              <th className="text-gray-600 text-xs font-semibold uppercase">User</th>
              <th className="text-gray-600 text-xs font-semibold uppercase">Last Activity</th>
              <th className="text-gray-600 text-xs font-semibold uppercase">Activity Type</th>
              <th className="text-gray-600 text-xs font-semibold uppercase">Engagement Count</th>
            </tr>
          </thead>
          <tbody>
            {sampleUserActivityData.map((item, index) => (
              <tr key={index}>
                <td className="py-2 text-sm text-gray-900 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {item.name}
                </td>
                <td className="py-2 text-sm text-gray-900">{item.lastActivity}</td>
                <td className="py-2 text-sm text-gray-900">{item.activityType}</td>
                <td className="py-2 text-sm text-gray-900">{item.engagementCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { UserActivityInsights };
