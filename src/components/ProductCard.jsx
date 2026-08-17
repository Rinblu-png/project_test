import React from 'react';

// คอมโพเนนต์การ์ดสินค้าแต่ละรายการ (Product Card Component)
export default function ProductCard({ product, onOpenDetail }) {
  // ตรวจสอบเงื่อนไขจำนวนสินค้าคงเหลือ
  const isOutOfStock = product.stock <= 0;           // เงื่อนไข: สินค้าหมด (0 ชิ้น)
  const isLowStock = product.stock > 0 && product.stock <= 3; // เงื่อนไข: สินค้าใกล้หมด (1-3 ชิ้น)

  return (
    <div className="bg-[#FFE2E2] border border-[#F5CBCB] rounded-xl p-3.5 flex flex-col justify-between hover:border-[#C5B3D3] transition-all shadow-sm">
      
      {/* รูปสินค้า */}
      <div 
        onClick={() => onOpenDetail(product)}
        className="w-full h-48 bg-[#FBEFEF] rounded-lg overflow-hidden cursor-pointer mb-3 relative"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.rarity && (
          <span className="absolute top-2 left-2 bg-[#F5CBCB] text-[#4A3E50] text-[10px] font-bold px-2 py-0.5 rounded">
            {product.rarity}
          </span>
        )}
      </div>

      {/* ข้อมูลชื่อ ราคา และจำนวนสินค้า */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onOpenDetail(product)}
            className="font-bold text-sm text-[#4A3E50] line-clamp-2 cursor-pointer hover:text-[#C5B3D3]"
          >
            {product.name}
          </h3>
        </div>

        <div>
          {/* แสดงราคาและจำนวนคงเหลือ */}
          <div className="flex items-center justify-between my-1">
            <div className="text-base font-bold text-[#4A3E50]">
              ฿{product.price.toLocaleString()}
            </div>
            <div className="text-xs text-[#6B5B72]">
              คงเหลือ: <span className="font-bold text-[#4A3E50]">{product.stock} ชิ้น</span>
            </div>
          </div>

          {/* ปุ่มซื้อสินค้า แยกสีตาม 3 เงื่อนไข (มีสินค้า, สินค้าใกล้หมด, สินค้าหมด) */}
          <div className="pt-2 border-t border-[#F5CBCB]">
            {isOutOfStock ? (
              /* เงื่อนไข 1: สินค้าหมด (สีแดง) */
              <button
                disabled
                className="w-full py-2 bg-rose-400 text-white rounded-lg text-xs font-bold cursor-not-allowed opacity-90"
              >
                สินค้าหมด (0 ชิ้น)
              </button>
            ) : isLowStock ? (
              /* เงื่อนไข 2: สินค้าใกล้หมด (สีส้ม) */
              <button
                onClick={() => onOpenDetail(product)}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors"
              >
                สินค้าใกล้หมด! ซื้อสินค้า (เหลือ {product.stock} ชิ้น)
              </button>
            ) : (
              /* เงื่อนไข 3: มีสินค้าปกติ (สีม่วงพาสเทล) */
              <button
                onClick={() => onOpenDetail(product)}
                className="w-full py-2 bg-[#C5B3D3] hover:bg-[#b09cc0] text-white rounded-lg text-xs font-bold transition-colors"
              >
                ซื้อสินค้า (เหลือ {product.stock} ชิ้น)
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
