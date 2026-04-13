function updateCartCount() {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  let total = 0;

  keranjang.forEach(item => {
    total += item.jumlah;
  });

  const el = document.getElementById("cartCount");
  if (el) el.textContent = total;
}

updateCartCount();