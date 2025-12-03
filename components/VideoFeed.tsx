import React from 'react';
import { Play } from 'lucide-react';
import { VIDEO_FEED } from '../constants';

interface VideoFeedProps {
  onFeedClick?: (feedId: string) => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onFeedClick }) => {
  return (
    <div className="mx-4 pb-24">
      <div className="grid grid-cols-2 gap-3">
        {VIDEO_FEED.map((video) => (
          <div 
            key={video.id} 
            className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onFeedClick?.(video.id)}
          >
            {/* 封面区：等比例铺满卡片，去掉黑边 */}
            <div className="relative aspect-[3/4]">
              <img 
                src={video.imageUrl} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />

            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;