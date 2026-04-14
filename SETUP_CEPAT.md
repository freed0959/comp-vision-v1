# ⚡ SETUP CEPAT - Image Identifier AI

## 1️⃣ Prasyarat Dipasang
- ✅ Node.js (dari create-next-app sudah install)
- ✅ Python 3.8+ (download dari python.org)
- ✅ pip (comes with Python)

## 2️⃣ Buka 2 Terminal

### Terminal 1: Frontend (Next.js)
```bash
npm run dev
```
Tunggu sampai keluar: `Ready in ... ms`
Buka: http://localhost:3000

### Terminal 2: Backend (Python)
```bash
# Setup virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Yang macOS/Linux:
python3 -m venv venv
source venv/bin/activate

# Install libraries
pip install -r requirements.txt

# Jalankan server
python backend_server.py
```
Tunggu sampai keluar: `Running on http://127.0.0.1:5000`

## 3️⃣ Done! Silakan Upload Foto 🎉

- Buka http://localhost:3000
- Upload foto
- Tunggu identifikasi (~2-5 detik)
- Lihat hasil yang confidence > 90%

## ⚠️ Jika Ada Error

### Error: ModuleNotFoundError
```bash
# Pastikan di virtual environment, terus run:
pip install -r requirements.txt
```

### Error: Cannot connect to server
- Pastikan Terminal 2 berjalan (backend)
- Check port 5000 tidak terpakai (run di cmd: `netstat -ano | findstr :5000`)

### Lambat loading
- Request pertama download model (~500MB)
- Tunggu sampai selesai (bisa 2-5 menit)
- Request kedua lebih cepat

## 📝 File Penting

- `package.json` - Frontend dependencies
- `requirements.txt` - Backend dependencies
- `backend_server.py` - Mesin identifikasi (Flask)
- `app/components/ImageIdentifier.tsx` - Interface upload
- `app/page.tsx` - Main page

## 🎯 Apa Yang Terjadi?

1. Upload foto ke Next.js frontend
2. Frontend kirim ke Flask backend (port 5000)
3. Backend identify pakai Google ViT model
4. Return hasil yang confidence > 90%
5. Frontend tampilkan di halaman

Gitu! Simple banget 😄

---

**Butuh bantuan? Check README.md**
