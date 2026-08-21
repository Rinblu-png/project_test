import React from 'react';
import { STORE_INFO } from '../data/products';

// ส่วนของแถบเมนูด้านบน (Navbar Component - Bootstrap 5)
export default function Navbar({ currentPage, setCurrentPage, cartCount, setIsCartOpen }) {
  return (
    <header className="bg-theme-light border-bottom border-theme shadow-sm sticky-top">
      
      {/* แถบข้อความแจ้งเตือนด้านบนสุด */}
      <div className="bg-theme-primary text-center py-1 text-white text-xs font-medium">
        ยินดีต้อนรับสู่ร้าน {STORE_INFO.name} ({STORE_INFO.thName}) - การ์ดแท้ 100%
      </div>

      <nav className="navbar navbar-expand container py-2">
        <div className="container-fluid px-0 flex-nowrap justify-content-between align-items-center">
          
          {/* ชื่อร้านค้า (Brand Logo) */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="navbar-brand text-theme-dark cursor-pointer d-flex align-items-center gap-2 m-0"
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="rounded-circle shadow-sm border border-theme" 
              style={{ width: '48px', height: '48px', objectFit: 'cover', backgroundColor: 'white' }} 
            />
            <div className="lh-1">
              <span className="fw-bold fs-4 text-theme-dark d-block">
                {STORE_INFO.name}
              </span>
              <small className="text-theme-muted" style={{ fontSize: '0.75rem' }}>
                {STORE_INFO.thName}
              </small>
            </div>
          </div>

          {/* ปุ่มเมนูนำทาง และ ปุ่มตะกร้าสินค้า */}
          <div className="d-flex align-items-center gap-2">
            
            <button
              onClick={() => setCurrentPage('home')}
              className={`btn btn-sm ${
                currentPage === 'home'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
            >
              หน้าแรก
            </button>

            <button
              onClick={() => setCurrentPage('products')}
              className={`btn btn-sm ${
                currentPage === 'products'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
            >
              หน้าสินค้า
            </button>

            <a
              href="#footer-contact"
              className="btn btn-sm btn-theme-light d-none d-sm-inline-block"
            >
              ติดต่อเรา
            </a>

            {/* ปุ่มตะกร้าสินค้า (Cart Button Badge) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-theme-primary btn-sm rounded-circle position-relative p-2 d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: '38px', height: '38px' }}
              title="ตะกร้าสินค้า"
            >
              🛒
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm font-mono">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </nav>
    </header>
  );
}
