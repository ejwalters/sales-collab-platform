import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';


const RecentMessages = () => {
  const messages = [
    {
      id: '1',
      prospect: 'Acme Corp',
      sender: { name: 'John Doe', avatar: '300-1.png' },
      content: 'Hi there, we are ready to proceed with the next step.',
      timestamp: '2025-02-08T14:30:00Z'
    },
    {
      id: '2',
      prospect: 'Global Tech',
      sender: { name: 'Alice Brown', avatar: '300-2.png' },
      content: 'Thanks for the update. Let me confirm with my team.',
      timestamp: '2025-02-08T13:15:00Z'
    },
    {
      id: '3',
      prospect: 'Innovative Solutions',
      sender: { name: 'Charlie White', avatar: '300-3.png' },
      content: 'Can we schedule a call to discuss further?',
      timestamp: '2025-02-08T10:45:00Z'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Messages</h3>
        <button className="btn btn-sm btn-icon btn-light btn-clear">
          <KeenIcon icon="dots-vertical" />
        </button>
      </div>

      <div className="card-body p-5">
        <div className="table-responsive">
          <table className="table table-borderless align-middle">
            <thead>
              <tr>
                <th className="text-gray-600 text-xs font-semibold uppercase">Prospect</th>
                <th className="text-gray-600 text-xs font-semibold uppercase">Sender</th>
                <th className="text-gray-600 text-xs font-semibold uppercase">Message</th>
                <th className="text-gray-600 text-xs font-semibold uppercase">Sent On</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td className="text-gray-900 text-sm font-medium">{message.prospect}</td>
                  <td className="text-gray-900 text-sm flex items-center gap-2">
                    <img
                      src={toAbsoluteUrl(`/media/avatars/${message.sender.avatar}`)}
                      alt={message.sender.name}
                      className="w-6 h-6 rounded-full"
                    />
                    {message.sender.name}
                  </td>
                  <td
                    className="text-gray-600 text-sm truncate max-w-[200px]"
                    title={message.content}
                  >
                    {message.content}
                  </td>
                  <td className="text-gray-600 text-sm">
                    {new Date(message.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-footer text-center">
        <a href="#" className="text-primary font-medium hover:underline">
          View All Messages →
        </a>
      </div>
    </div>
  );
};

export { RecentMessages };
