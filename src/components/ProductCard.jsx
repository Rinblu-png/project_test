import React from 'react';

// คอมโพเนนต์การ์ดสินค้าใช้ Bootstrap 5 (Product Card Component)
export default function ProductCard({ product, onOpenDetail }) {
  // ตรวจสอบ 3 เงื่อนไขสินค้าคงเหลือ
  const isOutOfStock = product.stock <= 0;           // เงื่อนไข 1: สินค้าหมด (0 ชิ้น)
  const isLowStock = product.stock > 0 && product.stock <= 3; // เงื่อนไข 2: สินค้าใกล้หมด (1-3 ชิ้น)

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
      </div>

      {/* ข้อมูลรายละเอียดการ์ด */}
      <div className="card-body px-1 py-2 d-flex flex-column justify-between">
        <div>
          <h5 
            onClick={() => onOpenDetail(product)}
            className="card-title text-theme-dark fw-bold fs-6 text-truncate mb-2"
            style={{ cursor: 'pointer' }}
            title={product.name}
          >
            {product.name}
          </h5>
        </div>

        <div>
          {/* ราคาและจำนวนคงเหลือ */}
          <div className="d-flex align-items-center justify-content-between my-2">
            <span className="fw-bold fs-6 text-theme-primary">
              ฿{product.price.toLocaleString()}
            </span>
            <small className="text-theme-muted">
              คงเหลือ: <strong className="text-theme-dark">{product.stock} ชิ้น</strong>
            </small>
          </div>

          {/* ปุ่มสั่งซื้อ แยกตาม 3 เงื่อนไข (มีสินค้า, สินค้าใกล้หมด, สินค้าหมด) */}
          <div className="pt-2 border-top border-theme">
            {isOutOfStock ? (
              /* เงื่อนไข 1: สินค้าหมด (สีแดง) */
              <button
                disabled
                className="btn btn-theme-danger btn-sm w-100 rounded-3 opacity-75"
              >
                สินค้าหมด (0 ชิ้น)
              </button>
            ) : isLowStock ? (
              /* เงื่อนไข 2: สินค้าใกล้หมด (สีส้ม) */
              <button
                onClick={() => onOpenDetail(product)}
                className="btn btn-theme-orange btn-sm w-100 rounded-3"
              >
                สินค้าใกล้หมด! ซื้อสินค้า (เหลือ {product.stock} ชิ้น)
              </button>
            ) : (
              /* เงื่อนไข 3: มีสินค้าปกติ (สีม่วงพาสเทล) */
              <button
                onClick={() => onOpenDetail(product)}
                className="btn btn-theme-primary btn-sm w-100 rounded-3"
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
