# 📌 CMS App

Aplikasi **Content Management System (CMS)** sederhana yang dibuat menggunakan **Next.js** dan **TypeScript**

---

## 🚀 Fitur Utama

- **Autentikasi sederhana** (login dengan kredensial hardcode).
- **Halaman Home**:
  - Menampilkan pesan selamat datang.
  - Menampilkan jumlah *Menu Group* dan *Menu* yang sudah dibuat.
- **Halaman Settings**:
  - CRUD (*Create, Read, Update, Delete*) untuk **Menu Group**.
  - CRUD untuk **Menu** (per grup).
  - Menampilkan menu dalam bentuk dropdown jika grup memiliki menu.
- **Responsif**: tampilan mendukung desktop, tablet, dan ponsel.
- Data tersimpan di **IndexedDB** agar tidak hilang saat halaman direfresh.

---

## 🛠️ Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) (React Framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/) (komponen UI)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Yup](https://github.com/jquense/yup) & [React Hook Form](https://react-hook-form.com/) (validasi & form)
- IndexedDB (penyimpanan lokal)

> 💡 **Catatan:** Proyek ini dikembangkan menggunakan **Node.js v22.15.0**.  
> Disarankan menggunakan versi yang sama atau lebih baru agar kompatibel.

---

## 🔧 Instalasi & Menjalankan Proyek

1. **Clone repositori ini**

    ```bash
    git clone https://github.com/febryana0219/cms-app-fe-test-kds.git
    cd cms-app-fe-test-kds
    ```

2. Instal dependensi

    ```bash
    npm install
    ```

3. Jalankan 
    ```bash
    npm run dev
    ```

4. Buka di browser:

    http://localhost:3000

---

## 🔑 Login

Gunakan user berikut untuk masuk ke aplikasi:

Username : admin

Password : password123

---

## 🧩 Catatan Tambahan

Data akan tersimpan di IndexedDB, jadi setelah refresh, data tidak akan hilang.

Jika ingin memulai dari awal, hapus data di IndexedDB melalui DevTools browser.

---

## ✨ Dibuat oleh

Febryana – untuk keperluan **Take-Home Frontend Test - PT Klik Digital Sinergi**
