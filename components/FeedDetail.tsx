import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { VIDEO_FEED } from '../constants';

interface FeedDetailProps {
  feedId: string;
  onBack: () => void;
}

const FeedDetail: React.FC<FeedDetailProps> = ({ feedId, onBack }) => {
  const feed = VIDEO_FEED.find((v) => v.id === feedId);

  if (!feed) {
    return null;
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 图片容器 - 全屏显示 */}
      <div className="absolute inset-0">
        <img 
          src={feed.imageUrl} 
          alt={feed.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 顶部导航栏 */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-safe">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 底部信息栏 */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/70 to-transparent pb-safe">
        <div className="px-4 py-4">
          {/* 作者信息 */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">快</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-medium text-sm truncate">{feed.author}</span>
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-300 text-xs">已关注</span>
            </div>
          </div>

          {/* 标题和描述 */}
          <div className="mb-4">
            <h2 className="text-white font-medium text-base mb-2">{feed.title}</h2>
            <div className="flex items-center gap-2 text-gray-300 text-xs">
              <span>#拳王问的透</span>
              <span>🥊</span>
              <span>修车不踩漏</span>
            </div>
          </div>

          {/* 互动按钮 */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-white text-xs">67</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span className="text-white text-xs">312</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-white text-xs">68</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-white text-xs">4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;

