/**
 * ROTI SHOTI FAMILY RESTAURANT & EVENTS ORGANIZER - SAHIWAL
 * Luxury Dark Web Experience (Edem Aesthetic)
 * Vanilla JavaScript Core Engine
 */

// Primary WhatsApp Number (Real Sahiwal Restaurant Contact)
const WHATSAPP_NUMBER = "+923310331848";

// Structured Product Data
const MENU_PRODUCTS = [
  {
    id: "rs-01",
    name: "Roti Shoti Chicken Special Handi",
    category: "handi-karahi",
    price: 2150,
    badge: "Chef's Signature",
    image: "assets/products/chicken-special-handi.jpg",
    description: "Tender chicken slow-simmered in an authentic clay pot with hand-ground Punjabi spices, rich tomato gravy, and ginger julienne."
  },
  {
    id: "rs-02",
    name: "Desi Mutton Karahi (Half/Full)",
    category: "handi-karahi",
    price: 2950,
    badge: "Specialty",
    image: "assets/products/mutton-karahi.jpg",
    description: "Fresh premium mutton wok-seared over high flame with fresh tomatoes, green chilies, crushed black pepper, and desi ghee."
  },
  {
    id: "rs-03",
    name: "Hyderabadi Handi",
    category: "handi-karahi",
    price: 2250,
    badge: "Traditional",
    image: "assets/products/hyderabadi-handi.jpg",
    description: "Royal recipe crafted with tender chicken, yogurt, roasted coriander, and a velvet rich aromatic gravy sealed in earthenware."
  },
  {
    id: "rs-04",
    name: "Bar BQ Chicken Platter",
    category: "bbq",
    price: 2850,
    badge: "Bestseller",
    image: "assets/products/bbq-platter.jpg",
    description: "Grand sizzling platter featuring charcoal grilled chicken tikka boti, juicy seekh kebabs, grilled tomatoes, and mint chutney."
  },
  {
    id: "rs-05",
    name: "Royal Hyderabadi Biryani",
    category: "rice",
    price: 1250,
    badge: "Popular",
    image: "assets/products/chicken-biryani.jpg",
    description: "Fragrant basmati rice layered with spice-marinated chicken, golden fried onions, saffron milk, and fresh garden mint."
  },
  {
    id: "rs-06",
    name: "Vegetables Fried Rice Chicken",
    category: "rice",
    price: 1100,
    badge: "Desi-Chinese",
    image: "assets/products/chicken-fried-rice.jpg",
    description: "Wok-tossed premium rice with tender pulled chicken strips, garden peas, carrots, bell peppers, and scallions."
  },
  {
    id: "rs-07",
    name: "Tandoori Roghni Naan",
    category: "tandoor-desserts",
    price: 180,
    badge: "Fresh Tandoor",
    image: "assets/products/roghni-naan.jpg",
    description: "Pillow-soft tandoori flatbread brushed with golden butter, white sesame seeds, and fragrant black kalonji seeds."
  },
  {
    id: "rs-08",
    name: "Halwa Puri Chanay Feast",
    category: "tandoor-desserts",
    price: 890,
    badge: "Breakfast & Brunch",
    image: "assets/products/halwa-puri-chanay.jpg",
    description: "Freshly puffed golden puris served with traditional chickpea masala curry and rich semolina almond halwa."
  },
  {
    id: "rs-09",
    name: "Crispy Golden Jalebi",
    category: "tandoor-desserts",
    price: 550,
    badge: "Sweet Specialty",
    image: "assets/products/jalebi.jpg",
    description: "Traditional deep-fried spiral confection soaked in hot saffron and cardamom syrup, served crispy and fresh."
  },
  {
    id: "rs-10",
    name: "Fresh Mint Lemonade",
    category: "tandoor-desserts",
    price: 380,
    badge: "Chilled",
    image: "assets/products/fresh-lemonade.jpg",
    description: "Freshly squeezed lemon juice blended with garden mint, cracked ice, and mineral black salt for instant vitality."
  },
  {
    id: "rs-11",
    name: "Salad Cream (Gourmet Desi)",
    category: "rice",
    price: 650,
    badge: "Appetizer",
    image: "assets/products/salad-cream.jpg",
    description: "Creamy gourmet salad tossed with seasonal fruits, sweet corn, garden greens, and house-blended dressing."
  }
];

// Cart State Manager
const Cart = {
  KEY: "roti_shoti_cart_v1",

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch (e) {
      console.error("Failed to read cart:", e);
      return [];
    }
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(items));
      this.updateBadge();
    } catch (e) {
      console.error("Failed to save cart:", e);
    }
  },

  addItem(productId, quantity = 1) {
    const product = MENU_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveItems(items);
    showToast(`Added "${product.name}" to your cart.`);
  },

  updateQuantity(productId, delta) {
    let items = this.getItems();
    const index = items.findIndex(item => item.id === productId);

    if (index > -1) {
      items[index].quantity += delta;
      if (items[index].quantity <= 0) {
        items.splice(index, 1);
      }
      this.saveItems(items);
    }
  },

  removeItem(productId) {
    let items = this.getItems();
    items = items.filter(item => item.id !== productId);
    this.saveItems(items);
    showToast("Item removed from cart.");
  },

  clear() {
    localStorage.removeItem(this.KEY);
    this.updateBadge();
  },

  getCount() {
    return this.getItems().reduce((acc, item) => acc + item.quantity, 0);
  },

  getTotal() {
    return this.getItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  },

  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll(".cart-count-badge").forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    });
  }
};

