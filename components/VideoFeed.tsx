import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { VIDEO_FEED } from '../constants';

interface VideoFeedProps {
  onFeedClick?: (feedId: string) => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onFeedClick }) => {
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.getAttribute('data-image-id');
            if (imageId) {
              setVisibleImages((prev) => new Set(prev).add(imageId));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '50px', // 提前 50px 开始加载
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="mx-4 pb-24">
      <div className="grid grid-cols-2 gap-3">
        {VIDEO_FEED.map((video) => (
          <div 
            key={video.id} 
            className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onFeedClick?.(video.id)}
            ref={(el) => {
              if (el) imageRefs.current.set(video.id, el);
            }}
            data-image-id={video.id}
          >
            {/* 封面区：等比例铺满卡片，去掉黑边 */}
            <div className="relative aspect-[3/4] bg-gray-100">
              {visibleImages.has(video.id) ? (
                <img 
                  src={video.imageUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;