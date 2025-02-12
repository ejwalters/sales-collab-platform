import { Link, useLocation } from 'react-router-dom';

const DealPageMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      title: 'Overview',
      path: '/deals/overview'
    },
    {
      title: 'Messages',
      path: '/deals/messages'
    },
    {
      title: 'Activities',
      path: '/deals/activities'
    },
    {
      title: 'Documents',
      path: '/deals/documents'
    },
    {
      title: 'Stakeholders',
      path: '/deals/stakeholders'
    }
  ];

  return (
    <div className="flex items-center gap-8">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          to={item.path}
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

export { DealPageMenu };