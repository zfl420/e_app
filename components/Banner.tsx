import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="mx-4 mb-6 rounded-2xl overflow-hidden shadow-lg relative group h-32 cursor-pointer">
      <img 
        src="https://picsum.photos/800/300?grayscale&blur=2" 
        alt="Banner" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Simulated overlay content based on original UI */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent flex items-center pl-6">
        <div className="text-white">
          <div className="flex items-start gap-3 mb-1">
             <div className="bg-secondary p-1 rounded-lg text-center shadow-lg">
                <div className="text-xs font-bold">11/30</div>
                <div className="text-[10px] opacity-80">星期日</div>
             </div>
             <div>
               <h3 className="font-bold text-lg leading-tight text-white drop-shadow-md">巨江银离子空调滤</h3>
               <p className="text-sm font-light text-gray-200">清新 自在呼吸</p>
             </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white/80">
        广告
      </div>
    </div>
  );
};

export default Banner;