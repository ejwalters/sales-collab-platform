import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';

import { DropdownCard1, DropdownCardItem1 } from '@/partials/dropdowns/general';

interface IRecentUploadsItem {
  image: string;
  desc: string;
  date: string;
  lastViewed: string;
  viewedBy: {
    name: string;
    avatar: string;
  };
}
interface IRecentUploadsItems extends Array<IRecentUploadsItem> {}

interface IRecentUploadsProps {
  title: string;
}

const RecentUploads = ({ title }: IRecentUploadsProps) => {
  const { isRTL } = useLanguage();

  const items: IRecentUploadsItems = [
    {
      image: 'pdf.svg',
      desc: 'Project-pitch.pdf',
      date: '26 Sep 2024',
      lastViewed: '2 hours ago',
      viewedBy: {
        name: 'Emma Smith',
        avatar: '/media/avatars/300-6.png'
      }
    },
    {
      image: 'doc.svg',
      desc: 'Report-v1.docx',
      date: '1 Oct 2024',
      lastViewed: 'Yesterday',
      viewedBy: {
        name: 'Max Harris',
        avatar: '/media/avatars/300-5.png'
      }
    },
    {
      image: 'ai.svg',
      desc: 'Framework-App.js',
      date: '17 Oct 2024',
      lastViewed: '3 days ago',
      viewedBy: {
        name: 'Sean Bean',
        avatar: '/media/avatars/300-1.png'
      }
    },
    {
      image: 'js.svg',
      desc: 'Mobile-logo.ai',
      date: '4 Nov 2024',
      lastViewed: '1 week ago',
      viewedBy: {
        name: 'Brian Cox',
        avatar: '/media/avatars/300-2.png'
      }
    }
  ];

  return (
    <div className="card">
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
                    offset: isRTL() ? [0, -10] : [0, 10]
                  }
                }
              ]
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
            {DropdownCard1()}
          </MenuItem>
        </Menu>
      </div>

      <div className="card-body p-5">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-800">
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">File Name</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Date</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Last Viewed</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Viewed By</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="text-sm text-gray-700 border-b">
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2.5">
                    <img src={toAbsoluteUrl(`/media/file-types/${item.image}`)} alt="" className="w-8 h-8" />
                    <span className="text-sm font-medium text-gray-900 cursor-pointer hover:text-primary">
                      {item.desc}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <span className="text-xs text-gray-700">{item.date}</span>
                </td>
                <td className="py-2 px-4">
                  <span className="text-sm text-gray-600">{item.lastViewed}</span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={toAbsoluteUrl(item.viewedBy.avatar)} 
                      alt={item.viewedBy.name}
                      className="w-6 h-6 rounded-full border border-gray-200"
                    />
                    <span className="text-sm text-gray-600">{item.viewedBy.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4">
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
                              offset: isRTL() ? [0, -10] : [0, 10]
                            }
                          }
                        ]
                      }}
                    >
                      <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
                        <KeenIcon icon="dots-vertical" />
                      </MenuToggle>
                      {DropdownCardItem1()}
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-footer justify-center">
        <Link to="/account/integrations" className="btn btn-link">
          All Files
        </Link>
      </div>
    </div>
  );
};

export {
  RecentUploads,
  type IRecentUploadsItem,
  type IRecentUploadsItems,
  type IRecentUploadsProps
};
