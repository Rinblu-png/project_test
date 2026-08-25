// ข้อมูลร้านค้า (Store Information)
export const STORE_INFO = {
  name: 'CARD ZONE',
  thName: 'การ์ดโซน',
  slogan: 'TRADING CARD & BLIND BOX',
  phone: '089-777-8899',
  email: 'contact@cardzone.com',
  instagram: '@cardzone.official',
  facebook: 'CardZone',
  tiktok: '@cardzone_tcg',
  address: 'ศูนย์การค้าเมก้า พลาซ่า วังบูรพา กรุงเทพมหานคร',
  hours: 'เปิดบริการทุกวัน: 10.30 น. - 19.30 น.',
  logo: '/logo.jpg'
};

// ข้อมูลแบนเนอร์โปรโมชั่น (Promotion Banners)
export const PROMOTION_BANNERS = [
  {
    id: 1,
    title: 'โปรโมชั่นพิเศษ CARD ZONE SALE',
    subtitle: 'ลดราคาการ์ดสะสมสุดพิเศษประจำเดือน ลดสูงสุด 30%',
    tag: 'โปรโมชั่นเด็ด',
    buttonText: 'ดูสินค้าทั้งหมด',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'สินค้าใหม่! One Piece Card Game',
    subtitle: 'ชุดการ์ดใหม่ล่าสุด พร้อมส่งถึงบ้านคุณอย่างรวดเร็ว',
    tag: 'สินค้าใหม่',
    buttonText: 'เลือกซื้อสินค้า',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  }
];

