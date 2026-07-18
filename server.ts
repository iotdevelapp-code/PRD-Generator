/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI client lazy-loaded or early, checked against API Key
const apiKey = process.env.GEMINI_API_KEY;

function getAIClient(userKey?: string) {
  const activeKey = userKey || apiKey;
  if (!activeKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  return new GoogleGenAI({
    apiKey: activeKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

app.use(express.json({ limit: '10mb' }));

// API 1: Improve Prompt / Ide Kasar for Beginners
app.post('/api/gemini/improve-prompt', async (req, res) => {
  try {
    const { title, roughIdea } = req.body;
    const userApiKey = req.headers['x-gemini-api-key'] as string | undefined;
    const activeApiKey = userApiKey || apiKey;

    if (!title) {
      return res.status(400).json({ error: 'Judul aplikasi wajib diisi.' });
    }

    if (!activeApiKey) {
      // Graceful fallback if no API key is set yet
      return res.json({
        improvedDescription: `${roughIdea || 'Aplikasi hebat baru'} yang dikembangkan dengan fokus pada kenyamanan pengguna dan efisiensi sistem.`,
        targetAudience: 'Pengguna umum, pemula, dan profesional yang membutuhkan solusi digital praktis.',
        recommendedArchitecture: 'dynamic',
        recommendedTheme: 'minimalist',
        suggestedFeatures: [
          { id: 'feat_auth', name: 'Registrasi & Autentikasi Pengguna', description: 'Memungkinkan pengguna untuk mendaftar, masuk, dan mengelola profil pribadi mereka secara aman.' },
          { id: 'feat_dashboard', name: 'Dasbor Interaktif', description: 'Tampilan utama yang menyajikan ringkasan data, grafik aktivitas, dan navigasi cepat.' },
          { id: 'feat_search', name: 'Fitur Pencarian Pintar', description: 'Memudahkan pengguna menyaring dan mencari konten atau item dengan filter dinamis.' },
          { id: 'feat_notif', name: 'Sistem Notifikasi Real-time', description: 'Mengirimkan pemberitahuan instan mengenai pembaruan status dan pesan penting.' }
        ]
      });
    }

    const ai = getAIClient(userApiKey);
    const prompt = `
      Anda adalah seorang Senior Product Manager & Technical Architect handal.
      Seorang pemula ingin merancang aplikasi bernama: "${title}".
      Ide kasar/deskripsi awal mereka: "${roughIdea || '(tidak ada deskripsi awal, tolong buatkan ide standar industri yang kreatif)'}".

      Tugas Anda adalah:
      1. Sempurnakan ide kasar tersebut menjadi deskripsi produk yang sangat visioner, profesional, menarik, dan berstandar industri dalam bahasa Indonesia.
      2. Tentukan target audiens utama yang spesifik.
      3. Rekomendasikan arsitektur sasis yang paling sesuai: 'static' (jika aplikasi bersifat informasional, landing page, atau web profil) atau 'dynamic' (jika memerlukan database, akun pengguna, atau interaksi real-time). Berikan rekomendasi yang logis.
      4. Rekomendasikan tema visual yang paling pas: 'minimalist' (bersih, modern, monokrom), 'corporate' (formal, rapi, bernuansa indigo/biru), 'cyberpunk' (futuristik, gelap, bernuansa neon emerald/cyan), atau 'n8n' (sangat direkomendasikan untuk aplikasi berbasis alur kerja, integrasi, otomasi, dashboard visual, atau pemrosesan node).
      5. Usulkan 4-5 pilihan fitur singkat berstandar tinggi yang sangat relevan dengan ide aplikasi tersebut. Setiap fitur harus memiliki nama singkat dan deskripsi pendek yang jelas untuk pemula.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Anda harus mengembalikan respon dalam format JSON yang valid dan lengkap sesuai skema yang diminta, dalam Bahasa Indonesia yang formal dan profesional.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedDescription: { 
              type: Type.STRING,
              description: 'Deskripsi produk yang disempurnakan secara profesional dan mendetail.'
            },
            targetAudience: { 
              type: Type.STRING,
              description: 'Target audiens atau profil pengguna utama.'
            },
            recommendedArchitecture: { 
              type: Type.STRING, 
              enum: ['static', 'dynamic'],
              description: 'Arsitektur sasis yang direkomendasikan.'
            },
            recommendedTheme: { 
              type: Type.STRING,
              enum: ['minimalist', 'corporate', 'cyberpunk', 'n8n'],
              description: 'Tema desain UI visual yang direkomendasikan.'
            },
            suggestedFeatures: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'ID fitur unik singkat, contoh: feat_1, feat_2' },
                  name: { type: Type.STRING, description: 'Nama singkat fitur, max 40 karakter.' },
                  description: { type: Type.STRING, description: 'Penjelasan singkat kegunaan fitur untuk pemula.' }
                },
                required: ['id', 'name', 'description']
              }
            }
          },
          required: ['improvedDescription', 'targetAudience', 'recommendedArchitecture', 'recommendedTheme', 'suggestedFeatures']
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error('Empty response from Gemini');
    }
    
    return res.json(JSON.parse(resultText.trim()));
  } catch (error: any) {
    console.error('Error in improve-prompt:', error);
    res.status(500).json({ error: error.message || 'Terjadi kesalahan pada sistem kecerdasan buatan.' });
  }
});

/// API 2: Generate Full PRD Document based on Wizard Options
app.post('/api/gemini/generate-prd', async (req, res) => {
  try {
    const { title, description, targetAudience, architecture, theme, selectedFeatures, selectedTrends, timelineTarget, deployTarget } = req.body;
    const userApiKey = req.headers['x-gemini-api-key'] as string | undefined;
    const activeApiKey = userApiKey || apiKey;

    if (!title || !description) {
      return res.status(400).json({ error: 'Judul dan Deskripsi produk wajib disertakan.' });
    }

    const activeTimeline = timelineTarget || '1-2 hari';
    const activeDeployTarget = deployTarget || 'vercel';

    if (!activeApiKey) {
      // Graceful fallback if no API key is set yet
      return res.json({
        sitemap: `## Struktur Halaman\n- **/dashboard** - Halaman utama pengguna.\n- **/profil** - Pengaturan profil.\n- **/fitur-utama** - Layanan utama aplikasi.`,
        contentRequirements: `### Kebutuhan Konten Utama\n1. Formulir input data pengguna.\n2. Tampilan daftar item secara interaktif.\n3. Panel kontrol intuitif.`,
        performanceSeo: `### Performa, SEO & Deployment (${activeDeployTarget.toUpperCase()})\n- Waktu muat halaman kurang dari 1.5 detik memanfaatkan optimasi CDN modern.\n- Meta tags dinamis untuk setiap halaman utama.\n- Dukungan Progressive Web App (PWA) dasar.\n- **Deployment Platform**: Dioptimalkan secara khusus untuk dihosting pada platform **${activeDeployTarget.toUpperCase()}** dengan pengaturan Serverless Functions / Static Edge Caching yang cepat dan efisien.`,
        userRoles: `### Peran Pengguna (User Roles)\n- **Pengguna Umum / Pelanggan**: Mengakses layanan dasar.\n- **Administrator**: Mengelola sistem dan memantau analitik.`,
        databaseSchema: `### Skema Basis Data (Database Schema)\n- **Users**: id, name, email, password_hash, created_at\n- **Features_Data**: id, user_id, title, status, updated_at`,
        apiIntegration: `### Integrasi API\n- \`GET /api/user/profile\` - Mengambil profil.\n- \`POST /api/action/execute\` - Melakukan aksi utama.`,
        stateManagement: `### State Management\n- Menggunakan React Context untuk menyimpan status otentikasi global.\n- Local storage untuk preferensi preferensi visual pengguna.`,
        timeline: activeTimeline === '1-2 hari' 
          ? `### Garis Waktu Pengembangan (Timeline 1-2 Hari - Target Deploy: ${activeDeployTarget.toUpperCase()})\n- **Hari 1 (Pagi)**: Finalisasi UI/UX Mockup & Desain Skema Database.\n- **Hari 1 (Siang-Sore)**: Setup Repositori & Pembuatan Router Serta Landing Page.\n- **Hari 2 (Pagi)**: Integrasi API backend & Alur State Management Frontend.\n- **Hari 2 (Sore)**: Testing Fungsional, Perbaikan Bug & Deploy Ke **${activeDeployTarget.toUpperCase()}**.`
          : `### Garis Waktu Pengembangan (Timeline - Target Deploy: ${activeDeployTarget.toUpperCase()})\n- **Minggu 1-2**: Desain UI/UX & Prototipe\n- **Minggu 3-5**: Pengembangan Frontend & Backend\n- **Minggu 6**: Pengujian & Peluncuran Ke **${activeDeployTarget.toUpperCase()}**`,
        outOfScope: `### Di Luar Cakupan (Out of Scope)\n- Sistem pembayaran internasional multi-mata uang.\n- Dukungan luring penuh dengan sinkronisasi database berat.`
      });
    }

    const featuresListText = selectedFeatures && selectedFeatures.length > 0
      ? selectedFeatures.map((f: any) => `- **${f.name}**: ${f.description}`).join('\n')
      : '- Menggunakan fitur-fitur standar industri.';

    const trendsListText = selectedTrends && selectedTrends.length > 0
      ? selectedTrends.map((t: any) => `- **${t.name}**: ${t.description} (Platform Referensi: ${t.reference})`).join('\n')
      : '- Gaya desain antarmuka standar modern.';

    const ai = getAIClient(userApiKey);
    const prompt = `
      Anda adalah seorang Senior Product Manager & Technical Architect kelas dunia.
      Buat dokumen Product Requirement Document (PRD) yang sangat lengkap, kaya informasi, profesional, dan berstandar Silicon Valley dalam Bahasa Indonesia.

      Spesifikasi Proyek:
      - Judul Aplikasi: "${title}"
      - Deskripsi Visi Produk: "${description}"
      - Target Audiens: "${targetAudience || 'Pengguna umum'}"
      - Sasis Arsitektur: "${architecture} Web App"
      - Gaya Desain Visual Tema: "${theme} Theme"
      - Platform Target Deployment / Hosting: "${activeDeployTarget.toUpperCase()}"
      - Fitur-fitur Terpilih yang Wajib Diintegrasikan dan Dibahas Secara Detail:
      ${featuresListText}
      - Tren Desain UI & UX Modern yang Wajib Diadopsi dan Diintegrasikan dalam Komponen UI:
      ${trendsListText}
      - Target Garis Waktu Penyelesaian Proyek (Timeline): "${activeTimeline}"

      Tolong buatkan detail isi PRD untuk setiap bagian berikut dalam format Markdown yang elegan:
      1. **Sitemap & Halaman (sitemap)**: Rincian struktur rute/halaman aplikasi yang rapi (format daftar bersarang Markdown).
      2. **Kebutuhan Konten (contentRequirements)**: Apa saja konten, teks, media, form, atau elemen visual spesifik yang harus tampil di halaman. Anda WAJIB mengintegrasikan aspek fungsional dan estetis dari Tren Desain UI & UX pilihan berikut secara detail:
      ${trendsListText}
      3. **Standar Performa, SEO & Deployment (performanceSeo)**: Kriteria kecepatan, optimasi SEO, loading state, dsb. Anda WAJIB menjabarkan taktik optimasi dan strategi deployment yang spesifik untuk platform hosting **${activeDeployTarget.toUpperCase()}** (seperti konfigurasi build, static assets caching, serverless function optimization, atau setup vercel.json jika menggunakan Vercel). Jika terpilih tren performa tinggi seperti "Adaptive UI", "Zero UI", atau "Micro-interactions", cantumkan syarat latency, responsivitas frame-rate (60 FPS), dan pedoman kontras/aksesibilitas (seperti Digital Fairness) yang detail di sini.
      4. **Garis Waktu Proyek (timeline)**: Fase-fase pengembangan yang realistis, detail, dan taktis yang WAJIB menyesuaikan dengan target total durasi pengerjaan "${activeTimeline}". 
         Jika target "${activeTimeline}" adalah "1-2 hari", buatlah milestones detail berdasarkan segmen waktu per HARI (misalnya: Hari 1 Pagi/Siang/Sore, Hari 2 Pagi/Siang/Sore) agar produk minimal layak guna (MVP) dapat selesai tepat waktu tanpa mengesampingkan kualitas dan pastikan proses deployment ke **${activeDeployTarget.toUpperCase()}** dijadwalkan pada fase akhir.
         Jika target "${activeTimeline}" adalah 1-2 minggu, buatlah milestones terperinci per hari kerja.
         Jika target "${activeTimeline}" adalah 1-2 bulan, buatlah per minggu.
      5. **Di Luar Cakupan (outOfScope)**: Apa saja yang tidak dimasukkan dalam fase pertama ini untuk mencegah scope-creep (sesuaikan juga agar realistis dengan batasan target pengerjaan ${activeTimeline} dan batasan platform hosting ${activeDeployTarget.toUpperCase()}).

      *Tambahan Khusus*: Karena sasis arsitektur yang dipilih adalah "${architecture}", jika sasisnya adalah "dynamic", Anda WAJIB mengisi bagian-bagian berikut secara detail. Jika sasisnya "static", bagian-bagian berikut boleh diisi deskripsi ringkas yang sesuai dengan aplikasi statis.
      6. **Peran Pengguna (userRoles)**: Detil otentikasi dan hak akses level pengguna (Admin, User, dll).
      7. **Skema Basis Data (databaseSchema)**: Gambaran tabel-tabel database (fields, types, dan relasi singkat).
      8. **Integrasi API (apiIntegration)**: Daftar endpoint REST API atau GraphQL penting yang diperlukan.
      9. **State Management (stateManagement)**: Bagaimana state global dikelola di sisi frontend (React state, Context, dll).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Anda wajib mengembalikan dokumen dalam struktur JSON yang valid dengan kunci-kunci persis seperti yang didefinisikan dalam skema. Semua konten ditulis dalam bahasa Indonesia yang sangat rapi, teknis, dan berbobot tinggi.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sitemap: { type: Type.STRING, description: 'Markdown string detail sitemap struktur rute halaman.' },
            contentRequirements: { type: Type.STRING, description: 'Markdown string detail kebutuhan konten halaman.' },
            performanceSeo: { type: Type.STRING, description: 'Markdown string detail performa, kecepatan, dan standar SEO.' },
            userRoles: { type: Type.STRING, description: 'Markdown string peran pengguna dan hak akses.' },
            databaseSchema: { type: Type.STRING, description: 'Markdown string skema tabel basis data relasional atau Firestore.' },
            apiIntegration: { type: Type.STRING, description: 'Markdown string daftar rute API backend.' },
            stateManagement: { type: Type.STRING, description: 'Markdown string manajemen status frontend.' },
            timeline: { type: Type.STRING, description: 'Markdown string garis waktu pengerjaan proyek.' },
            outOfScope: { type: Type.STRING, description: 'Markdown string batasan fitur fase awal (Out of Scope).' }
          },
          required: ['sitemap', 'contentRequirements', 'performanceSeo', 'timeline', 'outOfScope']
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error('Empty response from Gemini');
    }

    return res.json(JSON.parse(resultText.trim()));
  } catch (error: any) {
    console.error('Error in generate-prd:', error);
    res.status(500).json({ error: error.message || 'Terjadi kesalahan saat menyusun dokumen PRD lengkap.' });
  }
});

// Setup Vite & Static Assets serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PRD Gen Full-Stack Server] Berjalan lancar di port http://localhost:${PORT}`);
  });
}

startServer();
