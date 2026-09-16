# Rangkuman Fitur: Cek Sertifikat

Dokumen ini merangkum cara kerja fitur **Certificate Checker** (cek & unduh sertifikat by NIM) di repo ini, termasuk komponen visual (amplop, tombol) dan teknik menyembunyikan NIM dari URL. Tujuannya: jadi referensi kalau mau bikin halaman serupa (misal fitur lain yang butuh "lookup by ID lalu tampilkan hasil").

Fitur ini paralel dengan fitur lama "Announcement/Seleksi" (`src/data/results/`), tapi dengan tambahan: data sertifikat lewat API route, dan hasil ditampilkan pakai animasi amplop + tombol download per sertifikat.

## 1. Alur end-to-end

```
Hero.tsx (link "Get Certificate" → #certificate)
        │
        ▼
CertificateChecker.tsx (form input NIM, section id="certificate" di homepage)
        │  fetch GET /api/certificates?nim=xxx
        ▼
src/app/api/certificates/route.ts (route handler, cari NIM di data server-side)
        │  200 → simpan NIM ke sessionStorage, router.push("/announcement")
        │  404 → tampilkan error di form, TIDAK pindah halaman
        ▼
/announcement (page.tsx, "use client")
        │  baca NIM dari sessionStorage (bukan dari URL query!)
        │  fetch ulang GET /api/certificates?nim=xxx untuk ambil data lengkap
        ▼
Envelope.tsx (animasi amplop terbuka) + daftar tombol download sertifikat
```

File-file terkait:

- `src/components/CertificateChecker.tsx` — form input di homepage
- `src/app/api/certificates/route.ts` — route handler (server-side lookup)
- `src/lib/certificate-session.ts` — konstanta key sessionStorage
- `src/data/certificates/types.ts` & `index.ts` — tipe & data statis sertifikat
- `src/app/announcement/page.tsx` — halaman hasil (`CertificateResult`)
- `src/app/announcement/layout.tsx` — metadata `noindex`/`nofollow`
- `src/components/Envelope.tsx` — animasi amplop

## 2. Form pencarian (`CertificateChecker.tsx`)

Section `id="certificate"` ditaruh di homepage (`src/app/page.tsx`), dipakai sebagai anchor target dari tombol "Get Certificate" di `Hero.tsx`.

Poin penting:

- Input NIM di-sanitize saat mengetik: `e.target.value.replace(/\D/g, "")` — hanya digit yang disimpan, jadi tidak perlu validasi format ketat.
- Saat submit, **tidak** langsung pindah halaman dengan NIM di URL. Alurnya:
  1. `fetch("/api/certificates?nim=...")` ke route handler.
  2. Kalau `res.ok` (200): simpan NIM ke `sessionStorage` pakai key dari `CERTIFICATE_NIM_STORAGE_KEY`, lalu `router.push("/announcement")` — **URL tujuan tidak membawa query NIM sama sekali**.
  3. Kalau gagal (404): tampilkan pesan error inline di form, user tetap di homepage.
- State `loading` menonaktifkan tombol submit dan mengganti label ("Searching...") supaya tidak double-submit.
- Styling: card putih rounded (`rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md`), tombol CTA pill (`rounded-full bg-primary`) dengan micro-interaction (`hover:scale-[1.02] active:scale-[0.98]`), konsisten dengan tombol lain di situs.

## 3. Route handler (`src/app/api/certificates/route.ts`)

Ini adalah bagian yang paling relevan untuk pertanyaan "cara nutupin NIM di URL" — lihat detail di bagian 6.

```ts
export async function GET(request: NextRequest) {
  const nim = request.nextUrl.searchParams.get("nim")?.trim();
  if (!nim) return NextResponse.json({ error: "Missing nim parameter" }, { status: 400 });

  const student = CERTIFICATES.find((c) => c.nim.trim() === nim);
  if (!student) return NextResponse.json({ error: "Certificate not found" }, { status: 404 });

  return NextResponse.json(student);
}
```

