import React, { useState } from 'react';

// ส่วนของหน้ารายละเอียดสินค้าเต็มหน้า (Product Detail Page Component)
export default function ProductDetailPage({ product, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  // ตรวจสอบเงื่อนไขจำนวนสินค้า
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
  };

  return (
    <div className="max-w-5xl mx-auto my-8 px-4 min-h-[65vh]">
      
      {/* ปุ่มย้อนกลับและสถานะตำแหน่ง */}
      <div className="mb-6 flex items-center justify-between border-b-2 border-[#F5CBCB] pb-3">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#FFE2E2] hover:bg-[#F5CBCB] text-[#4A3E50] border border-[#F5CBCB] rounded-xl text-xs font-bold transition-colors"
        >
          &larr; ย้อนกลับไปหน้าสินค้า
        </button>

        <div className="text-xs text-[#6B5B72]">
          <span>หน้าสินค้า</span> / <span className="font-bold text-[#4A3E50]">{product.name}</span>
        </div>
      </div>

      {/* กล่องรายละเอียดสินค้าหลัก */}
      <div className="bg-[#FFE2E2] border-2 border-[#F5CBCB] rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* รูปสินค้า */}
        <div className="bg-[#FBEFEF] border border-[#F5CBCB] rounded-xl p-4 flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-80 object-cover rounded-lg"
          />
          {product.rarity && (
            <span className="absolute top-4 left-4 bg-[#F5CBCB] text-[#4A3E50] text-xs font-bold px-3 py-1 rounded">
              {product.rarity}
            </span>
          )}
        </div>

        {/* ข้อมูลรายละเอียดสินค้า */}
        <div className="flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            
            {/* ชื่อสินค้า */}
            <h1 className="text-2xl font-bold text-[#4A3E50] leading-snug">
              {product.name}
            </h1>

            {/* ราคา */}
            <div className="text-2xl font-bold text-[#4A3E50] border-b border-[#F5CBCB] pb-2">
              ราคา: ฿{product.price.toLocaleString()}
            </div>

            {/* จำนวนคงเหลือ */}
            <div className="bg-[#FBEFEF] p-3 rounded-xl border border-[#F5CBCB] text-xs">
              <span className="text-[#6B5B72]">จำนวนคงเหลือในสต็อก: </span>
              <span className={`font-bold ${isOutOfStock ? 'text-rose-500' : isLowStock ? 'text-amber-600' : 'text-emerald-700'}`}>
                {isOutOfStock ? 'สินค้าหมด (0 ชิ้น)' : `${product.stock} ชิ้น`}
              </span>
            </div>

            {/* รายละเอียดสินค้า */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-[#4A3E50]">รายละเอียดสินค้า:</span>
              <div className="bg-[#FBEFEF] p-3 rounded-xl border border-[#F5CBCB] text-[#4A3E50] leading-relaxed space-y-1">
                <p>{product.description}</p>
                {product.condition && <div className="text-[#6B5B72]">สภาพสินค้า: {product.condition}</div>}
                {product.language && <div className="text-[#6B5B72]">ภาษา: {product.language}</div>}
              </div>
            </div>

          </div>

          {/* เลือกจำนวนและปุ่มเพิ่มลงตะกร้า */}
          <div className="space-y-3 pt-3 border-t border-[#F5CBCB]">
            
            {!isOutOfStock && (
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#4A3E50]">เลือกจำนวน:</span>
                <div className="flex items-center border border-[#F5CBCB] bg-[#FBEFEF] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-[#4A3E50] hover:bg-[#F5CBCB] font-bold"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-sm text-[#4A3E50]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 text-[#4A3E50] hover:bg-[#F5CBCB] font-bold"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* ปุ่มเพิ่มลงตะกร้า / สั่งซื้อสินค้า */}
            <button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-colors ${
                isOutOfStock 
                  ? 'bg-rose-400 text-white cursor-not-allowed' 
                  : isLowStock
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-[#C5B3D3] hover:bg-[#b09cc0] text-white'
              }`}
            >
              {isOutOfStock 
                ? 'สินค้าหมด (0 ชิ้น)' 
                : `สั่งซื้อสินค้า (฿${(product.price * quantity).toLocaleString()})`}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
