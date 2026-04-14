# Image Identifier AI - Deployment Guide

## 🚀 Deploy ke Replit (Recommended)

Replit adalah pilihan terbaik untuk aplikasi full-stack ini karena:
- ✅ Support Node.js + Python native
- ✅ No perlu setup rumit
- ✅ Auto-deploy dari GitHub
- ✅ Free tier terhingga

### Step 1: Push ke GitHub (Done!)

### Step 2: Buka Replit
1. Buka https://replit.com
2. Sign in dengan GitHub
3. Click "Create" → "Import from GitHub"
4. Cari repo: `your-username/comp-vision-v1`
5. Click "Import"

### Step 3: Setup di Replit
Replit akan:
- Auto-detect Node.js (untuk frontend)
- Run `npm install` otomatis

### Step 4: Create Python Scripts

Di Replit, buat file baru `run_backend.py`:
```python
# Untuk menjalankan Flask di background
import subprocess
import time

# Run backend
backend = subprocess.Popen(['python', 'backend_server.py'])

# Run frontend
try:
    subprocess.run(['npm', 'run', 'dev'])
except KeyboardInterrupt:
    backend.terminate()
```

### Step 5: Configure Replit (Buat `.replit` file)

Replit akan auto-create, tapi pastikan seperti ini:
```
run = "npm install && pip install -r requirements.txt && npm run dev"
```

### Step 6: Update backend untuk Replit

Edit `backend_server.py` - ganti URL di bagian terakhir:
```python
if __name__ == '__main__':
    app.run(
        debug=False,  # disable debug di production
        host='0.0.0.0',  # listen all interfaces
        port=5000
    )
```

### Step 7: Setup Environment Variables (Kalau butuh)
Di Replit:
1. Click "Tools" → "Secrets"
2. Tambahkan environment variables jika perlu

### Step 8: Click Run!

Tunggu install dependencies, terus aplikasi akan live!

---

## Alternative: Deploy Frontend ke Vercel + Backend terpisah

Kalau hanya mau deploy frontend saja ke Vercel:

### Step 1: Create `.env.production`
```
NEXT_PUBLIC_API_URL=https://backend-domain.example.com
```

### Step 2: Update frontend untuk ambil API URL dari env
Di `app/components/ImageIdentifier.tsx`:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const response = await fetch(`${API_URL}/api/identify`, {
  // ...
});
```

### Step 3: Deploy di Vercel
1. Buka https://vercel.com
2. Click "New Project"
3. Import dari GitHub
4. Click Deploy

### Step 4: Backend di Replit or Railway
- Backend bisa di Replit (separate) atau Railway.app
- Frontend akan call API endpoint backend

---

## Recommended: Replit Full-Stack ✅

Replit paling mudah karena:
- Just click & run
- Auto handle Node.js + Python
- Free deployment
- Easy sharing (dapat URL langsung)

Pilih Replit! 🎉

