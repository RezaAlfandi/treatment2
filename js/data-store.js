const STORAGE_KEY = "layanan_records_v1";

const DataStore = {
  getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Gagal membaca data:", err);
      return [];
    }
  },

  saveAll(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  },

  add(record) {
    const records = this.getAll();
    const newRecord = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      createdAt: new Date().toISOString(),
      ...record,
    };
    records.unshift(newRecord); // data terbaru tampil di atas
    this.saveAll(records);
    return newRecord;
  },

  /** Hapus record berdasarkan id */
  remove(id) {
    const records = this.getAll().filter((r) => r.id !== id);
    this.saveAll(records);
    return records;
  },
};