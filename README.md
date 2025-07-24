# Admin Page Pembelian

Sistem admin sederhana berbasis Node.js + Express + EJS untuk input dan cancel pembelian produk di toko.

## 📦 Fitur
- Input data pembelian produk
- Cancel pembelian
- Database Produk, Stok, dan Pembelian (SQL)
- Tampilan EJS sederhana

## 🛠️ Cara Menjalankan
1. Ekstrak file `admin-pembelian.zip`
2. Masuk ke folder project:
   ```bash
   cd admin-pembelian
   Install dependencies:

npm install
Jalankan server:
node app.js
Buka di browser:
http://localhost:3000
🗂️ Struktur Database (MySQL)
sql
Salin kode
CREATE TABLE produk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100),
  harga INT
);

CREATE TABLE stok (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produk_id INT,
  jumlah INT,
  FOREIGN KEY (produk_id) REFERENCES produk(id)
);

CREATE TABLE pembelian (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produk_id INT,
  jumlah INT,
  tanggal DATETIME,
  status VARCHAR(20),
  FOREIGN KEY (produk_id) REFERENCES produk(id)
);
🔒 Catatan
Buat database MySQL terlebih dahulu (misal: db_toko)

Konfigurasikan koneksi database di file config/db.js





