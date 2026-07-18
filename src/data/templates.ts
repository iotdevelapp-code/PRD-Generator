/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PrdDocument } from '../types';

export const STATIC_TEMPLATE: Omit<PrdDocument, 'id' | 'createdAt' | 'updatedAt'> = {
  title: "Website Portofolio Profesional & Landing Page Jasa Konsultasi",
  description: "Dokumen Kebutuhan Produk (PRD) untuk pembuatan website profil profesional personal yang responsif, cepat, SEO-friendly, dan fokus pada konversi klien.",
  architecture: "static",
  theme: "minimalist",
  targetAudience: "Klien potensial, HR manager, dan mitra bisnis yang mencari jasa konsultasi IT berkualitas tinggi. Audiens utamanya berusia 25-50 tahun yang mengutamakan portofolio kerja nyata dan testimoni valid.",
  sitemap: `- **Home (Beranda)**: Hero header dengan value proposition utama, ringkasan keahlian, call-to-action (CTA) utama.
- **Tentang Saya**: Riwayat profesional, latar belakang pendidikan, sertifikasi, nilai-nilai yang dianut.
- **Layanan (Services)**: Rincian jasa konsultasi (Arsitektur Solusi, Audit Keamanan, Optimasi Cloud).
- **Portofolio**: Grid interaktif berisi studi kasus proyek terdahulu dengan filter kategori teknologi.
- **Blog**: Artikel/insights berkala mengenai tren teknologi terbaru untuk membangun authority (SEO-focused).
- **Kontak**: Formulir kontak, link media sosial (LinkedIn, GitHub), peta lokasi, dan detail email.`,
  contentRequirements: `- **Media Portofolio**: Gambar berkualitas tinggi (web mockup) dengan metadata deskripsi proyek, teknologi yang digunakan, serta metrik keberhasilan proyek (misal: "meningkatkan konversi sebesar 40%").
- **Blog Posts**: Editor Markdown sederhana atau generator teks statis (SSG) untuk mempublikasikan artikel teknis dengan gambar banner dan sintaks kode terformat.
- **Copywriting**: Pendekatan profesional dengan gaya penulisan persuasif, ringkas, dan bebas dari jargon berlebihan.`,
  performanceSeo: `- **Lighthouse Score**: Target minimum skor 95 untuk Performance, Accessibility, Best Practices, dan SEO.
- **Kecepatan Muat**: Waktu muat LCP (Largest Contentful Paint) di bawah 1.5 detik pada jaringan 4G.
- **SEO On-Page**: Implementasi Meta Tags dinamis, skema struktur JSON-LD untuk artikel blog, sitemap XML otomatis, dan optimasi gambar otomatis (format WebP/AVIF).
- **Hosting**: Deployed pada CDN global (Netlify/Vercel) untuk latensi mendekati nol.`,
  timeline: "Minggu 1: Wireframing & Desain UI, Minggu 2: Coding Struktur Statis, Minggu 3: Integrasi Konten & SEO, Minggu 4: QA & Launching.",
  outOfScope: "Fitur transaksi pembayaran langsung, forum diskusi pengguna, dan sistem manajemen database dinamis."
};

