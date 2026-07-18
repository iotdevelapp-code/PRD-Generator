/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  BookOpen, 
  FileQuestion, 
  QrCode, 
  LogOut, 
  UploadCloud, 
  User, 
  Building2, 
  GraduationCap, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Check,
  FileText,
  Printer,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Participant, ThemeType } from '../types';
import { themeStyles } from './ThemeStyles';

// Comprehensive Dissertation Research Instrument Questions (20 items, Bloom C2-C4 & 4C)
const COGNITIVE_QUESTIONS = [
  {
    id: 1,
    question: "Manakah dari pernyataan berikut yang membedakan secara mendasar antara paradigma \"Traditional Coding\" dengan \"Vibe Coding\"? [C2 - Critical Thinking]",
    options: [
      "Traditional coding menitikberatkan pada perancangan logika bisnis aplikasi, sedangkan vibe coding fokus pada pengetikan sintaksis manual secara presisi.",
      "Traditional coding tidak memerlukan komputer spesifikasi tinggi, sedangkan vibe coding membutuhkan superkomputer lokal.",
      "Traditional coding menuntut manusia menguasai sintaksis bahasa pemrograman untuk mengeksekusi logika, sedangkan vibe coding (seperti pada ekosistem Antigravity, Cursor, Bolt.new, Lovable, atau Windsurf) memosisikan manusia sebagai arsitek logika yang mengarahkan AI untuk mengeksekusi sintaksis tersebut.",
      "Tidak ada perbedaan mendasar; kedua metode memiliki efisiensi, durasi, dan ketergantungan yang sama terhadap struktur dokumentasi manual."
    ],
    answer: 2
  },
  {
    id: 2,
    question: "Dalam ekosistem Vibe Coding, Anda mengintegrasikan Antigravity, Google AI Studio, dan GitHub. Manakah analisis alur kerja data (data workflow) yang benar di bawah ini? [C4 - Collaboration]",
    options: [
      "Antigravity bertindak sebagai lingkungan kerja visual (IDE/No-code canvas); Google AI Studio menyediakan API Key sebagai otak pemrosesan; GitHub bertindak sebagai repositori penyimpanan. Ini berbeda dengan alat offline seperti Cursor/Windsurf atau sandbox cloud seperti Bolt.new/Lovable.",
      "Google AI Studio mengompilasi kode dari GitHub; Antigravity bertindak sebagai server hosting; GitHub menerjemahkan instruksi.",
      "GitHub mengirimkan instruksi ke Google AI Studio; Antigravity mengekstrak API Key untuk merekayasa server fisik lokal.",
      "Antigravity memproses kode secara lokal; GitHub menyediakan kecerdasan buatan melalui API; Google AI Studio menyimpan riwayat revisi kode."
    ],
    answer: 0
  },
  {
    id: 3,
    question: "Anda ingin membangun fitur autentikasi pengguna (Halaman Login) pada proyek aplikasi Anda di Antigravity menggunakan model Gemini via Google AI Studio. Berdasarkan prinsip prompting terstruktur, instruksi mana yang paling optimal? [C3 - Communication]",
    options: [
      "\"Buatkan form login yang aman untuk aplikasi saya, tambahkan tombol masuk.\"",
      "\"Tolong hubungkan API Google AI Studio ke GitHub saya agar formulir login otomatis terbentuk tanpa celah keamanan.\"",
      "\"Buat komponen halaman login menggunakan HTML/CSS yang terintegrasi dengan backend JavaScript. Sediakan kolom input teks untuk 'Username' (validasi email), kolom 'Password' (tipe password), dan tombol submit. Pastikan responsif untuk perangkat mobile.\"",
      "\"Tulis kode enkripsi untuk password pengguna database universitas menggunakan standar algoritma SHA-256 yang kompatibel dengan GitHub.\""
    ],
    answer: 2
  },
  {
    id: 4,
    question: "Setelah melakukan perubahan masif pada logika antarmuka di Antigravity, Anda ingin mengamankan progres pekerjaan Anda ke GitHub secara tim. Urutan langkah prosedural (version control) yang harus dilewati adalah... [C3 - Collaboration]",
    options: [
      "Pull -> Fetch -> Clone.",
      "Delete Repository -> Create New Repository -> Upload file ZIP.",
      "Stage Changes (memilih file) -> Commit (memberi pesan deskripsi perubahan) -> Push (mengirim ke repositori remote).",
      "Forking -> Branching -> Merging tanpa perlu otentikasi."
    ],
    answer: 2
  },
  {
    id: 5,
    question: "Ketika Anda memasukkan kode hasil generasi Google AI Studio ke dalam Antigravity, sistem menampilkan pesan error: \"TypeError: Cannot read properties of undefined (reading 'map')\". Analisis awal apa yang paling tepat untuk memecahkan masalah ini dengan bantuan AI? [C4 - Critical Thinking]",
    options: [
      "Menghapus kode tersebut dan meminta AI menulis ulang fungsi yang sepenuhnya baru dari awal.",
      "Mengidentifikasi bahwa aplikasi mencoba membaca data dari objek atau array yang belum dimuat, lalu mengirimkan pesan error tersebut bersama kode terkait ke AI untuk penanganan kondisi null/undefined.",
      "Mengubah konfigurasi repositori GitHub dari Public menjadi Private karena error tersebut disebabkan oleh masalah hak akses.",
      "Menurunkan versi (downgrade) model AI di Google AI Studio karena model tersebut mengalami kerusakan internal."
    ],
    answer: 1
  },
  {
    id: 6,
    question: "AI cenderung mengalami fenomena \"Halusinasi\" (Hallucination). Manakah manifestasi halusinasi AI yang paling krusial dan berbahaya saat melakukan Vibe Coding? [C4 - Critical Thinking]",
    options: [
      "AI mengubah tema warna aplikasi dari biru menjadi merah tanpa diperintah.",
      "AI menolak memberikan jawaban karena menganggap instruksi pengguna melanggar hak cipta.",
      "AI merekomendasikan penggunaan pustaka (library), fungsi, atau parameter kode yang sebenarnya tidak pernah ada, namun ditulis dengan format yang tampak sangat meyakinkan.",
      "AI secara otomatis menghapus akun GitHub dan Google AI Studio milik pengguna."
    ],
    answer: 2
  },
  {
    id: 7,
    question: "Anda berencana membuat aplikasi manajemen tugas (To-Do List) yang kompleks. Menerapkan metode iteratif dalam Vibe Coding, bagaimanakah tahapan pengembangan yang paling direkomendasikan? [C3 - Creativity]",
    options: [
      "Menulis seluruh deskripsi fitur aplikasi dalam satu prompt tunggal yang sangat panjang agar AI langsung menyelesaikannya.",
      "Meminta AI membuat fungsi dasar terlebih dahulu (menampilkan daftar tugas), mengujinya di Antigravity, melakukan commit ke GitHub, lalu bertahap meminta penambahan fitur berikutnya.",
      "Desain visualnya saja di Antigravity sampai selesai, kemudian menyerahkan urusan logika sepenuhnya ke GitHub.",
      "Meminta AI menghasilkan 5 versi aplikasi yang berbeda sekaligus, lalu menggabungkannya secara acak."
    ],
    answer: 1
  },
  {
    id: 8,
    question: "Mengapa penggunaan API Key dari Google AI Studio harus dijaga kerahasiaannya dan tidak boleh diunggah secara terbuka di repositori publik GitHub? [C4 - Critical Thinking]",
    options: [
      "Karena jika API Key bocor, pihak lain dapat mengeksploitasi kuota akses model AI Anda, yang dapat menyebabkan pemblokiran akun atau pembengkakan biaya penggunaan.",
      "Karena GitHub akan mendeteksi API Key sebagai virus berbahaya.",
      "Karena API Key berisi data pribadi mahasiswa seperti NIM, nama, dan prodi.",
      "Karena platform Antigravity akan otomatis mengunci proyek Anda."
    ],
    answer: 0
  },
  {
    id: 9,
    question: "Dalam ekosistem Vibe Coding, manakah yang merupakan fungsi utama dari Google AI Studio? [C2 - Communication]",
    options: [
      "Sebagai hosting web statis gratis agar aplikasi dapat dikunjungi pengguna global.",
      "Sebagai lingkungan eksplorasi LLM (Gemini) untuk menguji prompt serta menerbitkan API Key sebagai jembatan kognitif aplikasi (serupa dengan penyiapan API key eksternal pada Cursor, Windsurf, atau Lovable).",
      "Sebagai database relasional utama untuk menyimpan kredensial login responden.",
      "Sebagai sarana kompilasi kode biner mesin secara offline."
    ],
    answer: 1
  },
  {
    id: 10,
    question: "Mengapa integrasi dengan sistem kontrol versi online seperti GitHub sangat krusial dalam siklus hidup pengembangan Vibe Coding di Antigravity? [C4 - Collaboration]",
    options: [
      "Karena ia bertindak sebagai satu-satunya sistem pembayaran otomatis token API Gemini.",
      "Untuk mencatat riwayat versi (version control), memfasilitasi kerja kolaboratif, dan menyediakan rollback aman jika modifikasi AI merusak sistem.",
      "Untuk mempercepat pengiriman kueri data dari Antigravity ke Google AI Studio.",
      "Untuk merancang tata letak grafis antarmuka mobile secara responsif."
    ],
    answer: 1
  },
  {
    id: 11,
    question: "Apa peran strategis API Key Gemini yang diperoleh dari Google AI Studio ketika dihubungkan ke platform Antigravity? [C3 - Creativity]",
    options: [
      "Sebagai token keamanan untuk melakukan clone repositori GitHub lokal.",
      "Sebagai jembatan otentikasi resmi agar aplikasi buatan kita di Antigravity dapat memanggil kemampuan kognitif LLM Gemini (serupa dengan penyiapan kunci API khusus pada toolset seperti Bolt.new atau v0.dev).",
      "Sebagai lisensi premium untuk mengunduh pustaka grafik D3.js secara gratis.",
      "Sebagai modul akselerator perangkat keras GPU pada laptop pengguna."
    ],
    answer: 1
  },
  {
    id: 12,
    question: "Setelah merancang fitur antarmuka fungsional baru di Antigravity, Anda ingin mengunggahnya dengan aman ke repositori GitHub. Urutan langkah Git mana yang benar? [C3 - Communication]",
    options: [
      "Mengunduh file ZIP -> Kirim lewat email ke administrator -> Hapus berkas lokal.",
      "Stage Changes (add) -> Commit (menulis deskripsi log perubahan) -> Push ke repositori remote (GitHub).",
      "Clone repositori -> Pull Request -> Hapus permanen repositori GitHub.",
      "Melakukan merge tanpa autentikasi -> Fork -> Buat repositori baru."
    ],
    answer: 1
  },
  {
    id: 13,
    question: "Dokumen HTML5 menggunakan tag semantic untuk menstrukturkan halaman web secara terorganisir. Manakah tag HTML5 yang paling tepat untuk mengelompokkan konten navigasi utama? [C2 - Konseptual]",
    options: [
      "<section> karena bersifat umum untuk mengelompokkan konten terkait.",
      "<div id=\"nav\"> karena merupakan standar penulisan navigasi paling modern.",
      "<nav> karena tag semantic ini khusus dibuat untuk mendefinisikan blok link navigasi secara ramah SEO dan aksesibilitas.",
      "<aside> untuk menaruh link navigasi sebagai bagian tambahan di samping konten utama."
    ],
    answer: 2
  },
  {
    id: 14,
    question: "Di dalam file JavaScript, Anda ingin mendeteksi klik tombol oleh pengguna pada halaman web dan menjalankan sebuah fungsi. Sintaks manipulasi DOM (Document Object Model) mana yang paling tepat? [C3 - Pemrograman Web]",
    options: [
      "document.select(\"button\").onclick = runFunction();",
      "document.getElementById(\"btn-submit\").addEventListener(\"click\", runFunction);",
      "window.onClickEvent(\"btn-submit\", runFunction);",
      "button.click(runFunction());"
    ],
    answer: 1
  },
  {
    id: 15,
    question: "Anda menggunakan Tailwind CSS dalam pengembangan web di Antigravity. Kelas utilitas Tailwind CSS mana yang harus digunakan jika Anda ingin mengubah susunan layout dari 1 kolom di perangkat mobile menjadi 3 kolom di layar desktop? [C3 - Pemrograman Web]",
    options: [
      "grid grid-cols-1 desktop:grid-cols-3",
      "flex flex-col md:flex-row-three",
      "grid grid-cols-1 lg:grid-cols-3",
      "layout-responsive cols-1 cols-lg-3"
    ],
    answer: 2
  },
  {
    id: 16,
    question: "Aplikasi web Anda mengirimkan data formulir input pengguna ke Google AI Studio melalui API menggunakan fungsi fetch(). Mengapa metode request HTTP yang digunakan harus POST, bukan GET? [C4 - Pemrograman Web]",
    options: [
      "Karena metode GET hanya bisa digunakan jika server diletakkan di repositori lokal GitHub.",
      "Karena metode POST mengirimkan muatan data (payload) di dalam body request, sehingga aman untuk payload data kompleks/besar dan tidak mengekspos API Key di URL.",
      "Karena metode GET tidak didukung oleh browser modern saat memuat halaman HTML statis.",
      "Karena metode POST secara otomatis mengenkripsi data biner menggunakan server Antigravity secara offline."
    ],
    answer: 1
  },
  {
    id: 17,
    question: "Manakah dari pernyataan berikut yang paling tepat menjelaskan bagaimana model bahasa besar (Large Language Model/LLM) seperti Gemini menghasilkan jawaban atau kode pemrograman? [C2 - Konseptual AI]",
    options: [
      "LLM memindai seluruh internet secara langsung setiap kali pengguna mengirimkan pertanyaan untuk mencari file kode yang cocok.",
      "LLM memiliki database berisi jutaan baris kode yang sudah dihafal secara kaku, lalu menampilkannya kembali secara acak.",
      "LLM memprediksi kata atau token berikutnya berdasarkan pola probabilitas bahasa dan logika pemrograman yang telah dipelajarinya dari kumpulan data pelatihan yang sangat besar.",
      "LLM dikendalikan secara manual oleh tim pemrogram profesional di balik layar yang mengetik jawaban dengan sangat cepat."
    ],
    answer: 2
  },
  {
    id: 18,
    question: "Dalam interaksi dengan Google AI Studio atau LLM lainnya, apakah yang dimaksud dengan istilah \"Context Window\" (Jendela Konteks)? [C2 - Konseptual AI]",
    options: [
      "Batas ukuran layar tampilan antarmuka saat pengguna melakukan percakapan dengan AI.",
      "Jumlah total memori RAM yang dialokasikan oleh sistem komputer lokal pengguna untuk memproses perintah AI.",
      "Jumlah maksimal dokumen yang dapat diunggah pengguna ke repositori publik GitHub dalam satu waktu.",
      "Batas jumlah data (teks, token, atau kode) dari riwayat percakapan sebelumnya yang dapat diingat dan diproses oleh model AI dalam satu sesi aktif."
    ],
    answer: 3
  },
  {
    id: 19,
    question: "Anda sedang merancang aplikasi menggunakan Google AI Studio dan ingin agar respons kode atau teks yang dihasilkan oleh model Gemini bersifat sangat konsisten, logis, dan meminimalkan variasi jawaban acak. Parameter apa yang paling tepat disesuaikan? [C3 - Penerapan AI]",
    options: [
      "Menaikkan parameter \"Temperature\" mendekati angka 1.0 atau lebih tinggi agar AI lebih kreatif.",
      "Menurunkan parameter \"Temperature\" mendekati angka 0.0 agar output AI lebih deterministik (pasti) dan fokus pada aturan logika yang ketat.",
      "Mengubah pengaturan privasi repositori GitHub dari publik menjadi pribadi.",
      "Mematikan fitur tokenisasi biner pada API Key Google AI Studio Anda."
    ],
    answer: 1
  },
  {
    id: 20,
    question: "Manakah analisis perbedaan peran yang paling tepat antara \"System Instruction\" (Instruksi Sistem) dengan \"User Prompt\" (Perintah Pengguna) dalam konfigurasi model di Google AI Studio? [C4 - Analisis AI]",
    options: [
      "System Instruction mengatur cara kerja sistem Antigravity secara fisik, sedangkan User Prompt mengatur hak akses repositori GitHub.",
      "System Instruction mendefinisikan persona, batasan, gaya bahasa, dan aturan tetap yang harus diikuti model AI selama sesi percakapan, sedangkan User Prompt adalah instruksi atau pertanyaan spesifik yang diajukan pengguna.",
      "Tidak ada perbedaan fungsional; keduanya dapat dipertukarkan tanpa memengaruhi kualitas logika kode yang dihasilkan oleh model Gemini.",
      "System Instruction membatasi kecepatan pemrosesan model AI, sedangkan User Prompt berfungsi untuk memperbarui API Key secara berkala."
    ],
    answer: 1
  }
];

