import { useState } from 'react';
import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
    isOnline?: boolean;
  };
  timestamp: string;
  reactions?: {
    emoji: string;
    count: number;
  }[];
  attachments?: {
    type: 'image' | 'audio' | 'file';
    url: string;
    name?: string;
    duration?: string;
  }[];
  readCount?: number;
}

interface ChatThread {
  id: string;
  name: string;
  preview: string;
  unreadCount?: number;
  timestamp: string;
  isPinned?: boolean;
  isRead?: boolean;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getRandomColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

const Avatar = ({ name, image }: { name: string; image?: string }) => {
  if (image) {
    return (
      <img
        src={toAbsoluteUrl(`/media/avatars/${image}`)}
        className="w-10 h-10 rounded-full"
        alt={name}
      />
    );
  }

  const initials = getInitials(name);
  const bgColor = getRandomColor(name);

  return (
    <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white font-medium`}>
      {initials}
    </div>
  );
};

const DealMessagesContent = () => {
  const [threads] = useState<ChatThread[]>([
    {
      id: '1',
      name: 'Design chat',
      preview: 'Jessie Rollins sent...',
      unreadCount: 1,
      timestamp: '4m'
    },
    {
      id: '2',
      name: 'Osman Campos',
      preview: 'You: Hey! We are read...',
      timestamp: '20m'
    },
    {
      id: '3',
      name: 'Project Discussion',
      preview: 'Alex: The latest updates...',
      timestamp: '1h',
      unreadCount: 3
    }
  ]);
  
  const [selectedThreadId, setSelectedThreadId] = useState<string>('1');
  const selectedThread = threads.find(thread => thread.id === selectedThreadId);
  const [searchQuery, setSearchQuery] = useState('');

  const [messages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "I added new flows to our design system. Now you can use them for your projects!",
      sender: {
        name: 'Jasmin Lowery',
        avatar: '300-1.png',
      },
      timestamp: '09:20',
      reactions: [
        { emoji: '👍', count: 4 }
      ]
    },
    {
      id: '2',
      content: "Hey guys! Important news!",
      sender: {
        name: 'Alex Hunt',
        avatar: '300-2.png',
      },
      timestamp: '09:24',
      readCount: 16
    },
    {
      id: '3',
      content: "Our intern @jchurch has successfully completed his probationary period and is now part of our team!",
      sender: {
        name: 'Alex Hunt',
        avatar: '300-2.png',
      },
      timestamp: '09:24',
      reactions: [
        { emoji: '🎉', count: 5 },
        { emoji: '👏', count: 4 }
      ]
    },
    {
      id: '4',
      content: "Jaden, my congratulations! I will be glad to work with you on a new project 😊",
      sender: {
        name: 'Jessie Rollins',
        avatar: '300-3.png',
      },
      timestamp: '09:27',
      readCount: 10
    },
    {
      id: '5',
      attachments: [
        {
          type: 'image',
          url: '/media/stock/600x400/img-1.png',
        }
      ],
      sender: {
        name: 'Jessie Rollins',
        avatar: '300-3.png',
      },
      timestamp: '09:30',
      content: '',
      readCount: 10
    }
  ]);

  return (
    <div className="flex h-[calc(100vh-220px)]">
      {/* Left Sidebar */}
      <div className="w-80 flex flex-col border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-white rounded-full border-0 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <KeenIcon 
              icon="search" 
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {threads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setSelectedThreadId(thread.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors
                ${selectedThreadId === thread.id 
                  ? 'bg-primary/10 border-l-4 border-primary' 
                  : 'hover:bg-gray-100 border-l-4 border-transparent'}`}
            >
              <Avatar name={thread.name} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium truncate ${
                    selectedThreadId === thread.id ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {thread.name}
                  </h3>
                  <span className="text-xs text-gray-500">{thread.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{thread.preview}</p>
              </div>

              {thread.unreadCount && (
                <div className="size-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {thread.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedThread ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Design chat</h2>
                <span className="text-sm text-gray-500">23 members, 10 online</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <KeenIcon icon="search" className="size-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <KeenIcon icon="phone" className="size-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <KeenIcon icon="dots-horizontal" className="size-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-4">
                    <Avatar name={message.sender.name} image={message.sender.avatar} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {message.sender.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                      
                      {message.content && (
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 text-gray-700 inline-block">
                          {message.content}
                        </div>
                      )}

                      {message.attachments?.map((attachment, index) => (
                        <div key={index} className="mt-2 max-w-md">
                          {attachment.type === 'image' && (
                            <img
                              src={toAbsoluteUrl(attachment.url)}
                              className="rounded-lg w-full"
                              alt="Attached image"
                            />
                          )}
                        </div>
                      ))}

                      {(message.reactions || message.readCount) && (
                        <div className="flex items-center gap-3 mt-2">
                          {message.reactions?.map((reaction, index) => (
                            <div 
                              key={index}
                              className="flex items-center gap-1 bg-white rounded-full px-2 py-1 text-sm border border-gray-200"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-gray-500">{reaction.count}</span>
                            </div>
                          ))}
                          {message.readCount && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <KeenIcon icon="eye" className="size-4" />
                              <span>{message.readCount}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="px-8 py-6 border-t border-gray-200">
              <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <button className="hover:bg-gray-200 rounded-full p-2 transition-colors shrink-0">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-gray-500"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <textarea
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-600 placeholder-gray-400 resize-none overflow-hidden min-h-[40px] max-h-[200px] py-2 text-base leading-relaxed"
                  style={{ height: '40px' }}
                  onChange={(e) => {
                    e.target.style.height = '40px';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <div className="flex items-center gap-3 shrink-0">
                  <button className="hover:bg-gray-200 rounded-full p-2 transition-colors">
                    <KeenIcon icon="microphone" className="size-5 text-gray-500" />
                  </button>
                  <button className="hover:bg-gray-200 rounded-full p-2 transition-colors">
                    <KeenIcon icon="paper-plane" className="size-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export { DealMessagesContent }; 