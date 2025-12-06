import React, { useState, useEffect } from 'react';
import { ArrowUp, Wifi, Settings } from 'lucide-react';

interface StatusBarProps {
  variant?: 'default' | 'white' | 'black' | 'transparent';
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ variant = 'default', appVersion, onVersionChange, onAdminClick }) => {
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
  const isBlack = variant === 'black';
  const isTransparent = variant === 'transparent';
  const bgClass = isWhite ? 'bg-white' : isBlack ? 'bg-black' : isTransparent ? 'bg-black/50 backdrop-blur-sm' : 'bg-primary';
  const textClass = isWhite ? 'text-gray-900' : 'text-white';
  const iconColor = isWhite ? 'text-gray-900' : 'text-white';
  const borderColor = isWhite ? 'border-gray-900' : 'border-white';
  const batteryTextColor = isWhite ? 'text-gray-900' : 'text-white';
  const signalBg = isWhite ? 'bg-gray-900' : 'bg-white';
  const signalBgDim = isWhite ? 'bg-gray-900/60' : 'bg-white/60';

  return (
    <div className={`${bgClass} px-4 pt-2 pb-2 flex items-center justify-between ${textClass} text-xs`}>
      {/* 左侧：时间和箭头 */}
      <div className="flex items-center gap-1">
        <span className="font-medium text-sm">{currentTime}</span>
        <ArrowUp className={`w-3 h-3 ${iconColor}`} strokeWidth={2.5} />
      </div>

      {/* 右侧：版本切换按钮、管理后台按钮、信号、WiFi、电池 */}
      <div className="flex items-center gap-1.5">
        {/* 版本切换按钮 */}
        {appVersion !== undefined && onVersionChange && (
          <div className="flex items-center gap-0.5 mr-1">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => onVersionChange(num)}
                className={`w-4 h-4 rounded text-[10px] font-semibold flex items-center justify-center transition-all ${
                  appVersion === num
                    ? isWhite
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-primary'
                    : isWhite
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-white/20 text-white'
                } hover:opacity-80 active:scale-95`}
                title={`版本 ${num}`}
              >
                {num}
              </button>
            ))}
          </div>
        )}

        {/* 管理后台按钮 */}
        {onAdminClick && (
          <button
            onClick={onAdminClick}
            className={`p-0.5 rounded transition-all hover:opacity-80 active:scale-95 mr-1`}
            title="管理后台"
          >
            <Settings className={`w-3.5 h-3.5 ${iconColor}`} strokeWidth={2.5} />
          </button>
        )}

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

