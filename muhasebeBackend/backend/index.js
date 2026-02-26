const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/Config/db');
const cors = require('cors');

// Rotaları içeri aktar (Bu kısım eksikti)
const authRoutes = require('./src/Routers/authRoutes');

// Yapılandırmayı ve Veritabanını yükle
dotenv.config();
connectDB();

const app = express();

// Middleware'ler
app.use(cors()); // Önce CORS gelmeli
app.use(express.json());

// API Rotalarını Kullan (Burayı ekledik)
app.use('/api/auth', authRoutes);

// Test rotası
app.get('/', (req, res) => {
  res.send('Muhasebe Backend Çalışıyor...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda yayında!`);
});