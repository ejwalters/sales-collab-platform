import React from 'react';
import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';

interface Viewer {
  name: string; // Name of the individual viewer
  avatar: string; // Avatar image URL
}

interface RecentAssetView {
  id: number;
  name: string; // Asset name
  type: string; // File type (e.g., PDF, DOC, etc.)
  prospect: string; // Company or prospect name
  viewer: Viewer; // Individual viewer info
  timestamp: string; // ISO string for date/time
  viewCount: number; // Total views
}

const recentAssets: RecentAssetView[] = [
  {
    id: 1,
    name: 'Project-pitch.pdf',
    type: 'pdf',
    prospect: 'Acme Corp',
    viewer: { name: 'John Doe', avatar: '300-2.png' },
    timestamp: '2025-02-09T14:30:00Z',
    viewCount: 5,
  },
  {
    id: 2,
    name: 'Client-Report.docx',
    type: 'doc',
    prospect: 'Global Tech',
    viewer: { name: 'Alice Brown', avatar: '300-1.png' },
    timestamp: '2025-02-08T16:45:00Z',
    viewCount: 8,
  },
  {
    id: 3,
    name: 'Framework-App.js',
    type: 'js',
    prospect: 'Innovative Solutions',
    viewer: { name: 'Charlie White', avatar: '300-3.png' },
    timestamp: '2025-02-07T12:15:00Z',
    viewCount: 3,
  },
  {
    id: 4,
    name: 'Framework-App.js',
    type: 'js',
    prospect: 'Innovative Solutions',
    viewer: { name: 'Charlie White', avatar: '300-3.png' },
    timestamp: '2025-02-07T12:15:00Z',
    viewCount: 3,
  },
  {
    id: 5,
    name: 'Framework-App.js',
    type: 'js',
    prospect: 'Innovative Solutions',
    viewer: { name: 'Charlie White', avatar: '300-4.png' },
    timestamp: '2025-02-07T12:15:00Z',
    viewCount: 3,
  },
];

const RecentAssetView = () => {
  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Recent Asset Views</h3>
      </div>
      <div className="card-body p-5">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-800">
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Asset Name</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Prospect</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Viewer</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Viewed On</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Total Views</th>
            </tr>
          </thead>
          <tbody>
            {recentAssets.map((asset) => (
              <tr key={asset.id} className="text-sm text-gray-700 border-b">
                {/* Asset Name */}
                <td className="py-2 px-4 flex items-center gap-2">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full h-8 w-8">
                  <img src={toAbsoluteUrl(`/media/file-types/${asset.type}.svg`)} alt="" />
                  </div>
                  <span>{asset.name}</span>
                </td>
                {/* Prospect Name */}
                <td className="py-2 px-4">{asset.prospect}</td>
                {/* Viewer Name */}
                <td className="py-2 px-4 flex items-center gap-2">
                  <img
                    src={toAbsoluteUrl(`/media/avatars/${asset.viewer.avatar}`)}
                    alt={asset.viewer.name}
                    className="w-6 h-6 rounded-full border border-gray-200"
                    title={asset.viewer.name}
                  />
                  <span>{asset.viewer.name}</span>
                </td>
                {/* Viewed On */}
                <td className="py-2 px-4">
                  {new Date(asset.timestamp).toLocaleString()}
                </td>
                {/* Total Views */}
                <td className="py-2 px-4 text-center">{asset.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <a href="#" className="text-blue-600 font-medium hover:underline">
            View All Assets →
          </a>
        </div>
      </div>
    </div>
  );
};

export { RecentAssetView };
