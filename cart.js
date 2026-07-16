document.addEventListener("DOMContentLoaded", () => {

  var cart = JSON.parse(localStorage.getItem("cart")) || {};

  const cartItems = document.querySelector(".cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  function renderCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    Object.values(cart).forEach(item => {
      if (!item || !item.qty) return;

      subtotal += item.price * item.qty;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <img src="${item.image}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>¥${item.price}</p>

          <div class="quantity-control">
            <button class="minus" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="plus" data-id="${item.id}">+</button>
          </div>
        </div>

  <button class="remove" data-id="${item.id}" aria-label="Remove item">
    <i class="fa-solid fa-trash"></i>
  </button>

      `;

      cartItems.appendChild(div);
    });
    subtotalEl.textContent = `¥${subtotal}`;
    totalEl.textContent = `¥${subtotal}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartItems.addEventListener("click", e => {

  const removeBtn = e.target.closest(".remove");
  const plusBtn = e.target.closest(".plus");
  const minusBtn = e.target.closest(".minus");
  if (!removeBtn && !plusBtn && !minusBtn) return;
  const id =(removeBtn || plusBtn || minusBtn).dataset.id;
  if (!cart[id]) return;
  if (plusBtn) {
    cart[id].qty++;
  }

  if (minusBtn) {
    cart[id].qty--;
  if (cart[id].qty <= 0) delete cart[id];
  }

  if (removeBtn) {
    delete cart[id];
  }
  renderCart();

});

  renderCart();
});