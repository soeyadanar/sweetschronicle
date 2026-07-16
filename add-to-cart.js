document.addEventListener("DOMContentLoaded", () => {

  var cart = JSON.parse(localStorage.getItem("cart")) || {};

  document.querySelectorAll(".cart-btn").forEach(btn => {

    btn.addEventListener("click", (e) => {
      e.preventDefault(); // 🔥 THIS IS THE KEY

      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);
      const image = btn.dataset.image;

      if (!id || !name || !price || !image) {
        console.error("Missing product data");
        return;
      }

      if (cart[id]) {
        cart[id].qty += 1;
      } else {
        cart[id] = {
          id,
          name,
          price,
          image,
          qty: 1
        };
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ AFTER saving, THEN move to cart page
      window.location.href = "cart.html";
    });

  });
});