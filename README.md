# Software Architecture - Group-4

PLanIt - Aplikasi Pemesanan Venue & Event Organizer

PlanIt adalah platform booking venue dan event organizer yang memudahkan pengguna mencari, membandingkan, dan memesan venue serta EO untuk berbagai acara secara aman dalam satu platform.

Tech Stack 

Frontend : 
- React + Typescript + Vite
- Tailwind CSS
- React Router DOM
- Axios

Backend : 
- NestJS
- TypeORM
- JWT Authentication
- Passport.js (Google OAuth)
- bcrypt

Database : 
- MySQL (XAMPP)

Fitur

1. Login & Register (Email + Google OAuth)
2. Browse Venue & Event Organizer
3. Filter & Sorting (kategori, lokasi, harga, rating)
4. Detail page dengan paket & ulasan
5. Booking System
6. Rating & Review System
7. Riwayat & Status booking
8. Profile Management
9. Chat

Arsitektur
- Layered Monolith Architecture

Design Pattern 

- Singleton
- Facade
- Observer
- Strategy

Setup Instalasi

Backend :
- cd planit-backend
- npm install (install node modules)
- cp .env.example .env
- isi .env dengan credential
- npm run start:dev

Frontend : 
- cd planit-frontend
- npm install
- npm run dev

Setup Database
1. Buat database 'planit_db' di phpMyAdmin
2. Jalankan backend - tabel otomatis terbuat
3. Seed data via Thunder Client atau Postman
   - POST http://localhost:3000/venues/seed
   - POST http://localhost:3000/organizers/seed

file .env di folder planit-backend
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=planit_db

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

