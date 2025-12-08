import React, { useState } from 'react';
import { Search, Plus, Bell } from 'lucide-react';
import { CHAT_THREADS, CONTACTS_DATA } from '../constants';
import StatusBar from './StatusBar';

interface ChatListProps {
  onChatClick: (id: string) => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatClick, appVersion, onVersionChange, onAdminClick }) => {
  const [activeTab, setActiveTab] = useState<'messages' | 'contacts'>('messages');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Fixed Top Section */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto bg-white">
        {/* Status Bar */}
        <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />

        {/* Top Module: Tabs + Search（整体白色模块） */}
        <div className="border-b border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-4">
            <div className="flex items-end gap-6">
              <button
                onClick={() => setActiveTab('messages')}
                className={`text-lg font-bold relative pb-1 transition-colors ${activeTab === 'messages' ? 'text-secondary' : 'text-gray-400'}`}
              >
                消息
                {activeTab === 'messages' && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-secondary rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`text-base font-medium relative pb-1 transition-colors ${activeTab === 'contacts' ? 'text-secondary' : 'text-gray-400'}`}
              >
                联系人
              </button>
            </div>
            <button className="p-2 -mr-2 text-secondary">
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="bg-gray-100 rounded-full h-9 flex items-center px-3 border border-gray-100">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="搜索"
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Module：与上方白色模块之间通过灰色背景留出间隔 */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-[11rem] mt-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <Bell className="w-6 h-6 text-white" fill="white" />
                      </div>
                    ) : (
                      <img 
                        src={thread.avatar} 
                        alt={thread.name} 
                        className="w-12 h-12 rounded-full object-cover border border-gray-100" 
                      />
                    )}
                    {/* 未读角标 */}
                    {thread.id === 'ai_buy' && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary border-2 border-white rounded-full"></span>
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
              <div className="bg-gray-50 px-4 py-1 text-sm text-gray-500 font-medium">常用联系人</div>
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
                      <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{contact.role}</span>
                      <span className="text-xs text-gray-400">{contact.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;