import React from 'react';
import { STORE_INFO } from '../data/products';

// ส่วนของแถบเมนูด้านบน (Navbar Component - Responsive & Mobile Friendly)
export default function Navbar({ currentPage, setCurrentPage, cartCount, setIsCartOpen }) {
  return (
    <header className="bg-theme-light border-bottom border-theme shadow-sm sticky-top">
      
      {/* แถบข้อความแจ้งเตือนด้านบนสุด */}
      <div className="bg-theme-primary text-center py-1 text-dark fw-bold px-2" style={{ fontSize: '0.75rem' }}>
        ยินดีต้อนรับสู่ร้าน {STORE_INFO.name} ({STORE_INFO.thName}) - การ์ดแท้ 100%
      </div>

      <nav className="navbar navbar-expand container py-1.5 py-sm-2">
        <div className="container-fluid px-0 flex-nowrap justify-content-between align-items-center">
          
          {/* ชื่อร้านค้าและโลโก้ (Brand Logo - Responsive) */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="navbar-brand text-theme-dark cursor-pointer d-flex align-items-center gap-1.5 gap-sm-2 m-0"
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="rounded-circle shadow-sm border border-theme" 
              style={{ width: '38px', height: '38px', objectFit: 'cover', backgroundColor: 'white' }} 
            />
            <div className="lh-1">
              <span className="fw-bold fs-5 fs-sm-4 text-theme-dark d-block text-nowrap">
                {STORE_INFO.name}
              </span>
              <small className="text-theme-muted d-none d-sm-block" style={{ fontSize: '0.7rem' }}>
                {STORE_INFO.thName}
              </small>
            </div>
          </div>

          {/* ปุ่มเมนูนำทาง และ ปุ่มตะกร้าสินค้า (Responsive Nav Buttons) */}
          <div className="d-flex align-items-center gap-1 gap-sm-2">
            
            <button
              onClick={() => setCurrentPage('home')}
              className={`btn btn-sm text-nowrap px-2 py-1 px-sm-2.5 py-sm-1.5 rounded-3 ${
                currentPage === 'home'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
              style={{ fontSize: '0.78rem' }}
            >
              <i className="bi bi-house-door-fill me-1"></i>
              <span>หน้าแรก</span>
            </button>

            <button
              onClick={() => setCurrentPage('products')}
              className={`btn btn-sm text-nowrap px-2 py-1 px-sm-2.5 py-sm-1.5 rounded-3 ${
                currentPage === 'products'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
              style={{ fontSize: '0.78rem' }}
            >
              <i className="bi bi-box-seam-fill me-1"></i>
              <span>หน้าสินค้า</span>
            </button>

            <a
              href="#footer-contact"
              className="btn btn-sm btn-theme-light d-none d-md-inline-block text-nowrap px-2.5 py-1.5 rounded-3"
              style={{ fontSize: '0.78rem' }}
            >
              <i className="bi bi-telephone-fill me-1"></i> ติดต่อเรา
            </a>

            {/* ปุ่มตะกร้าสินค้า (Cart Button Badge) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-theme-primary btn-sm rounded-circle position-relative p-0 d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
              style={{ width: '36px', height: '36px' }}
              title="ตะกร้าสินค้า"
            >
              <i className="bi bi-cart-fill fs-6 text-white"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm font-mono" style={{ fontSize: '0.65rem', padding: '0.25em 0.45em' }}>
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