export const DYNAMIC_TEMPLATE: Omit<PrdDocument, 'id' | 'createdAt' | 'updatedAt'> = {
  title: "SaaS Platform Manajemen Tugas Kolaboratif (TaskFlow)",
  description: "PRD untuk pembuatan platform manajemen tugas tim dengan sistem board Kanban, notifikasi real-time, pembagian tugas dinamis, dan analitik performa.",
  architecture: "dynamic",
  theme: "corporate",
  targetAudience: "Tim startup, agensi digital, dan manajer proyek yang membutuhkan alat koordinasi tugas yang cepat, andal, dan mendukung kolaborasi jarak jauh (remote work).",
  sitemap: `- **Landing Page**: Pengenalan fitur SaaS, tabel harga (pricing), FAQ, testimonial, tombol Sign Up gratis.
- **App Dashboard**: Ruang kerja tim (Workspace), statistik penyelesaian tugas, kalender tenggat waktu.
- **Kanban Board**: Kolom status (To Do, In Progress, Review, Done) berisi kartu-kartu tugas yang bisa di-drag-and-drop.
- **Tampilan Kalender**: Visualisasi deadline tugas bulanan/mingguan secara interaktif.
- **Halaman Pengaturan Tim**: Mengelola anggota tim, mengundang via email, mengatur hak akses per-proyek.
- **Halaman Analitik**: Grafik efisiensi pengerjaan tugas menggunakan Recharts (diagram garis/batang).`,
  contentRequirements: `- **Notifikasi Dinamis**: Log aktivitas tim untuk setiap perubahan status tugas atau komentar baru.
- **Detail Tugas (Cards)**: Rich text editor untuk deskripsi tugas, melampirkan berkas (PDF/Gambar), menetapkan tenggat waktu, checklist sub-tugas, dan kolom komentar real-time.
- **Dashboard Metrik**: Penghitungan otomatis rasio penyelesaian tugas per anggota tim dalam bentuk diagram persentase.`,
  performanceSeo: `- **Responsivitas UI**: Interaksi drag-and-drop di bawah 50ms untuk pengalaman pengguna yang mulus.
- **SEO Landing Page**: Optimasi SEO khusus halaman depan untuk keyword "alat manajemen proyek kolaboratif", sementara aplikasi utama diblokir dari indeks robot search engine demi keamanan.
- **Data Caching**: Strategi query caching di sisi klien (React Query atau SWR) untuk meminimalisir API overhead.`,
  userRoles: `- **Admin/Workspace Owner**: Kontrol penuh atas seluruh proyek, penagihan (billing), hak akses pengguna, dan penghapusan workspace.
- **Project Manager**: Dapat membuat papan kerja baru, menambah/menghapus anggota, menugaskan task, dan mengatur deadline.
- **Team Member**: Dapat melihat papan kerja, membuat task baru di papan yang ditentukan, mengubah status task miliknya, serta memberi komentar.
- **Guest (Tamu)**: Akses hanya-baca (read-only) untuk memantau progres tanpa bisa mengedit konten.`,
  databaseSchema: `- **Users**: id (PK), name, email (unique), password_hash, avatar_url, role_id, created_at.
- **Workspaces**: id (PK), name, owner_id (FK), created_at.
- **Projects**: id (PK), workspace_id (FK), title, description, created_at.
- **Tasks**: id (PK), project_id (FK), assignee_id (FK), title, description, status (enum: 'todo', 'in_progress', 'review', 'done'), priority (enum: 'low', 'medium', 'high'), due_date, created_at.
- **Comments**: id (PK), task_id (FK), user_id (FK), content, created_at.`,
  apiIntegration: `- **POST /api/auth/register & login**: Autentikasi JWT yang aman.
- **GET /api/workspaces**: Mengambil daftar workspace yang dimiliki/diikuti oleh user saat ini.
- **POST /api/tasks & PUT /api/tasks/:id**: Membuat dan memperbarui properti tugas, termasuk perpindahan kolom Kanban.
- **GET /api/analytics/summary**: Mengembalikan data ringkasan kinerja tim untuk diagram visualisasi.
- **WebSocket (wss://)**: Koneksi real-time untuk sinkronisasi aktivitas Kanban Board lintas perangkat anggota tim secara instan.`,
  stateManagement: `- **Global State**: Menggunakan Zustand atau Redux Toolkit untuk mengelola status autentikasi user, workspace aktif, dan preferensi tema global.
- **Server Cache (SWR / React Query)**: Sinkronisasi data tugas secara otomatis dengan mekanisme background refetching saat jendela aplikasi difokuskan kembali.
- **Local Persistence**: Menyimpan sesi autentikasi (JWT Token) di localStorage secara aman dengan enkripsi sederhana atau HttpOnly cookie di produksi.`,
  timeline: "Bulan 1: Desain Basis Data & Setup API Endpoint, Bulan 2: Pembuatan UI Dashboard & Papan Kanban, Bulan 3: Integrasi Real-time & WebSocket, Bulan 4: Security Audit & Beta Launch.",
  outOfScope: "Integrasi video conferencing langsung di dalam aplikasi (diarahkan ke Google Meet API sebagai integrasi pihak ketiga)."
};

export interface PresetItem {
  id: string;
  name: string;
  category: 'mahasiswa' | 'cms' | 'umkm' | 'umum';
  data: Omit<PrdDocument, 'id' | 'createdAt' | 'updatedAt'>;
}

