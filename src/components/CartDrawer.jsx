import React, { useState } from 'react';
import { STORE_INFO } from '../data/products';

// ส่วนของตะกร้าสินค้า (Cart Component)
export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  // คำนวณราคารวมทั้งหมด
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // จำลองการชำระเงิน
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#FBEFEF] border-l-2 border-[#F5CBCB] h-full flex flex-col p-4">
        
        {/* หัวข้อตะกร้าสินค้า */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F5CBCB]">
          <h3 className="font-bold text-base text-[#4A3E50]">ตะกร้าสินค้า ({cart.length} รายการ)</h3>
          <button
            onClick={onClose}
            className="px-2.5 py-1 bg-[#FFE2E2] hover:bg-[#F5CBCB] rounded-lg text-xs font-bold"
          >
            ปิด X
          </button>
        </div>

        {/* รายการสินค้าในตะกร้า */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {orderComplete ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-3xl">✅</div>
              <h4 className="font-bold text-base text-[#4A3E50]">สั่งซื้อสินค้าเรียบร้อยแล้ว!</h4>
              <p className="text-xs text-[#6B5B72]">
                ขอบคุณที่อุดหนุนร้าน {STORE_INFO.name} ครับ
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="px-4 py-2 bg-[#C5B3D3] text-white font-bold text-xs rounded-lg"
              >
                เสร็จสิ้น
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 text-xs text-[#6B5B72]">
              ยังไม่มีสินค้าในตะกร้าของคุณ
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 bg-[#FFE2E2] border border-[#F5CBCB] p-2.5 rounded-xl text-xs">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border border-[#F5CBCB]"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-[#4A3E50] line-clamp-1">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-rose-500 hover:underline font-bold"
                    >
                      ลบ
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-[#4A3E50]">฿{(item.price * item.quantity).toLocaleString()}</span>
                    <div className="flex items-center border border-[#F5CBCB] bg-[#FBEFEF] rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* สรุปราคารวมและปุ่มชำระเงิน */}
        {!orderComplete && cart.length > 0 && (
          <div className="pt-3 border-t border-[#F5CBCB] bg-[#FFE2E2] p-3 rounded-xl space-y-3">
            <div className="flex justify-between text-sm font-bold text-[#4A3E50]">
              <span>ราคารวมทั้งสิ้น</span>
              <span>฿{totalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-2.5 bg-[#C5B3D3] hover:bg-[#b09cc0] text-white font-bold rounded-xl text-xs transition-colors"
            >
              {isCheckingOut ? 'กำลังดำเนินการ...' : 'ชำระเงิน / สั่งซื้อ'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
