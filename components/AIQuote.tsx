import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, AudioWaveform, Plus, ShoppingCart, CheckCircle, ChevronRight, Menu, Image as ImageIcon } from 'lucide-react';

interface AIQuoteProps {
  onBack: () => void;
  onViewOrderDetail?: () => void;
}

type MessageType = 'text' | 'image' | 'vehicle_card' | 'selection_prompt' | 'quote_card' | 'success_card';

interface Message {
  id: string;
  type: MessageType;
  content: any;
  isBot: boolean;
}

const AIQuote: React.FC<AIQuoteProps> = ({ onBack, onViewOrderDetail }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'text',
      content: 'HI~，欢迎使用快准AI助手\n请拍摄车架号开始智能采购',
      isBot: true
    }
  ]);
  const [flowState, setFlowState] = useState<'idle' | 'analyzing' | 'selecting' | 'quoted' | 'success'>('idle');
  const [quantities, setQuantities] = useState<Record<string, number>>({ 'air': 4, 'oil': 2 });

  // 从车型名称中提取品牌名
  const getBrandName = (model: string): string => {
    // 常见品牌列表
    const brands = ['奔驰', '宝马', '奥迪', '大众', '丰田', '本田', '日产', '别克', '雪佛兰', '福特', '现代', '起亚', '标致', '雪铁龙', '雷诺', '沃尔沃', '路虎', '捷豹', '保时捷', '玛莎拉蒂', '法拉利', '兰博基尼', '特斯拉', '理想', '蔚来', '小鹏', '比亚迪', '吉利', '长城', '长安', '奇瑞', '传祺', '荣威', '名爵', '领克', '魏牌', '红旗'];
    
    for (const brand of brands) {
      if (model.includes(brand)) {
        return brand;
      }
    }
    
    // 如果没有匹配到，取第一个词（通常是品牌）
    const firstWord = model.split(/\s+/)[0];
    return firstWord.length > 4 ? firstWord.substring(0, 4) : firstWord;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleCameraClick = () => {
    if (flowState !== 'idle') return;

    // 1. User sends image
    const userImgMsg: Message = {
      id: Date.now().toString(),
      type: 'image',
      content: '/vin/vin_scan.png', // VIN scan image
      isBot: false
    };
    setMessages(prev => [...prev, userImgMsg]);
    setFlowState('analyzing');

    // 2. Simulate Thinking
    setTimeout(() => {
        const thinkingMsg: Message = { id: 'thinking', type: 'text', content: '正在思考中...', isBot: true };
        setMessages(prev => [...prev, thinkingMsg]);
    }, 500);

    // 3. Show Vehicle Card and Prompt
    setTimeout(() => {
        setMessages(prev => {
            const filtered = prev.filter(m => m.id !== 'thinking');
            return [
                ...filtered,
                {
                    id: 'vehicle',
                    type: 'vehicle_card',
                    content: {
                        model: '奔驰 GLA 200 1.6T 2019 动感型',
                        vin: 'LE4TG4DB9KL243278',
                        engine: 'EPC'
                    },
                    isBot: true
                },
                {
                    id: 'prompt',
                    type: 'selection_prompt',
                    content: '请 "选择" 或 "输入" 你想要的配件',
                    isBot: true
                }
            ];
        });
        setFlowState('selecting');
    }, 2000);
  };

  const handleChipClick = (chip: string) => {
      if (flowState !== 'selecting') return;

      // 1. User selects "Air Filter (3)" (Simulated)
      setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'text',
          content: '2滤', // "2 filters" shortcut text
          isBot: false
      }]);

      // 2. Bot generates quote
      setTimeout(() => {
          setMessages(prev => [...prev, {
              id: 'quote',
              type: 'quote_card',
              content: null,
              isBot: true
          }]);
          setFlowState('quoted');
      }, 800);
  };

  const handleCheckout = () => {
      setMessages(prev => [...prev, {
          id: 'success',
          type: 'success_card',
          content: null,
          isBot: true
      }]);
      setFlowState('success');
  };

  const updateQuantity = (id: string, delta: number) => {
      setQuantities(prev => ({
          ...prev,
          [id]: Math.max(1, (prev[id] || 0) + delta)
      }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center gap-3">
            <button className="p-1" onClick={onBack}><ChevronLeft className="w-6 h-6 text-gray-700" /></button>
        </div>
        <h1 className="text-base font-bold text-gray-900">AI报价</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex justify-center py-2">
         <span className="text-xs text-gray-400">下拉查看历史记录</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                
                {/* Text Message */}
                {msg.type === 'text' && (
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white text-gray-800' : 'bg-white border border-gray-100 text-gray-800'}`}>
                        {msg.content === '正在思考中...' ? (
                             <div className="flex items-center gap-2">
                                <span>正在思考中</span>
                                <div className="flex gap-1">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                             </div>
                        ) : (
                            <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                        )}
                    </div>
                )}

                {/* Image Message */}
                {msg.type === 'image' && (
                    <div className="max-w-[70%] rounded-xl overflow-hidden border border-gray-200">
                        <img src={msg.content} alt="uploaded" className="w-full h-auto" />
                    </div>
                )}

                {/* Vehicle Card */}
                {msg.type === 'vehicle_card' && (
                    <div className="max-w-[85%] bg-gray-100 rounded-xl p-3 border border-gray-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-slate-400">
                                    {getBrandName(msg.content.model)}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">{msg.content.model}</h3>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                    <span>{msg.content.vin}</span>
                                    <span className="bg-gray-200 px-1 rounded text-[10px]">{msg.content.engine}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selection Prompt */}
                {msg.type === 'selection_prompt' && (
                    <div className="flex flex-col gap-3 max-w-[85%]">
                         <div className="bg-white p-3 rounded-2xl text-sm text-gray-800">
                             {msg.content}
                         </div>
                         <div className="flex flex-wrap gap-2">
                             <button onClick={() => handleChipClick('2filter')} className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 flex items-center gap-1 active:scale-95 transition-transform">
                                2滤 <ChevronRight className="w-3 h-3" />
                             </button>
                             <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 flex items-center gap-1">
                                蓄电池 <ChevronRight className="w-3 h-3" />
                             </button>
                             <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 flex items-center gap-1">
                                火花塞 <ChevronRight className="w-3 h-3" />
                             </button>
                         </div>
                         <button className="text-secondary text-sm self-start px-2">查看全部配件 &gt;</button>
                    </div>
                )}

                {/* Quote Card (Complex Interactive) */}
                {msg.type === 'quote_card' && (
                    <div className="max-w-[95%] w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Quote Header */}
                        <div className="p-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-start gap-2">
                                <div className="w-8 h-8 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center shrink-0">
                                   <span className="text-[10px] font-bold text-slate-400">
                                       {getBrandName('奔驰 GLA 200 1.6T 2019 动感型')}
                                   </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm">奔驰 GLA 200 1.6T 2019 动感型</h3>
                                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                        LE4TG4DB9KL243278 <span className="bg-gray-200 px-0.5 rounded">EPC</span>
                                    </div>
                                </div>
                                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">2滤</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-600 flex justify-between">
                                <span>识别到以下配件，请选择:</span>
                                <span className="underline decoration-gray-400">修改配件</span>
                            </div>
                        </div>

                        {/* List - Air Filter */}
                        <div className="p-3 border-b border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-800">空气滤芯 (3)</span>
                                <span className="text-xs bg-red-50 text-secondary px-1.5 py-0.5 rounded">用量: 4</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">马勒 OX1188DECO</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-secondary">¥ 29</span>
                                        <button className="w-5 h-5 bg-gray-100 rounded text-gray-500 flex items-center justify-center">+</button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-gray-600">巨江 JO05345</span>
                                        <span className="text-[9px] bg-gray-100 text-gray-400 px-1 rounded">微仓</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-secondary">¥ 29</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQuantity('air', -1)} className="w-5 h-5 bg-gray-100 rounded text-gray-500 flex items-center justify-center">-</button>
                                            <span className="text-xs font-medium w-3 text-center">{quantities['air']}</span>
                                            <button onClick={() => updateQuantity('air', 1)} className="w-5 h-5 bg-gray-100 rounded text-gray-500 flex items-center justify-center">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">巨江 JO05345</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-secondary">¥ 29</span>
                                        <button className="w-5 h-5 bg-gray-100 rounded text-gray-500 flex items-center justify-center">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <ChevronDownIcon className="w-4 h-4 text-gray-300 mx-auto" />
                            </div>
                        </div>

                         {/* List - Oil Filter (Collapsed style) */}
                         <div className="p-3 bg-gray-50/50">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-800">空调滤芯 (5)</span>
                            </div>
                            <div className="space-y-2">
                                 <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">巴固特 XXX 碳陶</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-secondary">¥ 29</span>
                                        <button className="w-5 h-5 bg-gray-100 rounded text-gray-500 flex items-center justify-center">+</button>
                                    </div>
                                </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">巴固特 XXX 碳陶</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-secondary">¥ 29</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQuantity('oil', -1)} className="w-5 h-5 bg-white rounded text-gray-500 flex items-center justify-center border border-gray-200">-</button>
                                            <span className="text-xs font-medium w-3 text-center">{quantities['oil']}</span>
                                            <button onClick={() => updateQuantity('oil', 1)} className="w-5 h-5 bg-white rounded text-gray-500 flex items-center justify-center border border-gray-200">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>

                         {/* Footer Total */}
                         <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                             <div className="flex items-center gap-2">
                                 <div className="relative">
                                     <ShoppingCart className="w-6 h-6 text-secondary" />
                                     <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-secondary text-white text-xs flex items-center justify-center rounded-full border border-white">2</span>
                                 </div>
                                 <div>
                                     <div className="text-secondary font-bold text-lg leading-none">¥ 355.52</div>
                                     <div className="text-xs text-gray-400">优惠 ¥0.00 &nbsp; 明细 ^</div>
                                 </div>
                             </div>
                             <button onClick={handleCheckout} className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-red-100">
                                 结算
                             </button>
                         </div>
                    </div>
                )}

                {/* Success Card */}
                {msg.type === 'success_card' && (
                    <div className="max-w-[85%] w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                         <div className="flex items-center gap-2 mb-3">
                             <CheckCircle className="w-5 h-5 text-red-500" />
                             <span className="font-bold text-gray-900">下单成功</span>
                         </div>
                         <div className="space-y-3 mb-4">
                             <div>
                                 <div className="text-xs text-gray-500 mb-1">火花塞</div>
                                 <div className="flex justify-between text-xs">
                                     <span className="text-gray-800">巨江 JO05345</span>
                                     <span><span className="text-secondary">¥66.66</span> x4</span>
                                 </div>
                             </div>
                             <div>
                                 <div className="text-xs text-gray-500 mb-1">刹车片</div>
                                 <div className="flex justify-between text-xs">
                                     <span className="text-gray-800">巴固特 XXX 碳陶</span>
                                     <span><span className="text-secondary">¥88.88</span> x1</span>
                                 </div>
                             </div>
                         </div>
                         <button 
                             onClick={() => onViewOrderDetail?.()}
                             className="w-full border border-secondary text-secondary rounded-full py-2 text-xs font-medium active:bg-red-50 transition-colors"
                         >
                             查看订单详情
                         </button>
                    </div>
                )}

            </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 pb-safe flex items-center gap-4 sticky bottom-0 z-20">
          <button onClick={handleCameraClick} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Camera className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
          </button>
          <div className="flex-1 bg-gray-50 h-10 rounded-full flex items-center px-4 border border-gray-100">
              <input type="text" placeholder="输入 VIN 码或文字" className="bg-transparent w-full text-sm outline-none" disabled />
          </div>
          <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors border border-gray-200">
              <AudioWaveform className="w-5 h-5 text-gray-700" />
          </button>
      </div>
    </div>
  );
};

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

export default AIQuote;