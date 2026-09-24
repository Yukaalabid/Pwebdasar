// Tahun pada footer mengikuti tahun saat halaman dibuka.
document.querySelector("#year").textContent = new Date().getFullYear();

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const result = document.querySelector("#draft-result");
const draftText = document.querySelector("#draft-text");
const copyButton = document.querySelector("#copy-button");

// Formulir ini membuat draf, bukan mengirim pesan ke server.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.elements.nama.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.pesan.value.trim();

  // Browser sudah memeriksa format email dan kolom wajib.
  // Pemeriksaan ini juga mencegah pesan yang hanya berisi spasi.
  if (!name || !email || !message) {
    status.textContent = "Isi nama, email, dan pesan terlebih dahulu.";
    result.hidden = true;
    return;
  }

  draftText.value =
    `Halo Yuka,\n\n${message}\n\n` +
    `Salam,\n${name}\n` +
    `Email untuk membalas: ${email}`;

  result.hidden = false;
  status.textContent = "Draf sudah siap. Kamu bisa menyalinnya di bawah.";
  copyButton.textContent = "Salin draf";
});

form.addEventListener("input", function () {
  result.hidden = true;
  status.textContent = "";
});

copyButton.addEventListener("click", async function () {
  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error("Fitur clipboard tidak tersedia");
    }

    await navigator.clipboard.writeText(draftText.value);
    copyButton.textContent = "Draf tersalin";
    status.textContent = "Draf berhasil disalin.";
  } catch (error) {
    draftText.focus();
    draftText.select();
    status.textContent =
      "Teks sudah dipilih. Tekan Ctrl+C untuk menyalin, atau Cmd+C jika memakai Mac.";
  }
});
