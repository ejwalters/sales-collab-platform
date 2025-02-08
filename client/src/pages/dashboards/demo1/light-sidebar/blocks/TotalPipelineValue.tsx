import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { useLanguage } from '@/i18n';
import { DropdownCard1 } from '@/partials/dropdowns/general';

interface IPipelineSegment {
  color: string; // Tailwind class for color
  label: string;
  value: number; // Segment value in dollars
  percentage: number; // Segment percentage
}
interface IPipelineSegments extends Array<IPipelineSegment> {}

const TotalPipelineValue = () => {
  const { isRTL } = useLanguage();

  const totalValue = 525000; // Example total pipeline value
  const percentageChange = 4.3; // Example percentage change

  // Pipeline segments (example data)
  const pipelineSegments: IPipelineSegments = [
    { color: 'bg-success', label: 'High-Value Deals', value: 300000, percentage: 57 },
    { color: 'bg-brand', label: 'Medium-Value Deals', value: 150000, percentage: 29 },
    { color: 'bg-info', label: 'Low-Value Deals', value: 75000, percentage: 14 },
  ];

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Total Pipeline Value</h3>

        <Menu>
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'bottom-start' : 'bottom-end',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [0, -10] : [0, 10], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
            {DropdownCard1()}
          </MenuItem>
        </Menu>
      </div>

      <div className="card-body flex flex-col gap-4 p-5 lg:p-7.5 lg:pt-4">
        {/* Total Value */}
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-normal text-gray-700">Total Pipeline Value</span>

          <div className="flex items-center gap-2.5">
            <span className="text-3xl font-semibold text-gray-900">
              ${totalValue.toLocaleString()}
            </span>
            <span
              className={`badge badge-outline ${
                percentageChange >= 0 ? 'badge-success' : 'badge-danger'
              } badge-sm`}
            >
              {percentageChange >= 0 ? '+' : ''}
              {percentageChange}%
            </span>
          </div>
        </div>

        {/* Colored Bar */}
        <div className="flex items-center gap-1 mb-1.5">
          {pipelineSegments.map((segment, index) => (
            <div
              key={index}
              className={`${segment.color} h-2 rounded-sm`}
              style={{ width: `${segment.percentage}%` }}
            ></div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-4 mb-1">
          {pipelineSegments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className={`badge badge-dot size-2 ${segment.color}`}></span>
              <span className="text-sm font-normal text-gray-800">{segment.label}</span>
            </div>
          ))}
        </div>

        {/* Breakdown Rows */}
        <div className="border-b border-gray-300"></div>
        <div className="grid gap-3">
          {pipelineSegments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-normal text-gray-900">{segment.label}</span>
              </div>

              <div className="flex items-center text-sm font-medium text-gray-800 gap-6">
                <span>${segment.value.toLocaleString()}</span>
                <span>{segment.percentage}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="mt-3">
          <a href="/pipeline" className="btn btn-light btn-sm">
            View All Deals
          </a>
        </div>
      </div>
    </div>
  );
};

export { TotalPipelineValue };
