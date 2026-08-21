import React from 'react';
import ProductCard from './ProductCard';

// ส่วนของหน้าแสดงสินค้าทั้งหมด (Products Page Component - Mobile Responsive 2-Columns)
export default function ProductGrid({ products, onOpenDetail }) {
  return (
    <div className="container my-4" style={{ minHeight: '60vh' }}>
      
      {/* หัวข้อหน้าสินค้า */}
      <div className="border-bottom border-2 border-theme pb-2 mb-4">
        <h1 className="fw-bold text-theme-dark fs-3 mb-1">
          สินค้าทั้งหมด (Products)
        </h1>
        <p className="text-theme-muted small m-0">
          รายการการ์ดสะสมทั้งหมดในร้าน tontamcard ({products.length} รายการ)
        </p>
      </div>

      {/* กริดการ์ดสินค้าทั้งหมด (รองรับมือถือ 2 คอลัมน์ แท็บเล็ต 3 คอลัมน์ คอมพิวเตอร์ 4 คอลัมน์) */}
      <div className="row g-2 g-sm-3">
        {products.map(product => (
          <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
            <ProductCard
              product={product}
              onOpenDetail={onOpenDetail}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
