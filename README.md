# SoftArch-Group-4

TASKLY - Aplikasi To-Do List

Aplikasi manajemen tugas yang membantu pengguna mengelola dan memprioritaskan tugas harian dengan fitur penanda urgensi, deadline, dan catatan.

Fitur Utama

1. Registrasi dan login akun
2. Tambah, edit, dan hapus tugas
3. Penanda tugas mendesak dan deadline
4. Filter tugas (Terlambat, Sangat Mendesak, Mendesak, Santai)
5. Pencarian tugas
6. Dark dan Light mode
7. Bisa pakai bahasa Indonesia dan Inggris
8. Pengaturan format tanggal dan waktu yang dapat disesuaikan
9. Halaman profile (ganti nama, ganti password)
10. Data tugas tersimpan per akun pengguna

Arsitektur

Setup Database

Buka MySQL

1. Buat database todo_app 
- CREATE DATABASE todo_app; 
- USE todo_app;

2. Buat table users dan tasks 
- CREATE TABLE users ( 
- id INT AUTO_INCREMENT PRIMARY KEY,
- name VARCHAR(255) NOT NULL,
- email VARCHAR(255) NOT NULL UNIQUE,
- password VARCHAR(255) NOT NULL,
- is_verified BOOLEAN DEFAULT TRUE,
- verification_token VARCHAR(255),
- created_at TIMESTAMP DEFAULT NOW(),
- updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
- );

- CREATE TABLE tasks ( 
- id INT AUTO_INCREMENT PRIMARY KEY,
- title VARCHAR(255) NOT NULL,
- note TEXT, deadline DATETIME,
- is_urgent BOOLEAN DEFAULT FALSE,
- is_done BOOLEAN DEFAULT FALSE,
- user_id INT NOT NULL,
- created_at TIMESTAMP DEFAULT NOW(),
- updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- );

Setup Backend

1. Masuk folder backend
2. cd backend
3. npm install (buat install node_modules karena nanti belom ada, dan untuk menginstall semua dependencies yang ada di package.json ke folder node_modules)
4. Buat file .env dengan format berdasarkan .env.example

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=
- DB_NAME=todo_app
- PORT=3000

- JWT_SECRET= 
- CLIENT_URL=http://localhost:5173

5.npm run dev (Jalankan backend)

Backend berjalan di http://localhost:3000

Setup Frontend

1. Buka terminal baru, masuk ke folder frontend
2. cd frontend
3. npm install (buat install node_modules)
4. npm run dev
5. Frontend berjalan di http://localhost:5173

API Endpoints

Method --- Endpoint --------------- Keterangan 
- POST     /api/auth/register       Registrasi akun baru 
- POST     /api/auth/login          Login akun 
- GET      /api/tasks               Ambil semua tugas milik user 
- POST     /api/tasks               Buat tugas baru 
- PUT      /api/tasks/:id           Update tugas 
- DELETE   /api/tasks/:id           Hapus tugas 
- GET      /api/profile             Ambil data profile 
- PUT      /api/profile             Update nama 
- PUT      /api/profile/password    Ganti password

Catatan

1. Semua endpoint /api/tasks dan /api/profile membutuhkan token JWT
2. File .env tidak disertakan dalam repository, gunakan .env.example sebagai panduan

-- Dokumentasi --
1. https://drive.google.com/drive/folders/1vBEIlNHh8R4xSF8b2XW_-KDmAU42K7-k
