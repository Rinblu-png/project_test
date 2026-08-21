import React, { useState } from 'react';
import { PROMOTION_BANNERS } from '../data/products';

// ส่วนของแบนเนอร์โปรโมชั่น (Promotion Banner Component - Bootstrap 5)
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
    <section className="container my-4">
      <div className="card card-theme border-2 border-theme p-3 p-md-4 position-relative shadow-sm">
        <div className="row align-items-center g-4">
          
          {/* รูปภาพแบนเนอร์ */}
          <div className="col-12 col-md-6">
            <div className="rounded-3 overflow-hidden border border-theme" style={{ height: '220px' }}>
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          {/* ข้อความรายละเอียดแบนเนอร์ */}
          <div className="col-12 col-md-6">
            <span className="badge bg-theme-light text-theme-dark mb-2 px-3 py-2 rounded-pill">
              {banner.tag}
            </span>
            <h2 className="fw-bold text-theme-dark mb-2 fs-3">
              {banner.title}
            </h2>
            <p className="text-theme-muted small mb-3">
              {banner.subtitle}
            </p>
            <div>
              <button
                onClick={onGoToProducts}
                className="btn btn-theme-primary btn-sm px-4 py-2 rounded-3 shadow-sm"
              >
                {banner.buttonText} &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* ปุ่มเลื่อนซ้าย/ขวา */}
        <button
          onClick={prevBanner}
          className="btn btn-theme-light position-absolute top-50 start-0 translate-middle-y rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
          style={{ width: '36px', height: '36px', left: '10px' }}
        >
          &lt;
        </button>

        <button
          onClick={nextBanner}
          className="btn btn-theme-light position-absolute top-50 end-0 translate-middle-y rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
          style={{ width: '36px', height: '36px', right: '10px' }}
        >
          &gt;
        </button>

      </div>
    </section>
  );
}
