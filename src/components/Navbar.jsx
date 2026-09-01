import React, { useState } from 'react';
import { STORE_INFO } from '../data/products';

// ส่วนของแถบเมนูด้านบน พร้อมปุ่มแฮมเบอร์เกอร์บนมือถือ (Navbar with Mobile Hamburger Menu)
export default function Navbar({ currentPage, setCurrentPage, cartCount, setIsCartOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-theme-light border-bottom border-theme shadow-sm sticky-top">
      
      {/* แถบข้อความแจ้งเตือนด้านบนสุด */}
      <div className="bg-theme-primary text-center py-1 text-dark fw-bold px-2" style={{ fontSize: '0.75rem' }}>
        ยินดีต้อนรับสู่ร้าน {STORE_INFO.name} ({STORE_INFO.thName}) - การ์ดแท้ 100%
      </div>

      <nav className="navbar navbar-expand container py-1.5 py-md-2">
        <div className="container-fluid px-0 flex-nowrap justify-content-between align-items-center">
          
          {/* ชื่อร้านค้าและโลโก้ (Brand Logo) */}
          <div 
            onClick={() => handleNavClick('home')}
            className="navbar-brand text-theme-dark cursor-pointer d-flex align-items-center gap-2 m-0"
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="rounded-circle shadow-sm border border-theme" 
              style={{ width: '38px', height: '38px', objectFit: 'cover', backgroundColor: 'white' }} 
            />
            <div className="lh-1">
              <span className="fw-bold fs-5 fs-md-4 text-theme-dark d-block text-nowrap">
                {STORE_INFO.name}
              </span>
              <small className="text-theme-muted d-none d-sm-block" style={{ fontSize: '0.7rem' }}>
                {STORE_INFO.thName}
              </small>
            </div>
          </div>

          {/* เมนูปกติสำหรับหน้าจอคอมพิวเตอร์ (Desktop Nav: Desktop View) */}
          <div className="d-none d-md-flex align-items-center gap-2">
            
            <button
              onClick={() => handleNavClick('home')}
              className={`btn btn-sm text-nowrap px-3 py-1.5 rounded-3 ${
                currentPage === 'home'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
              style={{ fontSize: '0.82rem' }}
            >
              <i className="bi bi-house-door-fill me-1.5"></i>
              หน้าแรก
            </button>

            <button
              onClick={() => handleNavClick('products')}
              className={`btn btn-sm text-nowrap px-3 py-1.5 rounded-3 ${
                currentPage === 'products'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
              style={{ fontSize: '0.82rem' }}
            >
              <i className="bi bi-box-seam-fill me-1.5"></i>
              หน้าสินค้า
            </button>

            <a
              href="#footer-contact"
              className="btn btn-sm btn-theme-light text-nowrap px-3 py-1.5 rounded-3"
              style={{ fontSize: '0.82rem' }}
            >
              <i className="bi bi-telephone-fill me-1.5"></i> ติดต่อเรา
            </a>

            {/* ปุ่มตะกร้าสินค้า (Desktop Cart) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-theme-primary btn-sm rounded-circle position-relative p-0 d-flex align-items-center justify-content-center shadow-sm ms-1"
              style={{ width: '38px', height: '38px' }}
              title="ตะกร้าสินค้า"
            >
              <i className="bi bi-cart-fill fs-6 text-white"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm font-mono" style={{ fontSize: '0.65rem' }}>
                  {cartCount}
                </span>
              )}
            </button>

          </div>

          {/* เมนูสำหรับหน้าจอมือถือ (Mobile View: Cart + Hamburger Button) */}
          <div className="d-flex d-md-none align-items-center gap-2">
            
            {/* ปุ่มตะกร้าสินค้าบนมือถือ */}
            <button
              onClick={() => {
                setIsCartOpen(true);
                setIsMenuOpen(false);
              }}
              className="btn btn-theme-primary btn-sm rounded-circle position-relative p-0 d-flex align-items-center justify-content-center shadow-sm"
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

            {/* ปุ่มแฮมเบอร์เกอร์ (Hamburger Menu Button) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-theme-light btn-sm rounded-3 d-flex align-items-center justify-content-center shadow-sm p-0"
              style={{ width: '36px', height: '36px', fontSize: '1.25rem' }}
              aria-label="เมนูหลัก"
            >
              <i className={`bi ${isMenuOpen ? 'bi-x-lg fs-6 text-theme-primary' : 'bi-list'}`}></i>
            </button>

          </div>

        </div>
      </nav>

      {/* เมนู Dropdown ที่เปิดออกมาเมื่อกดปุ่มแฮมเบอร์เกอร์บนมือถือ */}
      {isMenuOpen && (
        <div className="mobile-nav-menu d-md-none px-3 py-3 border-top border-theme">
          <div className="d-flex flex-column gap-2">
            
            {/* 1. ปุ่มหน้าแรก */}
            <button
              onClick={() => handleNavClick('home')}
              className={`btn btn-sm text-start py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between ${
                currentPage === 'home'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-house-door-fill fs-5"></i>
                <span className="fs-6">หน้าแรก</span>
              </div>
              <i className="bi bi-chevron-right small opacity-75"></i>
            </button>

            {/* 2. ปุ่มหน้าสินค้า */}
            <button
              onClick={() => handleNavClick('products')}
              className={`btn btn-sm text-start py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between ${
                currentPage === 'products'
                  ? 'btn-theme-primary fw-bold shadow-sm'
                  : 'btn-theme-light'
              }`}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-box-seam-fill fs-5"></i>
                <span className="fs-6">สินค้าทั้งหมด</span>
              </div>
              <i className="bi bi-chevron-right small opacity-75"></i>
            </button>

            {/* 3. ปุ่มติดต่อเรา */}
            <a
              href="#footer-contact"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-sm btn-theme-light text-start py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between text-decoration-none"
            >
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill fs-5"></i>
                <span className="fs-6">ติดต่อเรา</span>
              </div>
              <i className="bi bi-chevron-right small opacity-75"></i>
            </a>

            {/* ข้อมูลร้านย่อในเมนูมือถือ */}
            <div className="bg-theme-bg p-2.5 rounded-3 border border-theme mt-1 text-center small text-theme-muted" style={{ fontSize: '0.72rem' }}>
              <i className="bi bi-clock-fill me-1 text-theme-primary"></i>
              {STORE_INFO.hours}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
