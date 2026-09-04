import React, { useState } from 'react';
import { STORE_INFO } from '../data/products';

// ระบบตะกร้าสินค้าและการชำระเงินหลายช่องทาง (Credit Card, PromptPay, TrueMoney)
export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
  // สถานะขั้นตอน: 'cart' (หน้าตะกร้า) | 'payment' (หน้าเลือกชำระเงิน) | 'success' (สำเร็จ)
  const [viewStep, setViewStep] = useState('cart');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // ช่องทางการชำระเงิน: 'promptpay' | 'credit_card' | 'truemoney'
  const [paymentMethod, setPaymentMethod] = useState('promptpay');

  // ข้อมูลบัตรเครดิต
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });

  // ข้อมูล TrueMoney
  const [trueMoneyPhone, setTrueMoneyPhone] = useState('');

  // ข้อมูลการจัดส่งและสลิป
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: ''
  });
  const [slipImage, setSlipImage] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);

  if (!isOpen) return null;

  // คำนวณราคารวมทั้งหมดในตะกร้า
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // จัดการการอัปโหลดรูปสลิป
  const handleSlipUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // จัดรูปแบบหมายเลขบัตรเครดิต (xxxx xxxx xxxx xxxx)
  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardInfo({ ...cardInfo, cardNumber: formatted });
  };

  // จัดรูปแบบวันหมดอายุ (MM/YY)
  const handleExpiryChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (rawValue.length >= 3) {
      rawValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
    }
    setCardInfo({ ...cardInfo, expiry: rawValue });
  };

  // กดยืนยันการสั่งซื้อและแจ้งชำระเงิน
  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);

      let methodLabel = 'พร้อมเพย์ (PromptPay QR)';
      if (paymentMethod === 'credit_card') {
        const last4 = cardInfo.cardNumber.replace(/\s/g, '').slice(-4) || '••••';
        methodLabel = `บัตรเครดิต/เดบิต (•••• ${last4})`;
      } else if (paymentMethod === 'truemoney') {
        methodLabel = `TrueMoney Wallet (${trueMoneyPhone || STORE_INFO.phone})`;
      }

      setOrderSummary({
        orderId: `#TCG${Math.floor(Math.random() * 9000) + 1000}`,
        total: totalPrice,
        itemsCount: cart.length,
        buyerName: shippingInfo.fullName || 'ลูกค้าผู้มีอุปการคุณ',
        phone: shippingInfo.phone || '-',
        address: shippingInfo.address || '-',
        paymentMethod: methodLabel
      });
      setViewStep('success');
      clearCart();
    }, 1200);
  };

  // ปิด Drawer และรีเซ็ตสถานะ
  const handleCloseAll = () => {
    setViewStep('cart');
    setSlipImage(null);
    setShippingInfo({ fullName: '', phone: '', address: '' });
    setCardInfo({ cardNumber: '', cardHolder: '', expiry: '', cvv: '' });
    setTrueMoneyPhone('');
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden"
      style={{ zIndex: 1060 }}
    >

      {/* Overlay Background Click to Close */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        onClick={handleCloseAll}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
      />

      {/* Drawer Box (Pinned to Right) */}
      <div
        className="position-absolute top-0 end-0 h-100 bg-theme-bg border-start border-2 border-theme d-flex flex-column shadow-lg cart-drawer-box"
        style={{ zIndex: 1061 }}
      >

        {/* ======================================================== */}
        {/* 1. ส่วนหัวของ Drawer (Header) */}
        {/* ======================================================== */}
        <div className="px-3 px-sm-4 py-3 bg-theme-light d-flex align-items-center justify-content-between border-bottom border-theme shadow-sm flex-shrink-0">
          <div className="d-flex align-items-center gap-2">
            {viewStep === 'payment' ? (
              <button
                onClick={() => setViewStep('cart')}
                className="btn btn-sm btn-theme-light p-0 d-flex align-items-center justify-content-center rounded-circle border-0 me-1"
                style={{ width: '28px', height: '28px' }}
                title="กลับไปที่ตะกร้า"
              >
                <i className="bi bi-arrow-left fs-5 text-theme-primary"></i>
              </button>
            ) : (
              <i className="bi bi-bag-check-fill fs-5 text-theme-primary"></i>
            )}

            <div>
              <h3 className="fw-bold fs-6 text-theme-dark m-0">
                {viewStep === 'cart'
                  ? 'ตะกร้าสินค้าของฉัน'
                  : viewStep === 'payment'
                    ? 'เลือกวิธีชำระเงิน'
                    : 'สั่งซื้อสำเร็จ'}
              </h3>
              <small className="text-theme-muted" style={{ fontSize: '0.72rem' }}>
                {viewStep === 'cart'
                  ? (cart.length > 0 ? `${cart.length} รายการในตะกร้า` : 'ตะกร้าว่างเปล่า')
                  : viewStep === 'payment'
                    ? 'Credit Card, PromptPay, TrueMoney'
                    : 'บันทึกคำสั่งซื้อเรียบร้อย'}
              </small>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseAll}
            className="btn btn-sm btn-light text-black rounded-circle shadow-sm fw-bold d-flex align-items-center justify-content-center p-0"
            style={{ width: '28px', height: '28px' }}
            title="ปิดหน้าต่าง"
          >
            <i className="bi bi-x-lg" style={{ fontSize: '0.75rem' }}></i>
          </button>
        </div>

        {/* ======================================================== */}
        {/* 2. เนื้อหาตามขั้นตอน (Content Area) */}
        <div className="flex-grow-1 overflow-y-auto px-3 px-sm-4 py-3 custom-scrollbar">

          {/* ---------------------------------------------------- */}
          {/* STEP 3: สั่งซื้อและชำระเงินสำเร็จ (Success View) */}
          {/* ---------------------------------------------------- */}
          {viewStep === 'success' && orderSummary && (
            <div className="text-center py-4 px-2">
              <div className="bg-theme-light rounded-4 p-3 shadow-sm border border-theme w-100">
                <div className="fs-1 mb-2 animate-bounce text-theme-primary">
                  <i className="bi bi-patch-check-fill"></i>
                </div>
                <h4 className="fw-bold fs-6 text-success mb-1">สั่งซื้อและชำระเงินสำเร็จ!</h4>
                <p className="text-theme-muted mb-3" style={{ fontSize: '0.75rem' }}>
                  ทางร้านได้รับข้อมูลคำสั่งซื้อเรียบร้อยแล้วครับ
                </p>

                <div className="bg-theme-bg p-2.5 rounded-3 mb-3 text-start text-theme-dark" style={{ fontSize: '0.78rem' }}>
                  <div className="d-flex justify-content-between mb-1 border-bottom border-theme pb-1">
                    <span className="text-theme-muted">หมายเลขคำสั่งซื้อ:</span>
                    <strong className="text-theme-primary">{orderSummary.orderId}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-theme-muted">ยอดชำระสุทธิ:</span>
                    <strong className="text-theme-primary">฿{orderSummary.total.toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-theme-muted">ช่องทางชำระเงิน:</span>
                    <strong className="text-theme-dark">{orderSummary.paymentMethod}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-theme-muted">ผู้รับ:</span>
                    <span>{orderSummary.buyerName}</span>
                  </div>
                  {orderSummary.phone !== '-' && (
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-theme-muted">เบอร์โทร:</span>
                      <span>{orderSummary.phone}</span>
                    </div>
                  )}
                  {orderSummary.address !== '-' && (
                    <div className="mt-1 pt-1 border-top border-theme">
                      <span className="text-theme-muted d-block">ที่อยู่จัดส่ง:</span>
                      <span className="small text-truncate d-block">{orderSummary.address}</span>
                    </div>
                  )}
                </div>

                <div className="badge bg-success bg-opacity-25 text-success py-1.5 px-2.5 rounded-pill mb-3" style={{ fontSize: '0.72rem' }}>
                  <i className="bi bi-box-seam me-1"></i> กำลังเตรียมแพ็คและจัดส่งพัสดุ
                </div>

                <button
                  onClick={handleCloseAll}
                  className="btn btn-theme-primary rounded-pill px-3 py-1.5 w-100 fw-bold shadow-sm"
                  style={{ fontSize: '0.82rem' }}
                >
                  <i className="bi bi-arrow-left-circle-fill me-1"></i> กลับไปเลือกซื้อสินค้าต่อ
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* STEP 2: หน้าเลือกวิธีชำระเงิน (Multi-Option Payment View) */}
          {/* ---------------------------------------------------- */}
          {/* ---------------------------------------------------- */}
          {/* STEP 2: หน้าเลือกวิธีชำระเงิน (Multi-Option Payment View) */}
          {/* ---------------------------------------------------- */}
          {viewStep === 'payment' && (
            <div className="d-flex flex-column pb-3">

              {/* ยอดเงินที่ต้องชำระ (Clean Design) */}
              <div className="text-center mt-2 mb-4">
                <span className="text-theme-muted small d-block mb-1" style={{ fontSize: '0.85rem' }}>
                  ยอดชำระสุทธิ
                </span>
                <span className="fw-bold text-theme-primary d-block" style={{ fontSize: '2rem', lineHeight: '1' }}>
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>

              {/* ======================================================== */}
              {/* ตัวเลือกช่องทางการชำระเงิน */}
              {/* ======================================================== */}
              <div className="mb-4">
                <label className="form-label text-theme-dark fw-bold mb-2 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                  <i className="bi bi-wallet2 text-theme-primary"></i>
                  เลือกช่องทางการชำระเงิน
                </label>
                
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`flex-fill py-2.5 d-flex flex-column align-items-center gap-1 rounded-3 transition-all border-0 ${
                      paymentMethod === 'promptpay'
                        ? 'bg-theme-primary text-white shadow-sm'
                        : 'bg-theme-light text-theme-muted'
                    }`}
                    style={{ fontSize: '0.75rem' }}
                  >
                    <i className="bi bi-qr-code-scan fs-4 mb-1"></i>
                    <span className="fw-bold">PromptPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`flex-fill py-2.5 d-flex flex-column align-items-center gap-1 rounded-3 transition-all border-0 ${
                      paymentMethod === 'credit_card'
                        ? 'bg-theme-primary text-white shadow-sm'
                        : 'bg-theme-light text-theme-muted'
                    }`}
                    style={{ fontSize: '0.75rem' }}
                  >
                    <i className="bi bi-credit-card-2-front-fill fs-4 mb-1"></i>
                    <span className="fw-bold">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('truemoney')}
                    className={`flex-fill py-2.5 d-flex flex-column align-items-center gap-1 rounded-3 transition-all border-0 ${
                      paymentMethod === 'truemoney'
                        ? 'bg-theme-primary text-white shadow-sm'
                        : 'bg-theme-light text-theme-muted'
                    }`}
                    style={{ fontSize: '0.75rem' }}
                  >
                    <i className="bi bi-wallet-fill fs-4 mb-1"></i>
                    <span className="fw-bold">TrueMoney</span>
                  </button>
                </div>
              </div>

              <div className="border-top border-theme mb-4"></div>

              {/* ======================================================== */}
              {/* รายละเอียดตามช่องทางชำระเงินที่เลือก */}
              {/* ======================================================== */}

              {/* OPTION 1: PromptPay QR Code */}
              {paymentMethod === 'promptpay' && (
                <div className="mb-4">
                  <div className="qr-container text-center mx-auto" style={{ maxWidth: '280px', padding: '1rem' }}>
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-2 text-dark fw-bold" style={{ fontSize: '0.85rem' }}>
                      <i className="bi bi-qr-code-scan text-primary"></i>
                      <span>สแกน Thai QR PromptPay</span>
                    </div>
                    <img
                      src="/payment-qr.jpg"
                      alt="PromptPay QR Code Payment"
                      className="img-fluid rounded-3 mb-3"
                    />
                    
                    <div className="bg-light p-2.5 rounded-3 text-dark text-start" style={{ fontSize: '0.8rem' }}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="text-muted">ชื่อบัญชี:</span>
                        <strong className="text-dark">นาย ณัฐพัฒน์ มีแสงพันธ์</strong>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="text-muted">ระบบ:</span>
                        <span className="badge bg-primary">Make by KBank</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-muted">เลขอ้างอิง:</span>
                        <span className="font-monospace text-muted">004666005500024</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OPTION 2: Credit / Debit Card */}
              {paymentMethod === 'credit_card' && (
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4 className="fw-bold fs-6 text-theme-dark m-0 d-flex align-items-center gap-2">
                      <i className="bi bi-credit-card-2-front-fill text-theme-primary"></i>
                      ข้อมูลบัตรเครดิต
                    </h4>
                    <div className="d-flex gap-2 text-theme-primary fs-5">
                      <i className="bi bi-credit-card"></i>
                      <i className="bi bi-shield-check text-success"></i>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small text-theme-dark fw-bold mb-1.5">หมายเลขบัตร (Card Number):</label>
                    <div className="position-relative">
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.cardNumber}
                        onChange={handleCardNumberChange}
                        className="form-control form-control-dark rounded-3 px-3 py-2"
                        style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                      />
                      <i className="bi bi-credit-card position-absolute top-50 end-0 translate-middle-y me-3 text-theme-muted"></i>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small text-theme-dark fw-bold mb-1.5">ชื่อบนบัตร (Cardholder Name):</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น SOMCHAI JAIDEE"
                      value={cardInfo.cardHolder}
                      onChange={(e) => setCardInfo({ ...cardInfo, cardHolder: e.target.value.toUpperCase() })}
                      className="form-control form-control-dark rounded-3 px-3 py-2"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label small text-theme-dark fw-bold mb-1.5">หมดอายุ (MM/YY):</label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        value={cardInfo.expiry}
                        onChange={handleExpiryChange}
                        className="form-control form-control-dark rounded-3 px-3 py-2 text-center"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small text-theme-dark fw-bold mb-1.5">CVV / CVC:</label>
                      <input
                        type="password"
                        required
                        maxLength="4"
                        placeholder="•••"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, '') })}
                        className="form-control form-control-dark rounded-3 px-3 py-2 text-center"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3 text-theme-muted" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-lock-fill text-success"></i>
                    <span>เข้ารหัสความปลอดภัย 256-bit SSL มาตรฐานสากล</span>
                  </div>
                </div>
              )}

              {/* OPTION 3: TrueMoney Wallet */}
              {paymentMethod === 'truemoney' && (
                <div className="mb-4">
                  <h4 className="fw-bold fs-6 text-theme-dark mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-wallet-fill text-theme-primary"></i>
                    ชำระผ่าน TrueMoney Wallet
                  </h4>

                  <div className="bg-theme-light p-3 rounded-4 mb-3 text-theme-dark" style={{ fontSize: '0.85rem' }}>
                    <div className="d-flex justify-content-between mb-1.5">
                      <span className="text-theme-muted">เบอร์ Wallet ร้านค้า:</span>
                      <strong className="text-theme-primary fs-6">089-777-8899</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1.5">
                      <span className="text-theme-muted">ชื่อบัญชี:</span>
                      <span>ณัฐพัฒน์ ม.</span>
                    </div>
                    <div className="d-flex justify-content-between pt-1.5 border-top border-theme">
                      <span className="text-theme-muted">ยอดที่ต้องโอน:</span>
                      <strong className="text-theme-primary">฿{totalPrice.toLocaleString()}</strong>
                    </div>
                  </div>

                  <div>
                    <label className="form-label small text-theme-dark fw-bold mb-1.5">
                      เบอร์โทร TrueMoney ของคุณ (สำหรับตรวจสอบยอด):
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="เช่น 089-xxx-xxxx"
                      value={trueMoneyPhone}
                      onChange={(e) => setTrueMoneyPhone(e.target.value)}
                      className="form-control form-control-dark rounded-3 px-3 py-2"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              )}

              <div className="border-top border-theme mb-4"></div>

              {/* ======================================================== */}
              {/* ฟอร์มข้อมูลจัดส่งพัสดุ (ใช้ร่วมกันทุกช่องทาง) */}
              {/* ======================================================== */}
              <form onSubmit={handleConfirmPayment} className="d-flex flex-column gap-4">
                
                <div>
                  <h4 className="fw-bold fs-6 text-theme-dark mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-truck text-theme-primary"></i>
                    ข้อมูลสำหรับจัดส่งสินค้า
                  </h4>

                  <div className="mb-3">
                    <label className="form-label small text-theme-dark fw-bold mb-1.5">ชื่อ-นามสกุล ผู้รับ:</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น สมชาย ใจดี"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      className="form-control form-control-dark rounded-3 px-3 py-2"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small text-theme-dark fw-bold mb-1.5">เบอร์โทรศัพท์ติดต่อ:</label>
                    <input
                      type="tel"
                      required
                      placeholder="เช่น 089-123-4567"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="form-control form-control-dark rounded-3 px-3 py-2"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>

                  <div className="mb-0">
                    <label className="form-label small text-theme-dark fw-bold mb-1.5">ที่อยู่จัดส่งพัสดุ:</label>
                    <textarea
                      required
                      rows="2"
                      placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="form-control form-control-dark rounded-3 px-3 py-2"
                      style={{ fontSize: '0.85rem' }}
                    ></textarea>
                  </div>
                </div>

                {/* ส่วนแนบสลิป (แสดงสำหรับ PromptPay และ TrueMoney) */}
                {(paymentMethod === 'promptpay' || paymentMethod === 'truemoney') && (
                  <div>
                    <h4 className="fw-bold fs-6 text-theme-dark mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-receipt text-theme-primary"></i>
                      หลักฐานการโอนเงิน
                    </h4>

                    {slipImage ? (
                      <div className="position-relative text-center bg-theme-bg p-3 rounded-4 border border-theme shadow-sm">
                        <img
                          src={slipImage}
                          alt="Slip Preview"
                          className="img-fluid rounded-3 mb-3"
                          style={{ maxHeight: '200px', objectFit: 'contain' }}
                        />
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            onClick={() => setSlipImage(null)}
                            className="btn btn-sm btn-outline-danger py-1.5 px-3 rounded-pill"
                            style={{ fontSize: '0.8rem' }}
                          >
                            <i className="bi bi-trash3 me-1"></i> เปลี่ยนรูปสลิปใหม่
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="upload-slip-box d-block w-100 m-0 py-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSlipUpload}
                          className="d-none"
                        />
                        <i className="bi bi-cloud-arrow-up fs-1 text-theme-primary d-block mb-2"></i>
                        <span className="fw-bold text-theme-dark d-block mb-1" style={{ fontSize: '0.85rem' }}>
                          คลิกเพื่อแนบรูปสลิปการโอนเงิน
                        </span>
                        <small className="text-theme-muted" style={{ fontSize: '0.75rem' }}>
                          รองรับไฟล์ JPG, PNG (สามารถข้ามได้)
                        </small>
                      </label>
                    )}
                  </div>
                )}

                {/* ปุ่มกดยืนยันการชำระเงิน */}
                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className="btn btn-theme-primary w-100 py-2.5 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-1"
                  style={{ fontSize: '0.85rem' }}
                >
                  {isCheckingOut ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: '0.85rem', height: '0.85rem' }}></span>
                      กำลังประมวลผลการชำระเงิน...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-shield-check fs-6"></i> ยืนยันการชำระเงิน (฿{totalPrice.toLocaleString()})
                    </>
                  )}
                </button>

              </form>

            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* STEP 1: รายการสินค้าในตะกร้า (Cart Items View) */}
          {/* ---------------------------------------------------- */}
          {viewStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-5 text-theme-muted h-100 d-flex flex-column align-items-center justify-content-center px-3">
                  <div className="fs-2 mb-2 opacity-50"><i className="bi bi-cart-x"></i></div>
                  <h6 className="fw-bold text-theme-dark opacity-75 mb-1">ตะกร้าของคุณว่างเปล่า</h6>
                  <p className="small mb-3 text-theme-muted" style={{ fontSize: '0.78rem' }}>ลองเลือกการ์ดใบโปรดใส่ตะกร้าดูสิครับ</p>
                  <button
                    onClick={handleCloseAll}
                    className="btn btn-outline-theme-primary btn-sm rounded-pill px-3 py-1.5"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <i className="bi bi-shop me-1"></i> ไปเลือกสินค้า <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              ) : (
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
                                <i className="bi bi-dash"></i>
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
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>

        {/* ======================================================== */}
        {/* 3. สรุปราคารวมและปุ่มไปหน้าชำระเงิน (Footer for Cart Step) */}
        {/* ======================================================== */}
        {viewStep === 'cart' && cart.length > 0 && (
          <div className="px-3 px-sm-4 py-3 bg-theme-light border-top border-theme shadow-lg flex-shrink-0">
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
              onClick={() => setViewStep('payment')}
              className="btn btn-theme-primary w-100 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 position-relative overflow-hidden"
              style={{ fontSize: '0.85rem' }}
            >
              <i className="bi bi-credit-card-2-front-fill"></i> ชำระเงิน
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
