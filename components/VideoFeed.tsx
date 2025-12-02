import React from 'react';
import { Play } from 'lucide-react';
import { VIDEO_FEED } from '../constants';

const VideoFeed: React.FC = () => {
  return (
    <div className="mx-4 pb-24">
      <div className="grid grid-cols-2 gap-3">
        {VIDEO_FEED.map((video) => (
          <div key={video.id} className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative aspect-[3/4]">
              <img 
                src={video.imageUrl} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <Play fill="white" className="text-white w-4 h-4 ml-0.5" />
                </div>
              </div>

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                 <h3 className="text-white font-extrabold text-[15px] leading-snug mb-1 drop-shadow-md">{video.title}</h3>
              </div>
            </div>
            
            <div className="p-3 bg-white">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-100">
                        <img src={`https://picsum.photos/seed/${video.id}/50`} className="w-full h-full object-cover" alt="avatar" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium truncate">{video.author}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;