import { Link, useLocation, useParams } from 'react-router-dom';

interface DealPageMenuProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export const DealPageMenu = ({ onViewChange, currentView }: DealPageMenuProps) => {
  const location = useLocation();
  const { dealId } = useParams();

  const menuItems = [
    {
      title: 'Overview',
      view: 'overview',
      path: 'overview'
    },
    {
      title: 'Messages',
      view: 'messages',
      path: 'messages'
    },
    {
      title: 'Activities',
      view: 'activities',
      path: 'activities'
    },
    {
      title: 'Documents',
      view: 'documents',
      path: 'documents'
    },
    {
      title: 'Stakeholders',
      view: 'stakeholders',
      path: 'stakeholders'
    }, 
    {
      title: 'To-Do List',
      view: 'to-do-list',
      path: 'to-do-list'
    },
    {
      title: 'Milestones',
      view: 'milestones',
      path: 'milestones'
    }
  ];

  // Get the current path from the URL
  const currentPath = location.pathname.split('/').pop();

  return (
    <div className="flex items-center gap-8">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          to={`/deals/${dealId}/${item.path}`}
          onClick={() => onViewChange(item.view)}
          className="relative py-4 px-1"
        >
          <span className={`text-sm font-medium ${
            currentPath === item.path
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'
          }`}>
            {item.title}
          </span>
          {currentPath === item.path && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
          )}
        </Link>
      ))}
    </div>
  );
};