document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const statusBox = document.getElementById("formStatus");

  const fields = {
    nama: document.getElementById("nama"),
    nim: document.getElementById("nim"),
    jenisLayanan: document.getElementById("jenisLayanan"),
    keterangan: document.getElementById("keterangan"),
  };

  function setError(fieldName, message) {
    const el = document.getElementById(`err-${fieldName}`);
    if (el) el.textContent = message || "";
  }

  function validate() {
    let valid = true;

    const nama = fields.nama.value.trim();
    if (!nama) {
      setError("nama", "Nama wajib diisi.");
      valid = false;
    } else if (nama.length < 3) {
      setError("nama", "Nama minimal 3 karakter.");
      valid = false;
    } else {
      setError("nama", "");
    }

    const nim = fields.nim.value.trim();
    if (!nim) {
      setError("nim", "NIM wajib diisi.");
      valid = false;
    } else if (!/^\d{5,15}$/.test(nim)) {
      setError("nim", "NIM harus berupa angka (5-15 digit).");
      valid = false;
    } else {
      setError("nim", "");
    }

    // jenis layanan: wajib dipilih
    if (!fields.jenisLayanan.value) {
      setError("jenisLayanan", "Silakan pilih jenis layanan.");
      valid = false;
    } else {
      setError("jenisLayanan", "");
    }

    return valid;
  }

  function showStatus(message, type = "success") {
    statusBox.textContent = message;
    statusBox.className = `show ${type}`;
    setTimeout(() => {
      statusBox.className = "";
    }, 3500);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validate()) {
      showStatus("Periksa kembali data yang Anda masukkan.", "error");
      return;
    }

    const record = {
      nama: fields.nama.value.trim(),
      nim: fields.nim.value.trim(),
      jenisLayanan: fields.jenisLayanan.value,
      keterangan: fields.keterangan.value.trim() || "-",
    };

    DataStore.add(record);

    form.reset();
    showStatus(`Data "${record.nama}" berhasil disimpan.`, "success");
  });

  form.addEventListener("reset", () => {
    Object.keys(fields).forEach((key) => setError(key, ""));
  });
});