// Attitude and Self-Efficacy Likert scale survey questions (10 items, 5-point Likert)
const LIKERT_QUESTIONS = [
  {
    id: "likert_1",
    category: "Keterampilan Abad-21 (4C Index)",
    text: "Saya selalu menganalisis secara kritis setiap baris kode atau solusi yang dihasilkan oleh AI sebelum menggunakannya dalam aplikasi. [Critical Thinking]",
    favorable: true
  },
  {
    id: "likert_2",
    category: "Keterampilan Abad-21 (4C Index)",
    text: "Saya mampu mengeksplorasi ide-ide desain visual atau fungsionalitas baru yang tidak terpikirkan sebelumnya berkat bantuan stimulasi dari AI. [Creativity]",
    favorable: true
  },
  {
    id: "likert_3",
    category: "Keterampilan Abad-21 (4C Index)",
    text: "Saya merasa siap berkolaborasi dalam tim multi-disiplin untuk mengembangkan proyek digital menggunakan repositori bersama seperti GitHub. [Collaboration]",
    favorable: true
  },
  {
    id: "likert_4",
    category: "Keterampilan Abad-21 (4C Index)",
    text: "Saya mampu menjelaskan ide sistem yang kompleks ke dalam bahasa instruksi (prompting) yang logis, terstruktur, dan mudah dipahami oleh AI. [Communication]",
    favorable: true
  },
  {
    id: "likert_5",
    category: "Efikasi Diri (Self-Efficacy Scale)",
    text: "Saya merasa mampu merancang logika sistem untuk sebuah aplikasi digital tanpa harus menghafal sintaksis bahasa pemrograman yang rumit.",
    favorable: true
  },
  {
    id: "likert_6",
    category: "Efikasi Diri (Self-Efficacy Scale)",
    text: "Saya merasa bingung dan tidak tahu harus memulai dari mana ketika diminta merancang aplikasi digital menggunakan bantuan AI.",
    favorable: false
  },
  {
    id: "likert_7",
    category: "Efikasi Diri (Self-Efficacy Scale)",
    text: "Saya meyakini keterampilan memanfaatkan kombinasi Antigravity, AI Studio, dan GitHub akan sangat membantu saya dalam menyelesaikan persoalan praktis di bidang ilmu/jurusan saya sendiri.",
    favorable: true
  },
  {
    id: "likert_8",
    category: "Efikasi Diri (Self-Efficacy Scale)",
    text: "Menurut saya, keahlian mengarahkan AI (vibe coding) hanya relevan untuk mahasiswa jurusan Komputer/IT, bukan untuk bidang studi saya.",
    favorable: false
  },
  {
    id: "likert_9",
    category: "Efikasi Diri (Self-Efficacy Scale)",
    text: "Ketika aplikasi yang saya bangun bersama AI mengalami error atau bug, saya percaya diri dapat mendeteksi dan memperbaikinya melalui proses prompting berulang.",
    favorable: true
  },
  {
    id: "likert_10",
    category: "Efikasi Diri (Self-Efficacy Scale)",
    text: "Saya mudah merasa putus asa dan cenderung menghentikan proyek jika AI terus-menerus memberikan output kode yang salah atau tidak sesuai harapan.",
    favorable: false
  }
];

