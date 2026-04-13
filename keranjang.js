function tampilKeranjang() {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  const container = document.getElementById("listKeranjang");
  const totalEl = document.getElementById("totalHarga");

  if (!container || !totalEl) return;

  container.innerHTML = "";

  keranjang.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-card">

        <input type="checkbox" class="pilih-item" data-index="${index}" checked>

        <div class="cart-img">
          <img src="gmbr/${item.img}">
        </div>

        <div class="cart-info">
          <h3>${item.judul}</h3>
          <p>Harga: Rp ${item.harga.toLocaleString('id-ID')}</p>
          <p>Jumlah: ${item.jumlah}</p>

          <button onclick="hapus(${index})" class="btn-hapus">
            Hapus
          </button>
        </div>

      </div>
    `;
  });

  // ⬇️ Event checkbox
  setTimeout(() => {
    const checkboxes = document.querySelectorAll(".pilih-item");

    checkboxes.forEach(cb => {
      cb.addEventListener("change", hitungTotal);
    });

    hitungTotal();
  }, 0);
}

// 🔢 HITUNG TOTAL (yang dicentang saja)
function hitungTotal() {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const checkboxes = document.querySelectorAll(".pilih-item");

  let total = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      const index = cb.dataset.index;
      const item = keranjang[index];

      total += item.harga * item.jumlah;
    }
  });

  document.getElementById("totalHarga").textContent =
    "Rp " + total.toLocaleString('id-ID');
}

// ❌ HAPUS ITEM
function hapus(index) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  keranjang.splice(index, 1);

  localStorage.setItem("keranjang", JSON.stringify(keranjang));

  tampilKeranjang();
}

// 📲 CHECKOUT WA (hanya yang dicentang)
function checkoutWA() {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const checkboxes = document.querySelectorAll(".pilih-item");

  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo, saya ingin memesan buku:%0A%0A";
  let total = 0;
  let adaItem = false;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      adaItem = true;

      const index = cb.dataset.index;
      const item = keranjang[index];

      let subtotal = item.harga * item.jumlah;
      total += subtotal;

      pesan += `- ${item.judul}%0A`;
      pesan += `Jumlah: ${item.jumlah}%0A`;
      pesan += `Subtotal: Rp ${subtotal.toLocaleString('id-ID')}%0A%0A`;
    }
  });

  if (!adaItem) {
    alert("Pilih minimal 1 produk!");
    return;
  }

  pesan += `Total: Rp ${total.toLocaleString('id-ID')}%0A`;
  pesan += "%0ATerima kasih 🙏";

  const noWA = "6283874489785";

  // buka WhatsApp
  window.open(`https://wa.me/${noWA}?text=${pesan}`, "_blank");

  // 🔥 hapus yang dicentang saja
  let sisa = [];

  checkboxes.forEach(cb => {
    if (!cb.checked) {
      const index = cb.dataset.index;
      sisa.push(keranjang[index]);
    }
  });

  localStorage.setItem("keranjang", JSON.stringify(sisa));

  tampilKeranjang();
}

// 🚀 JALANKAN
tampilKeranjang();