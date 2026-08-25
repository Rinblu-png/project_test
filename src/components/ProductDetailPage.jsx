import React, { useState, useEffect } from 'react';

// ส่วนของหน้ารายละเอียดสินค้าเต็มหน้า พร้อมระบบรีวิวและการให้คะแนนดาว (Clean & Easy-to-Read Review UI)
export default function ProductDetailPage({ product, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  // สถานะสำหรับระบบรีวิวและให้คะแนน
  const [reviewsList, setReviewsList] = useState(product?.reviews || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // อัปเดตรายการรีวิวเมื่อเปลี่ยนสินค้า
  useEffect(() => {
    setReviewsList(product?.reviews || []);
    setIsFormOpen(false);
  }, [product]);

  if (!product) return null;

  // ตรวจสอบเงื่อนไขจำนวนสินค้า
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
  };

  // จัดการการส่งรีวิวใหม่
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newReviewItem = {
      id: Date.now(),
      user: reviewerName.trim(),
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment.trim()
    };

    setReviewsList([newReviewItem, ...reviewsList]);
    setReviewerName('');
    setReviewComment('');
    setNewRating(5);
    setIsFormOpen(false);
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3500);
  };

  // คำนวณคะแนนเฉลี่ย
  const averageRating = reviewsList.length > 0
    ? (reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length).toFixed(1)
    : (product.rating || 5.0);

  return (
    <div className="container my-4" style={{ minHeight: '65vh' }}>
      
      {/* ปุ่มย้อนกลับและตำแหน่งปัจจุบัน (Breadcrumb) */}
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2.5 border-bottom border-2 border-theme pb-3 mb-4">
        <button
          onClick={onBack}
          className="btn btn-theme-light btn-sm rounded-3 shadow-sm fw-bold px-3 py-1.5 text-nowrap"
          style={{ fontSize: '0.82rem' }}
        >
          <i className="bi bi-arrow-left me-1.5"></i> ย้อนกลับ
        </button>

        <div className="text-theme-muted small text-truncate w-100 w-sm-auto" style={{ fontSize: '0.8rem' }}>
          <span>หน้าสินค้า</span>
          <i className="bi bi-chevron-right mx-1.5" style={{ fontSize: '0.7rem' }}></i>
          <strong className="text-theme-dark">{product.name}</strong>
        </div>
      </div>

      {/* การ์ดรายละเอียดสินค้าหลัก */}
      <div className="card card-theme border-2 border-theme p-3 p-md-4 shadow-sm mb-4">
        <div className="row g-4">
          
          {/* รูปสินค้า */}
          <div className="col-12 col-md-6">
            <div className="bg-theme-bg border border-theme rounded-3 p-3 text-center position-relative">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded-3 object-fit-cover"
                style={{ maxHeight: '340px' }}
              />
              {product.rarity && (
                <span className="badge bg-theme-light text-theme-dark position-absolute top-0 start-0 m-3 px-3 py-2 border border-theme">
                  {product.rarity}
                </span>
              )}
            </div>
          </div>

          {/* ข้อมูลการ์ดสินค้า และปุ่มสั่งซื้อ */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
            
            <div>
              {/* ชื่อสินค้า */}
              <h1 className="fw-bold text-theme-dark fs-3 mb-1">
                {product.name}
              </h1>

              {/* ดาวรีวิวและคะแนนเฉลี่ยใต้ชื่อสินค้า */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="d-flex align-items-center gap-1" style={{ color: '#FFD700', fontSize: '0.95rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i 
                      key={star} 
                      className={`bi ${star <= Math.round(averageRating) ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                  ))}
                </div>
                <span className="fw-bold text-theme-dark fs-6">{averageRating} / 5.0</span>
                <span className="text-theme-muted small">({reviewsList.length} รีวิว)</span>
              </div>

              {/* ราคา */}
              <div className="fs-3 fw-bold text-theme-primary border-bottom border-theme pb-2 mb-3">
                ราคา: ฿{product.price.toLocaleString()}
              </div>

              {/* จำนวนคงเหลือ */}
              <div className="bg-theme-bg p-3 rounded-3 border border-theme small mb-3">
                <span className="text-theme-muted">จำนวนคงเหลือในสต็อก: </span>
                <strong className={isOutOfStock ? 'text-danger' : isLowStock ? 'text-theme-secondary' : 'text-success'}>
                  {isOutOfStock ? 'สินค้าหมด (0 ชิ้น)' : `${product.stock} ชิ้น`}
                </strong>
              </div>

              {/* รายละเอียดสินค้า */}
              <div className="small mb-3">
                <strong className="text-theme-dark d-block mb-1">รายละเอียดสินค้า:</strong>
                <div className="bg-theme-bg p-3 rounded-3 border border-theme text-theme-dark lh-base">
                  <p className="m-0 mb-1">{product.description}</p>
                  {product.condition && <div className="text-theme-muted">สภาพสินค้า: {product.condition}</div>}
                  {product.language && <div className="text-theme-muted">ภาษา: {product.language}</div>}
                </div>
              </div>
            </div>

            {/* เลือกจำนวน และปุ่มเพิ่มลงตะกร้า/สั่งซื้อ */}
            <div className="pt-3 border-top border-theme">
              
              {!isOutOfStock && (
                <div className="d-flex align-items-center justify-content-between small mb-3">
                  <strong className="text-theme-dark">เลือกจำนวน:</strong>
                  <div className="btn-group border border-theme rounded-3 bg-theme-bg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="btn btn-sm text-theme-dark fw-bold"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 d-flex align-items-center fw-bold text-theme-dark">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="btn btn-sm text-theme-dark fw-bold"
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
                className={`btn btn-sm w-100 py-2.5 rounded-3 fw-bold ${
                  isOutOfStock 
                    ? 'btn-theme-danger opacity-75' 
                    : isLowStock
                    ? 'btn-theme-orange'
                    : 'btn-theme-primary'
                }`}
              >
                {isOutOfStock ? (
                  <>
                    <i className="bi bi-x-circle-fill me-1"></i> สินค้าหมด (0 ชิ้น)
                  </>
                ) : (
                  <>
                    <i className="bi bi-cart-plus-fill me-1.5"></i>
                    สั่งซื้อสินค้า (฿{(product.price * quantity).toLocaleString()})
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* ส่วนระบบรีวิวและการให้คะแนนสินค้า (Easy-to-Read Review Section) */}
      {/* ========================================================= */}
      <div className="card card-theme border-2 border-theme p-3 p-md-4 shadow-sm">
        
        {/* แถบสรุปคะแนนและปุ่มเปิดเขียนรีวิว */}
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 border-bottom border-2 border-theme pb-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="fs-1 fw-bold text-theme-primary lh-1">
              {averageRating}
            </div>
            <div>
              <div className="d-flex align-items-center gap-1 mb-1" style={{ color: '#FFD700', fontSize: '1.1rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <i 
                    key={star} 
                    className={`bi ${star <= Math.round(averageRating) ? 'bi-star-fill' : 'bi-star'}`}
                  ></i>
                ))}
              </div>
              <div className="text-theme-muted small">
                คะแนนจากลูกค้า ({reviewsList.length} รีวิว)
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`btn btn-sm px-3.5 py-2 rounded-3 fw-bold shadow-sm d-flex align-items-center gap-1.5 ${
              isFormOpen ? 'btn-theme-light' : 'btn-theme-primary'
            }`}
          >
            <i className={`bi ${isFormOpen ? 'bi-x-lg' : 'bi-pencil-square'}`}></i>
            <span>{isFormOpen ? 'ปิดฟอร์มรีวิว' : 'เขียนรีวิวการ์ดใบนี้'}</span>
          </button>
        </div>

        {/* ข้อความแจ้งเตือนเมื่อส่งสำเร็จ */}
        {showReviewSuccess && (
          <div className="alert alert-success py-2.5 px-3 rounded-3 mb-4 d-flex align-items-center gap-2 shadow-sm">
            <i className="bi bi-check-circle-fill fs-5 text-success"></i>
            <span className="fw-bold">ขอบคุณสำหรับรีวิวของคุณ! คะแนนของคุณถูกบันทึกเรียบร้อยแล้ว ✨</span>
          </div>
        )}

        {/* ฟอร์มเขียนรีวิวแบบพับเปิด-ปิดได้ (Clean Input Form) */}
        {isFormOpen && (
          <div className="bg-theme-bg p-3.5 p-md-4 rounded-3 border border-theme mb-4 shadow-sm">
            <h3 className="fw-bold fs-6 text-theme-dark mb-1 d-flex align-items-center gap-2">
              <i className="bi bi-star-fill text-warning"></i>
              ให้คะแนนและเขียนรีวิว
            </h3>
            <p className="text-theme-muted small mb-3">
              แบ่งปันความประทับใจเกี่ยวกับสภาพการ์ดและการจัดส่ง
            </p>

            <form onSubmit={handleSubmitReview}>
              
              {/* เลือกระดับดาว (Interactive 5-Star Selector) */}
              <div className="mb-3">
                <label className="form-label small text-theme-dark fw-bold d-block mb-1.5">
                  ระดับความพึงพอใจ: <span className="text-theme-primary fs-6">{newRating} / 5 ดาว</span>
                </label>
                <div className="d-flex gap-2 fs-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${
                        star <= (hoverRating || newRating)
                          ? 'bi-star-fill star-active'
                          : 'bi-star star-btn'
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      title={`${star} ดาว`}
                    ></i>
                  ))}
                </div>
              </div>

              {/* ชื่อผู้รีวิว */}
              <div className="mb-3">
                <label className="form-label small text-theme-dark fw-bold mb-1">
                  ชื่อหรือนามแฝงของคุณ:
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น นักสะสมการ์ด_01, TCG_Player"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="form-control form-control-dark rounded-3 px-3 py-2"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              {/* ความคิดเห็น */}
              <div className="mb-3">
                <label className="form-label small text-theme-dark fw-bold mb-1">
                  ความคิดเห็นของคุณ:
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="เช่น สภาพการ์ดสวยงามมาก ไร้รอย แพ็คมาอย่างดี จัดส่งรวดเร็ว..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="form-control form-control-dark rounded-3 px-3 py-2"
                  style={{ fontSize: '0.85rem' }}
                ></textarea>
              </div>

              {/* ปุ่มส่งและยกเลิก */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-theme-primary btn-sm px-4 py-2 rounded-3 fw-bold shadow-sm flex-grow-1 flex-sm-grow-0"
                >
                  <i className="bi bi-send-fill me-1.5"></i>
                  บันทึกรีวิว
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="btn btn-theme-light btn-sm px-3 py-2 rounded-3"
                >
                  ยกเลิก
                </button>
              </div>

            </form>
          </div>
        )}

        {/* รายการรีวิวจากลูกค้า (Reviews List) */}
        <div>
          <h3 className="fw-bold fs-6 text-theme-dark mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-chat-left-text-fill text-theme-primary"></i>
            ความคิดเห็นจากลูกค้า ({reviewsList.length})
          </h3>

          {reviewsList.length === 0 ? (
            <div className="text-center py-4 bg-theme-bg rounded-3 border border-theme p-4">
              <div className="fs-2 text-theme-muted mb-2"><i className="bi bi-chat-square-dots"></i></div>
              <h6 className="fw-bold text-theme-dark mb-1">ยังไม่มีรีวิวสำหรับการ์ดใบนี้</h6>
              <p className="text-theme-muted small mb-3">คุณสามารถเป็นคนแรกที่เขียนรีวิวและให้คะแนนสินค้านี้ได้!</p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="btn btn-outline-theme-primary btn-sm px-3 py-1.5 rounded-pill"
              >
                <i className="bi bi-pencil-square me-1"></i> เริ่มเขียนรีวิวเป็นคนแรก
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2.5">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="bg-theme-bg p-3 rounded-3 border border-theme shadow-sm">
                  
                  {/* ข้อมูลผู้รีวิวและดาว */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="bg-theme-light rounded-circle border border-theme d-flex align-items-center justify-content-center text-theme-primary fw-bold flex-shrink-0"
                        style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}
                      >
                        {rev.user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong className="text-theme-dark d-block" style={{ fontSize: '0.85rem' }}>
                          {rev.user}
                        </strong>
                        <span className="badge bg-success bg-opacity-25 text-success" style={{ fontSize: '0.65rem' }}>
                          <i className="bi bi-patch-check-fill me-1"></i>ผู้ซื้อจริง
                        </span>
                      </div>
                    </div>

                    <div className="text-end">
                      <div className="d-flex gap-0.5" style={{ color: '#FFD700', fontSize: '0.82rem' }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i
                            key={s}
                            className={`bi ${s <= rev.rating ? 'bi-star-fill' : 'bi-star'}`}
                          ></i>
                        ))}
                      </div>
                      <small className="text-theme-muted" style={{ fontSize: '0.7rem' }}>
                        {rev.date}
                      </small>
                    </div>
                  </div>

                  {/* ข้อความรีวิว */}
                  <p className="text-theme-dark small m-0 lh-base" style={{ fontSize: '0.85rem' }}>
                    {rev.comment}
                  </p>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
