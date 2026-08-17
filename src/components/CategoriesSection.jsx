import React from 'react';
import { PRODUCT_CATEGORIES } from '../data/products';

export default function CategoriesSection({ selectedCategory, onSelectCategory, onGoToProducts }) {
  return (
    <section id="categories" className="max-w-6xl mx-auto my-8 px-4">
      <div className="border-b-2 border-[#F5CBCB] pb-3 mb-6">
        <h2 className="text-xl font-bold text-[#4A3E50]">
          หมวดหมู่สินค้า
        </h2>
        <p className="text-xs text-[#6B5B72]">เลือกดูการ์ดตามประเภทที่คุณสนใจ</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {PRODUCT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onGoToProducts();
              }}
              className={`p-4 rounded-xl text-center cursor-pointer border transition-all ${
                isActive 
                  ? 'bg-[#C5B3D3] text-white border-[#C5B3D3] font-bold shadow-sm' 
                  : 'bg-[#FFE2E2] hover:bg-[#F5CBCB] text-[#4A3E50] border-[#F5CBCB]'
              }`}
            >
              <div className="text-base font-bold mb-1">{cat.name}</div>
              <div className="text-xs opacity-80">{cat.count} รายการ</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
