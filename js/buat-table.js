document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("tableBody");
  const emptyState = document.getElementById("emptyState");
  const countBadge = document.getElementById("countBadge");
  const searchInput = document.getElementById("searchInput");

  let currentQuery = "";

  function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function render() {
    const allRecords = DataStore.getAll();
    const query = currentQuery.trim().toLowerCase();

    const filtered = query
      ? allRecords.filter((r) =>
          [r.nama, r.nim, r.jenisLayanan].some((v) =>
            String(v).toLowerCase().includes(query)
          )
        )
      : allRecords;

    countBadge.textContent = `${filtered.length} data`;

    if (filtered.length === 0) {
      tableBody.innerHTML = "";
      emptyState.style.display = "block";
      emptyState.querySelector("a") && (emptyState.textContent = ""); // reset text node safety
      emptyState.innerHTML = allRecords.length === 0
        ? 'Belum ada data. <a href="index.html">Isi form</a> untuk menambahkan data pertama.'
        : "Tidak ada data yang cocok dengan pencarian.";
      return;
    }

    emptyState.style.display = "none";

    tableBody.innerHTML = filtered
      .map(
        (r, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(r.nama)}</td>
          <td>${escapeHtml(r.nim)}</td>
          <td><span class="badge">${escapeHtml(r.jenisLayanan)}</span></td>
          <td>${escapeHtml(r.keterangan)}</td>
          <td>${formatDate(r.createdAt)}</td>
          <td><button class="delete-btn" data-id="${r.id}">Hapus</button></td>
        </tr>`
      )
      .join("");

    tableBody.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (confirm("Hapus data ini?")) {
          DataStore.remove(btn.dataset.id);
          render();
        }
      });
    });
  }

  searchInput.addEventListener("input", (e) => {
    currentQuery = e.target.value;
    render();
  });

  render();
});