export const PRESETS: PresetItem[] = [
  // --- KATEGORI MAHASISWA ---
  {
    id: "mhs-thesis",
    name: "Sistem Manajemen Skripsi (ThesisTracker)",
    category: "mahasiswa",
    data: {
      title: "Sistem Manajemen Skripsi & Tugas Akhir (ThesisTracker)",
      description: "Platform pelacakan bimbingan skripsi mahasiswa, pencatatan revisi dari dosen pembimbing, pengelolaan daftar pustaka akademik, serta visualisasi progres bab menuju kelayakan sidang kelulusan.",
      architecture: "dynamic",
      theme: "n8n",
      targetAudience: "Mahasiswa tingkat akhir yang sedang menyusun tugas akhir, dosen pembimbing akademik, serta jajaran administrasi program studi di perguruan tinggi.",
      sitemap: `- **Dashboard Mahasiswa**: Ringkasan persetujuan draf per bab, tenggat waktu revisi, log bimbingan terbaru.
- **Form Konsultasi & Logbook**: Catatan diskusi bimbingan harian, poin revisi dosen pembimbing, dan formulir pengajuan unggah draf.
- **Repositori Dokumen**: Riwayat file draf (Bab 1 s.d. 5) dengan status pelacakan versi dokumen.
- **Panel Dashboard Dosen**: Antrean tinjauan draf mahasiswa, modul komentar revisi per baris paragraf, dan checklist persetujuan bab skripsi.`,
      contentRequirements: `- **Catatan Revisi Terstruktur**: Kolom input revisi mendetail yang ditautkan ke Bab & nomor halaman tertentu.
- **Metadata Daftar Pustaka**: Pengelolaan referensi jurnal dengan metadata lengkap (Penulis, Tahun, Judul, Publisher, DOI).
- **Ekspor Lembar Aktivitas**: Fitur ekspor berkas log aktivitas bimbingan terformat PDF sebagai prasyarat administratif sidang.`,
      performanceSeo: `- **Kecepatan Sinkronisasi**: Pembaruan log bimbingan real-time di bawah 200ms lintas perangkat dosen-mahasiswa.
      - **Enkripsi File Dokumen**: Perlindungan file PDF/Word draf skripsi di database penyimpanan untuk mencegah kebocoran karya ilmiah sebelum dipublikasikan.
      - **Optimasi Seluler**: Desain web mobile-friendly 100% agar mahasiswa mudah memantau komentar dosen via ponsel.`,
      userRoles: `- **Mahasiswa**: Mengunggah draf bab baru, mencatat log konsultasi bimbingan, memantau riwayat revisi.
- **Dosen Pembimbing**: Membaca draf, memberikan feedback/revisi tertulis, menyetujui draf bab (checklist kelayakan).
- **Admin Jurusan**: Memetakan pasangan mahasiswa-dosen, memantau statistik rata-rata kelulusan per angkatan.`,
      databaseSchema: `- **Users**: id, nama, nim_nip, email, password_hash, role (mahasiswa/dosen/admin), created_at.
- **Thesis**: id, student_id (FK), title, supervisor_1_id (FK), supervisor_2_id (FK), current_stage (bab1-5), status.
- **ConsultationLogs**: id, thesis_id (FK), date, notes, revision_points, document_url, is_approved (boolean).`,
      apiIntegration: `- **POST /api/consultation/submit**: Pengajuan draf bab baru oleh mahasiswa.
- **PUT /api/thesis/approve**: Validasi persetujuan bab akademik oleh dosen pembimbing.
- **GET /api/thesis/analytics**: Penarikan grafik rata-rata pengerjaan revisi per bab.`,
      stateManagement: `- **Global State**: Zustand untuk menyimpan data sesi otentikasi user dan filter status notifikasi aktif.
- **Local Storage**: Auto-save draf formulir ketikan mahasiswa saat jaringan terputus agar tulisan tidak hilang.`,
      timeline: "Minggu 1: Riset kebutuhan akademik & pemodelan database. Minggu 2: Pembuatan API & interface logbook mahasiswa. Minggu 3: Implementasi portal feedback dosen & persetujuan. Minggu 4: Integrasi generator PDF & launching.",
      outOfScope: "Uji plagiasi Turnitin otomatis secara langsung (hanya menyajikan modul input nilai eksternal hasil cek plagiarisme)."
    }
  },
  {
    id: "mhs-evote",
    name: "E-Voting Pemilihan Raya (PEMIRA)",
    category: "mahasiswa",
    data: {
      title: "Portal E-Voting Pemilihan Raya Mahasiswa (E-Vote PEMIRA)",
      description: "Sistem pemilihan umum ketua BEM dan anggota himpunan berbasis web yang aman, transparan, menggunakan validasi kode token unik pemilih, serta menampilkan hitung cepat (quick count) real-time yang akurat.",
      architecture: "dynamic",
      theme: "cyberpunk",
      targetAudience: "Seluruh mahasiswa aktif universitas sebagai pemilih, komisi pemilihan umum mahasiswa (KPUM), serta panitia pengawas PEMIRA.",
      sitemap: `- **Bilik Beranda (Landing Page)**: Informasi kampanye, tata cara pencoblosan digital, waktu hitung mundur PEMIRA.
- **Katalog Kandidat**: Profil lengkap pasangan calon (paslon), visi, misi, rincian program kerja unggulan, dan video presentasi.
- **Bilik Suara Digital (Voting Booth)**: Halaman steril dengan validasi token ganda untuk melakukan pemilihan kandidat.
- **Quick Count Dashboard**: Diagram lingkaran & diagram batang Recharts interaktif yang menampilkan statistik perolehan suara live.
- **Panel Admin KPUM**: Generator token pemilih acak, manajemen DPT (Daftar Pemilih Tetap), dan kendali sistem buka/tutup bilik suara.`,
      contentRequirements: `- **Curriculum Vitae Paslon**: Riwayat prestasi organisasi, teks visi-misi terstruktur, dan tautan platform kampanye eksternal.
- **Otentikasi Token OTP**: Token akses vote sekali pakai dikirim otomatis ke alamat email institusi mahasiswa (@student.univ.ac.id) untuk keaslian pemilik suara.`,
      performanceSeo: `- **Zero Latency Live Count**: Grafik perolehan suara diperbarui secara instan melalui polling cerdas (<200ms).
- **Keamanan Siber Tingkat Tinggi**: Hash sha-256 untuk kerahasiaan suara pemilih (anonimitas mutlak), proteksi pencegahan suara ganda (double-voting).
- **Scale Capability**: Mampu menangani beban trafik tinggi hingga 5,000 koneksi bersamaan saat jam sibuk pemilihan.`,
      userRoles: `- **Pemilih (Mahasiswa)**: Membaca profil kandidat, memverifikasi identitas, melakukan vote sekali pakai.
- **Admin KPUM**: Mengimpor data DPT, mempublikasikan generator token, menutup/membuka portal pemilihan.
- **Saksi Pengawas**: Akses read-only ke ringkasan audit log transaksi suara masuk tanpa mengetahui identitas pemilih.`,
      databaseSchema: `- **Voters**: id, email, nim, token_hash, has_voted (boolean), voted_at.
- **Candidates**: id, name, position, candidate_number, photo_url, vision_mission.
- **Votes**: id, candidate_id, audit_hash, created_at.`,
      apiIntegration: `- **POST /api/voters/request-token**: Pengiriman email token pemilih.
- **POST /api/vote/cast**: Mengirimkan pilihan suara pemilih secara aman.
- **GET /api/vote/live-stream**: Mengambil statistik suara masuk untuk real-time quick count.`,
      stateManagement: `- **Client State**: Penggunaan state lokal yang steril (tanpa persitence caching) demi keamanan kerahasiaan data voting di browser klien.`,
      timeline: "Minggu 1: Desain modul keamanan token & database paslon. Minggu 2: Pembuatan bilik suara digital & form otentikasi. Minggu 3: Implementasi grafik real-time quick count. Minggu 4: Uji simulasi beban trafik & PEMIRA online.",
      outOfScope: "Sistem registrasi paslon secara mandiri (pendaftaran wajib diverifikasi secara luring oleh panitia KPUM)."
    }
  },
  {
    id: "mhs-portfolio",
    name: "Web Portofolio & CV Digital Magang",
    category: "mahasiswa",
    data: {
      title: "Portofolio Akademik & CV Digital Kesiapan Magang Mahasiswa",
      description: "Website statis portfolio pribadi yang elegan, responsif, dan SEO-friendly untuk memamerkan proyek perkuliahan, riwayat sertifikasi, organisasi, dan studi kasus guna menarik minat rekruter magang industri.",
      architecture: "static",
      theme: "minimalist",
      targetAudience: "Tim Rekruter (HRD), manajer divisi perusahaan incaran, akademisi penilai magang, dan jaringan profesional LinkedIn.",
      sitemap: `- **Beranda Utama**: Foto profil profesional, resume singkat (elevator pitch), dan tautan cepat unduh CV PDF.
- **Portofolio Proyek**: Grid proyek kuliah terbaik lengkap dengan filter kategori (Development, Desain, Riset).
- **Studi Kasus Magang**: Artikel mendalam yang menjelaskan kontribusi spesifik menggunakan metode STAR (Situation, Task, Action, Result).
- **Sertifikasi & Keahlian**: Daftar lisensi kompetensi, keahlian teknis (hard skills), dan keahlian interpersonal (soft skills).
- **Form Kontak**: Formulir hubungi saya statis terintegrasi dengan email client atau static form handler.`,
      contentRequirements: `- **Dokumen CV ATS-Friendly**: Tombol unduhan untuk file resume PDF yang ramah sistem pemfilter otomatis rekruter.
- **Studi Kasus Visual**: Tangkapan layar dokumentasi pengerjaan proyek (wireframe, skema diagram, atau dashboard kode).`,
      performanceSeo: `- **Lighthouse Performance**: Skor minimal 98 untuk menjamin website termuat dalam <1 detik di perangkat seluler.
- **On-page SEO**: Optimasi meta-title dengan keyword pencarian "portfolio mahasiswa [bidang keahlian] indonesia" untuk visibilitas Google Search.`,
      timeline: "Minggu 1: Pemilihan proyek kuliah & penulisan narasi STAR. Minggu 2: Pembuatan UI responsif Tailwind. Minggu 3: Optimasi gambar & integrasi formulir kontak. Minggu 4: Hosting di Vercel/Netlify.",
      outOfScope: "Fitur login admin panel, kolom komentar interaktif pembaca, atau backend database dinamis."
    }
  },

  // --- KATEGORI WEB CMS ---
  {
    id: "cms-media",
    name: "Portal Berita & Media Kampus",
    category: "cms",
    data: {
      title: "Portal Berita Kampus & CMS Media Suara Komunitas",
      description: "Sistem Manajemen Konten (CMS) portal berita interaktif kampus dengan editor kaya fitur (Rich Text), kategorisasi otomatis, kolom komentar moderasi, serta alur penulisan yang terstruktur (editorial workflow).",
      architecture: "dynamic",
      theme: "n8n",
      targetAudience: "Mahasiswa aktif universitas, dosen, staf akademik, alumni, serta masyarakat luas pembaca berita lokal kampus.",
      sitemap: `- **Halaman Depan Portal**: Berita utama (carousel headline), klaster berita berdasarkan topik (Akademik, Opini, Event), dan widget cuaca/jadwal.
- **Halaman Artikel**: Antarmuka bacaan optimal (readable typography) dengan fitur penyesuaian ukuran teks & tombol bagikan berita.
- **Portal Penulis Kontributor**: Form pendaftaran & penyerahan draf berita opini bagi kontributor mahasiswa.
- **Dashboard Redaksi Editor**: Editor penulisan artikel (WYSIWYG), antrean persetujuan draf berita, dan panel moderasi komentar pembaca.`,
      contentRequirements: `- **Rich Text Editor**: Integrasi editor tulisan kaya dengan kemampuan sisip video, quote, formatting teks, dan gambar resolusi optimal.
- **Penyimpanan Aset Banner**: Optimalisasi otomatis gambar yang diunggah ke format WebP guna meminimalkan beban penyimpanan server.`,
      performanceSeo: `- **SEO Optimal**: Pengisian meta tags OpenGraph secara otomatis agar tampilan share link di medsos terlihat profesional.
- **SSR / Dynamic Caching**: Cache pintar di tingkat database/API untuk melayani ribuan pembaca berita yang sedang tren tanpa lag.`,
      userRoles: `- **Kontributor**: Menulis draf tulisan opini, mengirimkannya ke editor, merevisi draf berdasarkan catatan.
- **Editor Redaksi**: Mengoreksi tulisan kontributor, menjadwalkan tanggal rilis berita, memoderasi komentar.
- **Super Admin**: Mengatur kategori portal berita, mengelola akun jurnalis, memantau analitik views artikel harian.`,
      databaseSchema: `- **Posts**: id, title, slug, content, banner_url, category_id, author_id, status (draft, pending, published), published_at, views_count.
- **Categories**: id, name, slug.
- **Comments**: id, post_id (FK), author_name, email, content, status (approved, spam).`,
      apiIntegration: `- **GET /api/posts**: Mengambil kumpulan berita terpublikasi dengan filter kategori.
- **POST /api/posts/create**: Menyimpan draf berita tulisan jurnalis.
- **POST /api/comments**: Pengiriman komentar pembaca ke sistem antrean moderasi.`,
      stateManagement: `- **Global State**: Zustand untuk mengelola sesi login redaktur pelaksana, jurnalis, dan preferensi sidebar admin.
- **Data Caching**: React Query untuk meminimalkan latensi pemanggilan daftar antrean draf tulisan.`,
      timeline: "Bulan 1: Desain database & pembuatan antarmuka Rich Text editor. Bulan 2: Integrasi autentikasi per-role & alur editorial. Bulan 3: Setup SEO, OpenGraph dinamis, & modul komentar. Bulan 4: Security audit & Launching.",
      outOfScope: "Sistem berlangganan koran digital berbayar (paid premium subscription) atau sirkulasi distribusi koran fisik."
    }
  },
  {
    id: "cms-learning",
    name: "Website Profil Sekolah & Katalog Kursus",
    category: "cms",
    data: {
      title: "Landing Page Profil Sekolah & Katalog Program Kursus Terakreditasi",
      description: "Website profil institusi pendidikan statis berkecepatan tinggi yang menampilkan katalog program kursus, profil tenaga pengajar profesional, galeri fasilitas, serta fitur pengisian form minta silabus.",
      architecture: "static",
      theme: "corporate",
      targetAudience: "Calon peserta didik, orang tua murid yang mencari program pendidikan unggulan, serta calon mitra industri.",
      sitemap: `- **Landing Beranda**: Spanduk video profil, nilai akreditasi, statistik alumni sukses, program kursus paling populer.
- **Katalog Program Keahlian**: Rincian kelas belajar (materi, durasi pertemuan, sertifikat lulusan, & harga promo).
- **Profil Instruktur**: Biografi singkat pengajar bersertifikat internasional lengkap dengan tautan media sosial.
- **Galeri & Sarana**: Foto fasilitas kelas, lab komputer, dan lingkungan belajar interaktif.
- **Form Pendaftaran Minat**: Formulir pendaftaran calon peserta didik baru terintegrasi ke sistem webhook WA/Email.`,
      contentRequirements: `- **Silabus File PDF**: Tautan unduhan berkas PDF berisi kurikulum mata pelajaran per program.
- **Testimoni Alumni**: Slider testimonial berisi foto asli alumni, tempat bekerja saat ini, dan ulasan dampak kursus.`,
      performanceSeo: `- **Lighthouse Core Web Vitals**: Lolos pengujian kecepatan muat (LCP) Google Ads di bawah 1.5 detik guna optimasi biaya per klik.
- **JSON-LD Schema Markup**: Skema pencarian Google berjenis "Course" agar menu program kursus tampil menonjol langsung di hasil penelusuran.`,
      timeline: "Minggu 1: Pembuatan aset foto program & penyusunan kurikulum silabus. Minggu 2: Pembuatan layout grid katalog responsif. Minggu 3: Copywriting konversi & SEO markup. Minggu 4: Hosting & testing formulir statis.",
      outOfScope: "Sistem Learning Management System (LMS) interaktif untuk kelas online, pengerjaan kuis siswa, atau pengolahan nilai rapor."
    }
  },
  {
    id: "cms-blog",
    name: "Blog Pribadi Kreatif Multi-Kategori",
    category: "cms",
    data: {
      title: "Blog Pribadi Minimalis & CMS Publikasi Esai Kreatif",
      description: "Platform blogging pribadi dinamis dengan antarmuka penulisan langsung di web, pengelompokan tulisan berbasis tag/kategori, fitur perkiraan waktu baca (reading time), serta grafik statistik views pengunjung.",
      architecture: "dynamic",
      theme: "minimalist",
      targetAudience: "Penulis esai, jurnalis independen, kreator konten sastra, serta pembaca umum yang menyukai konten literasi berbobot.",
      sitemap: `- **Home Feed**: Aliran tulisan terbaru (chronological feed), kotak pencarian artikel instan, filter berdasarkan tag populer.
- **Halaman Artikel**: Area bacaan bebas distraksi (distraction-free reading experience) dengan font serif yang elegan & indikator kemajuan membaca (scroll progress bar).
- **Dashboard Admin Studio**: Ruang menulis minimalis dengan fitur draf auto-save lokal, ringkasan grafik penayangan artikel per hari.
- **Pengaturan Topik (Tags)**: Manajemen kategori tulisan (Teknologi, Catatan Harian, Filosofi).`,
      contentRequirements: `- **Indikator Estimasi Waktu Baca**: Perhitungan otomatis durasi baca berdasarkan rasio rata-rata 200 kata per menit.
- **Aset Gambar Estetik**: Dukungan untuk banner artikel lebar (wide-hero banner) lengkap dengan keterangan kredit fotografer.`,
      performanceSeo: `- **Readable Contrast**: Rasio kontras teks minimal 5:1 untuk kenyamanan mata saat membaca durasi lama.
- **SEO Semantic Markup**: Penggunaan elemen HTML5 semantik (<article>, <header>, <time>) untuk menjamin indeks mesin pencari yang kokoh.`,
      userRoles: `- **Pemilik Blog (Admin)**: Menulis esai, menyunting, menjadwalkan artikel tayang, menghapus tulisan, melihat data views.
- **Pengunjung**: Membaca esai, menggunakan fitur pencari tulisan, meninggalkan ulasan di kolom komentar artikel.`,
      databaseSchema: `- **Articles**: id, title, slug, content, excerpt, read_time, status (draft, published), views_count, created_at, updated_at.
- **Tags**: id, name, slug.
- **ArticleTags**: article_id, tag_id.`,
      apiIntegration: `- **GET /api/articles**: Mengambil esai terbit dengan fungsionalitas pencarian kata kunci.
- **POST /api/admin/articles**: Pengunggahan artikel baru dari studio admin.`,
      stateManagement: `- **Editor Cache**: Auto-save naskah tulisan secara lokal di localStorage tiap 10 detik guna mencegah ketikan hilang akibat mati lampu/hilang koneksi.`,
      timeline: "Minggu 1: Pembuatan rancangan layout bacaan distraction-free & skema pencarian teks. Minggu 2: Integrasi database & tagging system. Minggu 3: Dashboard views analitik. Minggu 4: Launching platform blog pribadi.",
      outOfScope: "Sistem keanggotaan multi-penulis (multi-author) atau layanan buletin email otomatis (seperti Substack)."
    }
  },

  // --- KATEGORI UMKM ---
  {
    id: "umkm-kuliner",
    name: "E-Katalog Menu Kuliner & WhatsApp Order",
    category: "umkm",
    data: {
      title: "E-Katalog Menu Kuliner & Pemesanan Instan Via WhatsApp",
      description: "Website landing page katalog menu makanan/minuman UMKM kuliner dengan keranjang belanja virtual statis, yang otomatis menyusun rincian pesanan dan mengirimkannya langsung ke nomor WhatsApp pemilik usaha.",
      architecture: "static",
      theme: "n8n",
      targetAudience: "Pelanggan lokal, pencari menu katering, penikmat kuliner harian, serta penyelenggara acara (arisan, rapat).",
      sitemap: `- **Landing Beranda**: Display menu terlaris hari ini, jam operasional kafe/katering, alamat fisik Maps, & ulasan bintang pelanggan.
- **E-Katalog Menu**: Grid menu yang dikelompokkan berdasarkan kategori (Makanan Utama, Minuman, Paket Katering, Cemilan).
- **Keranjang Belanja (Cart Sidebar)**: Panel interaktif daftar menu yang dipilih, penghitungan total harga pesanan, & tombol checkout.
- **Formulir Checkout WhatsApp**: Formulir pengisian nama pemesan, nomor kontak, metode pengiriman, jam kirim, & detail catatan pesanan.`,
      contentRequirements: `- **Galeri Foto Makanan**: Foto produk kuliner asli berkualitas tinggi yang cerah dan menggugah selera pelanggan.
- **Link WhatsApp Formatter**: Sistem otomatis yang merangkai teks pesanan (Contoh: "Halo, saya ingin memesan: 3x Ayam Penyet, 1x Es Teh manis. Total: Rp 55,000. Kirim ke alamat...") ke API WhatsApp.`,
      performanceSeo: `- **Mobile-First Priority**: Mengingat 95% pemesanan kuliner dilakukan lewat smartphone, waktu loading web mobile dirancang di bawah 1.2 detik.
      - **On-Page Local SEO**: Optimasi kata kunci "katering enak terdekat [nama kota]" guna menjaring traffic Google Search lokal gratis.`,
      timeline: "Minggu 1: Sesi foto menu kuliner & penyusunan daftar harga. Minggu 2: Pembuatan modul keranjang belanja (local state) & responsive layout. Minggu 3: Integrasi string parser WhatsApp & uji coba mobile. Minggu 4: Deploy & launching website.",
      outOfScope: "Integrasi sistem logistik ojek online real-time atau gateway pembayaran otomatis di dalam web."
    }
  },
  {
    id: "umkm-pos",
    name: "Kasir (POS) Toko Kelontong Sederhana",
    category: "umkm",
    data: {
      title: "Sistem Kasir (POS) & Manajemen Inventaris Toko Kelontong",
      description: "Aplikasi web kasir digital (POS) lokal untuk membantu UMKM retail mencatat transaksi penjualan barang, memantau sisa stok barang secara real-time, serta memberikan alarm peringatan stok menipis (low-stock alert).",
      architecture: "dynamic",
      theme: "corporate",
      targetAudience: "Pemilik toko kelontong, kasir minimarket UMKM, dan pengawas keluar-masuk stok barang di gudang toko.",
      sitemap: `- **Bilik Kasir (Checkout Screen)**: Antarmuka input kasir cepat (grid barang populer & kotak pencarian produk), kalkulasi kembalian uang, & cetak struk penjualan.
- **Katalog Stok (Inventory)**: Tabel daftar inventaris mencakup nama produk, harga modal, harga jual, margin laba, sisa stok, & set batas minimum stok.
- **Analitik Laporan Dashboard**: Laporan visual pemasukan kotor, margin keuntungan bersih, & grafik item paling laris bulanan.
- **Panel Notifikasi Stok Rendah**: Alert daftar produk yang sisa stoknya kritis di bawah batas aman untuk pemesanan ulang ke distributor.`,
      contentRequirements: `- **Daftar SKU Produk**: Tabel produk komprehensif lengkap dengan kode SKU/Barcode barang untuk pemindaian cepat.
- **Template Struk Belanja**: Layout struk belanja statis yang ramah printer thermal bluetooth untuk diserahkan ke pelanggan.`,
      performanceSeo: `- **Kecepatan Sesi Kasir**: Proses input keranjang belanja hingga hitung kembalian dirancang selesai dalam <3 detik guna menghindari antrean.
- **Resiliensi Koneksi**: Kemampuan menyimpan data penjualan sementara di memori browser (offline backup) apabila koneksi internet toko mati.`,
      userRoles: `- **Pemilik Toko**: Menambah/menghapus produk, mengatur harga jual barang, melihat laporan keuntungan bersih bulanan.
- **Staff Kasir**: Mencatat transaksi belanja harian, mencetak struk belanja, dilarang mengakses modul laporan laba toko.`,
      databaseSchema: `- **Products**: id, name, sku, category_id, cost_price, selling_price, stock, low_stock_limit.
- **Sales**: id, total_amount, payment_type (cash, qris), cashier_name, created_at.
- **SaleItems**: sale_id (FK), product_id (FK), qty, unit_price, subtotal.`,
      apiIntegration: `- **POST /api/sales/checkout**: Pengiriman log transaksi belanja & pengurangan otomatis sisa stok barang.
- **GET /api/inventory/critical**: Mengambil daftar produk kritis stok untuk reorder.`,
      stateManagement: `- **Zustand POS State**: Pengelolaan keranjang transaksi kasir aktif agar respons tombol input kasir tetap instan tanpa jeda rendering.`,
      timeline: "Bulan 1: Perancangan database produk & logika pengurangan stok. Bulan 2: Pembuatan modul antarmuka kasir & print struk. Bulan 3: Implementasi dashboard grafik laba rugi. Bulan 4: Pengujian luring langsung di toko.",
      outOfScope: "Integrasi timbangan elektronik hardware eksternal atau sinkronisasi stok otomatis ke marketplace Tokopedia/Shopee."
    }
  },
  {
    id: "umkm-laundry",
    name: "Web Laundry & Kalkulator Biaya",
    category: "umkm",
    data: {
      title: "Landing Page Profil & Form Booking Jasa Laundry Premium",
      description: "Website promosi bisnis jasa laundry kiloan/satuan dengan tabel harga filterable, kalkulator taksiran perkiraan biaya cuci laundry, serta formulir permintaan jemput pakaian ke rumah (booking pickup).",
      architecture: "static",
      theme: "minimalist",
      targetAudience: "Masyarakat urban sibuk, mahasiswa tempat kos, pengurus rumah tangga, dan pemilik bisnis homestay lokal.",
      sitemap: `- **Landing Beranda**: Spanduk visual layanan cuci wangi & steril, garansi pakaian tidak tertukar, jangkauan antar-jemput kurir.
- **Daftar Tarif Layanan**: Tabel paket harga (Kiloan Ekspres, Cuci Setrika, Laundry Sepatu, Helm, Boneka, Karpet).
- **Kalkulator Estimasi Harga**: Widget interaktif untuk menghitung perkiraan biaya berdasarkan jenis cuci, durasi (reguler/kilat), & berat (kg).
- **Form Penjemputan Pakaian**: Formulir isian detail jemput (Nama, Alamat Lengkap, Tanggal Penjemputan, & Pilihan Pewangi).`,
      contentRequirements: `- **Interaktivitas Kalkulator**: Slider input berat pakaian (kg) yang otomatis menghitung biaya akhir cuci.
- **Ulasan Autentik**: Bagian testimoni berfoto asli pelanggan yang membuktikan kualitas keharuman baju dan kerapian setrika laundry.`,
      performanceSeo: `- **Local SEO Power**: Penargetan kata kunci lokal khusus daerah operasional usaha, misal "laundry kiloan wangi [nama kecamatan]".
- **Responsive Navigation**: Navigasi sticky header yang ringkas di layar mobile guna mempermudah tombol call-to-action booking cepat.`,
      timeline: "Minggu 1: Pemetaan rincian harga laundry & rancangan kalkulator. Minggu 2: Pembuatan layout bersih bertema segar (clean visual style). Minggu 3: Implementasi fungsional kalkulator berat & form pickup. Minggu 4: Deploy & launching.",
      outOfScope: "Sistem pemantauan status cuci baju real-time per mesin cuci (CCTV live) atau integrasi pembayaran koin digital laundry."
    }
  },
  {
    id: "umum-webinar",
    name: "Pendaftaran Acara & Webinar (EventHub)",
    category: "umum",
    data: {
      title: "Sistem Pendaftaran Acara, Workshop & Webinar Mandiri (EventHub)",
      description: "Platform manajemen pendaftaran acara, webinar interaktif, dan workshop profesional dengan verifikasi e-ticket otomatis, formulir check-in berbasis QR Code, dan dashboard pemantauan sisa kuota peserta.",
      architecture: "dynamic",
      theme: "n8n",
      targetAudience: "Penyelenggara acara (event organizers), institusi akademis, pemateri webinar, dan peserta umum (mahasiswa, profesional, atau komunitas hobi) yang membutuhkan portal registrasi acara mandiri yang cepat.",
      sitemap: `- **Beranda Event (Landing Page)**: Informasi poster utama, profil pembicara (speaker bio), jadwal rincian sesi (agenda), hitung mundur waktu acara (countdown timer), dan tombol CTA daftar.
- **Formulir Registrasi**: Formulir multi-step pengisian biodata, nama instansi/perusahaan, nomor kontak WhatsApp, alamat email, dan modul upload tanda bukti pembayaran.
- **Portal Akses Peserta**: Area ringkas untuk mengunduh e-ticket berformat PDF, menampilkan tautan rahasia ruangan (Zoom/Google Meet), mengunduh modul/materi, dan form pengisian kuesioner umpan balik setelah acara usai.
- **Dashboard Panitia & Scanner**: Halaman statistik rekap pendaftar, monitoring kuota peserta tersisa, verifikasi status kelayakan bayar, serta scanner kamera web check-in kehadiran peserta berbasis QR Code.`,
      contentRequirements: `- **Formulir Validasi Input**: Validasi terstruktur nomor kontak (+62 regional) dan validasi struktur alamat email aktif.
- **E-Ticket QR Code Generator**: Pembuatan kode QR unik enkripsi ID registrasi yang otomatis dilekatkan pada lembar tiket PDF peserta.
- **Modul E-Sertifikat Kehadiran**: Pembangkit file sertifikat kelulusan/kehadiran dinamis berdasarkan nama yang terdaftar saat peserta dinyatakan hadir (checked-in) oleh panitia.`,
      performanceSeo: `- **Lighthouse Performance**: Kecepatan pemuatan landing page di bawah 1.2 detik untuk menghindari hilangnya minat calon pendaftar.
- **Absensi Check-In Latency**: Responsiveness scanner absensi QR Code berbasis browser dengan latency minimal (<300ms) untuk mengurai kepadatan antrean fisik di lokasi acara.
- **Optimasi War Ticket**: Penanganan mekanisme antrean penguncian kursi (seat reservation) terlimitasi kuota secara presisi tanpa kondisi race condition.`,
      userRoles: `- **Peserta**: Mengisi formulir registrasi, mengunduh e-ticket, melakukan absensi check-in mandiri, mengisi survei, dan mengunduh e-sertifikat.
- **Panitia / Moderator**: Memvalidasi setoran tanda bukti transfer pembayaran, memantau absensi check-in pintu masuk via scan QR Code, menyebarkan email pengingat (reminder broadcast), dan mengekspor daftar hadir lengkap dalam format CSV.`,
      databaseSchema: `- **Events**: id (PK), title, description, speaker_name, date_time, location_type (enum: online/offline), location_url, ticket_price, max_quota, created_at.
- **Registrations**: id (PK), event_id (FK), user_name, user_email, user_phone, institution, payment_status (enum: pending, verified), ticket_code (unique), checked_in_at, created_at.
- **Certificates**: id (PK), registration_id (FK), certificate_code, issued_at.`,
      apiIntegration: `- **POST /api/event/register**: Pemrosesan pendaftaran biodata peserta & pemesanan kursi sementara.
- **POST /api/admin/verify-payment**: Memvalidasi kelayakan bayar peserta untuk mentrigger pengiriman e-ticket otomatis.
- **POST /api/admin/check-in**: Melakukan pencatatan absensi kehadiran peserta via scan kamera QR Code.
- **GET /api/event/quota-status**: Mengambil data real-time sisa kuota kapasitas event secara live.`,
      stateManagement: `- **Zustand Booking Store**: Menyimpan status pengisian form registrasi multi-step agar data tetap tersimpan aman saat pengguna berpindah tab/halaman.
- **Admin Scan Cache**: Penyimpanan memori lokal daftar hadir peserta di browser admin untuk mempercepat proses pencarian status absensi secara offline jika koneksi internet terputus.`,
      timeline: "Minggu 1: Pembuatan antarmuka landing page event & form registrasi responsif. Minggu 2: Integrasi database & engine generator PDF e-ticket dengan QR Code. Minggu 3: Pembangunan portal absensi web-scanner & modul e-sertifikat otomatis. Minggu 4: Uji fungsionalitas, simulasi traffic padat (war ticket), deployment ke Vercel.",
      outOfScope: "Integrasi payment gateway otomatis pihak ketiga langsung (verifikasi pembayaran disederhanakan melalui formulir upload bukti transfer konfirmasi manual)."
    }
  }
];
