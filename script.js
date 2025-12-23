const products = [
  {
    id: 1,
    name: "AirFlow 2 Wireless",
    price: 249.0,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    id: 2,
    name: "Studio Minimalist Watch",
    price: 185.0,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: 3,
    name: "Nano Keyboard G1",
    price: 129.0,
    category: "Computing",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
  },
  {
    id: 4,
    name: "Urban Tech Backpack",
    price: 95.0,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  {
    id: 5,
    name: "Precision Mouse",
    price: 79.0,
    category: "Computing",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
  },
  {
    id: 6,
    name: "Beam Soundbar",
    price: 399.0,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
  },
];

let cart = [];

window.onload = () => {
  renderProducts(products);
};

// Render Products
function renderProducts(items) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = items
    .map(
      (p) => `
        <div class="p-card">
            <div class="p-img">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="p-info">
                <span style="font-size:11px; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:1px;">${
                  p.category
                }</span>
                <h3 style="margin: 8px 0; font-weight:700; font-size:1.1rem;">${
                  p.name
                }</h3>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                    <p style="font-weight:800; font-size:1.2rem;">$${p.price.toFixed(
                      2
                    )}</p>
                    <button class="add-btn" onclick="addToCart(${
                      p.id
                    })" style="background:var(--primary); color:white; border:none; padding:10px 18px; border-radius:8px; cursor:pointer;">
                        Add
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Horizontal Scroll
function moveSlider(direction) {
  const row = document.getElementById("product-grid");
  const scrollVal = 370; // Card width + gap
  row.scrollBy({ left: direction * scrollVal, behavior: "smooth" });
}

// Search and Filter
function searchProducts() {
  const term = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
}

function filterProducts(cat) {
  document
    .querySelectorAll(".pill")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");

  const filtered =
    cat === "all" ? products : products.filter((p) => p.category === cat);
  renderProducts(filtered);
}

// Cart UI
function toggleCart() {
  document.getElementById("cart-drawer").classList.toggle("active");
  document.getElementById("cart-overlay").classList.toggle("active");
}

function addToCart(id) {
  const p = products.find((x) => x.id === id);
  cart.push(p);
  updateCart();
  toggleCart(); // Open cart when item added
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-count-inner").innerText = cart.length;

  const container = document.getElementById("cart-items");
  container.innerHTML = cart
    .map(
      (item, i) => `
        <div class="cart-item" style="display:flex; gap:15px; margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:15px;">
            <img src="${
              item.image
            }" style="width:70px; height:80px; border-radius:8px; object-fit:cover;">
            <div style="flex:1;">
                <h4 style="font-size:14px; font-weight:700;">${item.name}</h4>
                <p style="font-weight:800; margin-top:5px;">$${item.price.toFixed(
                  2
                )}</p>
                <button onclick="removeFromCart(${i})" style="background:none; border:none; color:red; font-size:12px; cursor:pointer; margin-top:5px;">Remove</button>
            </div>
        </div>
    `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
