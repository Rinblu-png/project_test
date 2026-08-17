import React from 'react';
import { STORE_INFO } from '../data/products';

// ส่วนของแถบเมนูด้านบน (Navbar)
export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-[#F5CBCB] border-b-2 border-[#F5CBCB] text-[#4A3E50] sticky top-0 z-40">
      
      {/* ข้อความแจ้งเตือนด้านบนสุด */}
      <div className="bg-[#C5B3D3] text-[#4A3E50] text-xs py-1.5 px-4 text-center font-medium">
        ยินดีต้อนรับสู่ร้าน {STORE_INFO.name} ({STORE_INFO.thName}) - การ์ดแท้ 100%
      </div>

      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* ชื่อร้านค้า (Logo) */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-lg bg-[#C5B3D3] flex items-center justify-center font-bold text-white text-lg">
            T
          </div>
          <div>
            <span className="text-2xl font-bold text-[#4A3E50]">
              {STORE_INFO.name}
            </span>
            <span className="text-xs block text-[#6B5B72]">
              {STORE_INFO.thName}
            </span>
          </div>
        </div>

        {/* ปุ่มเมนูนำทาง (Navigation Buttons) */}
        <nav className="flex items-center gap-2 text-sm font-medium">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-1.5 rounded-lg transition-colors ${
              currentPage === 'home'
                ? 'bg-[#C5B3D3] text-white font-bold'
                : 'bg-[#FFE2E2] text-[#4A3E50] hover:bg-[#FBEFEF]'
            }`}
          >
            หน้าแรก
          </button>

          <button
            onClick={() => setCurrentPage('products')}
            className={`px-4 py-1.5 rounded-lg transition-colors ${
              currentPage === 'products'
                ? 'bg-[#C5B3D3] text-white font-bold'
                : 'bg-[#FFE2E2] text-[#4A3E50] hover:bg-[#FBEFEF]'
            }`}
          >
            หน้าสินค้า
          </button>

          <a
            href="#footer-contact"
            className="px-4 py-1.5 rounded-lg bg-[#FFE2E2] text-[#4A3E50] hover:bg-[#FBEFEF] transition-colors"
          >
            ติดต่อเรา
          </a>
        </nav>

      </div>
    </header>
  );
}
