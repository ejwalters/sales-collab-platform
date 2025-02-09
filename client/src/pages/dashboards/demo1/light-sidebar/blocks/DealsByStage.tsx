import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useLanguage } from '@/i18n';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownCard2 } from '@/partials/dropdowns/general';

interface IDealsByStageProps {
  title: string;
}

const DealsByStage = ({ title }: IDealsByStageProps) => {
  const { isRTL } = useLanguage();
  const data: number[] = [44, 55, 41, 17];
  const labels: string[] = ['Discovery', 'Proposal', 'Validation', 'Closed'];
  const colors: string[] = [
    'var(--tw-primary)',
    'var(--tw-brand)',
    'var(--tw-success)',
    'var(--tw-info)'
  ];

  const options: ApexOptions = {
    series: data,
    labels: labels,
    colors: colors,
    fill: {
      colors: colors
    },
    chart: {
      type: 'donut',
      height: '100%'
    },
    stroke: {
      show: true,
      width: 2
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '80%' // Increase the donut size
        }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: '500',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      labels: {
        colors: 'var(--tw-gray-700)'
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>

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
                    offset: isRTL() ? [0, -10] : [0, 10] // [skid, distance]
                  }
                }
              ]
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
            {DropdownCard2()}
          </MenuItem>
        </Menu>
      </div>

      <div className="card-body flex justify-center items-center px-1 py-1 h-[400px]"> {/* Increased height */}
        <ApexChart
          id="deals_by_stage_chart"
          options={options}
          series={data}
          type="donut"
          width="100%"
          height="350" // Increased chart height
        />
      </div>
    </div>
  );
};

export { DealsByStage, type IDealsByStageProps };
