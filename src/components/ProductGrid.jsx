import React from 'react';
import ProductCard from './ProductCard';

// ส่วนของหน้าแสดงสินค้าทั้งหมด (Products Page Component)
export default function ProductGrid({ products, onOpenDetail }) {
  return (
    <div className="max-w-5xl mx-auto my-8 px-4 min-h-[60vh]">
      
      {/* หัวข้อหน้าสินค้า */}
      <div className="border-b-2 border-[#F5CBCB] pb-3 mb-6">
        <h1 className="text-2xl font-bold text-[#4A3E50]">
          สินค้าทั้งหมด (Products)
        </h1>
        <p className="text-xs text-[#6B5B72]">รายการการ์ดสะสมทั้งหมดในร้าน tontamcard ({products.length} รายการ)</p>
      </div>

      {/* แสดงการ์ดสินค้าทั้งหมด */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>

    </div>
  );
}
