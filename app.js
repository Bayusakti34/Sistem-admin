const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'toko_db'
});

app.get('/', (req, res) => {
  db.query('SELECT * FROM produk', (err, produk) => {
    db.query(\`
      SELECT pembelian.*, produk.nama 
      FROM pembelian 
      JOIN produk ON pembelian.produk_id = produk.id 
      ORDER BY pembelian.id DESC
    \`, (err, pembelian) => {
      res.render('index', { produk, pembelian });
    });
  });
});

app.post('/beli', (req, res) => {
  const { produk_id, jumlah } = req.body;
  db.query('SELECT harga FROM produk WHERE id = ?', [produk_id], (err, result) => {
    const harga = result[0].harga;
    const total = harga * jumlah;

    db.query('SELECT jumlah FROM stok WHERE produk_id = ?', [produk_id], (err, stokRes) => {
      const stok = stokRes[0].jumlah;
      if (stok >= jumlah) {
        db.query('INSERT INTO pembelian (produk_id, jumlah, total) VALUES (?, ?, ?)',
          [produk_id, jumlah, total],
          () => {
            db.query('UPDATE stok SET jumlah = jumlah - ? WHERE produk_id = ?', [jumlah, produk_id]);
            res.redirect('/');
          }
        );
      } else {
        res.send('Stok tidak cukup');
      }
    });
  });
});

app.post('/cancel', (req, res) => {
  const { id } = req.body;
  db.query('SELECT * FROM pembelian WHERE id = ?', [id], (err, hasil) => {
    const pembelian = hasil[0];
    if (pembelian.status === 'dibeli') {
      db.query('UPDATE pembelian SET status = "dibatalkan" WHERE id = ?', [id]);
      db.query('UPDATE stok SET jumlah = jumlah + ? WHERE produk_id = ?', [pembelian.jumlah, pembelian.produk_id]);
    }
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