- Ini Next.js **Route Handler** (App Router, file `route.ts` di dalam `app/api/.../`), bukan komponen halaman — jadi kodenya cuma jalan di server, tidak pernah dikirim ke browser sebagai bundle JS.
- `CERTIFICATES` (array data statis) juga tidak pernah dikirim utuh ke client — hanya satu record (`student`) yang match NIM yang dikembalikan sebagai JSON. Ini beda dengan pola lama di `src/data/results/` yang di-import langsung ke client component lalu di-`Array.find()` di browser (lihat "Known open item" di `CLAUDE.md` — seluruh array `RESULTS` ikut ke bundle client, sehingga orang bisa dump semua data lewat devtools tanpa tahu NIM apa pun). Pola API route ini **menutup celah itu** untuk data sertifikat.
- Response status dipakai sebagai sinyal sukses/gagal (`res.ok`) di sisi client, bukan isi body yang di-parse manual untuk itu.

## 4. Halaman hasil (`/announcement/page.tsx`)

Komponen `CertificateResult` (client component) melalui beberapa state:

1. **Baca sessionStorage** (`useEffect` pertama): ambil NIM dari `sessionStorage.getItem(CERTIFICATE_NIM_STORAGE_KEY)`. `checkedStorage` jadi flag "sudah selesai cek storage" supaya tidak ada flash of wrong content sebelum tahu ada NIM atau tidak.
2. **Fetch ulang by NIM** (`useEffect` kedua, dependency `[nim]`): panggil `/api/certificates?nim=...` lagi untuk ambil data lengkap (nama, divisi, tim, daftar sertifikat). Pakai flag `cancelled` di cleanup function untuk menghindari `setState` setelah unmount.
3. Tiga kemungkinan tampilan:
   - **Loading**: spinner (`animate-spin` + border trick) selama `!checkedStorage || loading`.
   - **Tidak ada NIM di storage** (`!searched`): pesan "No search parameters provided." + link kembali ke home. Ini terjadi kalau orang buka `/announcement` langsung tanpa lewat form (mis. reload / share link) — sengaja, karena NIM memang tidak ada di URL untuk dibaca ulang.
   - **NIM ada tapi tidak ketemu** (`!student`): pesan "Certificate Not Found" + tombol "Try Again" balik ke `/#certificate`.
   - **Ketemu**: render `<Envelope status="Passed" />` + info siswa + tombol-tombol download.
- `layout.tsx` di folder yang sama menambahkan `robots: { index: false, follow: false }` supaya halaman hasil (yang berpotensi memuat nama orang) tidak terindeks Google — perlu file `layout.tsx` terpisah karena `page.tsx`-nya `"use client"` sehingga tidak bisa export `metadata` langsung.

## 5. Tombol-tombol sertifikat (dynamic buttons)

Bagian tombol di `announcement/page.tsx`:

```tsx
{student.certificates.map((cert, i) => (
  <a
    key={cert.title}
    href={cert.drive_link}
    target="_blank"
    rel="noopener noreferrer"
    className="... rounded-full border border-primary/30 bg-primary px-6 py-3 text-sm font-semibold text-white ... hover:-translate-y-0.5 shadow-sm hover:shadow-md ..."
    style={{ animationDelay: `${(i + 3) * 60}ms` }}
  >
    <Download className="h-5 w-5" />
    {cert.title}
  </a>
))}
```

- Satu siswa bisa punya **beberapa sertifikat** (`Certificate of Completion`, sertifikat "Best ..." khusus per divisi, sertifikat tim) — jadi tombol di-generate dari array `student.certificates`, bukan hardcode satu tombol.
- Tiap tombol adalah `<a target="_blank">` langsung ke link Google Drive (`drive_link`) — tidak ada proxy download, file-nya dibuka di tab baru dari Drive.
- `style={{ animationDelay: ... }}` dikombinasikan dengan class `animate-fade-in-up` supaya tombol-tombol muncul staggered (satu-satu, bukan sekaligus) — pola stagger yang sama dipakai di bagian header section (`stagger-0`, `stagger-1`, dst, lihat `globals.css`).
- Tombol "Back to Dashboard" pakai style outline (`border-2 border-primary/20 text-primary`) untuk membedakan dari CTA utama (filled `bg-primary`).

## 6. Amplop (`Envelope.tsx`)

Komponen murni presentational, terima satu prop `status: "Passed" | "Failed"`.

**State & timing** (dua `useState` + `useEffect` dengan `setTimeout` berantai):

