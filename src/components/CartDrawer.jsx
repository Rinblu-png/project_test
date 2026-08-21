import React, { useState } from 'react';
import { STORE_INFO } from '../data/products';

// ระบบจำลองตะกร้าสินค้าและการชำระเงิน (Cart Drawer Component - สวยงาม)
export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  // คำนวณราคารวมทั้งหมดในตะกร้า
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ระบบจำลองการชำระเงิน (Simulated Checkout)
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end" style={{ zIndex: 1060, backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(3px)' }}>
      
      {/* Overlay Background Click to Close */}
      <div className="position-absolute w-100 h-100" onClick={onClose} />

      {/* Drawer Box */}
      <div className="position-relative bg-theme-bg border-start border-3 border-theme w-100 h-100 d-flex flex-column shadow-lg" style={{ maxWidth: '100%', width: '420px', zIndex: 1061 }}>
        
        {/* หัวข้อตะกร้าสินค้า (Header) */}
        <div className="p-4 bg-theme-light d-flex align-items-center justify-content-between shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-3">🛍️</span>
            <div>
              <h3 className="fw-bold fs-5 text-theme-dark m-0">ตะกร้าสินค้าของฉัน</h3>
              <small className="text-theme-dark opacity-75">{cart.length > 0 ? `มีสินค้า ${cart.length} รายการ` : 'ตะกร้าว่างเปล่า'}</small>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-light text-black rounded-circle shadow-sm fw-bold d-flex align-items-center justify-content-center"
            style={{ width: '36px', height: '36px' }}
          >
            ✕
          </button>
        </div>

        {/* รายการสินค้าในตะกร้า (Cart Items List) */}
        <div className="flex-grow-1 overflow-y-auto p-3 p-md-4 custom-scrollbar">
          {orderComplete ? (
            /* หน้าต่างแสดงเมื่อสั่งซื้อสำเร็จ */
            <div className="text-center py-5">
              <div className="bg-white rounded-4 p-4 shadow-sm border border-theme d-inline-block w-100">
                <div className="fs-1 mb-2 animate-bounce">🎉</div>
                <h4 className="fw-bold fs-5 text-success mb-3">สั่งซื้อสำเร็จ!</h4>
                <div className="bg-theme-bg p-3 rounded-3 mb-4 text-start small text-theme-dark">
                  <strong>หมายเลขคำสั่งซื้อ:</strong> #TCG{Math.floor(Math.random() * 9000) + 1000}<br/>
                  <strong>ยอดชำระ:</strong> ฿{totalPrice.toLocaleString()}
                </div>
                <p className="small text-muted mb-4">
                  ขอบคุณที่ช้อปปิ้งกับ <strong>{STORE_INFO.name}</strong><br/>
                  เรากำลังเตรียมจัดส่งสินค้าให้คุณน่ารักๆ เลยน้า~
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="btn btn-theme-primary rounded-pill px-4 py-2 w-100 fw-bold shadow-sm"
                >
                  <i className="bi bi-arrow-left-circle-fill me-1"></i> เลือกซื้อสินค้าต่อ
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* เมื่อไม่มีสินค้าในตะกร้า */
            <div className="text-center py-5 text-theme-muted h-100 d-flex flex-column align-items-center justify-content-center">
              <div className="fs-1 mb-3 opacity-50"><i className="bi bi-cart-x"></i></div>
              <h5 className="fw-bold text-theme-dark opacity-75">อุ้ย! ตะกร้าว่างเปล่า</h5>
              <p className="small mb-4">ลองหาการ์ดที่ถูกใจใส่ตะกร้าดูสิครับ</p>
              <button onClick={onClose} className="btn btn-outline-theme-primary rounded-pill px-4 py-2">
                <i className="bi bi-shop me-1"></i> ไปเลือกสินค้ากันเลย &rarr;
              </button>
            </div>
          ) : (
            /* แสดงรายการสินค้าในตะกร้า */
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-4 p-3 shadow-sm border border-theme position-relative">
                  {/* ปุ่มลบที่มุมขวาบน */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="position-absolute top-0 end-0 mt-2 me-2 btn btn-link p-0 text-danger text-decoration-none bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '28px', height: '28px' }}
                    title="ลบสินค้า"
                  >
                    <i className="bi bi-trash-fill fs-6"></i>
                  </button>

                  <div className="d-flex gap-3 align-items-center">
                    {/* รูปสินค้า */}
                    <div className="bg-theme-bg rounded-3 p-1 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-2 object-fit-cover shadow-sm"
                        style={{ width: '70px', height: '70px' }}
                      />
                    </div>

                    {/* รายละเอียด */}
                    <div className="flex-grow-1 min-w-0 pr-3">
                      <h4 className="fw-bold text-theme-dark m-0 fs-6 text-truncate pe-3">
                        {item.name}
                      </h4>
                      <div className="text-muted small mb-2 text-truncate pe-3">
                        {item.description || 'การ์ดเกมยอดฮิต'}
                      </div>

                      <div className="d-flex justify-content-between align-items-end mt-1">
                        <span className="fw-bold text-theme-primary fs-6">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* ปุ่มปรับจำนวน (+ / -) */}
                        <div className="d-flex align-items-center gap-2 bg-theme-bg rounded-pill px-2 py-1 border border-theme">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="btn btn-sm text-theme-dark fw-bold rounded-circle p-0 d-flex align-items-center justify-content-center bg-white shadow-sm"
                            style={{ width: '24px', height: '24px' }}
                          >
                            -
                          </button>
                          <span className="small fw-bold text-theme-dark px-1" style={{ minWidth: '16px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="btn btn-sm text-theme-dark fw-bold rounded-circle p-0 d-flex align-items-center justify-content-center bg-white shadow-sm"
                            style={{ width: '24px', height: '24px' }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* สรุปราคารวมและปุ่มจำลองการชำระเงิน (Footer Summary) */}
        {!orderComplete && cart.length > 0 && (
          <div className="p-4 bg-white border-top border-theme shadow-lg rounded-top-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">ยอดรวมสินค้า ({cart.length} รายการ)</span>
              <span className="fw-bold text-theme-dark">฿{totalPrice.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">ค่าจัดส่ง</span>
              <span className="fw-bold text-success small">ฟรี!</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4 border-top border-theme border-dashed pt-3">
              <span className="fw-bold text-theme-dark">ยอดชำระสุทธิ</span>
              <span className="fw-bold fs-4 text-theme-primary">฿{totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-theme-primary w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 fs-6 position-relative overflow-hidden"
            >
              {isCheckingOut ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  กำลังดำเนินการสั่งซื้อ...
                </>
              ) : (
                <><i className="bi bi-credit-card-fill fs-5"></i> ยืนยันการสั่งซื้อเลย ✨</>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
