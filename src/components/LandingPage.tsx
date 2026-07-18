/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Cpu, 
  Layers, 
  Palette, 
  Plus, 
  Trash2, 
  FileText, 
  ArrowRight, 
  Zap, 
  Database, 
  Lock, 
  Network, 
  Maximize2, 
  Sparkles, 
  RefreshCw, 
  FolderOpen,
  Clock,
  ChevronDown,
  ChevronUp,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { ArchitectureType, ThemeType, PrdDocument } from '../types';
import { themeStyles } from './ThemeStyles';

interface LandingPageProps {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  selectedArchitecture: ArchitectureType;
  setArchitecture: (arch: ArchitectureType) => void;
  onCreateNew: () => void;
  onEnterWizard: () => void;
  savedPrds: PrdDocument[];
  onLoadPrd: (id: string) => void;
  onDeletePrd: (id: string) => void;
}

export default function LandingPage({
  currentTheme,
  setTheme,
  selectedArchitecture,
  setArchitecture,
  onCreateNew,
  onEnterWizard,
  savedPrds,
  onLoadPrd,
  onDeletePrd
}: LandingPageProps) {
  const styles = themeStyles[currentTheme];

  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const workshopSections = [
    {
      title: "1. Landasan Filosofis: Mindset 'Vibe Coding' dan Vibe Engineering",
      icon: Sparkles,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Dunia pengembangan web saat ini tengah mengalami pergeseran paradigma fundamental dengan munculnya tren <strong className="text-white">Vibe Coding</strong>. Sebagai instruktur, mengadopsi mindset ini bukan sekadar mengikuti tren teknis, melainkan sebuah keharusan strategis untuk memitigasi hambatan kognitif peserta. Fokus instruksional harus dialihkan secara radikal: dari <em className="text-zinc-200">"bagaimana menulis sintaksis"</em> menjadi <em className="text-zinc-200 font-semibold">"bagaimana mengomunikasikan visi dan suasana (vibe) aplikasi"</em> kepada kecerdasan buatan. Pendekatan ini secara efektif mengubah pengalaman belajar dari beban <strong className="text-indigo-400">Syntax-First</strong> yang kaku menjadi pemberdayaan <strong className="text-emerald-400">Logic-First</strong>, di mana kreativitas menjadi penggerak utama pengembangan.
          </p>
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Evaluasi terhadap metode ini menunjukkan bahwa Vibe Coding secara signifikan mengurangi <em className="text-zinc-200">"Blank Page Syndrome"</em> yang sering melumpuhkan pemula. Dengan mengandalkan AI sebagai mitra eksekusi, peserta dapat melompati rintangan teknis tradisional dan langsung masuk ke fase arsitektur ide. Namun, instruktur—seperti <strong className="text-zinc-100">Pemateri Ucok, S.Kom., MT</strong>—diwajibkan mengorkestrasi keseimbangan presisi antara kreativitas murni (Vibe) dan ketepatan rekayasa (Engineering). Tanpa <strong className="text-indigo-400">Vibe Engineering</strong> yang disiplin, ide-ide kreatif akan gagal bertransformasi menjadi produk digital yang stabil, fungsional, dan terukur.
          </p>
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
            <strong>Kesiapan Mental Instruktur:</strong> Kesiapan mental instruktur dalam menjembatani antara intuisi kreatif dan rigiditas rekayasa ini menjadi prasyarat mutlak sebelum memasuki prosedur administratif yang akan menjamin akuntabilitas seluruh sesi workshop.
          </div>
        </div>
      )
    },
    {
      title: "2. Protokol Administrasi dan Alur Evaluasi Peserta",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Data evaluasi yang komprehensif adalah instrumen utama dalam menjustifikasi efektivitas kurikulum dan mengukur dampak nyata terhadap portofolio digital peserta. Instruktur harus memandang data ini sebagai indikator performa strategis yang menentukan keberhasilan transfer pengetahuan dalam ekosistem AI-driven development.
          </p>
          <p className="text-sm font-semibold text-zinc-200">
            Berikut adalah alur pelaksanaan kegiatan dan protokol evaluasi yang harus diimplementasikan secara sistematis:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all">
              <div className="text-xs font-bold text-[#f25f4c] mb-1 font-mono">TAHAP 1</div>
              <h5 className="font-bold text-xs text-zinc-100 mb-2">Registrasi dan Pre-test</h5>
              <p className="text-2xs text-zinc-400 leading-relaxed">Bertujuan untuk mendiagnosis kesenjangan keterampilan dan memetakan pemahaman awal peserta mengenai konsep web development serta AI sebelum intervensi pembelajaran dimulai.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all">
              <div className="text-xs font-bold text-indigo-400 mb-1 font-mono">TAHAP 2</div>
              <h5 className="font-bold text-xs text-zinc-100 mb-2">Implementasi dan Deploy E-Portfolio</h5>
              <p className="text-2xs text-zinc-400 leading-relaxed">Tahap inti di mana instruktur mengautentikasi kemampuan praktis peserta dalam mengubah konsep abstrak menjadi produk digital yang ter-deploy secara live.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all">
              <div className="text-xs font-bold text-emerald-400 mb-1 font-mono">TAHAP 3</div>
              <h5 className="font-bold text-xs text-zinc-100 mb-2">Post-test & Evaluasi Akhir</h5>
              <p className="text-2xs text-zinc-400 leading-relaxed">Digunakan untuk menjustifikasi keberhasilan kurikulum dengan mengukur retensi pengetahuan serta peningkatan kompetensi teknis setelah melalui seluruh rangkaian sesi.</p>
            </div>
          </div>
          <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-2xs text-zinc-400 italic">
            Ketertiban administratif ini merupakan fondasi yang memungkinkan instruktur untuk beralih sepenuhnya ke manajemen teknis yang intensif selama lima jam pelaksanaan workshop.
          </div>
        </div>
      )
    },
    {
      title: "3. Manajemen Strategis Workshop: Matriks Sesi 5 Jam",
      icon: Clock,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Dalam lingkungan workshop yang berbasis AI dan iterasi cepat, manajemen waktu yang ketat adalah bentuk mitigasi risiko terhadap kelelahan kognitif (<em className="italic">cognitive overload</em>). Instruktur harus bertindak sebagai konduktor yang memastikan setiap detik dialokasikan untuk menghasilkan output yang terukur.
          </p>
          
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0a0b0d]/80">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-2xs font-bold text-zinc-300 uppercase tracking-wider">
                  <th className="py-3 px-4 font-mono">Waktu</th>
                  <th className="py-3 px-4">Sesi</th>
                  <th className="py-3 px-4">Fokus Utama / Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-zinc-400">00:00 - 00:45</td>
                  <td className="py-3 px-4 font-bold text-zinc-100">Sesi 1: Vibe Coding Mindset & Tools</td>
                  <td className="py-3 px-4 text-zinc-300">Setup Lingkungan: Cursor, Google AI Studio, Vercel, & Stitch.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors bg-white/[0.01]">
                  <td className="py-3 px-4 font-mono text-zinc-400">00:45 - 01:30</td>
                  <td className="py-3 px-4 font-bold text-zinc-100">Sesi 2: Discovery & PRD via Stitch</td>
                  <td className="py-3 px-4 text-zinc-300">Verified PRD.md & Struktur Folder Aplikasi.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-zinc-400">01:30 - 02:45</td>
                  <td className="py-3 px-4 font-bold text-zinc-100">Sesi 3: Coding the Core (Gemini API)</td>
                  <td className="py-3 px-4 text-zinc-300">Integrasi Logika Inti & Functional API Boilerplate.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors bg-white/[0.01] text-amber-400 font-bold">
                  <td className="py-3 px-4 font-mono">02:45 - 03:00</td>
                  <td className="py-3 px-4">Break</td>
                  <td className="py-3 px-4">Relaksasi Mental & Sinkronisasi Progres.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-zinc-400">03:00 - 04:15</td>
                  <td className="py-3 px-4 font-bold text-zinc-100">Sesi 4: UI/UX & Refinement</td>
                  <td className="py-3 px-4 text-zinc-300">Iterasi Visual & Mitigasi Error Integrasi.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors bg-white/[0.01]">
                  <td className="py-3 px-4 font-mono text-zinc-400">04:15 - 05:00</td>
                  <td className="py-3 px-4 font-bold text-zinc-100">Sesi 5: Git & Vercel Deployment</td>
                  <td className="py-3 px-4 text-zinc-300">Publikasi ke GitHub & Live Production URL.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2 mt-4 bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
            <p className="text-xs font-bold text-zinc-200">Penetapan durasi sesi ini didasarkan pada kompleksitas teknis yang dihadapi:</p>
            <ul className="list-disc pl-5 space-y-2 text-2xs text-zinc-400">
              <li><strong className="text-zinc-200">Sesi 2 (45 Menit):</strong> Instruktur diwajibkan melakukan demo <em>"Stitch-to-Code"</em>, menunjukkan bagaimana perubahan kecil pada prompt di Stitch secara otomatis mengubah struktur aplikasi dan susunan folder di IDE. Hal ini penting untuk memvalidasi peran Stitch sebagai cetak biru teknis.</li>
              <li><strong className="text-zinc-200">Sesi 3 (75 Menit):</strong> Alokasi waktu terlama diberikan di sini karena peserta harus mengintegrasikan Google Gemini API menggunakan boilerplate yang telah disediakan. Durasi ini diperlukan untuk memastikan setiap peserta memahami cara mengelola context window tanpa kehilangan arah logika aplikasi.</li>
              <li><strong className="text-zinc-200">Sesi 4 (75 Menit):</strong> Memberikan ruang bagi iterasi UI/UX yang mendalam, memastikan bahwa hasil akhir tidak hanya berfungsi secara teknis, tetapi juga memenuhi standar estetika yang direncanakan di awal.</li>
            </ul>
          </div>
          <p className="text-2xs text-zinc-500 italic">
            Keberhasilan jadwal ini sangat bergantung pada pemahaman mendalam instruktur mengenai sinergi antar platform pengembangan yang digunakan.
          </p>
        </div>
      )
    },
    {
      title: "4. Integrasi Perangkat: Sinergi Stitch, Gemini, dan Vercel",
      icon: Network,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Integrasi teknis yang mulus antar platform merupakan syarat mutlak untuk menciptakan pengalaman <strong>End-to-End Development</strong> yang kohesif. Instruktur harus mampu mensintesiskan peran setiap alat agar peserta tidak merasa sedang berpindah-pindah aplikasi secara acak, melainkan sedang mengikuti satu alur kerja yang terpadu:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-[#f25f4c]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#f25f4c]/10 text-[#f25f4c] flex items-center justify-center font-bold font-mono text-sm mb-3">01</div>
              <h5 className="font-bold text-xs text-zinc-200 mb-1">Stitch</h5>
              <p className="text-2xs text-zinc-400 leading-relaxed">Berperan sebagai visual blueprint dan katalisator ide. Ini adalah tempat di mana "vibe" dibentuk sebelum menjadi kode.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-blue-500/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono text-sm mb-3">02</div>
              <h5 className="font-bold text-xs text-zinc-200 mb-1">Gemini API</h5>
              <p className="text-2xs text-zinc-400 leading-relaxed">Bertindak sebagai mesin logika dan "otak" aplikasi. Melalui integrasi Next.js/Vite, Gemini mengubah aplikasi statis menjadi solusi cerdas yang fungsional.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-emerald-500/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm mb-3">03</div>
              <h5 className="font-bold text-xs text-zinc-200 mb-1">Vercel</h5>
              <p className="text-2xs text-zinc-400 leading-relaxed">Representasi akhir dari Vibe Engineering. Ini adalah pembuktian bahwa ide tersebut bukan sekadar konsep, melainkan produk nyata yang siap digunakan di dunia luar.</p>
            </div>
          </div>
          <div className="p-3 bg-zinc-900/40 border border-white/[0.04] rounded-xl text-2xs text-zinc-400 leading-relaxed">
            <strong>Mitigasi Risiko Tersesat (Stitch-to-Code):</strong> Alur kerja "Stitch-to-Code" memitigasi risiko peserta tersesat dengan memberikan jangkar visual. Saat AI mulai menghasilkan ribuan baris kode di Cursor, peserta tetap memiliki kendali penuh karena mereka merujuk pada cetak biru yang mereka buat sendiri. Keberhasilan integrasi ini, bagaimanapun, ditentukan oleh kualitas dokumen kendali yang akan dibahas pada bagian selanjutnya.
          </div>
        </div>
      )
    },
    {
      title: "5. Standar Pengelolaan File PRD.md sebagai Kendali Mutu AI",
      icon: Database,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Product Requirements Document (PRD) dalam format <strong>PRD.md</strong> bukan sekadar formalitas dokumentasi, melainkan instrumen kendali mutu yang menentukan arah kerja AI. Tanpa PRD yang solid, AI akan mengalami halusinasi logika atau menghasilkan fitur yang menyimpang (<em>off-track</em>) dari tujuan awal.
          </p>
          <div className="p-4 rounded-xl bg-zinc-950/40 border border-white/[0.08] space-y-3">
            <h5 className="font-bold text-xs text-zinc-200 uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              Komponen wajib yang harus diekstraksi dari Stitch ke dalam PRD.md meliputi:
            </h5>
            <ol className="list-decimal pl-5 space-y-2 text-2xs text-zinc-300">
              <li><strong>User Flow:</strong> Alur perjalanan pengguna yang logis.</li>
              <li><strong>Feature List:</strong> Daftar fitur prioritas yang akan dibangun.</li>
              <li><strong>Design Reference:</strong> Referensi gaya visual yang harus dipatuhi.</li>
            </ol>
          </div>
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Instruktur diwajibkan untuk menginstruksikan peserta agar secara eksplisit memasukkan (melalui fitur <em className="text-zinc-200">attach</em> atau <em className="text-zinc-200">paste</em>) isi <code className="text-emerald-400">PRD.md</code> ke dalam context window IDE (Cursor Chat/Composer). Prosedur teknis ini sangat krusial; instruktur harus menekankan bahwa AI perlu <em className="text-indigo-300">"di-grounding"</em> dengan instruksi dalam PRD agar tetap patuh pada spesifikasi. Kepatuhan terhadap file ini secara dramatis meningkatkan efisiensi proses coding dan mengurangi waktu yang terbuang untuk perbaikan kesalahan yang tidak perlu.
          </p>
          <p className="text-2xs text-zinc-500 italic">
            Dokumentasi PRD yang presisi menjadi jembatan utama menuju tahap finalisasi, di mana fokus beralih ke penyempurnaan antarmuka dan peluncuran produk.
          </p>
        </div>
      )
    },
    {
      title: "6. Finalisasi: Refinement UI/UX dan Protokol Deployment",
      icon: Cpu,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Tahap finalisasi adalah momen di mana <strong className="text-white">"Vibe"</strong> dan <strong className="text-white">"Engineering"</strong> bertemu dalam bentuk produk akhir. Memberikan gratifikasi instan kepada peserta melalui keberhasilan deployment sangat penting untuk membangun kepercayaan diri mereka sebagai pengembang modern.
          </p>
          <p className="text-sm leading-relaxed text-zinc-350 dark:text-zinc-300">
            Instruktur harus memandu sesi debugging dengan strategi yang efisien, mendemonstrasikan cara menggunakan AI untuk mendiagnosis kesalahan integrasi API atau ketidaksesuaian tampilan secara cepat. Fokus utama adalah memastikan bahwa produk akhir di Vercel merepresentasikan "vibe" yang dirancang di Stitch dengan fungsionalitas rekayasa yang solid.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
              <div className="text-xs font-bold text-orange-400 mb-1">1. Stitch sebagai Peta</div>
              <p className="text-3xs text-zinc-400 leading-relaxed">Memberikan orientasi visual dan struktural yang mencegah kebingungan teknis peserta.</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
              <div className="text-xs font-bold text-[#f25f4c] mb-1">2. PRD sebagai Pembatas</div>
              <p className="text-3xs text-zinc-400 leading-relaxed">Memastikan AI tetap bekerja dalam koridor spesifikasi teknis dan logika yang benar.</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
              <div className="text-xs font-bold text-emerald-400 mb-1">3. Vercel sebagai Pembuktian</div>
              <p className="text-3xs text-zinc-400 leading-relaxed">Menyediakan bukti nyata keberhasilan transformasi ide menjadi produk digital fungsional siap live.</p>
            </div>
          </div>
          <p className="text-2xs text-zinc-400 text-center italic mt-2">
            Setiap instruktur diharapkan menjalankan panduan tata kelola ini dengan standar profesionalisme yang tinggi. Kepatuhan terhadap protokol ini akan menjamin bahwa setiap peserta tidak hanya menghasilkan aplikasi, tetapi juga menguasai metodologi pengembangan masa depan yang berbasis pada sinergi antara visi manusia dan kecerdasan buatan.
          </p>
        </div>
      )
    }
  ];

  const handleCreateNew = () => {
    onCreateNew();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
        id="hero-section"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <span className={styles.badge}>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            UI/UX Architect Powered
          </span>
        </div>
        
        <h1 className={`${styles.title} text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none`}>
          PRD <span className="text-blue-600 dark:text-emerald-400">Generator</span>
        </h1>
        
        <p className={`${styles.textMuted} text-lg md:text-xl max-w-2xl mx-auto mb-8`}>
          Rancang Dokumen Kebutuhan Produk (PRD) berstandar industri secara interaktif. Pilih arsitektur teknis Anda dan sesuaikan tema visual secara reaktif.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={onEnterWizard}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/25 font-bold py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer"
            id="btn-enter-wizard-hero"
          >
            <Sparkles className="w-5 h-5 animate-pulse text-indigo-200" />
            Asisten Cepat (Pemula)
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleCreateNew}
            className={styles.buttonSecondary}
            id="btn-create-prd-hero"
          >
            <Plus className="w-5 h-5" />
            Buat PRD Mandiri (Profesional)
          </button>
        </div>
      </motion.div>

      {/* Main Configurations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Step 1: Select Architecture (Left side - 7 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col justify-between"
          id="arch-selector"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${
                currentTheme === 'cyberpunk' ? 'bg-zinc-900 text-emerald-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Layers className="w-5 h-5" />
              </div>
              <h2 className={`${styles.heading} text-xl md:text-2xl font-bold border-none pb-0`}>
                Langkah 1: Pilih Arsitektur Aplikasi
              </h2>
            </div>

            <p className={`${styles.textMuted} mb-6`}>
              Tentukan jenis fondasi teknis web Anda. Formulir generator PRD akan menyesuaikan field-field secara cerdas sesuai arsitektur yang Anda pilih.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Architecture A: Static Web */}
              <div 
                onClick={() => setArchitecture('static')}
                className={`p-6 cursor-pointer border-2 transition-all duration-300 flex flex-col justify-between group rounded-xl relative overflow-visible ${
                  selectedArchitecture === 'static'
                    ? currentTheme === 'cyberpunk'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : currentTheme === 'corporate'
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                        : currentTheme === 'n8n'
                          ? 'border-[#f25f4c] bg-[#f25f4c]/10 text-white shadow-[0_0_20px_rgba(242,95,76,0.15)]'
                          : 'border-white/40 bg-white/[0.05] text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                    : 'border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20'
                }`}
                id="arch-static-card"
              >
                {/* n8n Node visual connectors */}
                {currentTheme === 'n8n' && selectedArchitecture === 'static' && (
                  <>
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f25f4c] border-2 border-[#0a0b0d] z-10 shadow-sm animate-pulse" />
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f25f4c] border-2 border-[#0a0b0d] z-10 shadow-sm" />
                  </>
                )}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      selectedArchitecture === 'static'
                        ? currentTheme === 'cyberpunk' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : currentTheme === 'n8n'
                            ? 'bg-[#f25f4c] text-white shadow-[#f25f4c]/10'
                            : 'bg-indigo-600 text-white'
                        : 'bg-white/[0.05] text-zinc-400'
                    }`}>
                      <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    {selectedArchitecture === 'static' && (
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        currentTheme === 'cyberpunk' ? 'text-emerald-400' : currentTheme === 'n8n' ? 'text-[#f25f4c]' : 'text-indigo-400'
                      }`}>Terpilih</span>
                    )}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    currentTheme === 'cyberpunk' ? 'text-emerald-400 font-mono' : 'text-white'
                  }`}>
                    Web Statis (Static Web)
                  </h3>
                  <p className="text-zinc-400 text-xs mb-4">
                    Didesain untuk kecepatan ekstrim, penyajian informasi, SEO prima, tanpa server dinamis yang kompleks.
                  </p>
                </div>
                <div className="space-y-1 text-2xs uppercase tracking-widest font-bold opacity-75">
                  <div className="flex items-center gap-1.5 text-zinc-350">
                    <Zap className="w-3.5 h-3.5 text-yellow-500" />
                    Fokus Performa & SEO
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-350">
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    Sitemap & Kebutuhan Konten
                  </div>
                </div>
              </div>

              {/* Architecture B: Dynamic Web */}
              <div 
                onClick={() => setArchitecture('dynamic')}
                className={`p-6 cursor-pointer border-2 transition-all duration-300 flex flex-col justify-between group rounded-xl relative overflow-visible ${
                  selectedArchitecture === 'dynamic'
                    ? currentTheme === 'cyberpunk'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : currentTheme === 'corporate'
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                        : currentTheme === 'n8n'
                          ? 'border-[#f25f4c] bg-[#f25f4c]/10 text-white shadow-[0_0_20px_rgba(242,95,76,0.15)]'
                          : 'border-white/40 bg-white/[0.05] text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                    : 'border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20'
                }`}
                id="arch-dynamic-card"
              >
                {/* n8n Node visual connectors */}
                {currentTheme === 'n8n' && selectedArchitecture === 'dynamic' && (
                  <>
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f25f4c] border-2 border-[#0a0b0d] z-10 shadow-sm animate-pulse" />
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f25f4c] border-2 border-[#0a0b0d] z-10 shadow-sm" />
                  </>
                )}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      selectedArchitecture === 'dynamic'
                        ? currentTheme === 'cyberpunk' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : currentTheme === 'n8n'
                            ? 'bg-[#f25f4c] text-white shadow-[#f25f4c]/10'
                            : 'bg-indigo-600 text-white'
                        : 'bg-white/[0.05] text-zinc-400'
                    }`}>
                      <Cpu className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    {selectedArchitecture === 'dynamic' && (
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        currentTheme === 'cyberpunk' ? 'text-emerald-400' : currentTheme === 'n8n' ? 'text-[#f25f4c]' : 'text-indigo-400'
                      }`}>Terpilih</span>
                    )}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    currentTheme === 'cyberpunk' ? 'text-emerald-400 font-mono' : 'text-white'
                  }`}>
                    Web Dinamis (Dynamic Web)
                  </h3>
                  <p className="text-zinc-400 text-xs mb-4">
                    Didesain untuk interaktivitas kaya, autentikasi pengguna, penyimpanan data, integrasi API, dan State Management.
                  </p>
                </div>
                <div className="space-y-1 text-2xs uppercase tracking-widest font-bold opacity-75">
                  <div className="flex items-center gap-1.5 text-zinc-350">
                    <Database className="w-3.5 h-3.5 text-blue-400" />
                    Skema DB & User Roles
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-350">
                    <Network className="w-3.5 h-3.5 text-purple-400" />
                    API & State Management
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl border border-dashed border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/10 flex items-center gap-3">
            <Lock className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-xs">
              <span className="font-bold">Keamanan Data Lokal:</span> Dokumen Anda disimpan langsung di browser melalui <span className="font-bold underline text-emerald-400">LocalStorage</span> secara terenkripsi statis, tanpa dikirim ke server pihak ketiga mana pun.
            </div>
          </div>
        </motion.div>

        {/* Step 2: Select Visual Theme (Right side - 5 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5"
          id="theme-selector"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${
              currentTheme === 'cyberpunk' ? 'bg-zinc-900 text-emerald-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <Palette className="w-5 h-5" />
            </div>
            <h2 className={`${styles.heading} text-xl md:text-2xl font-bold border-none pb-0`}>
              Langkah 2: Pilih Gaya Desain UI
            </h2>
          </div>

          <p className={`${styles.textMuted} mb-6`}>
            Ubah estetika visual aplikasi pembuat PRD dan format dokumen keluaran Anda secara real-time. Rasakan perubahannya secara reaktif.
          </p>

          <div className="space-y-4">
            {/* Theme 1: Minimalist Modern */}
            <div 
              onClick={() => setTheme('minimalist')}
              className={`p-4 cursor-pointer border-2 transition-all rounded-xl flex items-center justify-between ${
                currentTheme === 'minimalist'
                  ? 'border-white/40 bg-white/[0.05] text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
              }`}
              id="theme-minimalist-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-100">Minimalist Modern</h4>
                  <p className="text-2xs text-zinc-400">Monokrom, bersih, ruang putih lapang.</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-3.5 h-3.5 bg-zinc-800 border border-zinc-700 rounded-full" />
                <span className="w-3.5 h-3.5 bg-zinc-100 rounded-full" />
              </div>
            </div>

            {/* Theme 2: Professional Corporate */}
            <div 
              onClick={() => setTheme('corporate')}
              className={`p-4 cursor-pointer border-2 transition-all rounded-xl flex items-center justify-between ${
                currentTheme === 'corporate'
                  ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
              }`}
              id="theme-corporate-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-600 border border-indigo-400 shadow-inner flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-100">Professional Corporate</h4>
                  <p className="text-2xs text-zinc-400">Biru formal, font tegas, layout grid rapi.</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-3.5 h-3.5 bg-indigo-950 border border-indigo-800 rounded-full" />
                <span className="w-3.5 h-3.5 bg-indigo-600 rounded-full" />
              </div>
            </div>

            {/* Theme 3: Tech Cyberpunk */}
            <div 
              onClick={() => setTheme('cyberpunk')}
              className={`p-4 cursor-pointer border-2 transition-all rounded-xl flex items-center justify-between ${
                currentTheme === 'cyberpunk'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-zinc-400 hover:text-emerald-400'
              }`}
              id="theme-cyberpunk-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-400 shadow-inner flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-400 font-mono">Cyberpunk Mode</h4>
                  <p className="text-2xs text-emerald-600 font-mono">Latar gelap, aksen neon hijau & cyan.</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-3.5 h-3.5 bg-black border border-emerald-500 rounded-full" />
                <span className="w-3.5 h-3.5 bg-emerald-400 rounded-full" />
              </div>
            </div>

            {/* Theme 4: n8n Workflow Style */}
            <div 
              onClick={() => setTheme('n8n')}
              className={`p-4 cursor-pointer border-2 transition-all rounded-xl flex items-center justify-between ${
                currentTheme === 'n8n'
                  ? 'border-[#f25f4c] bg-[#f25f4c]/10 text-white shadow-[0_0_20px_rgba(242,95,76,0.15)]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-zinc-400 hover:text-[#f25f4c]'
              }`}
              id="theme-n8n-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f25f4c] border border-white/20 shadow-inner flex items-center justify-center relative">
                  <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/70"></span>
                  <div className="w-2 rounded-full bg-white h-2" />
                  <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/70"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#f25f4c] flex items-center gap-1.5">
                    n8n Automation Style
                  </h4>
                  <p className="text-2xs text-zinc-400">Orange n8n ikonik, dot-grid canvas, node nodes.</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-3.5 h-3.5 bg-[#0a0b0d] border border-zinc-700 rounded-full" />
                <span className="w-3.5 h-3.5 bg-[#f25f4c] rounded-full" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Panduan Tata Kelola Workshop Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-16 pt-12 border-t border-zinc-200/60 dark:border-zinc-800"
        id="workshop-governance-container"
      >
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className={`${styles.heading} text-2xl font-bold border-none pb-0 flex items-center gap-2`}>
              <GraduationCap className="w-6 h-6 text-indigo-500" />
              Panduan Tata Kelola: Workshop AI-Driven Web Development (Stitch, Gemini, & Vercel)
            </h3>
            <span className={`${styles.badge} py-0.5 px-2 text-3xs font-mono`}>
              STANDARD OPERASIONAL PROSEDUR (SOP)
            </span>
          </div>
          <p className={styles.textMuted}>
            Konsensus instruksional, alur pelaksanaan kegiatan, manajemen strategi 5 jam, serta integrasi platform Stitch, Gemini, & Vercel untuk optimalisasi Vibe Coding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: List of accordions (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {workshopSections.map((section, index) => {
              const IconComponent = section.icon;
              const isExpanded = expandedSection === index;
              return (
                <div
                  key={index}
                  className={`${styles.card} overflow-hidden transition-all duration-300 ${
                    isExpanded 
                      ? 'border-indigo-500/50 bg-white/[0.03] shadow-[0_4px_20px_rgba(99,102,241,0.05)]' 
                      : 'hover:bg-white/[0.01]'
                  }`}
                  id={`workshop-sec-${index}`}
                >
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                      <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                        isExpanded
                          ? currentTheme === 'cyberpunk'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : currentTheme === 'n8n'
                              ? 'bg-[#f25f4c]/25 text-[#f25f4c]'
                              : 'bg-indigo-600/20 text-indigo-400'
                          : 'bg-white/[0.03] text-zinc-400'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`font-bold text-xs md:text-sm tracking-tight ${
                        isExpanded
                          ? currentTheme === 'cyberpunk'
                            ? 'text-emerald-400'
                            : currentTheme === 'n8n'
                              ? 'text-[#f25f4c]'
                              : 'text-white'
                          : 'text-zinc-300'
                      }`}>
                        {section.title}
                      </span>
                    </div>

                    <div className={`text-zinc-500 hover:text-zinc-350 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-indigo-400' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-6 pt-1 border-t border-white/[0.04] text-zinc-350 dark:text-zinc-350 animate-fadeIn">
                      {section.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right panel: Workshop Overview Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`${styles.card} p-6 relative overflow-hidden`} id="workshop-sidebar-info">
              {/* Decorative nodes for n8n */}
              {currentTheme === 'n8n' && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#f25f4c]" />
              )}
              <h4 className="text-sm font-bold text-zinc-150 uppercase tracking-widest mb-4 pb-2 border-b border-white/[0.06]">
                ℹ️ Rangkuman Sesi
              </h4>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-200">Mitigasi Blank Page Syndrome</p>
                    <p className="text-2xs text-zinc-400 mt-0.5">Pendekatan Logic-First menggunakan asisten AI mempercepat proses dari ide murni ke kode kerja dalam sekejap.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-200">Sinergi Tiga Elemen</p>
                    <p className="text-2xs text-zinc-400 mt-0.5">Stitch sebagai blueprint, Gemini API sebagai engine logika cerdas, dan Vercel sebagai pembuktian live.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-200">Instruktur Utama</p>
                    <p className="text-2xs text-zinc-400 mt-0.5">Pemateri Ucok, S.Kom., MT (Membimbing proses transisi Vibe Coding dan Vibe Engineering).</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
                <span className="text-3xs font-mono text-zinc-500 block uppercase tracking-wider">Metodologi Berbasis Hasil</span>
                <span className="text-lg font-black tracking-tight text-white mt-1 block">VIBE ENGINEERING</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f25f4c]/10 border border-[#f25f4c]/20 text-xs text-[#fa6d5b] flex items-center gap-3">
              <Zap className="w-5 h-5 shrink-0 text-yellow-400 animate-pulse" />
              <div>
                <span className="font-bold">Tips Cepat:</span> Gunakan asisten wizard untuk menyusun draf PRD pertama Anda secara otomatis yang mematuhi standar tata kelola ini.
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Draft Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 pt-12 border-t border-zinc-200/60 dark:border-zinc-800"
        id="saved-drafts-container"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className={`${styles.heading} text-2xl font-bold border-none pb-0 flex items-center gap-2`}>
              <FolderOpen className="w-6 h-6 text-blue-500" />
              Draf PRD Tersimpan
            </h3>
            <p className={styles.textMuted}>
              Kelola dokumen-dokumen kebutuhan produk yang pernah Anda rancang di browser ini.
            </p>
          </div>
          
          <button
            onClick={handleCreateNew}
            className={styles.buttonPrimary}
            id="btn-create-prd-above-drafts"
          >
            <Plus className="w-4 h-4" />
            Buat PRD Baru
          </button>
        </div>

        {savedPrds.length === 0 ? (
          <div className="text-center py-12 px-6 border border-dashed border-zinc-200/80 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/20">
            <FileText className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Belum ada draf tersimpan</h4>
            <p className={`${styles.textMuted} text-xs max-w-sm mx-auto mb-6`}>
              Semua draf dokumen yang Anda simpan akan muncul di sini untuk diedit atau diekspor kapan saja.
            </p>
            <button
              onClick={handleCreateNew}
              className={`${styles.buttonSecondary} mx-auto`}
              id="btn-create-prd-empty"
            >
              <Plus className="w-4 h-4" /> Mulai Tulis PRD Pertama Anda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPrds.map((prd) => (
              <div 
                key={prd.id} 
                className={`${styles.card} p-6 flex flex-col justify-between group h-full relative`}
              >
                {/* n8n Node visual connectors */}
                {currentTheme === 'n8n' && (
                  <>
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f25f4c] border-2 border-[#0a0b0d] z-10 shadow-sm" />
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f25f4c] border-2 border-[#0a0b0d] z-10 shadow-sm" />
                  </>
                )}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${styles.badge} py-0.5 text-2xs`}>
                      {prd.architecture === 'static' ? (
                        <>
                          <Globe className="w-3 h-3 text-emerald-500" />
                          Web Statis
                        </>
                      ) : (
                        <>
                          <Cpu className="w-3 h-3 text-blue-500" />
                          Web Dinamis
                        </>
                      )}
                    </span>
                    <span className="text-3xs text-zinc-400 dark:text-zinc-600 font-mono">
                      {new Date(prd.updatedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <h4 className="text-base font-bold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors" title={prd.title}>
                    {prd.title || "Judul PRD Kosong"}
                  </h4>
                  
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-6">
                    {prd.description || "Tidak ada deskripsi yang ditambahkan untuk dokumen PRD ini."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900 mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-3xs text-zinc-400 capitalize bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded font-mono">
                      Theme: {prd.theme}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeletePrd(prd.id)}
                      className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-zinc-400 transition-colors cursor-pointer"
                      title="Hapus draf ini"
                      id={`btn-delete-${prd.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onLoadPrd(prd.id)}
                      className={`${styles.buttonPrimary} py-1.5 px-3 text-xs`}
                      id={`btn-open-${prd.id}`}
                    >
                      Buka
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
