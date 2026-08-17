import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BannerSlider from './components/BannerSlider';
import RecommendedSection from './components/RecommendedSection';
import ProductGrid from './components/ProductGrid';
import ProductDetailPage from './components/ProductDetailPage';
import Footer from './components/Footer';
import Toast from './components/Toast';

import { PRODUCTS } from './data/products';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'product-detail'
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [previousPage, setPreviousPage] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);

  // Navigate to product detail page
  const handleOpenProductDetail = (product) => {
    setPreviousPage(currentPage);
    setSelectedProductDetail(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order / Buy product action (without showing cart drawer modal)
  const handleAddToCart = (product, quantity = 1) => {
    showToast(`สั่งซื้อสินค้า "${product.name}" (จำนวน ${quantity} ชิ้น) เรียบร้อยแล้ว!`);
  };

  // Show Toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FBEFEF] text-[#4A3E50] flex flex-col font-sans">
      
      {/* Navbar Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
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
            }}
          />
        )}
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* 4. ฟุตเตอร์ */}
      <Footer />

    </div>
  );
}

export default App;