1. `flapOpen` (default `false`) → jadi `true` setelah 600ms.
2. Begitu `flapOpen` jadi `true` **dan** `status === "Passed"`, tunggu 300ms lagi lalu trigger `canvas-confetti`:
   ```ts
   confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
   ```
3. `letterOut` (surat keluar dari amplop) jadi `true` setelah 1200ms total.
4. Kalau user punya `prefers-reduced-motion: reduce`, semua animasi di-skip — langsung set `flapOpen` dan `letterOut` ke `true` tanpa delay/confetti. **Selalu cek ini kalau bikin animasi baru di situs ini.**
5. Cleanup: `clearTimeout` untuk kedua timer di return function `useEffect`.

**Struktur visual** (murni CSS/SVG, tanpa image asset):

- **Badan amplop** (`absolute bottom-0 h-20 rounded-b-md`) — warna beda tergantung status (`#1C1629` gelap untuk Passed, `bg-gray-400` untuk Failed).
- **Flap atas**: `<svg>` segitiga (path `M0,0 L50,40 L100,0 Z`) yang di-rotate 3D (`rotateX(180deg)` saat terbuka) dengan `transformStyle: preserve-3d` — efek flap amplop "membuka ke belakang".
- **Surat**: div putih rounded yang posisinya (`bottom-0` → `bottom-[35%]`) dan tinggi (`h-[60%]` → `h-[75%]`) dianimasikan lewat Tailwind transition class + `transitionTimingFunction` custom (`var(--ease-out)` dari `globals.css`), plus opacity fade in.
- **Kantong depan** (front pocket): `<svg>` bentuk trapesium/V yang di-overlay di atas surat dan badan amplop (z-index tertinggi) supaya secara visual terlihat surat "terjepit" di dalam amplop.
- **Confetti tambahan (dekorasi CSS)**: 12 `<span>` kecil warna-warni dengan class `animate-confetti`, posisi & rotasi dihitung per index (`rotate(${i*60}deg) translateY(-80px)`), hanya muncul kalau `isPassed && letterOut`. **Catatan**: keyframe `animate-confetti` tidak ditemukan di `globals.css` saat dokumen ini ditulis — kalau mau meniru pola ini di halaman lain, definisikan dulu `@keyframes confetti` + utility class-nya di `globals.css`, atau efek ini tidak akan terlihat gerak.
- Semua warna & shadow ikut token desain situs (`#1C1629` gelap, `shadow-sm`), konsisten dengan card putih translucent yang dipakai di komponen lain.

**Cara pakai ulang**: cukup import `Envelope` dan render `<Envelope status={"Passed" | "Failed"} />` di halaman lain yang butuh visual "hasil/pengumuman" — komponennya sudah self-contained (state, animasi, confetti library call semua di dalam).

## 7. Cara menyembunyikan NIM dari URL (route handler + sessionStorage)

Ini pola inti yang dipakai supaya `/announcement` **tidak** perlu `?nim=...` di URL (beda dari fitur lama di `src/data/results` yang masih pakai `useSearchParams` / query string).

**Kenapa perlu**: NIM + hasil (lulus/tidak, nama) adalah data personal. Kalau ditaruh di URL:
- Gampang ke-share tanpa sadar (screenshot URL bar, history browser, referrer header ke situs lain).
- Search engine bisa mengindeksnya walau sudah `noindex` di HTML (URL tetap bisa muncul di address bar/history orang lain).

**Caranya, langkah demi langkah:**

1. **Buat Route Handler** (`src/app/api/<nama>/route.ts`) yang menerima query param dan melakukan lookup **di server**, mengembalikan hanya hasil yang relevan (bukan seluruh dataset):
   ```ts
   // src/app/api/certificates/route.ts
   export async function GET(request: NextRequest) {
     const nim = request.nextUrl.searchParams.get("nim")?.trim();
     if (!nim) return NextResponse.json({ error: "..." }, { status: 400 });
     const student = CERTIFICATES.find((c) => c.nim.trim() === nim);
     if (!student) return NextResponse.json({ error: "..." }, { status: 404 });
     return NextResponse.json(student);
   }
   ```
   Query param NIM memang tetap muncul di URL request `fetch()` ini — tapi itu request **internal** (client → server API), bukan URL halaman yang dilihat/di-share user.

