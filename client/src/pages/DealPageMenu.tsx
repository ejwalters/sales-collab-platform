import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

interface DealPageMenuProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export const DealPageMenu = ({ onViewChange, currentView }: DealPageMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dealId } = useParams();  // Add this


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
      view: 'activities'
    },
    {
      title: 'Documents',
      view: 'documents'
    },
    {
      title: 'Stakeholders',
      view: 'stakeholders'
    }
  ];

  const handleClick = (view: string, path: string) => {
    onViewChange(view);
    navigate(`/deals/${dealId}/${path}`, { replace: true });
  };

  return (
    <div className="flex items-center gap-8">
      {menuItems.map((item) => (
        <button
          key={item.title}
          onClick={() => handleClick(item.view, item.path)}
          className="relative py-4 px-1"
        >
          <span className={`text-sm font-medium ${
            currentView === item.view 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'
          }`}>
            {item.title}
          </span>
          {currentView === item.view && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};