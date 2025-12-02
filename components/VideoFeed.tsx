import React from 'react';
import { Play } from 'lucide-react';
import { VIDEO_FEED } from '../constants';

const VideoFeed: React.FC = () => {
  return (
    <div className="mx-4 pb-24">
      <div className="grid grid-cols-2 gap-3">
        {VIDEO_FEED.map((video) => (
          <div key={video.id} className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            {/* 封面区：完整展示物料图，不再叠加标题遮挡 */}
            <div className="relative aspect-[3/4] bg-black">
              <img 
                src={video.imageUrl} 
                alt={video.title} 
                className="w-full h-full object-contain"
              />

              {/* 中间播放按钮 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <Play fill="white" className="text-white w-4 h-4 ml-0.5" />
                </div>
              </div>
            </div>
            
            {/* 底部账号 / 品牌信息区 */}
            <div className="p-3 bg-white">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-100">
                        <img src={`https://picsum.photos/seed/${video.id}/50`} className="w-full h-full object-cover" alt="avatar" />
                    </div>
                    <span className="text-xs text-gray-800 font-medium truncate">{video.author}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;