// UI Toast Notification
function showToast(message) {
  let toast = document.querySelector(".toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-check" style="color: var(--gold-primary);"></i> <span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Render Menu Cards
function renderMenu(category = "all") {
  const container = document.getElementById("menuCardsContainer");
  if (!container) return;

  const filtered = category === "all" 
    ? MENU_PRODUCTS 
    : MENU_PRODUCTS.filter(p => p.category === category);

  container.innerHTML = filtered.map(product => `
    <div class="menu-item-card" data-category="${product.category}">
      <div class="menu-item-thumb">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="dish-badge">${product.badge}</span>
      </div>
      <div class="menu-item-body">
        <div class="menu-item-header">
          <h3 class="menu-item-title serif-font">${product.name}</h3>
          <span class="menu-item-price">Rs ${product.price.toLocaleString()}</span>
        </div>
        <p class="menu-item-desc">${product.description}</p>
        <div class="menu-item-footer">
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em;">Authentic Desi Taste</span>
          <button class="btn-add-cart" onclick="Cart.addItem('${product.id}')">
            <i class="fa-solid fa-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Cloud Parting Transition Effect Controller
function initCloudTransition() {
  const section = document.querySelector(".cloud-transition-section");
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("parted");
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(section);

  // Smooth scroll depth tracking
  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      const leftCurtain = section.querySelector(".cloud-curtain.left");
      const rightCurtain = section.querySelector(".cloud-curtain.right");
      
      if (leftCurtain && rightCurtain && scrollPercent > 0.15) {
        const offset = Math.min(85, Math.max(0, (scrollPercent - 0.15) * 110));
        leftCurtain.style.transform = `translateX(-${offset}%)`;
        rightCurtain.style.transform = `translateX(${offset}%)`;
      }
    }
  }, { passive: true });
}

// Testimonials Carousel Logic
function initTestimonialsCarousel() {
  const track = document.querySelector(".testimonials-carousel-track");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 360;

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
}

// Dynamic Cart Page Renderer
function renderCartPage() {
  const cartContainer = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const grandTotalEl = document.getElementById("cartGrandTotal");
  const emptyState = document.getElementById("cartEmptyState");
  const contentGrid = document.getElementById("cartContentGrid");

  if (!cartContainer) return;

  const items = Cart.getItems();

  if (items.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (contentGrid) contentGrid.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (contentGrid) contentGrid.style.display = "grid";

  cartContainer.innerHTML = items.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <h4 class="serif-font">${item.name}</h4>
        <span class="item-unit-price">Rs ${item.price.toLocaleString()} each</span>
      </div>
      <div class="qty-control-group">
        <button class="qty-btn" onclick="handleQtyChange('${item.id}', -1)">-</button>
        <span class="qty-display">${item.quantity}</span>
        <button class="qty-btn" onclick="handleQtyChange('${item.id}', 1)">+</button>
      </div>
      <div class="cart-item-total">
        Rs ${(item.price * item.quantity).toLocaleString()}
      </div>
      <button class="btn-remove-item" onclick="handleItemRemove('${item.id}')" title="Remove item">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  const total = Cart.getTotal();
  if (subtotalEl) subtotalEl.textContent = `Rs ${total.toLocaleString()}`;
  if (grandTotalEl) grandTotalEl.textContent = `Rs ${total.toLocaleString()}`;
}

function handleQtyChange(id, delta) {
  Cart.updateQuantity(id, delta);
  renderCartPage();
}

function handleItemRemove(id) {
  Cart.removeItem(id);
  renderCartPage();
}

// WhatsApp Order Generator
function sendWhatsAppOrder() {
  const items = Cart.getItems();
  if (items.length === 0) {
    showToast("Your cart is empty. Please select dishes first.");
    return;
  }

  const orderTypeEl = document.getElementById("orderTypeSelect");
  const orderType = orderTypeEl ? orderTypeEl.value : "Dine-in";
  const notesEl = document.getElementById("orderNotes");
  const notes = notesEl && notesEl.value.trim() ? notesEl.value.trim() : "None";

  const total = Cart.getTotal();

  let message = `*NEW ORDER - ROTI SHOTI RESTAURANT SAHIWAL*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Service Type:* ${orderType}\n`;
  message += `*Order Items:*\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.quantity} × Rs ${item.price.toLocaleString()} = Rs ${(item.quantity * item.price).toLocaleString()}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Overall Total: Rs ${total.toLocaleString()}*\n`;
  message += `*Special Instructions:* ${notes}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Please confirm availability and preparation time. Thank you!`;

  const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}

// Reservation Form Handler
function initReservationForm() {
  const form = document.getElementById("tableReservationForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("resName").value;
    const phone = document.getElementById("resPhone").value;
    const guests = document.getElementById("resGuests").value;
    const date = document.getElementById("resDate").value;
    const time = document.getElementById("resTime").value;

    showToast(`Reservation request received for ${name} (${guests} Guests on ${date} at ${time}). We will contact you at ${phone}!`);
    form.reset();
  });
}

// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Sync Cart badge across pages
  Cart.updateBadge();

  // Header scroll detection
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-toggle-btn");
  const navMenu = document.querySelector(".nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });
  }

  // Menu category filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category || "all";
        renderMenu(category);
      });
    });
    // Initial render
    renderMenu("all");
  }

  // Interactive Cloud Transition
  initCloudTransition();

  // Testimonials Carousel
  initTestimonialsCarousel();

  // Reservation Form
  initReservationForm();

  // Cart page renderer if on add-to-cart.html
  if (document.getElementById("cartItemsList")) {
    renderCartPage();
  }
});
