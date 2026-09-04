import React from 'react';
import ProductCard from './ProductCard';

// ส่วนของสินค้าแนะนำ เรียงลำดับจากคะแนนรีวิวสูงสุดลงมา (Recommended Products Sorted by Rating)
export default function RecommendedSection({ products, onOpenDetail, onAddToCart, onBuyNow, onGoToProducts }) {
  
  // กรองเฉพาะสินค้าแนะนำ และเรียงลำดับจากคะแนนรีวิว (Rating) มากที่สุด -> น้อยที่สุด
  // หากคะแนนเท่ากัน ให้เรียงตามจำนวนรีวิว (Review Count)
  const sortedRecommendedProducts = products
    .filter(p => p.isRecommended)
    .slice()
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });

  return (
    <section className="container my-4">
      
      {/* หัวข้อส่วนสินค้าแนะนำ พร้อมป้ายบอกการเรียงลำดับ */}
      <div className="border-bottom border-2 border-theme pb-2.5 mb-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-end gap-2">
        <div>
          <h2 className="fw-bold text-theme-dark fs-4 mb-1 d-flex align-items-center gap-2">
            <i className="bi bi-stars text-warning"></i>
            สินค้าแนะนำยอดนิยม
          </h2>
          <p className="text-theme-muted small m-0">
            คัดสรรการ์ดเกมยอดฮิต เรียงตามคะแนนรีวิวและความพึงพอใจสูงสุดจากผู้ซื้อจริง
          </p>
        </div>

        {/* ป้ายแสดงสถานะการจัดเรียง */}
        <span className="badge bg-theme-light text-theme-primary border border-theme px-2.5 py-1.5 rounded-pill shadow-sm" style={{ fontSize: '0.75rem' }}>
          <i className="bi bi-sort-down text-warning me-1"></i>
          คะแนนรีวิวสูงสุด (Top Rated)
        </span>
      </div>

      {/* กริดแสดงรายการสินค้าแนะนำ (รองรับมือถือ 2 คอลัมน์ แท็บเล็ต 3 คอลัมน์ คอมพิวเตอร์ 4 คอลัมน์) */}
      <div className="row g-2 g-sm-3">
        {sortedRecommendedProducts.map(product => (
          <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
            <ProductCard
              product={product}
              onOpenDetail={onOpenDetail}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          </div>
        ))}
      </div>

      {/* ปุ่มไปยังหน้าสินค้าทั้งหมด */}
      <div className="mt-4 text-center">
        <button
          onClick={onGoToProducts}
          className="btn btn-theme-primary btn-sm px-4 py-2.5 rounded-3 shadow-sm"
        >
          ไปยังหน้าสินค้าทั้งหมด ({products.length} รายการ) <i className="bi bi-arrow-right-circle-fill ms-1"></i>
        </button>
      </div>

    </section>
  );
}
