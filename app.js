// ============================================
//   RINESSA — Premium Kozmetik
//   app.js
// ============================================

// ---------- ÜRÜN VERİLERİ ----------
const products = [
  {
    id: 1,
    name: 'Velvet Matte Ruj',
    brand: 'Rinessa',
    category: 'dudak',
    price: 189,
    oldPrice: null,
    emoji: '💄',
    rating: 4.8,
    reviews: 124,
    badge: 'Çok Satan',
    desc: '12 saat kalıcı, transfer etmeyen kadife mat formül'
  },
  {
    id: 2,
    name: 'Glow Serum',
    brand: 'Rinessa',
    category: 'yüz',
    price: 549,
    oldPrice: 699,
    emoji: '✨',
    rating: 4.9,
    reviews: 89,
    badge: 'İndirim',
    desc: 'C vitamini ve niasinamid ile parlak cilt'
  },
  {
    id: 3,
    name: 'Smoky Eye Paleti',
    brand: 'Rinessa',
    category: 'göz',
    price: 329,
    oldPrice: null,
    emoji: '🎨',
    rating: 4.7,
    reviews: 201,
    badge: 'Yeni',
    desc: '12 ton koordineli mat ve simli far paleti'
  },
  {
    id: 4,
    name: 'Hydra Boost Krem',
    brand: 'Rinessa',
    category: 'bakım',
    price: 445,
    oldPrice: 520,
    emoji: '🧴',
    rating: 4.6,
    reviews: 156,
    badge: 'İndirim',
    desc: 'Hyaluronik asit ile 48 saat nem kilidü'
  },
  {
    id: 5,
    name: 'Gloss Lip Oil',
    brand: 'Rinessa',
    category: 'dudak',
    price: 149,
    oldPrice: null,
    emoji: '🌸',
    rating: 4.5,
    reviews: 78,
    badge: 'Yeni',
    desc: 'Besleyici yağ kompleksi ile ışıltılı dudaklar'
  },
  {
    id: 6,
    name: ' Rinessa Flawless Foundation',
    brand: 'Rinessa',
    category: 'yüz',
    price: 399,
    oldPrice: null,
    emoji: '🌿',
    rating: 4.8,
    reviews: 312,
    badge: null,
    desc: 'SPF 30, orta-tam kapatıcılık, 40 ton'
  },
  {
    id: 7,
    name: ' Rinessa Lash Volume Maskara',
    brand: 'Rinessa',
    category: 'göz',
    price: 219,
    oldPrice: 260,
    emoji: '🖤',
    rating: 4.7,
    reviews: 445,
    badge: 'İndirim',
    desc: '5D fırça ile hacim veren ve uzatan formül'
  },
  {
    id: 8,
    name: 'rinessa Toner',
    brand: 'Rinessa',
    category: 'bakım',
    price: 179,
    oldPrice: null,
    emoji: '🌹',
    rating: 4.4,
    reviews: 93,
    badge: null,
    desc: 'Gül suyu ve niasinamid ile dengeleyici tonik'
  },
  {
    id: 9,
    name: 'Brow Definer',
    brand: 'Rinessa',
    category: 'göz',
    price: 139,
    oldPrice: null,
    emoji: '✏️',
    rating: 4.6,
    reviews: 188,
    badge: null,
    desc: 'Doğal görünüm için ince uçlu kaş kalemi'
  },
  {
    id: 10,
    name: 'Rinessa Night Cream',
    brand: 'Rinessa',
    category: 'bakım',
    price: 629,
    oldPrice: null,
    emoji: '🌙',
    rating: 4.9,
    reviews: 67,
    badge: 'Premium',
    desc: 'Retinol ve peptitler ile gece yenilenmesi'
  },
  {
    id: 11,
    name: 'Bronzer & Blush Duo',
    brand: 'Rinessa',
    category: 'yüz',
    price: 289,
    oldPrice: 349,
    emoji: '🍑',
    rating: 4.7,
    reviews: 134,
    badge: 'İndirim',
    desc: 'Doğal makyaj için bronzer ve allık ikilisi'
  },
  {
    id: 12,
    name: 'Liquid Liner',
    brand: 'Rinessa',
    category: 'göz',
    price: 99,
    oldPrice: null,
    emoji: '🖊️',
    rating: 4.5,
    reviews: 267,
    badge: 'Çok Satan',
    desc: 'Su geçirmez, ultra siyah likit eyeliner'
  }
];

