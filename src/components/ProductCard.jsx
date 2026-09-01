import React from 'react';

// คอมโพเนนต์การ์ดสินค้าใช้ Bootstrap 5 (Product Card Component)
export default function ProductCard({ product, onOpenDetail, onAddToCart, onBuyNow }) {
  // ตรวจสอบ 3 เงื่อนไขสินค้าคงเหลือ
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <div className="card card-theme h-100 shadow-sm overflow-hidden p-2">
      
      {/* รูปสินค้า */}
      <div 
        onClick={() => onOpenDetail(product)}
        className="position-relative bg-theme-bg rounded-3 overflow-hidden product-img-wrap"
        style={{ height: '190px', cursor: 'pointer' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100 object-fit-cover"
        />
        {product.rarity && (
          <span className="badge bg-theme-light text-theme-dark position-absolute top-0 start-0 m-2 font-mono">
            {product.rarity}
          </span>
        )}
        {isLowStock && (
          <span className="badge badge-cool-indigo position-absolute top-0 end-0 m-2 shadow-sm">
            <i className="bi bi-exclamation-triangle-fill me-1"></i>ใกล้หมด
          </span>
        )}
      </div>

      {/* ข้อมูลรายละเอียดการ์ด */}
      <div className="card-body px-1 py-2 d-flex flex-column justify-between">
        <div>
          <h5 
            onClick={() => onOpenDetail(product)}
            className="card-title text-theme-dark fw-bold fs-6 text-truncate mb-1"
            style={{ cursor: 'pointer' }}
            title={product.name}
          >
            {product.name}
          </h5>

          {/* ดาวรีวิวและคะแนนสินค้า (Star Ratings) */}
          <div className="d-flex align-items-center gap-1 mb-1.5" style={{ fontSize: '0.74rem' }}>
            <span className="text-warning">
              <i className="bi bi-star-fill" style={{ color: '#FFD700' }}></i>
            </span>
            <span className="fw-bold text-theme-dark">{product.rating || 5.0}</span>
            <span className="text-theme-muted">({product.reviewCount || 0} รีวิว)</span>
          </div>
        </div>

        <div>
          {/* ราคาและจำนวนคงเหลือ */}
          <div className="d-flex align-items-center justify-content-between my-1.5">
            <span className="fw-bold fs-6 text-theme-primary">
              ฿{product.price.toLocaleString()}
            </span>
            <small className="text-theme-muted" style={{ fontSize: '0.72rem' }}>
              คงเหลือ: <strong className="text-theme-dark">{product.stock} ชิ้น</strong>
            </small>
          </div>

          {/* ปุ่ม 2 ปุ่ม */}
          <div className="pt-2 border-top border-theme">
            {isOutOfStock ? (
              <button disabled className="btn btn-theme-danger btn-sm w-100 rounded-3 opacity-75">
                <i className="bi bi-x-circle-fill me-1"></i> สินค้าหมด
              </button>
            ) : (
              <div className="row g-1">
                {/* ปุ่มซ้าย: ใส่ตะกร้า */}
                <div className="col-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof onAddToCart === 'function') {
                        onAddToCart(product, 1);
                      }
                    }}
                    className="btn btn-theme-light btn-sm w-100 rounded-3"
                    style={{ fontSize: '0.78rem' }}
                    title="ใส่ตะกร้า"
                  >
                    <i className="bi bi-cart-plus-fill me-1"></i>ใส่ตะกร้า
                  </button>
                </div>
                {/* ปุ่มขวา: ซื้อสินค้าเลย */}
                <div className="col-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof onBuyNow === 'function') {
                        onBuyNow(product);
                      } else if (typeof onAddToCart === 'function') {
                        onAddToCart(product, 1);
                      } else if (typeof onOpenDetail === 'function') {
                        onOpenDetail(product);
                      }
                    }}
                    className={`btn ${isLowStock ? 'btn-theme-orange' : 'btn-theme-primary'} btn-sm w-100 rounded-3`}
                    style={{ fontSize: '0.78rem' }}
                    title="ซื้อสินค้าเลย"
                  >
                    <i className="bi bi-lightning-fill me-1"></i>ซื้อสินค้า
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