// Helper to compute Likert Scale overall statistics
export function calculateLikertScore(answers: Record<string, number> | undefined) {
  if (!answers) return null;
  let totalScore = 0;
  let maxScore = LIKERT_QUESTIONS.length * 5; // 50
  
  LIKERT_QUESTIONS.forEach(q => {
    const val = answers[q.id]; // 1 to 5
    if (val !== undefined) {
      if (q.favorable) {
        totalScore += val;
      } else {
        // reversed scoring: 1->5, 2->4, 3->3, 4->2, 5->1
        totalScore += (6 - val);
      }
    }
  });
  
  return {
    score: totalScore,
    maxScore: maxScore,
    percentage: Math.round((totalScore / maxScore) * 100)
  };
}

const PRE_TEST_QUESTIONS = COGNITIVE_QUESTIONS;
const POST_TEST_QUESTIONS = COGNITIVE_QUESTIONS;

// Default high quality avatar options for participants who don't want to upload
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
];

interface WorkshopPortalProps {
  currentTheme: ThemeType;
  participant: Participant | null;
  onRegister: (data: Participant) => void;
  onLogout: () => void;
  onUpdateProgress: (updated: Partial<Participant>) => void;
  totalPrdsGenerated: number;
}

export default function WorkshopPortal({
  currentTheme,
  participant,
  onRegister,
  onLogout,
  onUpdateProgress,
  totalPrdsGenerated
}: WorkshopPortalProps) {
  const styles = themeStyles[currentTheme];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Registration Form States
  const [fullName, setFullName] = useState(participant?.fullName || '');
  const [email, setEmail] = useState(participant?.email || '');
  const [phone, setPhone] = useState(participant?.phone || '');
  const [age, setAge] = useState<number>(participant?.age || 20);
  const [campus, setCampus] = useState(participant?.campus || '');
  const [major, setMajor] = useState(participant?.major || '');
  const [nim, setNim] = useState(participant?.nim || '');
  const [profilePic, setProfilePic] = useState(participant?.profilePic || PRESET_AVATARS[0]);
  const [dragActive, setDragActive] = useState(false);
  const [isGmailSimulating, setIsGmailSimulating] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(!!participant?.email);

  // New variables for the dissertation research instrument
  const [disciplineGroup, setDisciplineGroup] = useState(participant?.disciplineGroup || '');
  const [academicYear, setAcademicYear] = useState(participant?.academicYear || '');
  const [codingExperience, setCodingExperience] = useState(participant?.codingExperience || '');
  const [aiIntensity, setAiIntensity] = useState(participant?.aiIntensity || '');
  const [aiToolsUsed, setAiToolsUsed] = useState<string[]>(participant?.aiToolsUsed || []);

  // Portal Tab States: 'profile' | 'materi' | 'pre-test' | 'post-test' | 'sertifikat'
  const [activeTab, setActiveTab] = useState<'profile' | 'materi' | 'pre-test' | 'post-test' | 'sertifikat'>('profile');

  // Quizzes States
  const [preTestAnswers, setPreTestAnswers] = useState<Record<number, number>>({});
  const [preTestSubmitted, setPreTestSubmitted] = useState(false);
  const [preTestScore, setPreTestScore] = useState<number | null>(null);
  const [preTestSurveyAnswers, setPreTestSurveyAnswers] = useState<Record<string, number>>(participant?.preTestSurveyAnswers || {});

  const [postTestAnswers, setPostTestAnswers] = useState<Record<number, number>>({});
  const [postTestSubmitted, setPostTestSubmitted] = useState(false);
  const [postTestScore, setPostTestScore] = useState<number | null>(null);
  const [postTestSurveyAnswers, setPostTestSurveyAnswers] = useState<Record<string, number>>(participant?.postTestSurveyAnswers || {});

  // Form Validation
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Handle Drag-and-drop file upload for profile picture
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon unggah file format gambar (JPG/PNG/WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfilePic(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // Simulate Gmail Login Flow popup
  const handleSimulateGmailLogin = () => {
    setIsGmailSimulating(true);
    setTimeout(() => {
      // Simulate successful account selection
      const randomNames = ["Budi Santoso", "Siti Aminah", "Rian Wijaya", "Anisa Rahmawati", "Fajar Pratama"];
      const chosenName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const generatedEmail = `${chosenName.toLowerCase().replace(/\s+/g, '')}@gmail.com`;
      
      setFullName(chosenName);
      setEmail(generatedEmail);
      setGmailConnected(true);
      setIsGmailSimulating(false);
    }, 1500);
  };

  // Submit Registration Form
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!fullName.trim()) errors.push("Nama Lengkap wajib diisi.");
    if (!email.trim() || !email.includes('@gmail.com')) {
      errors.push("Email wajib menggunakan akun Gmail valid (@gmail.com).");
    }
    if (!phone.trim()) errors.push("Nomor WhatsApp wajib diisi.");
    if (age <= 0) errors.push("Umur harus valid dan di atas 0 tahun.");
    if (!campus.trim()) errors.push("Asal Kampus wajib diisi.");
    if (!major.trim()) errors.push("Program Studi wajib diisi.");
    if (!nim.trim()) errors.push("NIM (Nomor Induk Mahasiswa) wajib diisi.");
    
    // New validation rules
    if (!disciplineGroup) errors.push("Rumpun Ilmu Keilmuan (DIKTI) wajib dipilih.");
    if (!academicYear) errors.push("Tahun Akademik / Semester wajib dipilih.");
    if (!codingExperience) errors.push("Tingkat Pengalaman Coding Tradisional wajib dipilih.");
    if (!aiIntensity) errors.push("Intensitas Interaksi dengan Generative AI wajib dipilih.");
    if (aiToolsUsed.length === 0) {
      errors.push("Pilih minimal satu alat Vibe Coding/AI atau pilih 'Belum pernah menggunakan alat-alat di atas'.");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    onRegister({
      fullName,
      email,
      phone,
      age: Number(age),
      campus,
      major,
      nim,
      profilePic,
      registeredAt: new Date().toISOString(),
      disciplineGroup,
      academicYear,
      codingExperience,
      aiIntensity,
      aiToolsUsed
    });
  };

  // Pre-Test Grading (20 cognitive questions scored proportionally, and saving survey)
  const handleGradePreTest = () => {
    let correctCount = 0;
    COGNITIVE_QUESTIONS.forEach((q) => {
      if (preTestAnswers[q.id] === q.answer) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / COGNITIVE_QUESTIONS.length) * 100);

    setPreTestScore(score);
    setPreTestSubmitted(true);
    onUpdateProgress({
      preTestCompleted: true,
      preTestScore: score,
      preTestSurveyAnswers: preTestSurveyAnswers
    });
  };

  // Post-Test Grading (20 cognitive questions scored proportionally, and saving survey)
  const handleGradePostTest = () => {
    let correctCount = 0;
    COGNITIVE_QUESTIONS.forEach((q) => {
      if (postTestAnswers[q.id] === q.answer) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / COGNITIVE_QUESTIONS.length) * 100);

    setPostTestScore(score);
    setPostTestSubmitted(true);
    onUpdateProgress({
      postTestCompleted: true,
      postTestScore: score,
      postTestSurveyAnswers: postTestSurveyAnswers
    });
  };

  // Print Certificate Action
  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8" id="workshop-portal-root">
      
      {/* 1. STATE: UNREGISTERED (Show Registration Page) */}
      {!participant ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left info panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`${styles.card} p-8 border border-white/[0.05] relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-3xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Registrasi Peserta Workshop
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight leading-tight mb-4">
                Masuki Gerbang Pembelajaran Masa Depan <span className="text-indigo-400 italic">Vibe Coding</span>
              </h2>
              
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Sesuai dengan <strong>Protokol Administrasi & Evaluasi</strong>, seluruh peserta diwajibkan melakukan registrasi data diri yang valid sebelum dapat mengakses fitur-fitur pembelajaran utama:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-200">Pre-Test Mandiri</h5>
                    <p className="text-3xs text-zinc-500">Mendeteksi tingkat kompetensi awal sebelum beriterasi dengan asisten AI.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-[#f25f4c]/10 text-[#f25f4c] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-200">Generator PRD & Wizard AI</h5>
                    <p className="text-3xs text-zinc-500">Ciptakan dokumen cetak biru PRD.md kelas profesional dengan satu klik.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-200">Post-Test & Materi Premium</h5>
                    <p className="text-3xs text-zinc-500">Akses dokumen tata kelola, cheatsheet Stitch, Gemini API, dan Vercel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-yellow-500/10 text-yellow-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-200">Unduh E-Sertifikat Kelulusan</h5>
                    <p className="text-3xs text-zinc-500">Dapatkan sertifikat digital resmi yang ditandatangani Pemateri Ucok, S.Kom., MT.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
                <div className="text-left">
                  <span className="text-4xs text-zinc-500 uppercase tracking-widest font-mono block">Status Registrasi</span>
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 mt-0.5">
                    <Lock className="w-3 h-3" /> BELUM TERDAFTAR
                  </span>
                </div>
                <div className="text-right font-mono text-4xs text-zinc-500">
                  SOP-EVALUASI_REV_2.4
                </div>
              </div>
            </div>

            {/* Simulated Google Accounts Sign In Info */}
            <div className="p-4 rounded-2xl bg-zinc-950/50 border border-white/[0.04] text-2xs text-zinc-400 leading-relaxed space-y-2">
              <span className="font-bold text-zinc-200 block">💡 Mengapa Daftar dengan Gmail?</span>
              <p>Otentikasi dengan Gmail menjamin akurasi akun peserta agar sertifikat yang diterbitkan dapat terverifikasi secara sahih oleh sistem panitia.</p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:col-span-7">
            <div className={`${styles.card} p-8 border border-white/[0.08]`}>
              <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" />
                Isi Formulir Data Diri Peserta
              </h3>

              {formErrors.length > 0 && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6 text-xs text-red-400 space-y-1">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <AlertCircle className="w-4 h-4" /> Ada beberapa isian yang belum valid:
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5">
                    {formErrors.map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmitRegistration} className="space-y-6">
                
                {/* Google Authenticator Simulation Button */}
                <div className="p-5 rounded-2xl bg-[#0a0b0d] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-2xs font-bold text-zinc-300 block">Akun Google / Gmail</span>
                    <span className="text-4xs text-zinc-500 block mt-0.5">Otentikasi satu-klik untuk menarik profil dasar</span>
                  </div>

                  {gmailConnected ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/25 py-2 px-4 rounded-xl">
                      <ShieldCheck className="w-4 h-4 animate-bounce" /> Gmail Terhubung
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSimulateGmailLogin}
                      disabled={isGmailSimulating}
                      className="py-2.5 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      id="btn-google-auth-simulate"
                    >
                      {isGmailSimulating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                          Menghubungkan...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 0, 0)">
                              <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.48C21.68,11.75 21.56,11.41 21.35,11.1z" fill="#4285F4" />
                              <path d="M12,20.58c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.58c-0.92,0.61 -2.1,0.98 -3.42,0.98 -2.63,0 -4.85,-1.77 -5.65,-4.15H2.18v2.67C3.66,18.23 7.56,20.58 12,20.58z" fill="#34A853" />
                              <path d="M6.35,12.63c-0.2,-0.61 -0.31,-1.26 -0.31,-1.93c0,-0.67 0.11,-1.32 0.31,-1.93V6.1H2.18c-0.67,1.34 -1.06,2.85 -1.06,4.6c0,1.75 0.39,3.26 1.06,4.6l4.17,-3.27z" fill="#FBBC05" />
                              <path d="M12,5.7c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,3.04 14.42,2.22 12,2.22c-4.44,0 -8.34,2.35 -9.82,5.35l4.17,3.27c0.8,-2.38 3.02,-4.14 5.65,-4.14z" fill="#EA4335" />
                            </g>
                          </svg>
                          Daftar dengan Gmail
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama Lengkap */}
                  <div className="space-y-1">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Nama Lengkap</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Ucok Santoso"
                      className="w-full py-2.5 px-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      id="input-reg-name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Email (Gmail Wajib)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alamat@gmail.com"
                      className="w-full py-2.5 px-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      id="input-reg-email"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Nomor WA (Aktif)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 081234567890 atau +62..."
                      className="w-full py-2.5 px-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      id="input-reg-phone"
                    />
                  </div>

                  {/* Umur */}
                  <div className="space-y-1">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Umur (Tahun)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      placeholder="Contoh: 21"
                      min="1"
                      className="w-full py-2.5 px-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      id="input-reg-age"
                    />
                  </div>

                  {/* Asal Kampus */}
                  <div className="space-y-1">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Asal Kampus / Institusi</label>
                    <input
                      type="text"
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      placeholder="Contoh: Universitas Indonesia"
                      className="w-full py-2.5 px-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      id="input-reg-campus"
                    />
                  </div>

                  {/* Program Studi */}
                  <div className="space-y-1">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Program Studi</label>
                    <input
                      type="text"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      placeholder="Contoh: Teknik Informatika"
                      className="w-full py-2.5 px-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      id="input-reg-major"
                    />
                  </div>

                  {/* NIM */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">NIM (Nomor Induk Mahasiswa)</label>
                    <input
                      type="text"
                      value={nim}
                      onChange={(e) => setNim(e.target.value)}
                      placeholder="Contoh: 1202204123"
                      className="w-full py-2.5 px-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      id="input-reg-nim"
                    />
                  </div>
                </div>

                {/* Foto Profil with Drag and Drop & Preset Selection */}
                <div className="space-y-2">
                  <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Foto Profil</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Avatar Preview */}
                    <div className="md:col-span-3 flex flex-col items-center gap-2">
                      <div className="relative group w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-zinc-950/40">
                        <img 
                          src={profilePic} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">Pratinjau</span>
                    </div>

                    {/* Drag & Drop Upload Zone */}
                    <div className="md:col-span-9">
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed p-4 rounded-xl text-center cursor-pointer transition-all ${
                          dragActive 
                            ? 'border-indigo-500 bg-indigo-500/5' 
                            : 'border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/15'
                        }`}
                        id="avatar-drop-zone"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <UploadCloud className="w-5 h-5 mx-auto text-zinc-500 mb-1" />
                        <span className="text-2xs font-semibold text-zinc-300 block">Klik atau Seret Gambar di Sini</span>
                        <span className="text-[10px] text-zinc-500 block">Mendukung format PNG, JPG, WEBP</span>
                      </div>
                    </div>
                  </div>

                  {/* Preset Quick Avatars */}
                  <div className="pt-2">
                    <span className="text-[10px] text-zinc-500 block mb-1.5 font-semibold">Atau pilih avatar siap pakai:</span>
                    <div className="flex gap-2.5">
                      {PRESET_AVATARS.map((avatar, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setProfilePic(avatar)}
                          className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            profilePic === avatar ? 'border-indigo-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={avatar} alt="Preset Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BAGIAN I: PROFIL RESPONDEN (VARIABEL KONTROL) - FOR RESEARCH INSTRUMENT */}
                <div className="pt-6 border-t border-white/[0.04] space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-4 rounded-full bg-indigo-500"></span>
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Bagian I: Profil Responden (Variabel Kontrol Penelitian)</h4>
                  </div>
                  <p className="text-4xs text-zinc-500 leading-relaxed">
                    Bagian ini wajib diisi oleh mahasiswa sebelum mengerjakan instrumen evaluasi kognitif dan afektif untuk keperluan validasi analisis disertasi.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Rumpun Ilmu */}
                    <div className="space-y-1">
                      <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Rumpun Ilmu Keilmuan (DIKTI)</label>
                      <select
                        value={disciplineGroup}
                        onChange={(e) => setDisciplineGroup(e.target.value)}
                        className="w-full py-2.5 px-4 bg-[#0c0d10] border border-white/[0.08] rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        id="select-reg-discipline"
                      >
                        <option value="">-- Pilih Rumpun Ilmu --</option>
                        <option value="Sains & Teknologi (STEM)">Sains & Teknologi (STEM)</option>
                        <option value="Sosial & Humaniora (Soshum)">Sosial & Humaniora (Soshum)</option>
                        <option value="Seni, Desain & Media">Seni, Desain & Media</option>
                        <option value="Kesehatan & Kedokteran">Kesehatan & Kedokteran</option>
                      </select>
                    </div>

                    {/* Tahun Akademik / Semester */}
                    <div className="space-y-1">
                      <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Tahun Akademik / Semester</label>
                      <select
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        className="w-full py-2.5 px-4 bg-[#0c0d10] border border-white/[0.08] rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        id="select-reg-academicyear"
                      >
                        <option value="">-- Pilih Semester --</option>
                        <option value="Semester 1 - 2 (Tahun Pertama)">Semester 1 - 2 (Tahun Pertama)</option>
                        <option value="Semester 3 - 4 (Tahun Kedua)">Semester 3 - 4 (Tahun Kedua)</option>
                        <option value="Semester 5 - 6 (Tahun Ketiga)">Semester 5 - 6 (Tahun Ketiga)</option>
                        <option value="Semester 7 ke atas (Tahun Akhir)">Semester 7 ke atas (Tahun Akhir)</option>
                      </select>
                    </div>

                    {/* Pengalaman Coding */}
                    <div className="space-y-1 md:col-span-2">
                      <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Tingkat Pengalaman Coding Tradisional (Tanpa AI)</label>
                      <select
                        value={codingExperience}
                        onChange={(e) => setCodingExperience(e.target.value)}
                        className="w-full py-2.5 px-4 bg-[#0c0d10] border border-white/[0.08] rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        id="select-reg-codingexp"
                      >
                        <option value="">-- Pilih Pengalaman Coding --</option>
                        <option value="Level 0 (Novice): Belum pernah menulis baris kode pemrograman sama sekali.">Level 0 (Novice): Belum pernah menulis baris kode pemrograman sama sekali.</option>
                        <option value="Level 1 (Basic): Paham konsep dasar (if-else, loop) tapi tidak bisa membuat program utuh secara mandiri.">Level 1 (Basic): Paham konsep dasar (if-else, loop) tapi tidak bisa membuat program utuh secara mandiri.</option>
                        <option value="Level 2 (Intermediate): Pernah merancang aplikasi web/skrip pemrograman sederhana di perkuliahan.">Level 2 (Intermediate): Pernah merancang aplikasi web/skrip pemrograman sederhana di perkuliahan.</option>
                        <option value="Level 3 (Advanced): Mahir menulis algoritma kompleks dan memahami arsitektur sistem secara profesional.">Level 3 (Advanced): Mahir menulis algoritma kompleks dan memahami arsitektur sistem secara profesional.</option>
                      </select>
                    </div>

                    {/* Intensitas AI */}
                    <div className="space-y-1 md:col-span-2">
                      <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">Intensitas Interaksi dengan Generative AI (3 Bulan Terakhir)</label>
                      <select
                        value={aiIntensity}
                        onChange={(e) => setAiIntensity(e.target.value)}
                        className="w-full py-2.5 px-4 bg-[#0c0d10] border border-white/[0.08] rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        id="select-reg-aiintensity"
                      >
                        <option value="">-- Pilih Intensitas Interaksi --</option>
                        <option value="Tidak Pernah: Belum pernah mencoba sama sekali.">Tidak Pernah: Belum pernah mencoba sama sekali.</option>
                        <option value="Jarang: 1-3 kali per bulan (sebatas mencari ide tulisan).">Jarang: 1-3 kali per bulan (sebatas mencari ide tulisan).</option>
                        <option value="Moderat: Beberapa kali seminggu (membantu tugas kuliah tekstual).">Moderat: Beberapa kali seminggu (membantu tugas kuliah tekstual).</option>
                        <option value="Intensif: Hampir setiap hari (digunakan untuk restrukturisasi data/teknis).">Intensif: Hampir setiap hari (digunakan untuk restrukturisasi data/teknis).</option>
                      </select>
                    </div>
                  </div>

                  {/* AI Tools Checkboxes */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-3xs font-bold text-zinc-400 uppercase tracking-wider">
                      Alat Vibe Coding & Asisten AI yang Pernah Dicoba (Boleh pilih lebih dari satu)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {[
                        "Cursor IDE (Composer & multi-file edit)",
                        "Lovable / Bolt.new (Full-stack web sandbox)",
                        "v0.dev / Artifacts (Generasi UI & frontend)",
                        "Replit Agent (Otonom agentic fullstack)",
                        "Windsurf IDE (Flow-state agentic coding)",
                        "Claude Engineer / CLI (Terminal-based agent)",
                        "Belum pernah menggunakan alat-alat di atas"
                      ].map((tool) => {
                        const isChecked = aiToolsUsed.includes(tool);
                        const handleCheckboxChange = () => {
                          if (tool === "Belum pernah menggunakan alat-alat di atas") {
                            if (isChecked) {
                              setAiToolsUsed([]);
                            } else {
                              setAiToolsUsed([tool]);
                            }
                          } else {
                            let updated = [...aiToolsUsed].filter(t => t !== "Belum pernah menggunakan alat-alat di atas");
                            if (isChecked) {
                              updated = updated.filter(t => t !== tool);
                            } else {
                              updated.push(tool);
                            }
                            setAiToolsUsed(updated);
                          }
                        };
                        return (
                          <label
                            key={tool}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none text-[11px] ${
                              isChecked
                                ? 'bg-indigo-600/5 border-indigo-500/40 text-zinc-100'
                                : 'bg-white/[0.01] border-white/[0.04] text-zinc-400 hover:bg-white/[0.02]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                              className="hidden"
                            />
                            <div className={`w-3.5 h-3.5 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-zinc-600'
                            }`}>
                              {isChecked && (
                                <svg className="w-2.5 h-2.5 text-black font-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </div>
                            <span>{tool}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.04]">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(99,102,241,0.2)] flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-submit-registration"
                  >
                    Daftar Sesi Workshop & Buka Kunci Fitur <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        
        /* 2. STATE: REGISTERED (Show Custom Portal Hub) */
        <div className="space-y-8" id="workshop-hub-portal-dashboard">
          
          {/* Header Banner */}
          <div className={`${styles.card} p-6 border border-indigo-500/10 bg-indigo-500/[0.02] flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shrink-0 shadow-lg bg-zinc-900">
                <img 
                  src={participant.profilePic} 
                  alt={participant.fullName} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full uppercase">PESERTA WORKSHOP</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">{participant.fullName}</h2>
                <p className="text-2xs text-zinc-400 mt-0.5">{participant.campus} • {participant.major} ({participant.nim})</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl text-center shrink-0">
                <span className="text-[10px] text-zinc-500 font-semibold block uppercase">Pre-Test</span>
                <span className={`text-xs font-bold block mt-0.5 ${participant.preTestCompleted ? 'text-emerald-400' : 'text-red-400'}`}>
                  {participant.preTestCompleted ? `Selesai (${participant.preTestScore}/100)` : 'Belum Selesai'}
                </span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl text-center shrink-0">
                <span className="text-[10px] text-zinc-500 font-semibold block uppercase">Proyek PRD</span>
                <span className={`text-xs font-bold block mt-0.5 ${totalPrdsGenerated > 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {totalPrdsGenerated} Terbikin
                </span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl text-center shrink-0">
                <span className="text-[10px] text-zinc-500 font-semibold block uppercase">Post-Test</span>
                <span className={`text-xs font-bold block mt-0.5 ${participant.postTestCompleted ? 'text-emerald-400' : 'text-red-400'}`}>
                  {participant.postTestCompleted ? `Selesai (${participant.postTestScore}/100)` : 'Belum Selesai'}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 rounded-xl transition-colors cursor-pointer"
                title="Keluar / Reset Profil"
                id="btn-logout-workshop"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Workshop Tab Navigation */}
          <div className="flex flex-wrap border-b border-white/[0.08]" id="workshop-tab-bar">
            {[
              { id: 'profile', label: 'E-Card & Profil', icon: User },
              { id: 'materi', label: 'Materi Pelatihan', icon: BookOpen },
              { id: 'pre-test', label: '1. Pre-Test', icon: FileQuestion, status: participant.preTestCompleted },
              { id: 'post-test', label: '2. Post-Test', icon: FileQuestion, status: participant.postTestCompleted },
              { id: 'sertifikat', label: '3. E-Sertifikat', icon: Award, status: participant.preTestCompleted && participant.postTestCompleted }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                    isActive 
                      ? 'border-indigo-500 text-white bg-indigo-500/[0.02]' 
                      : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.01]'
                  }`}
                  id={`tab-btn-${tab.id}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                  {tab.status && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[400px]">
            
            {/* TAB A: PROFILE & ID CARD */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fadeIn">
                
                {/* Left panel: E-Card Peserta */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-6 bg-gradient-to-br from-[#0c0e14] to-[#121622] border-2 border-indigo-500/30 rounded-3xl relative overflow-hidden shadow-2xl" id="participant-identity-card">
                    {/* Decorative Circuit Paths */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />

                    {/* Chip representation */}
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <span className="text-4xs font-mono font-extrabold text-indigo-400 uppercase tracking-widest block">IDENTITAS RESMI WORKSHOP</span>
                        <span className="text-3xs text-zinc-500 font-mono mt-0.5 block">SISTEM INTEGRASI STITCH-VERCEL</span>
                      </div>
                      <div className="w-9 h-7 bg-yellow-500/20 border border-yellow-500/30 rounded-md flex items-center justify-center">
                        <div className="w-6 h-4 border border-yellow-500/40 rounded bg-yellow-500/10"></div>
                      </div>
                    </div>

                    {/* Participant Info Block */}
                    <div className="flex gap-4 mb-6">
                      <div className="w-20 h-24 rounded-xl overflow-hidden border border-white/[0.08] shrink-0 bg-zinc-950">
                        <img 
                          src={participant.profilePic} 
                          alt={participant.fullName} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-4xs font-semibold text-zinc-500 uppercase tracking-wider block">NAMA LENGKAP</span>
                          <span className="text-sm font-bold text-white tracking-tight">{participant.fullName}</span>
                        </div>
                        <div>
                          <span className="text-4xs font-semibold text-zinc-500 uppercase tracking-wider block">NIM / ID</span>
                          <span className="text-xs font-mono font-bold text-zinc-300">{participant.nim}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.05] mb-6">
                      <div>
                        <span className="text-4xs font-semibold text-zinc-500 uppercase tracking-wider block">INSTITUSI</span>
                        <span className="text-2xs font-semibold text-zinc-200">{participant.campus}</span>
                      </div>
                      <div>
                        <span className="text-4xs font-semibold text-zinc-500 uppercase tracking-wider block">PROGRAM STUDI</span>
                        <span className="text-2xs font-semibold text-zinc-200">{participant.major}</span>
                      </div>
                    </div>

                    {/* QR Code Validation */}
                    <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/[0.04] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-4xs font-mono font-bold text-indigo-400 block">SOP VALIDASI RE-ENTRY</span>
                        <span className="text-5xs text-zinc-500 block mt-0.5">Tunjukkan barcode ini pada panitia pintu masuk</span>
                      </div>
                      <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                        <QrCode className="w-10 h-10 text-black" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-4xs text-zinc-500 font-mono">Diterbitkan pada {new Date(participant.registeredAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                {/* Right panel: Profile Details & Stats */}
                <div className="md:col-span-7 space-y-6">
                  <div className={`${styles.card} p-6 border border-white/[0.05]`}>
                    <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest mb-4">Profil Detail</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                        <span className="text-4xs text-zinc-500 font-bold uppercase">Nama Lengkap</span>
                        <p className="text-xs font-semibold text-white">{participant.fullName}</p>
                      </div>
                      <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                        <span className="text-4xs text-zinc-500 font-bold uppercase">Email</span>
                        <p className="text-xs font-mono text-white">{participant.email}</p>
                      </div>
                      <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                        <span className="text-4xs text-zinc-500 font-bold uppercase">No. WhatsApp</span>
                        <p className="text-xs font-semibold text-white">{participant.phone}</p>
                      </div>
                      <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                        <span className="text-4xs text-zinc-500 font-bold uppercase">Umur</span>
                        <p className="text-xs font-semibold text-white">{participant.age} Tahun</p>
                      </div>
                      <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] md:col-span-2">
                        <span className="text-4xs text-zinc-500 font-bold uppercase">Asal Kampus / Institusi</span>
                        <p className="text-xs font-semibold text-white">{participant.campus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-600/5 border border-indigo-500/20 space-y-3">
                    <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Langkah Selanjutnya untuk Mendapatkan Sertifikat:
                    </h4>
                    <ol className="list-decimal pl-5 space-y-1.5 text-2xs text-zinc-400">
                      <li className={participant.preTestCompleted ? 'text-zinc-500 line-through' : 'text-zinc-300 font-semibold'}>
                        Selesaikan <strong>1. Pre-Test</strong> di tab atas (Tingkat Pemahaman Awal).
                      </li>
                      <li className={totalPrdsGenerated > 0 ? 'text-zinc-500 line-through' : 'text-zinc-300 font-semibold'}>
                        Gunakan asisten wizard atau editor untuk <strong>Membuat Minimal 1 Draft PRD.md</strong>.
                      </li>
                      <li className={participant.postTestCompleted ? 'text-zinc-500 line-through' : 'text-zinc-300 font-semibold'}>
                        Selesaikan <strong>2. Post-Test</strong> untuk mengukur retensi pengetahuan.
                      </li>
                      <li className="text-zinc-300">
                        Masuk ke tab <strong>3. E-Sertifikat</strong> untuk mengunduh Sertifikat Resmi Workshop Anda!
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* TAB B: MATERI PELATIHAN */}
            {activeTab === 'materi' && (
              <div className="space-y-6 animate-fadeIn">
                <div className={`${styles.card} p-6 border border-white/[0.06]`}>
                  <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest mb-4">Materi Utama & Cheatsheet</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Item 1 */}
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                      <span className="text-3xs font-mono font-bold text-indigo-400 block mb-1">BAGIAN 1</span>
                      <h4 className="text-xs font-bold text-zinc-100 mb-2">Mindset Vibe Coding</h4>
                      <p className="text-2xs text-zinc-400 leading-relaxed">Pemberdayaan <strong>Logic-First</strong> alih-alih <strong>Syntax-First</strong>. Mengutamakan pemahaman alur arsitektural dan mengoperasikan asisten AI (Cursor/Gemini) sebagai pelaksana eksekusi penulisan kode manual.</p>
                    </div>

                    {/* Item 2 */}
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                      <span className="text-3xs font-mono font-bold text-emerald-400 block mb-1">BAGIAN 2</span>
                      <h4 className="text-xs font-bold text-zinc-100 mb-2">Cetak Biru Stitch & PRD.md</h4>
                      <p className="text-2xs text-zinc-400 leading-relaxed">Menjaga asisten AI agar ter-grounding dalam konteks spesifikasi. Melarang asisten AI beroperasi tanpa jangkar visual <strong>Stitch</strong> dan kriteria kontrol <strong>PRD.md</strong>.</p>
                    </div>

                    {/* Item 3 */}
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                      <span className="text-3xs font-mono font-bold text-amber-400 block mb-1">BAGIAN 3</span>
                      <h4 className="text-xs font-bold text-zinc-100 mb-2">Vercel Deployment & SEO</h4>
                      <p className="text-2xs text-zinc-400 leading-relaxed">Bagaimana melakukan deploy ke Vercel CDN Global, mengoptimasi latensi pemuatan landing page di bawah <strong>1.2 detik</strong>, dan menyiapkan berkas konfigurasi vercel.json secara taktis.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Countdown Sesi Workshop */}
                  <div className="md:col-span-5 p-6 rounded-2xl bg-zinc-950 border border-white/[0.06] text-center space-y-4">
                    <span className="text-3xs font-mono text-indigo-400 block uppercase tracking-widest font-bold">Waktu Berjalan Workshop</span>
                    <div className="flex justify-center gap-3">
                      <div>
                        <span className="text-3xl font-black text-white font-mono">05</span>
                        <span className="text-[10px] text-zinc-500 block">Jam</span>
                      </div>
                      <span className="text-3xl font-black text-zinc-500 font-mono">:</span>
                      <div>
                        <span className="text-3xl font-black text-white font-mono">00</span>
                        <span className="text-[10px] text-zinc-500 block">Menit</span>
                      </div>
                      <span className="text-3xl font-black text-zinc-500 font-mono">:</span>
                      <div>
                        <span className="text-3xl font-black text-white font-mono">00</span>
                        <span className="text-[10px] text-zinc-500 block">Detik</span>
                      </div>
                    </div>
                    <p className="text-3xs text-zinc-400 leading-relaxed">Durasi standar pelaksanaan intensif 5 Sesi pembelajaran dari Setup Lingkungan hingga Live Production URL.</p>
                  </div>

                  {/* Quick Code Boilerplate */}
                  <div className="md:col-span-7 p-6 rounded-2xl bg-zinc-950 border border-white/[0.06] flex flex-col justify-between">
                    <div>
                      <span className="text-3xs font-mono text-emerald-400 block uppercase tracking-widest font-bold">Boilerplate Vercel Config</span>
                      <pre className="text-4xs text-zinc-300 font-mono bg-white/[0.02] border border-white/[0.05] p-3.5 rounded-lg mt-2 overflow-x-auto">
{`{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}`}
                      </pre>
                    </div>
                    <span className="text-4xs text-zinc-500 mt-2 block">Salin berkas ini ke vercel.json di root project Anda saat pengerjaan.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB C: PRE-TEST */}
            {activeTab === 'pre-test' && (
              <div className="space-y-6 animate-fadeIn">
                <div className={`${styles.card} p-6 border border-white/[0.06]`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Lembar Pre-Test Peserta</h3>
                      <p className="text-2xs text-zinc-400">Diagnosis awal kompetensi teori web development berbasis asisten AI.</p>
                    </div>
                    {participant.preTestCompleted && (
                      <span className="py-1 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                        SELESAI (Nilai: {participant.preTestScore}/100)
                      </span>
                    )}
                  </div>

                  {/* Pre test submitted view */}
                  {participant.preTestCompleted || preTestSubmitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100">Terima kasih, Anda telah menyelesaikan Pre-Test!</h4>
                        <p className="text-2xs text-zinc-400 mt-1">Skor Anda telah terekam dalam protokol evaluasi panitia.</p>
                      </div>
                      <div className="inline-block p-4 rounded-xl bg-zinc-950 border border-white/[0.04]">
                        <span className="text-4xs text-zinc-500 uppercase tracking-wider block font-mono">Skor Evaluasi Awal</span>
                        <span className="text-3xl font-black text-white font-mono mt-1 block">
                          {participant.preTestScore ?? preTestScore} <span className="text-xs text-zinc-500">/ 100</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Interactive Quiz Form */
                    <div className="space-y-8">
                      {/* BAGIAN I: SOAL EVALUASI KOGNITIF */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/15 mb-4">
                          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                            Bagian I: Soal Evaluasi Kognitif (Pre-Test)
                          </h4>
                          <p className="text-3xs text-zinc-400 leading-relaxed">
                            Jawablah 20 pertanyaan pilihan ganda di bawah ini secara mandiri tanpa bantuan AI untuk mengukur kemampuan awal Anda.
                          </p>
                        </div>

                        {PRE_TEST_QUESTIONS.map((q, qidx) => (
                          <div key={q.id} className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-3">
                            <h4 className="text-xs font-bold text-zinc-200 flex gap-2">
                              <span className="font-mono text-indigo-400">Q{qidx + 1}.</span>
                              <span>{q.question}</span>
                            </h4>
                            <div className="space-y-2 pl-6">
                              {q.options.map((opt, oidx) => (
                                <label
                                  key={oidx}
                                  className={`flex items-center gap-3 p-3 rounded-lg border text-2xs cursor-pointer transition-all ${
                                    preTestAnswers[q.id] === oidx
                                      ? 'bg-indigo-600/10 border-indigo-500/45 text-white'
                                      : 'bg-white/[0.01] border-white/[0.04] text-zinc-400 hover:bg-white/[0.02] hover:border-white/10'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`pretest-q-${q.id}`}
                                    checked={preTestAnswers[q.id] === oidx}
                                    onChange={() => setPreTestAnswers({ ...preTestAnswers, [q.id]: oidx })}
                                    className="hidden"
                                  />
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    preTestAnswers[q.id] === oidx ? 'border-indigo-500' : 'border-zinc-600'
                                  }`}>
                                    {preTestAnswers[q.id] === oidx && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                                  </div>
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* BAGIAN II: KUESIONER EVALUASI SIKAP (LIKERT SCALE 5-POIN) */}
                      <div className="pt-6 border-t border-white/[0.04] space-y-4">
                        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/15 mb-4">
                          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                            Bagian II: Kuesioner Evaluasi Sikap & Efikasi Diri (Pre-Test)
                          </h4>
                          <p className="text-3xs text-zinc-400 leading-relaxed">
                            Pernyataan di bawah ini mengukur tingkat <strong>Keterampilan Abad-21 (4C Index)</strong> dan <strong>Efikasi Diri (Self-Efficacy Scale)</strong> Anda dalam memanfaatkan AI untuk pembuatan program. Pilih satu tanggapan yang paling menggambarkan diri Anda.
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-zinc-500 mt-2 border-t border-indigo-500/10 pt-2">
                            <span>1 = Sangat Tidak Setuju (STS)</span>
                            <span>2 = Tidak Setuju (TS)</span>
                            <span>3 = Netral / Ragu-Ragu (N)</span>
                            <span>4 = Setuju (S)</span>
                            <span>5 = Sangat Setuju (SS)</span>
                          </div>
                        </div>

                        {LIKERT_QUESTIONS.map((q, lidx) => (
                          <div key={q.id} className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h5 className="text-xs font-bold text-zinc-200 flex gap-2">
                                <span className="font-mono text-emerald-400">S{lidx + 1}.</span>
                                <span>{q.text}</span>
                              </h5>
                              <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-center">
                                {q.category}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-5 gap-2 pt-2">
                              {[1, 2, 3, 4, 5].map((val) => {
                                const labelMap: Record<number, string> = {
                                  1: "1 (STS)",
                                  2: "2 (TS)",
                                  3: "3 (N)",
                                  4: "4 (S)",
                                  5: "5 (SS)"
                                };
                                const isSelected = preTestSurveyAnswers[q.id] === val;
                                const handleSelect = () => {
                                  setPreTestSurveyAnswers({
                                    ...preTestSurveyAnswers,
                                    [q.id]: val
                                  });
                                };
                                return (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={handleSelect}
                                    className={`py-2.5 px-1 rounded-xl border text-center font-bold text-[11px] cursor-pointer transition-all ${
                                      isSelected
                                        ? 'bg-indigo-600 border-indigo-500 text-white font-black scale-[1.02] shadow-md shadow-indigo-600/20'
                                        : 'bg-white/[0.01] border-white/[0.04] text-zinc-400 hover:bg-white/[0.02]'
                                    }`}
                                  >
                                    {labelMap[val]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/[0.04]">
                        <button
                          onClick={handleGradePreTest}
                          disabled={
                            Object.keys(preTestAnswers).length < COGNITIVE_QUESTIONS.length ||
                            Object.keys(preTestSurveyAnswers).length < LIKERT_QUESTIONS.length
                          }
                          className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                            Object.keys(preTestAnswers).length === COGNITIVE_QUESTIONS.length &&
                            Object.keys(preTestSurveyAnswers).length === LIKERT_QUESTIONS.length
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/15'
                              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          }`}
                          id="btn-submit-pretest"
                        >
                          Kirim & Simpan Hasil Pre-Test ({Object.keys(preTestAnswers).length + Object.keys(preTestSurveyAnswers).length} / 30 Terisi)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB D: POST-TEST */}
            {activeTab === 'post-test' && (
              <div className="space-y-6 animate-fadeIn">
                <div className={`${styles.card} p-6 border border-white/[0.06]`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Lembar Post-Test Peserta</h3>
                      <p className="text-2xs text-zinc-400">Ujian kelulusan akhir untuk mengukur dampak retensi pemahaman materi pelatihan.</p>
                    </div>
                    {participant.postTestCompleted && (
                      <span className="py-1 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                        SELESAI (Nilai: {participant.postTestScore}/100)
                      </span>
                    )}
                  </div>

                  {/* Enforce pre-requisites for Post Test */}
                  {!participant.preTestCompleted ? (
                    <div className="p-8 rounded-2xl bg-zinc-950 border border-white/[0.05] text-center space-y-3">
                      <Lock className="w-8 h-8 text-zinc-500 mx-auto" />
                      <h4 className="text-xs font-bold text-zinc-300 uppercase">AKSES DIKUNCI</h4>
                      <p className="text-2xs text-zinc-500 max-w-sm mx-auto">Anda harus menyelesaikan <strong>Pre-Test</strong> terlebih dahulu sebelum diizinkan memulai ujian Post-Test ini.</p>
                    </div>
                  ) : totalPrdsGenerated === 0 ? (
                    <div className="p-8 rounded-2xl bg-zinc-950 border border-white/[0.05] text-center space-y-3">
                      <Lock className="w-8 h-8 text-zinc-500 mx-auto" />
                      <h4 className="text-xs font-bold text-zinc-300 uppercase">PROYEK BELUM TERDETEKSI</h4>
                      <p className="text-2xs text-zinc-500 max-w-sm mx-auto">Anda harus membuat minimal <strong>1 Draft PRD.md</strong> menggunakan Generator PRD (atau menu wizard) untuk membuktikan implementasi proyek sebelum memulai Post-Test.</p>
                    </div>
                  ) : participant.postTestCompleted || postTestSubmitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100">Selamat! Anda telah menyelesaikan Post-Test!</h4>
                        <p className="text-2xs text-zinc-400 mt-1">Kelayakan kelulusan sertifikasi Anda telah dinyatakan valid oleh panitia.</p>
                      </div>
                      <div className="inline-block p-4 rounded-xl bg-zinc-950 border border-white/[0.04]">
                        <span className="text-4xs text-zinc-500 uppercase tracking-wider block font-mono">Skor Evaluasi Akhir</span>
                        <span className="text-3xl font-black text-white font-mono mt-1 block">
                          {participant.postTestScore ?? postTestScore} <span className="text-xs text-zinc-500">/ 100</span>
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={() => setActiveTab('sertifikat')}
                          className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-2xs font-semibold cursor-pointer"
                        >
                          Menuju Halaman E-Sertifikat <ChevronRight className="w-3.5 h-3.5 inline ml-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Interactive Quiz Form */
                    <div className="space-y-8">
                      {/* BAGIAN I: SOAL EVALUASI KOGNITIF */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/15 mb-4">
                          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                            Bagian I: Soal Evaluasi Kognitif (Post-Test)
                          </h4>
                          <p className="text-3xs text-zinc-400 leading-relaxed">
                            Jawablah 20 pertanyaan kognitif di bawah ini berdasarkan pemahaman materi pelatihan Vibe Coding yang telah Anda pelajari.
                          </p>
                        </div>

                        {POST_TEST_QUESTIONS.map((q, qidx) => (
                          <div key={q.id} className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-3">
                            <h4 className="text-xs font-bold text-zinc-200 flex gap-2">
                              <span className="font-mono text-indigo-400">Q{qidx + 1}.</span>
                              <span>{q.question}</span>
                            </h4>
                            <div className="space-y-2 pl-6">
                              {q.options.map((opt, oidx) => (
                                <label
                                  key={oidx}
                                  className={`flex items-center gap-3 p-3 rounded-lg border text-2xs cursor-pointer transition-all ${
                                    postTestAnswers[q.id] === oidx
                                      ? 'bg-indigo-600/10 border-indigo-500/45 text-white'
                                      : 'bg-white/[0.01] border-white/[0.04] text-zinc-400 hover:bg-white/[0.02] hover:border-white/10'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`posttest-q-${q.id}`}
                                    checked={postTestAnswers[q.id] === oidx}
                                    onChange={() => setPostTestAnswers({ ...postTestAnswers, [q.id]: oidx })}
                                    className="hidden"
                                  />
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    postTestAnswers[q.id] === oidx ? 'border-indigo-500' : 'border-zinc-600'
                                  }`}>
                                    {postTestAnswers[q.id] === oidx && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                                  </div>
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* BAGIAN II: KUESIONER EVALUASI SIKAP (LIKERT SCALE 5-POIN) */}
                      <div className="pt-6 border-t border-white/[0.04] space-y-4">
                        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/15 mb-4">
                          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                            Bagian II: Kuesioner Evaluasi Sikap & Efikasi Diri (Post-Test)
                          </h4>
                          <p className="text-3xs text-zinc-400 leading-relaxed">
                            Pernyataan di bawah ini mengukur tingkat <strong>Keterampilan Abad-21 (4C Index)</strong> dan <strong>Efikasi Diri (Self-Efficacy Scale)</strong> Anda pasca mengikuti pelatihan. Pilih satu tanggapan yang paling menggambarkan diri Anda.
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-zinc-500 mt-2 border-t border-indigo-500/10 pt-2">
                            <span>1 = Sangat Tidak Setuju (STS)</span>
                            <span>2 = Tidak Setuju (TS)</span>
                            <span>3 = Netral / Ragu-Ragu (N)</span>
                            <span>4 = Setuju (S)</span>
                            <span>5 = Sangat Setuju (SS)</span>
                          </div>
                        </div>

                        {LIKERT_QUESTIONS.map((q, lidx) => (
                          <div key={q.id} className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h5 className="text-xs font-bold text-zinc-200 flex gap-2">
                                <span className="font-mono text-emerald-400">S{lidx + 1}.</span>
                                <span>{q.text}</span>
                              </h5>
                              <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full shrink-0 self-start sm:self-center">
                                {q.category}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-5 gap-2 pt-2">
                              {[1, 2, 3, 4, 5].map((val) => {
                                const labelMap: Record<number, string> = {
                                  1: "1 (STS)",
                                  2: "2 (TS)",
                                  3: "3 (N)",
                                  4: "4 (S)",
                                  5: "5 (SS)"
                                };
                                const isSelected = postTestSurveyAnswers[q.id] === val;
                                const handleSelect = () => {
                                  setPostTestSurveyAnswers({
                                    ...postTestSurveyAnswers,
                                    [q.id]: val
                                  });
                                };
                                return (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={handleSelect}
                                    className={`py-2.5 px-1 rounded-xl border text-center font-bold text-[11px] cursor-pointer transition-all ${
                                      isSelected
                                        ? 'bg-indigo-600 border-indigo-500 text-white font-black scale-[1.02] shadow-md shadow-indigo-600/20'
                                        : 'bg-white/[0.01] border-white/[0.04] text-zinc-400 hover:bg-white/[0.02]'
                                    }`}
                                  >
                                    {labelMap[val]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/[0.04]">
                        <button
                          onClick={handleGradePostTest}
                          disabled={
                            Object.keys(postTestAnswers).length < COGNITIVE_QUESTIONS.length ||
                            Object.keys(postTestSurveyAnswers).length < LIKERT_QUESTIONS.length
                          }
                          className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                            Object.keys(postTestAnswers).length === COGNITIVE_QUESTIONS.length &&
                            Object.keys(postTestSurveyAnswers).length === LIKERT_QUESTIONS.length
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/15'
                              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          }`}
                          id="btn-submit-posttest"
                        >
                          Kirim & Simpan Hasil Post-Test ({Object.keys(postTestAnswers).length + Object.keys(postTestSurveyAnswers).length} / 30 Terisi)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB E: E-SERTIFIKAT */}
            {activeTab === 'sertifikat' && (
              <div className="space-y-6 animate-fadeIn" id="certificate-tab-container">
                
                {/* Check pre-requisites */}
                {!participant.preTestCompleted || !participant.postTestCompleted ? (
                  <div className={`${styles.card} p-8 border border-white/[0.06] text-center space-y-4`}>
                    <Lock className="w-10 h-10 text-zinc-500 mx-auto" />
                    <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest">SERTIFIKAT BELUM DAPAT DITERBITKAN</h3>
                    <p className="text-2xs text-zinc-400 max-w-sm mx-auto">
                      Sertifikat Kelulusan resmi hanya akan dikunci terbuka (unlocked) apabila Anda telah menyelesaikan seluruh rangkaian: 
                      <strong> Pre-Test</strong> dan <strong>Post-Test</strong>.
                    </p>
                    <div className="flex justify-center gap-4 text-3xs font-mono">
                      <span className={participant.preTestCompleted ? 'text-emerald-400' : 'text-zinc-500'}>
                        [ {participant.preTestCompleted ? '✓' : '✗'} ] PRE-TEST
                      </span>
                      <span>•</span>
                      <span className={participant.postTestCompleted ? 'text-emerald-400' : 'text-zinc-500'}>
                        [ {participant.postTestCompleted ? '✓' : '✗'} ] POST-TEST
                      </span>
                    </div>
                  </div>
                ) : (
                  
                  /* Dynamic Premium Certificate Canvas */
                  <div className="space-y-6">
                    <div className="p-4 bg-zinc-950/40 border border-white/[0.04] rounded-xl text-xs text-zinc-400 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <span>🎉 Selamat! Sertifikat Anda telah berhasil diterbitkan oleh sistem penjamin kelayakan mutu.</span>
                      <button
                        onClick={handlePrintCertificate}
                        className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-2xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
                        id="btn-print-certificate"
                      >
                        <Printer className="w-3.5 h-3.5" /> Cetak / Unduh Sertifikat (Print Friendly)
                      </button>
                    </div>

                    {/* Printable Certificate Frame */}
                    <div 
                      className="p-8 md:p-12 bg-white text-black border-[12px] border-zinc-900 rounded-3xl relative overflow-hidden shadow-2xl print:border-none print:shadow-none print:p-0"
                      style={{ fontFamily: 'Georgia, serif' }}
                      id="printable-certificate-board"
                    >
                      {/* Decorative Classic Border Inside */}
                      <div className="border border-zinc-300 p-8 md:p-12 relative flex flex-col items-center justify-center text-center">
                        
                        {/* Decorative Background Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                          <Award className="w-80 h-80 text-black" />
                        </div>

                        {/* Certificate Header */}
                        <span className="text-3xs uppercase tracking-widest font-mono text-zinc-500 font-bold mb-3">
                          SERTIFIKAT KELULUSAN RESMI • ID: CERT-{participant.nim}-{Date.now().toString().substr(-5)}
                        </span>
                        
                        <h1 className="text-2xl md:text-4xl font-serif text-zinc-900 font-extrabold tracking-tight mb-4">
                          Sertifikat Penghargaan
                        </h1>

                        <div className="w-20 h-px bg-zinc-400 mb-6" />

                        <p className="text-xs italic text-zinc-500 max-w-md mb-2">
                          Dengan ini secara resmi menyatakan kelayakan kompetensi dan memberikan predikat kelulusan kepada:
                        </p>

                        <h2 className="text-xl md:text-3xl font-serif font-black text-indigo-950 underline decoration-indigo-400 tracking-tight my-4">
                          {participant.fullName}
                        </h2>

                        <p className="text-2xs font-mono font-bold text-zinc-600 mb-6">
                          NIM: {participant.nim} • Program Studi {participant.major}
                        </p>

                        <p className="text-xs italic text-zinc-500 max-w-lg leading-relaxed mb-8">
                          Telah berhasil menyelesaikan seluruh rentetan sesi kurikulum intensif, pengujian awal (Pre-Test), pengerjaan E-Portfolio, dan pengujian akhir (Post-Test) dalam sesi:
                        </p>

                        <h3 className="text-xs font-mono font-extrabold text-zinc-900 uppercase tracking-wider mb-2">
                          Workshop AI-Driven Web Development (Stitch, Gemini, & Vercel)
                        </h3>

                        <p className="text-3xs text-zinc-500 max-w-sm mb-12">
                          Diselenggarakan secara intensif selama 5 Jam dengan standar kurikulum Vibe Engineering & pembuktian deployment live.
                        </p>

                        {/* Signatures & Verification */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end justify-between text-center pt-6 border-t border-zinc-200 mt-6">
                          
                          {/* QR Code Validation */}
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 p-1 border border-zinc-200 bg-white rounded-lg flex items-center justify-center">
                              <QrCode className="w-14 h-14 text-black" />
                            </div>
                            <span className="text-[8px] font-mono text-zinc-400 mt-2">VERIFIKASI DIGITAL QR</span>
                          </div>

                          {/* Certificate Badge */}
                          <div className="flex flex-col items-center">
                            <Award className="w-12 h-12 text-yellow-600 shrink-0" />
                            <span className="text-3xs font-serif font-bold text-yellow-700 uppercase tracking-widest mt-1">SANGAT MEMUASKAN</span>
                            <span className="text-[8px] font-mono text-zinc-400">Predikat Kelulusan</span>
                          </div>

                          {/* Signature Instructor */}
                          <div className="flex flex-col items-center">
                            <span className="text-2xs font-serif italic text-zinc-800 font-bold block h-8 flex items-center justify-center" style={{ fontFamily: 'Georgia, serif' }}>
                              Ucok S.Kom., MT
                            </span>
                            <div className="w-28 h-px bg-zinc-300 my-1" />
                            <span className="text-[9px] font-bold text-zinc-900 block">Pemateri Ucok, S.Kom., MT</span>
                            <span className="text-[8px] text-zinc-500 font-mono">INSTRUKTUR UTAMA WORKSHOP</span>
                          </div>

                        </div>

                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950/40 border border-white/[0.04] text-3xs text-zinc-500 leading-relaxed text-center font-mono">
                      E-Sertifikat ini adalah berkas valid yang terverifikasi di bawah pengawasan sistem evaluasi terintegrasi.
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
