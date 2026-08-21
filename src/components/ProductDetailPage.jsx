import React, { useState } from 'react';

// ส่วนของหน้ารายละเอียดสินค้าเต็มหน้า (Product Detail Page Component - Bootstrap 5)
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
    <div className="container my-4" style={{ minHeight: '65vh' }}>
      
      {/* ปุ่มย้อนกลับและตำแหน่งปัจจุบัน */}
      <div className="d-flex align-items-center justify-content-between border-bottom border-2 border-theme pb-2 mb-4">
        <button
          onClick={onBack}
          className="btn btn-theme-light btn-sm rounded-3 shadow-sm font-bold"
        >
          &larr; ย้อนกลับไปหน้าสินค้า
        </button>

        <small className="text-theme-muted">
          <span>หน้าสินค้า</span> / <strong className="text-theme-dark">{product.name}</strong>
        </small>
      </div>

      {/* การ์ดรายละเอียดสินค้าหลัก */}
      <div className="card card-theme border-2 border-theme p-3 p-md-4 shadow-sm">
        <div className="row g-4">
          
          {/* รูปสินค้า */}
          <div className="col-12 col-md-6">
            <div className="bg-theme-bg border border-theme rounded-3 p-3 text-center position-relative">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded-3 object-fit-cover"
                style={{ maxHeight: '320px' }}
              />
              {product.rarity && (
                <span className="badge bg-theme-light text-theme-dark position-absolute top-0 start-0 m-3 px-3 py-2">
                  {product.rarity}
                </span>
              )}
            </div>
          </div>

          {/* ข้อมูลการ์ดสินค้า และปุ่มสั่งซื้อ */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
            
            <div>
              {/* ชื่อสินค้า */}
              <h1 className="fw-bold text-theme-dark fs-3 mb-2">
                {product.name}
              </h1>

              {/* ราคา */}
              <div className="fs-3 fw-bold text-theme-dark border-bottom border-theme pb-2 mb-3">
                ราคา: ฿{product.price.toLocaleString()}
              </div>

              {/* จำนวนคงเหลือ */}
              <div className="bg-theme-bg p-3 rounded-3 border border-theme small mb-3">
                <span className="text-theme-muted">จำนวนคงเหลือในสต็อก: </span>
                <strong className={isOutOfStock ? 'text-danger' : isLowStock ? 'text-warning' : 'text-success'}>
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
                {isOutOfStock 
                  ? 'สินค้าหมด (0 ชิ้น)' 
                  : `สั่งซื้อสินค้า (฿${(product.price * quantity).toLocaleString()})`}
              </button>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
