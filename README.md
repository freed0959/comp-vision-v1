# 🤖 Image Identifier AI

Aplikasi identifikasi gambar berbasis AI/ML sederhana. Upload foto, mesin akan identifikasi, dan tampilkan teks hasil identifikasinya. Hanya menampilkan hasil dengan confidence > 90%.

## ✨ Fitur

- ✅ Upload foto otomatis
- ✅ Identifikasi gambar real-time dengan AI
- ✅ Filter hasil confidence > 90%
- ✅ Preview gambar sebelum identifikasi
- ✅ UI modern dan responsif

## 🚀 Quick Start (5-15 menit)

### Prasyarat
- Node.js v18+ 
- Python 3.8+
- pip

### Step 1: Setup Frontend (Next.js)

```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

### Step 2: Setup Backend (Python)

```bash
# Di terminal baru
cd comp-vision-v1

# Buat virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run Flask server
python backend_server.py
```

Backend akan berjalan di `http://localhost:5000`

### Step 3: Buka Aplikasi

Buka di browser: **http://localhost:3000**

Upload foto → tunggu identifikasi → lihat hasil ✅

## 📁 Struktur Project

```
comp-vision-v1/
├── app/
│   ├── components/
│   │   └── ImageIdentifier.tsx    # Main React component
│   ├── page.tsx                   # Home page
│   └── layout.tsx
├── backend_server.py              # Flask server untuk ML
├── requirements.txt               # Python dependencies
├── package.json                   # Node.js dependencies
└── README.md
```

## 🛠️ Technology Stack

**Frontend:**
- Next.js 14 dengan TypeScript
- Tailwind CSS
- Lucide Icons

**Backend:**
- Python Flask
- Hugging Face Transformers
- PyTorch
- Pillow (image processing)

## 📊 Hasil Identifikasi

Aplikasi menggunakan Vision Transformer (ViT) model dari Google:
- ✅ Menampilkan hasil jika confidence > 90%
- ⚠️ Jika tidak ada hasil > 90%, tampilkan "closest match"
- 📈 Confidence score dalam persentase

## 🔧 Troubleshooting

### Error: "Cannot connect to server"
- Pastikan backend berjalan: `python backend_server.py`
- Check port 5000 tidak dipakai aplikasi lain

### Error: "ModuleNotFoundError"
- Run: `pip install -r requirements.txt`

### Slow processing
- Model pertama download ~500MB
- Tunggu download selesai
- Request berikutnya lebih cepat

## 📝 Notes

- Model: Google ViT-Base-Patch16-224
- Processing time: ~2-5 detik
- Image size: < 10MB
- Format: JPG, PNG, WebP

---

**Selamat menggunakan! 🎉**
