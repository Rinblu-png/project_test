import React from 'react';
import { STORE_INFO } from '../data/products';

// ส่วนของฟุตเตอร์ข้อมูลติดต่อ (Footer Component)
export default function Footer() {
  return (
    <footer id="footer-contact" className="bg-[#FFE2E2] text-[#4A3E50] border-t-2 border-[#F5CBCB] pt-8 pb-6 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#F5CBCB]">
          
          {/* ข้อมูลเกี่ยวกับร้านค้า */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#4A3E50]">
              ร้าน {STORE_INFO.name} ({STORE_INFO.thName})
            </h3>
            <p className="text-xs text-[#6B5B72]">
              {STORE_INFO.slogan}
            </p>
            <p className="text-xs text-[#6B5B72]">
              ที่อยู่: {STORE_INFO.address}
            </p>
            <p className="text-xs text-[#6B5B72]">
              เวลาทำการ: {STORE_INFO.hours}
            </p>
          </div>

          {/* ช่องทางติดต่อ (เบอร์โทร, instagram, facebook, gmail, tiktok) */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#4A3E50]">
              ช่องทางการติดต่อร้านค้า:
            </h4>

            <ul className="space-y-1.5 text-xs">
              <li>📞 <strong>เบอร์โทรศัพท์:</strong> <a href={`tel:${STORE_INFO.phone}`} className="hover:underline">{STORE_INFO.phone}</a></li>
              <li>✉️ <strong>Gmail:</strong> <a href={`mailto:${STORE_INFO.email}`} className="hover:underline">{STORE_INFO.email}</a></li>
              <li>📷 <strong>Instagram:</strong> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">{STORE_INFO.instagram}</a></li>
              <li>📘 <strong>Facebook:</strong> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">{STORE_INFO.facebook}</a></li>
              <li>🎵 <strong>TikTok:</strong> <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:underline">{STORE_INFO.tiktok}</a></li>
            </ul>
          </div>

        </div>

        {/* ลิขสิทธิ์ Footer */}
        <div className="pt-4 text-center text-xs text-[#6B5B72]">
          © 2026 {STORE_INFO.name} ({STORE_INFO.thName}). All rights reserved.
        </div>

      </div>
    </footer>
  );
}