// ข้อมูลรายการสินค้าทั้งหมด (Products Array พร้อมคะแนนและรีวิว)
export const PRODUCTS = [
  {
    id: 1,
    name: 'Pokemon Charizard VMAX SSR',
    price: 3490,
    stock: 5,
    isRecommended: true,
    rarity: 'SSR',
    condition: 'Mint (สภาพ 100%)',
    language: 'ภาษาญี่ปุ่น',
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      { id: 1, user: 'นักสะสม_01', rating: 5, date: '2026-08-22', comment: 'การ์ดสภาพสวยกริบ 100% ตรงปก แพ็คประกบฟิวเจอร์บอร์ดแน่นหนามากครับ' },
      { id: 2, user: 'PikachuFan', rating: 5, date: '2026-08-19', comment: 'ฟอยล์เงาตาแตก ลายมังกรดำเท่สุดๆ ส่งไว 1 วันถึง' }
    ],
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=80',
    description: 'การ์ด Pokemon Charizard VMAX SSR สีมังกรดำ การ์ดแท้จากประเทศญี่ปุ่น สภาพสวยงามเหมาะสำหรับสะสม'
  },
  {
    id: 2,
    name: 'One Piece Monkey D. Luffy Leader (Parallel)',
    price: 2850,
    stock: 2, // สินค้าใกล้หมด
    isRecommended: true,
    rarity: 'L-Parallel',
    condition: 'Near Mint',
    language: 'ภาษาญี่ปุ่น',
    rating: 5.0,
    reviewCount: 42,
    reviews: [
      { id: 1, user: 'StrawHat_Crew', rating: 5, date: '2026-08-24', comment: 'การ์ดผู้นำลูฟี่ฟอยล์นูนสวยคมชัดมาก ของแท้ส่งไว แนะนำร้านนี้เลยครับ' },
      { id: 2, user: 'ZoroMaster', rating: 5, date: '2026-08-20', comment: 'คุ้มค่ามาก นำไปลงเด็คเล่นได้ทันที สภาพกริบ' }
    ],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    description: 'การ์ดผู้นำ Monkey D. Luffy ภาพวาดพิเศษ Alternate Art ลายฟอยล์สะท้อนแสงนูนสวยงาม'
  },
  {
    id: 3,
    name: 'Yu-Gi-Oh! Blue-Eyes White Dragon 25th Anniversary',
    price: 4900,
    stock: 0, // สินค้าหมด
    isRecommended: true,
    rarity: 'Secret Rare',
    condition: 'Gem Mint',
    language: 'ภาษาญี่ปุ่น',
    rating: 4.8,
    reviewCount: 19,
    reviews: [
      { id: 1, user: 'Kaiba_Seto', rating: 5, date: '2026-08-15', comment: 'บลูอายส์ครบรอบ 25 ปี ในตำนาน สภาพเกรด 10 หายากมาก' }
    ],
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    description: 'มังกรขาวตาฟ้า Blue-Eyes White Dragon ฉลองครบรอบ 25 ปี ยูกิโอ การ์ดระดับตำนานที่น่าสะสม'
  },
  {
    id: 4,
    name: 'Pokemon Pikachu Master Ball Reverse Holo',
    price: 1890,
    stock: 8,
    isRecommended: true,
    rarity: 'Master Ball Holo',
    condition: 'Mint',
    language: 'ภาษาญี่ปุ่น',
    rating: 4.9,
    reviewCount: 35,
    reviews: [
      { id: 1, user: 'Trainer_Red', rating: 5, date: '2026-08-21', comment: 'ปิกาจูลายมาสเตอร์บอลสวยมาก มีใส่กรอบแม่เหล็กมาให้ด้วย เยี่ยมครับ' }
    ],
    image: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&w=800&q=80',
    description: 'การ์ดปิกาจูลาย Master Ball จากชุด 151 การ์ดสภาพดีเยี่ยมใส่ซองกันรอยอย่างดี'
  },
  {
    id: 5,
    name: 'One Piece Shanks Manga Alternate Art',
    price: 18500,
    stock: 1, // สินค้าใกล้หมด
    isRecommended: false,
    rarity: 'SEC Manga Art',
    condition: 'Gem Mint',
    language: 'ภาษาญี่ปุ่น',
    rating: 5.0,
    reviewCount: 15,
    reviews: [
      { id: 1, user: 'Yonko_Collector', rating: 5, date: '2026-08-23', comment: 'แชงคูส มังงะอาร์ต แท้ 100% สภาพสมบูรณ์แบบที่สุดที่เคยเจอครับ' }
    ],
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'การ์ด Shanks ลายเส้นมังงะสุดหายากจากการ์ดเกม One Piece พร้อมใส่กรอบแม่เหล็กกันรอย'
  },
  {
    id: 6,
    name: 'Yu-Gi-Oh! Dark Magician Girl Starlight Rare',
    price: 6200,
    stock: 4,
    isRecommended: false,
    rarity: 'Starlight Rare',
    condition: 'Mint',
    language: 'ภาษาอังกฤษ',
    rating: 4.9,
    reviewCount: 22,
    reviews: [
      { id: 1, user: 'Yugi_Muto', rating: 5, date: '2026-08-17', comment: 'การ์ดจอมเวทสาวสวยงามมาก Starlight Rare ประกายวิบวับ' }
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'จอมเวทสาว Dark Magician Girl ระดับ Starlight Rare ภาษาอังกฤษ การ์ดแท้ Konami 100%'
  },
  {
    id: 7,
    name: 'Pokemon Iono SAR (Clay Burst)',
    price: 3190,
    stock: 6,
    isRecommended: false,
    rarity: 'SAR',
    condition: 'Mint',
    language: 'ภาษาญี่ปุ่น',
    rating: 4.8,
    reviewCount: 31,
    reviews: [
      { id: 1, user: 'Paldea_Champion', rating: 5, date: '2026-08-20', comment: 'การ์ดเนโมะ/อิโอโนะ สดใส ลายเส้นสวย การ์ดตรงและไร้รอย' }
    ],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    description: 'การ์ดเทรนเนอร์ Iono SAR ลายเส้นฉากสตรีมเมอร์สีสันสดใสยอดนิยมในสายการแข่งขัน'
  },
  {
    id: 8,
    name: 'Pokemon Terastal Festival ex Booster Box',
    price: 1950,
    stock: 10,
    isRecommended: false,
    rarity: 'Booster Box',
    condition: 'Sealed (ซีลแท้)',
    language: 'ภาษาญี่ปุ่น',
    rating: 4.9,
    reviewCount: 50,
    reviews: [
      { id: 1, user: 'Box_Breaker', rating: 5, date: '2026-08-24', comment: 'ซีลแท้จากญี่ปุ่น สุ่มเปิดได้ SAR คุ้มมากครับ' }
    ],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'กล่อง Booster Box การ์ดโปเกมอนซีลแท้จากโรงงาน 1 กล่องบรรจุ 10 ซอง'
  }
];
