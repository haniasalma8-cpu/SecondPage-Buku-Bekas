const params = new URLSearchParams(window.location.search);

const judul = decodeURIComponent(params.get("judul"));
const harga = params.get("harga");
const img1 = params.get("img1");
const img2 = params.get("img2");
const penulis = decodeURIComponent(params.get("penulis"));
const kondisi = decodeURIComponent(params.get("desk"));

document.getElementById("judul").textContent = judul;
document.getElementById("harga").textContent = "Rp " + Number(harga).toLocaleString('id-ID');
document.getElementById("penulis").textContent = penulis;
document.getElementById("kondisi").textContent = kondisi;

const mainImg = document.getElementById("mainImg");
const thumb1 = document.getElementById("thumb1");
const thumb2 = document.getElementById("thumb2");

mainImg.src = "gmbr/" + img1;
thumb1.src = "gmbr/" + img1;
thumb2.src = "gmbr/" + img2;

thumb1.onclick = () => mainImg.src = "gmbr/" + img1;
thumb2.onclick = () => mainImg.src = "gmbr/" + img2;

// Ganti bagian pesan di detail.js kamu dengan ini
const pesan = `Halo SecondPage, saya ingin memesan buku ini:

📚 *DETAIL BUKU*
Judul   : ${judul}
Penulis : ${penulis}
Harga   : Rp ${Number(harga).toLocaleString('id-ID')}
Kondisi : ${kondisi}

📍 *DATA PENERIMA* (Mohon diisi)
Nama    : 
Alamat  : 
No. HP  : 
`

document.getElementById("waLink").href =
  "https://wa.me/6283874489785?text=" + encodeURIComponent(pesan);
document.getElementById("waLink").href =
  "https://wa.me/6283874489785?text=" + encodeURIComponent(pesan);
  function tambahKeranjang() {
  const produk = {
    judul,
    harga: Number(harga),
    img: img1,
    jumlah: 1
  };

  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  const index = keranjang.findIndex(item => item.judul === produk.judul);

  if (index !== -1) {
    keranjang[index].jumlah += 1;
  } else {
    keranjang.push(produk);
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjang));

  alert("Produk ditambahkan ke keranjang!");
}