import React, { useState, useEffect } from 'react';
import { ArrowUp, Wifi } from 'lucide-react';

interface StatusBarProps {
  variant?: 'default' | 'white';
}

const StatusBar: React.FC<StatusBarProps> = ({ variant = 'default' }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    // 立即更新一次
    updateTime();

    // 每分钟更新一次
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const isWhite = variant === 'white';
  const bgClass = isWhite ? 'bg-white' : 'bg-primary';
  const textClass = isWhite ? 'text-gray-900' : 'text-white';
  const iconColor = isWhite ? 'text-gray-900' : 'text-white';
  const borderColor = isWhite ? 'border-gray-900' : 'border-white';
  const batteryTextColor = isWhite ? 'text-gray-900' : 'text-primary';
  const signalBg = isWhite ? 'bg-gray-900' : 'bg-white';
  const signalBgDim = isWhite ? 'bg-gray-900/60' : 'bg-white/60';

  return (
    <div className={`${bgClass} px-4 pt-2 pb-2 flex items-center justify-between ${textClass} text-xs`}>
      {/* 左侧：时间和箭头 */}
      <div className="flex items-center gap-1">
        <span className="font-medium text-sm">{currentTime}</span>
        <ArrowUp className={`w-3 h-3 ${iconColor}`} strokeWidth={2.5} />
      </div>

      {/* 右侧：信号、WiFi、电池 */}
      <div className="flex items-center gap-1.5">
        {/* 信号强度 */}
        <div className="flex items-end gap-0.5">
          <div className={`w-1 h-1.5 ${signalBg} rounded-t`}></div>
          <div className={`w-1 h-2 ${signalBg} rounded-t`}></div>
          <div className={`w-1 h-2.5 ${signalBg} rounded-t`}></div>
          <div className={`w-1 h-3 ${signalBgDim} rounded-t`}></div>
        </div>

        {/* WiFi图标 */}
        <Wifi className={`w-3.5 h-3.5 ${iconColor}`} strokeWidth={2.5} />

        {/* 电池图标 */}
        <div className="flex items-center gap-0.5">
          <div className={`relative w-5 h-2.5 border ${borderColor} rounded-sm`}>
            <div className={`absolute left-full top-1/2 -translate-y-1/2 w-0.5 h-1.5 ${signalBg} rounded-r`}></div>
            <div className={`absolute inset-0.5 ${signalBg} rounded-sm`} style={{ width: '23%' }}></div>
          </div>
          <span className={`text-[10px] font-medium ${batteryTextColor}`}>23</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;