2. **Simpan hasil pencarian (bukan di URL) tapi di `sessionStorage`**, pakai satu konstanta key biar konsisten:
   ```ts
   // src/lib/certificate-session.ts
   export const CERTIFICATE_NIM_STORAGE_KEY = "certificate_nim";
   ```
   Di form (`CertificateChecker.tsx`), setelah fetch sukses:
   ```ts
   sessionStorage.setItem(CERTIFICATE_NIM_STORAGE_KEY, trimmedNim);
   router.push("/announcement"); // <-- tanpa query string
   ```
   `sessionStorage` (bukan `localStorage`) dipilih supaya data hilang begitu tab ditutup — tidak nempel permanen di device orang lain yang pakai komputer bersama.

3. **Di halaman tujuan, baca dari `sessionStorage`, bukan dari `useSearchParams()`**:
   ```ts
   const stored = sessionStorage.getItem(CERTIFICATE_NIM_STORAGE_KEY);
   ```
   Karena baca `sessionStorage` butuh `window`, ini hanya bisa jalan di client (`"use client"` + di dalam `useEffect`), tidak bisa di server component.

4. **Fetch ulang by NIM dari halaman tujuan** untuk ambil data lengkap yang mau ditampilkan — jangan taruh seluruh objek hasil ke `sessionStorage` sekaligus kalau datanya besar/berubah; cukup simpan identifier (NIM), lalu fetch fresh data tiap kali halaman dibuka. Ini juga memastikan data selalu up-to-date kalau ada perubahan di server.

5. **Tangani kasus "buka halaman tanpa lewat form"**: kalau `sessionStorage` kosong (user buka `/announcement` langsung / reload dari bookmark lama), tampilkan state "No search parameters provided" — jangan error/crash.

6. **Tambahkan `noindex`/`nofollow`** di halaman hasil lewat `layout.tsx` terpisah (karena `page.tsx`-nya client component):
   ```ts
   export const metadata: Metadata = { robots: { index: false, follow: false } };
   ```

**Trade-off yang perlu disadari:**
- Halaman hasil **tidak bisa di-bookmark atau di-share langsung** — link `/announcement` doang tidak akan menampilkan apa-apa untuk orang lain (sesuai tujuan: mencegah orang lain mengintip data siswa lain lewat URL). Kalau butuh shareable link personal di kemudian hari, itu butuh pendekatan berbeda (mis. token unik per link, bukan query NIM polos).
- Refresh halaman hasil tetap berfungsi (selama tab yang sama belum ditutup) karena `sessionStorage` bertahan across reload, hanya hilang saat tab/window ditutup.
- Ini **mengurangi** exposure NIM di URL, tapi NIM tetap sempat lewat sebagai query param ke route handler internal (`/api/certificates?nim=...`) — itu normal dan tidak masalah karena itu request ke server sendiri, bukan URL yang terlihat/tersimpan di browser history sebagai halaman.

## 8. Resep singkat: bikin halaman "lookup by ID → hasil" serupa

1. Buat tipe & data di `src/data/<nama-fitur>/` (types.ts + index.ts), ikuti pola `certificates/`.
2. Buat route handler `src/app/api/<nama-fitur>/route.ts` — terima query param, `find()` di server, balikin 400/404/200 JSON.
3. Buat konstanta key di `src/lib/<nama-fitur>-session.ts`.
4. Buat form/section component (client) yang fetch ke route handler, simpan ID ke `sessionStorage` kalau sukses, lalu `router.push()` ke halaman hasil tanpa query string.
5. Buat halaman hasil (client component) yang baca `sessionStorage` di `useEffect`, fetch ulang data lengkap, dan render 3 state: loading / tidak ada ID di storage / ID ada tapi tidak ketemu / ketemu.
6. Kalau halaman hasil memuat data personal, tambahkan `layout.tsx` dengan `robots: { index: false, follow: false }`.
7. Untuk elemen visual "hasil" (amplop, badge, dsb), boleh pakai ulang `Envelope.tsx` langsung, atau contek pola state+timer+SVG-nya untuk animasi baru — ingat selalu cek `prefers-reduced-motion`.
