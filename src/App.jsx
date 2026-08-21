import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BannerSlider from './components/BannerSlider';
import RecommendedSection from './components/RecommendedSection';
import ProductGrid from './components/ProductGrid';
import ProductDetailPage from './components/ProductDetailPage';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Toast from './components/Toast';

import { PRODUCTS } from './data/products';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'product-detail'
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [previousPage, setPreviousPage] = useState('home');
  
  // ระบบตะกร้าสินค้า (Shopping Cart State)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // เปิดหน้ารายละเอียดสินค้า
  const handleOpenProductDetail = (product) => {
    setPreviousPage(currentPage);
    setSelectedProductDetail(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // เพิ่มสินค้าลงตะกร้า (Add to cart)
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        const currentQty = newCart[existingIndex].quantity;
        const newQty = Math.min(product.stock, currentQty + quantity);
        newCart[existingIndex] = { ...newCart[existingIndex], quantity: newQty };
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: Math.min(product.stock, quantity) }];
      }
    });

    showToast(`เพิ่ม "${product.name}" ลงในตะกร้าเรียบร้อยแล้ว`);
  };

  // ปรับเปลี่ยนจำนวนสินค้าในตะกร้า
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // ลบสินค้าออกจากตะกร้า
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // ล้างตะกร้าสินค้าทั้งหมด
  const handleClearCart = () => {
    setCart([]);
  };

  // แสดงการแจ้งเตือน Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // จำนวนชิ้นสินค้ารวมทั้งหมดในตะกร้า
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-theme-bg text-theme-dark flex flex-col font-sans">
      
      {/* Navbar Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Content Pages */}
      <main className="flex-grow-1">
        {currentPage === 'home' ? (
          /* 1. หน้าแรก (Home) */
          <>
            <BannerSlider
              onGoToProducts={() => {
                setCurrentPage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <RecommendedSection
              products={PRODUCTS}
              onOpenDetail={handleOpenProductDetail}
              onGoToProducts={() => {
                setCurrentPage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        ) : currentPage === 'products' ? (
          /* 2. หน้าสินค้าทั้งหมด (Products Page) */
          <ProductGrid
            products={PRODUCTS}
            onOpenDetail={handleOpenProductDetail}
          />
        ) : (
          /* 3. หน้ารายละเอียดสินค้า (Product Detail Page) */
          <ProductDetailPage
            product={selectedProductDetail}
            onBack={() => {
              setCurrentPage(previousPage || 'products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(product, qty) => {
              handleAddToCart(product, qty);
              setIsCartOpen(true);
            }}
          />
        )}
      </main>

      {/* สไลด์ตะกร้าสินค้า (Cart Drawer Modal Component) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        removeFromCart={handleRemoveFromCart}
        clearCart={handleClearCart}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* 4. ฟุตเตอร์ */}
      <Footer />

    </div>
  );
}

export default App;
