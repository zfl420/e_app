import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import StatusBar from './StatusBar';
import { ScanResult } from '../types';

interface ProductScanProps {
  onBack: () => void;
  onScanSuccess?: (result: ScanResult) => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const ProductScan: React.FC<ProductScanProps> = ({ 
  onBack, 
  onScanSuccess, 
  appVersion, 
  onVersionChange, 
  onAdminClick 
}) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // 自动开始扫描
    setIsScanning(true);
    setScanProgress(0);
    
    intervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          setIsScanning(false);
          // 模拟AI识别结果
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          // 模拟识别成功，延迟一下再触发回调
          setTimeout(() => {
            if (onScanSuccess) {
              // 模拟识别结果
              const mockResult: ScanResult = {
                productId: 'p1',
                productName: '美孚1号 0W-40 全合成机油',
                brand: '美孚',
                confidence: 0.95
              };
              onScanSuccess(mockResult);
            }
          }, 500);
          
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    
    // 清理函数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsScanning(false);
      setScanProgress(0);
    };
  }, [onScanSuccess]);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Status Bar */}
      <StatusBar variant="black" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      
      {/* Header with Back Button */}
      <div className="relative z-30">
        <div className="flex items-center px-4 pt-3 pb-3">
          <button onClick={onBack} className="p-1 -ml-1 mr-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-white">AI识别商品</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Camera Background Placeholder */}
      <div className="relative flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Simulated camera view with pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-white/30 rounded-2xl"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-4 border-white/20 rounded-xl"></div>
        </div>

        {/* Scan Frame Container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          {/* Instruction Text */}
          <div className="mb-4 text-center">
            <p className="text-white text-sm font-medium">请将商品置于框内，AI将自动识别</p>
          </div>

          {/* Tip Text with Close Button */}
          {showTip && (
            <div className="mb-6 z-30">
              <div className="relative bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 text-center">
                <p className="text-white text-xs pr-6">请保持相机正对商品，确保光线充足</p>
                <button
                  onClick={() => setShowTip(false)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Scan Frame */}
          <div className="relative w-72 h-40">
            {/* Dashed Border Frame */}
            <div className="absolute inset-0 border-2 border-white border-dashed rounded-2xl"></div>
            
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl"></div>

            {/* Progress Bar */}
            {isScanning && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-white text-xs">AI识别中...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScan;

