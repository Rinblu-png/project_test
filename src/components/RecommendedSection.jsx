import React from 'react';
import ProductCard from './ProductCard';

// ส่วนของสินค้าแนะนำ (Recommended Products Component)
export default function RecommendedSection({ products, onOpenDetail, onGoToProducts }) {
  // กรองเฉพาะสินค้าที่เป็นสินค้าแนะนำ (isRecommended: true)
  const recommendedProducts = products.filter(p => p.isRecommended);

  return (
    <section className="max-w-5xl mx-auto my-8 px-4">
      
      {/* หัวข้อส่วนสินค้าแนะนำ */}
      <div className="border-b-2 border-[#F5CBCB] pb-3 mb-6">
        <h2 className="text-xl font-bold text-[#4A3E50]">
          สินค้าแนะนำ
        </h2>
        <p className="text-xs text-[#6B5B72]">รายการการ์ดเกมยอดนิยมที่แนะนำประจำสัปดาห์</p>
      </div>

      {/* แสดงรายการการ์ดสินค้าแนะนำ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recommendedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>

      {/* ปุ่มไปยังหน้าสินค้าทั้งหมด */}
      <div className="mt-8 text-center">
        <button
          onClick={onGoToProducts}
          className="px-8 py-3 bg-[#C5B3D3] hover:bg-[#b09cc0] text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
        >
          ไปยังหน้าสินค้าทั้งหมด ({products.length} รายการ) &rarr;
        </button>
      </div>

    </section>
  );
}