// ---------- UYGULAMA DURUMU ----------
let cart = [];
let favorites = new Set();
let currentCategory = 'all';
let currentPrice = 'all';
let currentSearch = '';
let currentSort = 'default';

// ---------- FİLTRELEME ----------
function getFiltered() {
  let list = [...products];

  // Kategori filtresi
  if (currentCategory !== 'all') {
    list = list.filter(p => p.category === currentCategory);
  }

  // Fiyat filtresi
  if (currentPrice === 'under200') {
    list = list.filter(p => p.price < 200);
  } else if (currentPrice === '200-500') {
    list = list.filter(p => p.price >= 200 && p.price <= 500);
  } else if (currentPrice === 'over500') {
    list = list.filter(p => p.price > 500);
  }

  // Arama filtresi
  if (currentSearch) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.brand.toLowerCase().includes(currentSearch) ||
      p.desc.toLowerCase().includes(currentSearch)
    );
  }

  // Sıralama
  if (currentSort === 'price-asc')  list.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (currentSort === 'rating')     list.sort((a, b) => b.rating - a.rating);
  else if (currentSort === 'name')       list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
}

// ---------- KART HTML'İ ----------
function cardHTML(p, i) {
  const isFav = favorites.has(p.id);
  const inCart = cart.find(c => c.id === p.id);
  const delay = (i * 0.05).toFixed(2);
  const isNewOrPremium = p.badge === 'Yeni' || p.badge === 'Premium';
  const starsHtml = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));

  return `
    <div class="product-card" style="animation-delay:${delay}s">
      <div class="product-img">
        <span>${p.emoji}</span>
        ${p.badge ? `<div class="product-badge ${isNewOrPremium ? 'new' : ''}">${p.badge}</div>` : ''}
        <button
          class="fav-btn ${isFav ? 'active' : ''}"
          onclick="toggleFav(${p.id}, event)"
          title="${isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}"
        >${isFav ? '♥' : '♡'}</button>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="stars">
          ${starsHtml}
          <span>(${p.reviews})</span>
        </div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="price-group">
            ${p.oldPrice ? `<span class="product-price-old">${p.oldPrice}₺</span>` : ''}
            <span class="product-price">${p.price}₺</span>
          </div>
          <button class="add-btn" onclick="addToCart(${p.id})">
            ${inCart ? 'Sepette ✓' : 'Sepete Ekle'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ---------- ÜRÜN GRID ----------
function renderProducts() {
  const list = getFiltered();
  const grid = document.getElementById('productsGrid');
  const noRes = document.getElementById('noResults');
  const count = document.getElementById('productCount');

  count.textContent = list.length + ' ürün';

  if (list.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }

  noRes.style.display = 'none';
  grid.innerHTML = list.map((p, i) => cardHTML(p, i)).join('');
}

// ---------- FAVORİLER ----------
function toggleFav(id, event) {
  event.stopPropagation();
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast('Favorilerden çıkarıldı');
  } else {
    favorites.add(id);
    showToast('Favorilere eklendi ♥');
  }
  renderProducts();
  if (document.getElementById('favoritesPage').style.display !== 'none') {
    renderFavorites();
  }
}

function renderFavorites() {
  const list = products.filter(p => favorites.has(p.id));
  const grid = document.getElementById('favoritesGrid');
  const noFavs = document.getElementById('noFavs');

  if (list.length === 0) {
    grid.innerHTML = '';
    noFavs.style.display = 'block';
    return;
  }

  noFavs.style.display = 'none';
  grid.innerHTML = list.map((p, i) => cardHTML(p, i)).join('');
}

// ---------- SEPET ----------
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...p, qty: 1 });
  }
  updateCartBadge();
  renderProducts();
  showToast(p.name + ' sepete eklendi 🛒');
}

function updateCartBadge() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cartBadge').textContent = total;
}

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = panel.classList.contains('open');

  if (isOpen) {
    panel.classList.remove('open');
    overlay.classList.remove('open');
  } else {
    renderCart();
    panel.classList.add('open');
    overlay.classList.add('open');
  }
}

function renderCart() {
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    items.innerHTML = `
      <div class="empty-cart">
        <div class="ec-icon">🛒</div>
        <p>Sepetiniz boş.<br>Beğendiğin ürünleri ekle!</p>
      </div>
    `;
    footer.innerHTML = '';
    return;
  }

  items.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-img">${c.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${c.brand}</div>
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-price">${c.price}₺</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${c.id}, -1)">−</button>
          <span class="qty-val">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${c.id})">✕</button>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const shipping = subtotal > 300 ? 0 : 29.90;
  const total = subtotal + shipping;

  footer.innerHTML = `
    <div class="cart-total-row">
      <span>Ara toplam</span>
      <span>${subtotal.toFixed(2)}₺</span>
    </div>
    <div class="cart-total-row">
      <span>Kargo</span>
      <span>${shipping === 0 ? 'Ücretsiz' : '29.90₺'}</span>
    </div>
    ${subtotal < 300 && subtotal > 0
      ? `<p class="cart-shipping-note">300₺ üzeri ücretsiz kargo! ${(300 - subtotal).toFixed(2)}₺ kaldı.</p>`
      : ''
    }
    <div class="cart-grand">
      <span>Toplam</span>
      <span>${total.toFixed(2)}₺</span>
    </div>
    <button class="checkout-btn" onclick="handleCheckout()">Ödemeye Geç →</button>
  `;
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  updateCartBadge();
  renderCart();
  renderProducts();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartBadge();
  renderCart();
  renderProducts();
}

function checkout() {
  goCheckout();
}

// ---------- FİLTRE FONKSİYONLARI ----------
function filterCategory(cat) {
  currentCategory = cat;
  const title = document.getElementById('sectionTitle');
  const sub = document.getElementById('sectionSub');
  if (cat === 'all') {
    title.textContent = 'Tüm Ürünler';
    sub.textContent = 'Seçkin koleksiyonumuzdan ilhamını al';
  } else {
    title.textContent = cat.charAt(0).toUpperCase() + cat.slice(1) + ' Ürünleri';
    sub.textContent = cat + ' kategorisindeki premium ürünler';
  }
  renderProducts();
}

function filterPrice(val) {
  currentPrice = val;
  renderProducts();
}

function doSearch() {
  currentSearch = document.getElementById('searchInput').value.toLowerCase();
  renderProducts();
}

function doSort(val) {
  currentSort = val;
  renderProducts();
}

// ---------- NAV AKTIF DURUMU ----------
function setActive(btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setFilterActive(btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ---------- SAYFA GEÇİŞİ ----------
function showPage(page) {
  const hero = document.getElementById('heroSection');
  const home = document.getElementById('homePage');
  const favs = document.getElementById('favoritesPage');

  hero.style.display = page === 'home' ? '' : 'none';
  home.style.display = page === 'home' ? '' : 'none';
  favs.style.display = page === 'favorites' ? '' : 'none';

  if (page === 'favorites') renderFavorites();
  if (page === 'home') renderProducts();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- TOAST BİLDİRİMİ ----------
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
function goCheckout() {
  document.getElementById("pg-home").style.display = "none";
  document.getElementById("pg-products").style.display = "none";
  document.getElementById("pg-favs").style.display = "none";
  document.getElementById("pg-checkout").style.display = "block";

  toggleCart();
}

function completePayment() {
  const name = document.getElementById("cardName").value;
  const number = document.getElementById("cardNumber").value;
  const date = document.getElementById("cardDate").value;
  const cvv = document.getElementById("cardCVV").value;
  const msg = document.getElementById("payMsg");

  if (!name || !number || !date || !cvv) {
    msg.innerText = "Lütfen tüm alanları doldur";
    return;
  }

  if (number.length < 16) {
    msg.innerText = "Kart numarası geçersiz";
    return;
  }

  if (cvv.length < 3) {
    msg.innerText = "CVV hatalı";
    return;
  }

  msg.style.color = "green";
  msg.innerText = "Ödeme başarılı 🎉";

  setTimeout(() => {
    alert("Siparişiniz alındı!");
    location.reload();
  }, 1500);
}

// ---------- BAŞLAT ----------
renderProducts();
