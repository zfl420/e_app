import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Smile, Plus, Mic, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_CHAT_HISTORY, CHAT_THREADS } from '../constants';

interface ChatDetailProps {
  chatId: string;
  onBack: () => void;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ chatId, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(SAMPLE_CHAT_HISTORY);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Find chat info
  const chatInfo = CHAT_THREADS.find(c => c.id === chatId) || { name: 'Chat', avatar: '' };

  useEffect(() => {
    // Scroll to bottom on mount
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text' as const
    };
    
    setMessages([...messages, newMsg]);
    setInputText('');
    
    // Auto scroll
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0 shadow-sm z-10">
        <button onClick={onBack} className="p-1 -ml-2">
          <ChevronLeft className="w-7 h-7 text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900 truncate max-w-[70%]">{chatInfo.name}</h1>
        <button className="p-1">
          <MoreHorizontal className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        <div className="text-center text-xs text-gray-300 py-2">11/30 15:02</div>
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full">
                  {msg.text}
                </span>
              </div>
            );
          }
          return (
            <div key={msg.id} className={`flex items-start gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
               {!msg.isMe && (
                 <img 
                   src={chatInfo.avatar || 'https://via.placeholder.com/40'} 
                   className="w-9 h-9 rounded-full object-cover border border-gray-200" 
                   alt="avatar"
                 />
               )}
               {msg.isMe && (
                 <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80"
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    alt="my avatar"
                 />
               )}
               
               <div className={`max-w-[70%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${
                 msg.isMe 
                   ? 'bg-secondary text-white rounded-tr-none' 
                   : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
               }`}>
                 {msg.text}
               </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-3 pb-safe">
        <div className="flex items-center gap-2 mb-2">
          <button className="text-gray-400 p-1"><Mic className="w-6 h-6" /></button>
          <div className="flex-1 bg-gray-50 rounded-lg flex items-center px-2 py-2">
             <input 
               type="text" 
               className="flex-1 bg-transparent border-none outline-none text-sm max-h-20"
               placeholder="发送消息..."
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
             <button className="text-gray-400 p-1 ml-1"><Smile className="w-5 h-5" /></button>
          </div>
          {inputText ? (
              <button 
                onClick={handleSend}
                className="bg-secondary text-white px-4 py-1.5 rounded-lg text-sm font-medium"
              >
                发送
              </button>
          ) : (
            <button className="text-gray-400 p-1"><Plus className="w-6 h-6" /></button>
          )}
        </div>
        {!inputText && (
             <div className="flex gap-6 px-4 pb-2">
                <div className="flex flex-col items-center gap-1 text-gray-500">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                        <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs">相册</span>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default ChatDetail;