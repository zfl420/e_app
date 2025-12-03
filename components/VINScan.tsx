import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, VolumeX } from 'lucide-react';

interface VINScanProps {
  onBack: () => void;
  initialTab?: 'plate' | 'vin' | 'permit';
  onSkip?: () => void;
}

const VINScan: React.FC<VINScanProps> = ({ onBack, initialTab = 'vin', onSkip }) => {
  const [activeTab, setActiveTab] = useState<'plate' | 'vin' | 'permit'>(initialTab);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // 当切换到VIN码时，自动开始扫描
    if (activeTab === 'vin') {
      setIsScanning(true);
      setScanProgress(0);
      
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      
      // 清理函数
      return () => {
        clearInterval(interval);
        setIsScanning(false);
        setScanProgress(0);
      };
    } else {
      setScanProgress(0);
      setIsScanning(false);
    }
  }, [activeTab]);

  const getTabLabel = (tab: 'plate' | 'vin' | 'permit') => {
    switch (tab) {
      case 'plate':
        return '车牌';
      case 'vin':
        return 'VIN码';
      case 'permit':
        return '行驶证';
      default:
        return '';
    }
  };

  const getScanInstruction = () => {
    switch (activeTab) {
      case 'plate':
        return '请将车牌置于框内,即可自动识别';
      case 'vin':
        return '请将VIN码置于框内,即可自动识别';
      case 'permit':
        return '请将行驶证置于框内,即可自动识别';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Camera Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Simulated camera view with pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-white/30 rounded-2xl"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-4 border-white/20 rounded-xl"></div>
        </div>
      </div>

      {/* Top Status Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-2 z-30">
        <div className="bg-black/80 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Top Instruction Overlay */}
      <div className="absolute top-12 left-0 right-0 z-30 px-4">
        <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 text-center">
          <p className="text-white text-xs">请保持相机正对识别物体,避免反光</p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onBack}
        className="absolute top-12 right-4 z-30 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Scan Frame */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative w-72 h-48">
          {/* Dashed Border Frame */}
          <div className="absolute inset-0 border-2 border-white border-dashed rounded-2xl"></div>
          
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl"></div>

          {/* Instruction Text */}
          <div className="absolute -top-12 left-0 right-0 text-center">
            <p className="text-white text-sm font-medium">{getScanInstruction()}</p>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skip Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-24 z-20">
        <button 
          onClick={onSkip}
          className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-2.5 rounded-xl text-sm font-medium border-2 border-gray-200 shadow-lg active:scale-95 transition-transform"
        >
          跳过,直接开单
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-black/90 backdrop-blur-md pb-safe">
          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-8 px-4 py-4">
            {(['plate', 'vin', 'permit'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex flex-col items-center gap-1 relative"
              >
                {/* Active Indicator Dot */}
                {activeTab === tab && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
                <span
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {getTabLabel(tab)}
                </span>
                {/* Active Underline */}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between px-4 pb-4">
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <VolumeX className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VINScan;

