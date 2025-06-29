lucide.createIcons();

// Pas foto: update label saat pilih file
const pasFotoInput = document.getElementById('pas_foto');
if (pasFotoInput) {
  pasFotoInput.addEventListener('change', function () {
    const label = document.querySelector('label[for="pas_foto"]');
    if (this.files.length > 0) {
      label.textContent = this.files[0].name;
    } else {
      label.textContent = 'Unggah Foto';
    }
  });
}

// Form submit: kirim data ke Netlify Function + simpan PDF URL ke sessionStorage + redirect ke success.html
const pendaftaranForm = document.getElementById('pendaftaranForm');
if (pendaftaranForm) {
  pendaftaranForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Ubah foto ke base64 string
    const file = formData.get("pas_foto");
    const toBase64 = file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    const base64Foto = await toBase64(file);
    data.pas_foto = base64Foto;

    // Kirim ke serverless function
    const response = await fetch('/.netlify/functions/prosesPendaftaran', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    // Terima PDF
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Simpan URL PDF ke sessionStorage buat success.html
    sessionStorage.setItem('pdfURL', url);

    // Redirect ke success.html (tanpa download dulu)
    window.location.href = 'success.html';
  });
}

// Tombol download di success.html
const downloadPDFButton = document.getElementById('downloadPDF');
if (downloadPDFButton) {
  downloadPDFButton.addEventListener('click', function () {
    const pdfURL = sessionStorage.getItem('pdfURL');
    if (pdfURL) {
      const a = document.createElement('a');
      a.href = pdfURL;
      a.download = 'Bukti_Pendaftaran.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      alert('Maaf, file tidak ditemukan. Silakan daftar ulang.');
    }
  });
}
