# Lab EISD Landing Page

Landing page untuk Enterprise Intelligence System Development Laboratory menggunakan Next.js, TailwindCSS, dan TypeScript.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React 18**

## Fitur

✅ Responsive design (Mobile, Tablet, Desktop)  
✅ Modern UI dengan gradient & glassmorphism  
✅ Form recruitment dengan validasi  
✅ Komponen reusable & data-driven  
✅ SEO-friendly  
✅ Fast performance  

## Struktur Project

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── SectionHeading.tsx  # Reusable heading
│   ├── FocusArea.tsx       # Focus area section
│   ├── Divisions.tsx       # Division cards
│   ├── Highlights.tsx      # Highlight section
│   ├── RecruitmentForm.tsx # Registration form
│   └── Footer.tsx          # Footer
├── lib/
│   └── data.ts             # Content data
├── public/
│   └── images/
│       └── laptop.jpg      # Placeholder image
└── tailwind.config.ts      # Tailwind configuration
```

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser di [http://localhost:3000](http://localhost:3000)

## Build Production

```bash
npm run build
npm start
```

## Kustomisasi

### Mengubah Konten

Edit file `lib/data.ts` untuk mengubah:
- Focus areas
- Divisions
- Highlights
- Navigation items

### Mengubah Warna

Edit `tailwind.config.ts` di bagian `colors`:
```typescript
colors: {
  primary: {
    DEFAULT: '#6D5EF6', // Ubah warna primary
    dark: '#5B4DD4',
    light: '#8B7EFF',
  },
}
```

### Mengganti Gambar

Ganti file di folder `public/images/` dengan gambar real Anda.

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository di [vercel.com](https://vercel.com)
3. Deploy otomatis!

### Netlify

1. Build project: `npm run build`
2. Deploy folder `out/` ke Netlify

## Security Best Practices

- ✅ Form validation client-side
- ✅ File type validation (PDF only)
- ✅ Environment variables untuk secrets
- ⚠️ Tambahkan rate limiting untuk production
- ⚠️ Implement CAPTCHA untuk form submission

## License

© 2026 Lab EISD. All rights reserved.

