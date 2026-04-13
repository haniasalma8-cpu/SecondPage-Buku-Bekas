const input = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card-link"); // ⬅️ GANTI INI

input.addEventListener("input", function () {
  const keyword = input.value.toLowerCase();

  cards.forEach(card => {
    const judul = card.querySelector("h3").innerText.toLowerCase();

    if (judul.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});