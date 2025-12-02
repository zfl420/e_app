import React, { useState } from 'react';
import { Search, Plus, Bell } from 'lucide-react';
import { CHAT_THREADS, CONTACTS_DATA } from '../constants';

interface ChatListProps {
  onChatClick: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatClick }) => {
  const [activeTab, setActiveTab] = useState<'messages' | 'contacts'>('messages');

  return (
    <div className="flex flex-col h-full bg-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-end gap-6">
          <button 
            onClick={() => setActiveTab('messages')}
            className={`text-xl font-bold relative pb-1 transition-colors ${activeTab === 'messages' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            消息
            {activeTab === 'messages' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-secondary rounded-full"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`text-lg font-medium relative pb-1 transition-colors ${activeTab === 'contacts' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            联系人
          </button>
        </div>
        <button className="p-2 -mr-2 text-gray-600">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="bg-gray-100 rounded-full h-9 flex items-center px-3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="搜索" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'messages' ? (
          <div>
            {CHAT_THREADS.map((thread) => (
              <div 
                key={thread.id} 
                onClick={() => onChatClick(thread.id)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-50 last:border-none"
              >
                <div className="relative shrink-0">
                  {thread.isSystem ? (
                    <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                      <Bell className="w-6 h-6 text-white" fill="white" />
                    </div>
                  ) : (
                    <img 
                      src={thread.avatar} 
                      alt={thread.name} 
                      className="w-12 h-12 rounded-full object-cover border border-gray-100" 
                    />
                  )}
                  {/* Badge example for demonstration */}
                  {thread.id === 'ai_buy' && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-semibold text-gray-900 truncate pr-2">{thread.name}</h3>
                    {thread.time && <span className="text-xs text-gray-400 shrink-0">{thread.time}</span>}
                  </div>
                  {thread.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">{thread.lastMessage}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Group Header Example */}
            <div className="bg-gray-50 px-4 py-1 text-xs text-gray-500 font-medium">常用联系人</div>
            {CONTACTS_DATA.map((contact) => (
              <div 
                key={contact.id} 
                onClick={() => onChatClick(contact.id)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-50"
              >
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-100" 
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{contact.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{contact.role}</span>
                    <span className="text-xs text-gray-400">{contact.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;