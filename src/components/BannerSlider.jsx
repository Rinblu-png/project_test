import React, { useState } from 'react';
import { PROMOTION_BANNERS } from '../data/products';

// ส่วนของแบนเนอร์โปรโมชั่น (Promotion Banner Component)
export default function BannerSlider({ onGoToProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banner = PROMOTION_BANNERS[currentIndex];

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMOTION_BANNERS.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROMOTION_BANNERS.length - 1 : prev - 1));
  };

  return (
    <section className="max-w-5xl mx-auto my-6 px-4">
      <div className="bg-[#FFE2E2] border-2 border-[#F5CBCB] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 relative shadow-sm">
        
        {/* รูปภาพแบนเนอร์ */}
        <div className="w-full md:w-1/2 h-56 rounded-xl overflow-hidden border border-[#F5CBCB]">
          <img 
            src={banner.image} 
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ข้อความและปุ่มกดแบนเนอร์ */}
        <div className="w-full md:w-1/2 space-y-3">
          <span className="inline-block px-3 py-1 bg-[#F5CBCB] text-[#4A3E50] text-xs font-bold rounded-full">
            {banner.tag}
          </span>
          <h2 className="text-2xl font-bold text-[#4A3E50]">
            {banner.title}
          </h2>
          <p className="text-xs text-[#6B5B72]">
            {banner.subtitle}
          </p>
          <div className="pt-2">
            <button
              onClick={onGoToProducts}
              className="px-6 py-2.5 bg-[#C5B3D3] hover:bg-[#b09cc0] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              {banner.buttonText} &rarr;
            </button>
          </div>
        </div>

        {/* ปุ่มเลื่อนสไลด์ Left/Right */}
        <button
          onClick={prevBanner}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FBEFEF] text-[#4A3E50] border border-[#F5CBCB] hover:bg-[#C5B3D3] hover:text-white font-bold flex items-center justify-center text-xs"
        >
          &lt;
        </button>

        <button
          onClick={nextBanner}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FBEFEF] text-[#4A3E50] border border-[#F5CBCB] hover:bg-[#C5B3D3] hover:text-white font-bold flex items-center justify-center text-xs"
        >
          &gt;
        </button>

      </div>
    </section>
  );
}
