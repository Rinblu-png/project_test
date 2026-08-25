import React, { useState } from 'react';
import { STORE_INFO } from '../data/products';

// ระบบจำลองตะกร้าสินค้าและการชำระเงิน (Cart Drawer Component - 100% Mobile & Desktop Responsive)
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
    }, 1200);
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden" 
      style={{ zIndex: 1060 }}
    >
      
      {/* Overlay Background Click to Close */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        onClick={onClose} 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)' }}
      />

      {/* Drawer Box (Pinned to Right, No Overflow) */}
      <div 
        className="position-absolute top-0 end-0 h-100 bg-theme-bg border-start border-2 border-theme d-flex flex-column shadow-lg cart-drawer-box" 
        style={{ zIndex: 1061 }}
      >
        
        {/* หัวข้อตะกร้าสินค้า (Header) */}
        <div className="px-3 py-2.5 bg-theme-light d-flex align-items-center justify-content-between border-bottom border-theme shadow-sm flex-shrink-0">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-5">🛍️</span>
            <div>
              <h3 className="fw-bold fs-6 text-theme-dark m-0">ตะกร้าสินค้าของฉัน</h3>
              <small className="text-theme-muted" style={{ fontSize: '0.72rem' }}>
                {cart.length > 0 ? `มีสินค้า ${cart.length} รายการ` : 'ตะกร้าว่างเปล่า'}
              </small>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-light text-black rounded-circle shadow-sm fw-bold d-flex align-items-center justify-content-center p-0"
            style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}
            title="ปิดหน้าต่าง"
          >
            ✕
          </button>
        </div>

        {/* รายการสินค้าในตะกร้า (Cart Items List) */}
        <div className="flex-grow-1 overflow-y-auto p-2.5 custom-scrollbar">
          {orderComplete ? (
            /* หน้าต่างแสดงเมื่อสั่งซื้อสำเร็จ */
            <div className="text-center py-4 px-2">
              <div className="bg-theme-light rounded-4 p-3 shadow-sm border border-theme w-100">
                <div className="fs-2 mb-1 animate-bounce">🎉</div>
                <h4 className="fw-bold fs-6 text-success mb-2">สั่งซื้อสำเร็จ!</h4>
                <div className="bg-theme-bg p-2.5 rounded-3 mb-3 text-start text-theme-dark" style={{ fontSize: '0.78rem' }}>
                  <div className="mb-1"><strong>เลขคำสั่งซื้อ:</strong> #TCG{Math.floor(Math.random() * 9000) + 1000}</div>
                  <div><strong>ยอดชำระ:</strong> ฿{totalPrice.toLocaleString()}</div>
                </div>
                <p className="text-theme-muted mb-3" style={{ fontSize: '0.75rem' }}>
                  ขอบคุณที่สั่งซื้อกับการ์ดร้าน <strong>{STORE_INFO.name}</strong><br/>
                  ทางเราจะรีบดำเนินการจัดส่งให้โดยเร็วที่สุดครับ
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="btn btn-theme-primary rounded-pill px-3 py-1.5 w-100 fw-bold shadow-sm"
                  style={{ fontSize: '0.82rem' }}
                >
                  <i className="bi bi-arrow-left-circle-fill me-1"></i> เลือกซื้อสินค้าต่อ
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* เมื่อไม่มีสินค้าในตะกร้า */
            <div className="text-center py-5 text-theme-muted h-100 d-flex flex-column align-items-center justify-content-center px-3">
              <div className="fs-2 mb-2 opacity-50"><i className="bi bi-cart-x"></i></div>
              <h6 className="fw-bold text-theme-dark opacity-75 mb-1">ตะกร้าของคุณว่างเปล่า</h6>
              <p className="small mb-3 text-theme-muted" style={{ fontSize: '0.78rem' }}>ลองเลือกการ์ดใบโปรดใส่ตะกร้าดูสิครับ</p>
              <button 
                onClick={onClose} 
                className="btn btn-outline-theme-primary btn-sm rounded-pill px-3 py-1.5"
                style={{ fontSize: '0.8rem' }}
              >
                <i className="bi bi-shop me-1"></i> ไปเลือกสินค้า &rarr;
              </button>
            </div>
          ) : (
            /* แสดงรายการสินค้าในตะกร้า (Mobile & Desktop Clean Fit) */
            <div className="d-flex flex-column gap-2">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-theme-light rounded-3 p-2 shadow-sm border border-theme position-relative w-100"
                  style={{ boxSizing: 'border-box' }}
                >
                  {/* ปุ่มลบที่มุมขวาบน */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="position-absolute top-0 end-0 mt-1 me-1 btn btn-link p-0 text-danger text-decoration-none rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '24px', height: '24px' }}
                    title="ลบสินค้านี้"
                  >
                    <i className="bi bi-trash3-fill" style={{ fontSize: '0.75rem' }}></i>
                  </button>

                  <div className="d-flex gap-2 align-items-center">
                    {/* รูปสินค้า (Thumbnail) */}
                    <div className="bg-theme-bg rounded-2 p-0.5 flex-shrink-0 border border-theme d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-1 object-fit-cover w-100 h-100"
                      />
                    </div>

                    {/* รายละเอียดสินค้า */}
                    <div className="flex-grow-1 min-w-0 pe-2">
                      <h4 
                        className="fw-bold text-theme-dark m-0 text-truncate" 
                        style={{ fontSize: '0.82rem', maxWidth: 'calc(100% - 20px)' }}
                        title={item.name}
                      >
                        {item.name}
                      </h4>
                      <small className="text-theme-muted d-block text-truncate" style={{ fontSize: '0.7rem' }}>
                        ฿{item.price.toLocaleString()} / ชิ้น
                      </small>

                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <span className="fw-bold text-theme-primary" style={{ fontSize: '0.85rem' }}>
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* ปุ่มปรับจำนวน (+ / -) */}
                        <div className="d-flex align-items-center gap-1 bg-theme-bg rounded-pill px-1.5 py-0.5 border border-theme">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="btn btn-sm text-theme-dark fw-bold rounded-circle p-0 d-flex align-items-center justify-content-center bg-theme-light"
                            style={{ width: '20px', height: '20px', fontSize: '0.7rem', border: '1px solid #243456' }}
                            title="ลดจำนวน"
                          >
                            -
                          </button>
                          <span className="fw-bold text-theme-dark px-1" style={{ minWidth: '14px', textAlign: 'center', fontSize: '0.75rem' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="btn btn-sm text-theme-dark fw-bold rounded-circle p-0 d-flex align-items-center justify-content-center bg-theme-light"
                            style={{ width: '20px', height: '20px', fontSize: '0.7rem', border: '1px solid #243456' }}
                            title="เพิ่มจำนวน"
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
          <div className="p-3 bg-theme-light border-top border-theme shadow-lg flex-shrink-0">
            <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.78rem' }}>
              <span className="text-theme-muted">ยอดรวม ({cart.length} รายการ)</span>
              <span className="fw-bold text-theme-dark">฿{totalPrice.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.78rem' }}>
              <span className="text-theme-muted">ค่าจัดส่ง</span>
              <span className="fw-bold text-success">ฟรี</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2.5 border-top border-theme border-dashed pt-2">
              <span className="fw-bold text-theme-dark" style={{ fontSize: '0.85rem' }}>ยอดชำระสุทธิ</span>
              <span className="fw-bold fs-5 text-theme-primary">฿{totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-theme-primary w-100 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-1.5 position-relative overflow-hidden"
              style={{ fontSize: '0.85rem' }}
            >
              {isCheckingOut ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: '0.85rem', height: '0.85rem' }}></span>
                  กำลังดำเนินการ...
                </>
              ) : (
                <>
                  <i className="bi bi-credit-card-fill"></i> ยืนยันการสั่งซื้อเลย ✨
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
