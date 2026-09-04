import React from 'react';
import { STORE_INFO } from '../data/products';

// ส่วนของฟุตเตอร์ข้อมูลติดต่อ (Footer Component - Bootstrap 5 with Icons)
export default function Footer() {
  return (
    <footer id="footer-contact" className="bg-theme-light border-top border-2 border-theme pt-4 pb-3 mt-5">
      <div className="container">
        
        <div className="row g-4 pb-4 border-bottom border-theme">
          
          {/* ข้อมูลเกี่ยวกับร้านค้า */}
          <div className="col-12 col-md-6">
            <h3 className="fw-bold text-theme-dark fs-5 mb-2 d-flex align-items-center">
              <i className="bi bi-shop me-2 text-theme-primary"></i>
              ร้าน {STORE_INFO.name} ({STORE_INFO.thName})
            </h3>
            <p className="small text-theme-muted mb-2">
              {STORE_INFO.slogan}
            </p>
            <p className="small text-theme-muted mb-1 d-flex align-items-start">
              <i className="bi bi-geo-alt-fill text-theme-primary me-2 mt-1"></i>
              <span><strong>ที่อยู่:</strong> {STORE_INFO.address}</span>
            </p>
            <p className="small text-theme-muted mb-0 d-flex align-items-center">
              <i className="bi bi-clock-fill text-theme-primary me-2"></i>
              <span><strong>เวลาทำการ:</strong> {STORE_INFO.hours}</span>
            </p>
          </div>

          {/* ช่องทางติดต่อ (เบอร์โทร, instagram, facebook, gmail, tiktok) */}
          <div className="col-12 col-md-6">
            <h4 className="fw-bold text-theme-dark fs-6 mb-2 d-flex align-items-center">
              <i className="bi bi-headset me-2 text-theme-primary"></i>
              ช่องทางการติดต่อร้านค้า:
            </h4>

            <ul className="list-unstyled small mb-0 space-y-1">
              <li className="mb-1.5 d-flex align-items-center">
                <i className="bi bi-telephone-fill text-theme-primary me-2"></i>
                <strong className="me-1">เบอร์โทรศัพท์:</strong>
                <a href={`tel:${STORE_INFO.phone}`} className="text-theme-dark text-decoration-none hover-underline">
                  {STORE_INFO.phone}
                </a>
              </li>
              <li className="mb-1.5 d-flex align-items-center">
                <i className="bi bi-envelope-fill text-theme-primary me-2"></i>
                <strong className="me-1">Gmail:</strong>
                <a href={`mailto:${STORE_INFO.email}`} className="text-theme-dark text-decoration-none hover-underline">
                  {STORE_INFO.email}
                </a>
              </li>
              <li className="mb-1.5 d-flex align-items-center">
                <i className="bi bi-instagram text-theme-primary me-2"></i>
                <strong className="me-1">Instagram:</strong>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-theme-dark text-decoration-none hover-underline">
                  {STORE_INFO.instagram}
                </a>
              </li>
              <li className="mb-1.5 d-flex align-items-center">
                <i className="bi bi-facebook text-theme-primary me-2"></i>
                <strong className="me-1">Facebook:</strong>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-theme-dark text-decoration-none hover-underline">
                  {STORE_INFO.facebook}
                </a>
              </li>
              <li className="mb-0 d-flex align-items-center">
                <i className="bi bi-tiktok text-theme-primary me-2"></i>
                <strong className="me-1">TikTok:</strong>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-theme-dark text-decoration-none hover-underline">
                  {STORE_INFO.tiktok}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ลิขสิทธิ์ Footer */}
        <div className="pt-3 text-center small text-theme-muted">
          © 2026 {STORE_INFO.name} ({STORE_INFO.thName}). All rights reserved.
        </div>

      </div>
    </footer>
  );
}
