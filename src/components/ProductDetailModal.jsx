import React, { useState } from 'react';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-[#FBEFEF] border-2 border-[#F5CBCB] rounded-2xl p-6 shadow-lg text-[#4A3E50]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FFE2E2] hover:bg-[#F5CBCB] text-[#4A3E50] border border-[#F5CBCB]"
          aria-label="ปิดหน้ารายละเอียด"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Image */}
          <div className="bg-[#FFE2E2] p-4 rounded-xl border border-[#F5CBCB] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-64 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              <span className="text-xs px-2.5 py-1 bg-[#F5CBCB] text-[#4A3E50] font-bold rounded">
                {product.categoryName}
              </span>

              <h2 className="text-xl font-bold text-[#4A3E50] leading-snug">
                {product.name}
              </h2>

              <div className="text-2xl font-bold text-[#4A3E50]">
                ฿{product.price.toLocaleString()}
              </div>

              {/* Stock level (จำนวนคงเหลือ) */}
              <div className="text-sm">
                <span className="text-[#6B5B72]">จำนวนคงเหลือ: </span>
                <span className={`font-bold ${isOutOfStock ? 'text-red-500' : 'text-emerald-700'}`}>
                  {isOutOfStock ? 'สินค้าหมด' : `${product.stock} ชิ้น`}
                </span>
              </div>

              {/* Description (รายละเอียด) */}
              <div className="bg-[#FFE2E2] p-3 rounded-lg border border-[#F5CBCB] text-xs text-[#4A3E50] leading-relaxed">
                <div className="font-bold mb-1">รายละเอียดสินค้า:</div>
                <p>{product.description}</p>
                {product.condition && <div className="mt-1 text-[#6B5B72]">สภาพสินค้า: {product.condition}</div>}
              </div>
            </div>

            {/* Quantity and Add to Cart Button */}
            <div className="space-y-3 pt-2">
              {!isOutOfStock && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">จำนวน:</span>
                  <div className="flex items-center border border-[#F5CBCB] bg-[#FFE2E2] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-[#4A3E50] hover:bg-[#F5CBCB]"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-sm text-[#4A3E50]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-2.5 py-1 text-[#4A3E50] hover:bg-[#F5CBCB]"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ปุ่มเพิ่มลงตะกร้า */}
              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                  isOutOfStock 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#C5B3D3] hover:bg-[#b09cc0] text-white shadow-sm'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isOutOfStock ? 'สินค้าหมด' : `เพิ่มลงตะกร้า (฿${(product.price * quantity).toLocaleString()})`}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
