import React from 'react';
import ProductCard from './ProductCard';

// ส่วนของสินค้าแนะนำ (Recommended Products Component - Mobile Responsive 2-Columns)
export default function RecommendedSection({ products, onOpenDetail, onGoToProducts }) {
  const recommendedProducts = products.filter(p => p.isRecommended);

  return (
    <section className="container my-4">
      
      {/* หัวข้อส่วนสินค้าแนะนำ */}
      <div className="border-bottom border-2 border-theme pb-2 mb-4">
        <h2 className="fw-bold text-theme-dark fs-4 mb-1">
          สินค้าแนะนำ
        </h2>
        <p className="text-theme-muted small m-0">รายการการ์ดเกมยอดนิยมที่แนะนำประจำสัปดาห์</p>
      </div>

      {/* กริดแสดงรายการสินค้าแนะนำ (รองรับมือถือ 2 คอลัมน์ แท็บเล็ต 3 คอลัมน์ คอมพิวเตอร์ 4 คอลัมน์) */}
      <div className="row g-2 g-sm-3">
        {recommendedProducts.map(product => (
          <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
            <ProductCard
              product={product}
              onOpenDetail={onOpenDetail}
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
          ไปยังหน้าสินค้าทั้งหมด ({products.length} รายการ) &rarr;
        </button>
      </div>

    </section>
  );
}
