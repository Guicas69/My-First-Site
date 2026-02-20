/* ============================================
   contact.js
   Logic ONLY for contact.html:
   - Switch between Reservation / Delivery tabs
   - Reservation form validation & submission
   - Delivery cart (add, remove, quantity, totals)
   - Place order
   ============================================ */

/* ── PIZZA DATA for the delivery section ── */
const DELIVERY_ITEMS = [
  { id: 1, name: 'Margherita Classica',  price: 13.50, desc: 'San Marzano tomato, buffalo mozzarella, basil',          img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&q=80' },
  { id: 2, name: 'Diavola Piccante',     price: 15.00, desc: 'Spicy salami, fior di latte, chilli flakes',             img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&q=80' },
  { id: 3, name: 'Quattro Formaggi',     price: 16.00, desc: 'Mozzarella, gorgonzola, pecorino, parmigiano',           img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80' },
  { id: 4, name: 'Prosciutto e Funghi',  price: 16.50, desc: 'Parma ham, porcini mushrooms, mozzarella',               img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80' },
  { id: 5, name: 'Vegetariana',          price: 14.50, desc: 'Grilled vegetables, olives, pesto, mozzarella',          img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80' },
  { id: 6, name: 'Spaghetti Carbonara',  price: 14.00, desc: 'Guanciale, egg yolk, pecorino romano, black pepper',     img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&q=80' },
];

/* cart = { itemId: quantity } */
let cart = {};

/* ══════════════════════════════════════
   TAB SWITCHING
══════════════════════════════════════ */
function switchTab(tabName, clickedBtn) {
  /* Update tab button styles */
  document.querySelectorAll('.contact-tab').forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  /* Show / hide tab content */
  document.getElementById('tab-reservation').style.display = tabName === 'reservation' ? 'block' : 'none';
  document.getElementById('tab-delivery').style.display    = tabName === 'delivery'    ? 'block' : 'none';
}

/* ══════════════════════════════════════
   RESERVATION FORM
══════════════════════════════════════ */
function submitReservation() {
  /* Read all field values */
  const first    = document.getElementById('resFirst').value.trim();
  const last     = document.getElementById('resLast').value.trim();
  const email    = document.getElementById('resEmail').value.trim();
  const phone    = document.getElementById('resPhone').value.trim();
  const date     = document.getElementById('resDate').value;
  const time     = document.getElementById('resTime').value;
  const guests   = document.getElementById('resGuests').value;
  const errEl    = document.getElementById('resError');

  /* Validation — all required fields must be filled */
  if (!first || !last || !email || !phone || !date || !time || !guests) {
    errEl.innerHTML = '<div class="error-msg">Please fill in all required fields (*).</div>';
    return;
  }

  /* Clear error and show success */
  errEl.innerHTML = '';
  document.getElementById('reservationForm').style.display    = 'none';
  document.getElementById('reservationSuccess').style.display = 'block';
}

function resetReservation() {
  /* Clear all inputs and go back to the form */
  document.querySelectorAll('#reservationForm input, #reservationForm select, #reservationForm textarea')
    .forEach(el => el.value = '');
  document.getElementById('reservationSuccess').style.display = 'none';
  document.getElementById('reservationForm').style.display    = 'block';
}

/* ══════════════════════════════════════
   DELIVERY — RENDER PIZZA LIST
══════════════════════════════════════ */
function renderPizzaList() {
  const container = document.getElementById('pizzaList');
  if (!container) return;

  container.innerHTML = DELIVERY_ITEMS.map(item => `
    <div class="pizza-row">
      <img src="${item.img}" alt="${item.name}"/>
      <div class="pizza-info">
        <div class="pizza-name">${item.name}</div>
        <div class="pizza-desc">${item.desc}</div>
        <div class="pizza-price">€${item.price.toFixed(2)}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num" id="qty-${item.id}">0</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════
   CART — ADD / REMOVE / UPDATE
══════════════════════════════════════ */
function changeQty(itemId, delta) {
  /* Add or subtract quantity — minimum 0 */
  cart[itemId] = Math.max(0, (cart[itemId] || 0) + delta);

  if (cart[itemId] === 0) delete cart[itemId]; /* remove from cart if 0 */

  /* Update the number shown next to the item */
  const qtyEl = document.getElementById('qty-' + itemId);
  if (qtyEl) qtyEl.textContent = cart[itemId] || 0;

  renderCart();
}

function renderCart() {
  const cartItemsEl  = document.getElementById('cartItems');
  const cartTotalEl  = document.getElementById('cartTotal');
  const cartTotalAmt = document.getElementById('cartTotalAmt');

  const itemIds = Object.keys(cart);

  /* Empty cart state */
  if (itemIds.length === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty">Your cart is empty.<br/>Add items to get started!</div>';
    cartTotalEl.style.display = 'none';
    return;
  }

  /* Build cart item rows */
  let total = 0;
  let html  = '';

  itemIds.forEach(id => {
    const item     = DELIVERY_ITEMS.find(i => i.id === parseInt(id));
    if (!item) return;
    const subtotal = item.price * cart[id];
    total += subtotal;

    html += `
      <div class="cart-item">
        <span class="cart-item-name">${item.name} ×${cart[id]}</span>
        <span class="cart-item-price">€${subtotal.toFixed(2)}</span>
        <button class="cart-remove" onclick="removeItem(${id})" title="Remove">×</button>
      </div>`;
  });

  cartItemsEl.innerHTML = html;
  cartTotalEl.style.display  = 'flex';
  cartTotalAmt.textContent = '€' + total.toFixed(2);
}

function removeItem(itemId) {
  delete cart[itemId];

  /* Reset the quantity display on the pizza row */
  const qtyEl = document.getElementById('qty-' + itemId);
  if (qtyEl) qtyEl.textContent = '0';

  renderCart();
}

/* ══════════════════════════════════════
   PLACE ORDER
══════════════════════════════════════ */
function placeOrder() {
  const address = document.getElementById('deliveryAddress').value.trim();
  const phone   = document.getElementById('deliveryPhone').value.trim();
  const errEl   = document.getElementById('cartError');

  if (Object.keys(cart).length === 0) {
    errEl.innerHTML = '<div class="error-msg">Please add at least one item to your order.</div>';
    return;
  }
  if (!address) {
    errEl.innerHTML = '<div class="error-msg">Please enter your delivery address.</div>';
    return;
  }
  if (!phone) {
    errEl.innerHTML = '<div class="error-msg">Please enter your phone number.</div>';
    return;
  }

  errEl.innerHTML = '';

  /* Clear the cart and reset everything */
  cart = {};
  renderCart();
  renderPizzaList();  /* resets all quantity displays to 0 */
  document.getElementById('deliveryAddress').value = '';
  document.getElementById('deliveryPhone').value   = '';

  showToast('Order placed! 🛵 Delivery in ~35 min');
}

/* ══════════════════════════════════════
   INIT — run when the page loads
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  renderPizzaList();

  /* Set the minimum selectable date to today */
  const resDate = document.getElementById('resDate');
  if (resDate) {
    resDate.min = new Date().toISOString().split('T')[0];
  }
});
