import { Link } from 'react-router-dom';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';
import { useLanguage } from '@/i18n';

interface IConversationParticipant {
  name: string;
  avatar: string;
  role: string;
}

interface IConversation {
  id: string;
  subject: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  participants: IConversationParticipant[];
}

const RecentConversations = () => {
  const { isRTL } = useLanguage();

  const conversations: IConversation[] = [
    {
      id: '1',
      subject: 'Q4 Proposal Discussion',
      lastMessage: "Ive reviewed the pricing structure and have some suggestions...",
      timestamp: '2 hours ago',
      unread: 3,
      participants: [
        {
          name: 'Emma Smith',
          avatar: '/media/avatars/300-6.png',
          role: 'Account Manager'
        },
        {
          name: 'Max Harris',
          avatar: '/media/avatars/300-5.png',
          role: 'Client'
        }
      ]
    },
    {
      id: '2',
      subject: 'Implementation Timeline',
      lastMessage: 'The development team has provided an updated schedule for...',
      timestamp: '5 hours ago',
      unread: 0,
      participants: [
        {
          name: 'Sean Bean',
          avatar: '/media/avatars/300-1.png',
          role: 'Technical Lead'
        },
        {
          name: 'Brian Cox',
          avatar: '/media/avatars/300-2.png',
          role: 'Project Manager'
        }
      ]
    },
    {
      id: '3',
      subject: 'Contract Review',
      lastMessage: 'Legal team has completed their initial review and...',
      timestamp: 'Yesterday',
      unread: 1,
      participants: [
        {
          name: 'Alan Johnson',
          avatar: '/media/avatars/300-3.png',
          role: 'Legal Advisor'
        }
      ]
    },
    {
      id: '4',
      subject: 'Product Demo Follow-up',
      lastMessage: 'Thank you for your time today. As discussed...',
      timestamp: '2 days ago',
      unread: 0,
      participants: [
        {
          name: 'Sarah Parker',
          avatar: '/media/avatars/300-4.png',
          role: 'Sales Engineer'
        }
      ]
    },
    {
      id: '5',
      subject: 'Budget Approval',
      lastMessage: 'The finance team has approved the proposed budget for...',
      timestamp: '3 days ago',
      unread: 0,
      participants: [
        {
          name: 'Robert Nash',
          avatar: '/media/avatars/300-7.png',
          role: 'Finance Director'
        }
      ]
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Conversations</h3>
        <Menu>
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'bottom-start' : 'bottom-end'
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
          </MenuItem>
        </Menu>
      </div>

      <div className="card-body p-5">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-800">
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Subject</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Participants</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Last Message</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase">Time</th>
              <th className="py-2 px-4 text-gray-600 text-xs font-semibold uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conversation) => (
              <tr key={conversation.id} className="text-sm text-gray-700 border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {conversation.subject}
                    </span>
                    {conversation.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex -space-x-2">
                    {conversation.participants.map((participant, index) => (
                      <img
                        key={index}
                        src={toAbsoluteUrl(participant.avatar)}
                        alt={participant.name}
                        title={`${participant.name} - ${participant.role}`}
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4">
                  <span className="text-sm text-gray-600 line-clamp-1">
                    {conversation.lastMessage}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <span className="text-xs text-gray-500">
                    {conversation.timestamp}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <Menu>
                    <MenuItem
                      toggle="dropdown"
                      trigger="click"
                      dropdownProps={{
                        placement: isRTL() ? 'bottom-start' : 'bottom-end'
                      }}
                    >
                      <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
                        <KeenIcon icon="dots-vertical" />
                      </MenuToggle>
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-footer justify-center">
        <Link to="/messages" className="btn btn-link">
          View All Messages
        </Link>
      </div>
    </div>
  );
};

export { RecentConversations };