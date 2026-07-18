/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Palette, 
  Check, 
  Loader2, 
  FileText, 
  Compass, 
  Info,
  CheckCircle2,
  HelpCircle,
  Zap,
  Globe,
  Cpu,
  Calendar,
  Clock,
  Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeType, ArchitectureType, PrdDocument } from '../types';
import { themeStyles } from './ThemeStyles';

interface WizardModeProps {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  userApiKey?: string;
  onBackToLanding: () => void;
  onFinishWizard: (newPrd: PrdDocument) => void;
}

interface SuggestedFeature {
  id: string;
  name: string;
  description: string;
  isSelected?: boolean;
}

interface DesignTrend {
  id: string;
  name: string;
  description: string;
  reference: string;
  isSelected?: boolean;
}

const DESIGN_TRENDS_PRESETS: DesignTrend[] = [
  {
    id: 'trend_hyper_personalized',
    name: 'Hyper-Personalized',
    description: 'Dasbor yang berubah layoutnya secara otomatis saat pengguna login pagi vs malam.',
    reference: 'Spotify (kustomisasi beranda), Netflix (personalisasi thumbnail).'
  },
  {
    id: 'trend_liquid_glass',
    name: 'Liquid Glass',
    description: 'Efek frosted glass yang berpadu dengan blur dalam, gradien halus, dan kedalaman 3D.',
    reference: 'Apple (macOS/iOS), Dribbble (Liquid UI shots).'
  },
  {
    id: 'trend_multimodal',
    name: 'Multimodal',
    description: 'Antarmuka yang memiliki ikon mikrofon besar dan visual feedback saat suara terdeteksi.',
    reference: 'ChatGPT Voice/Vision, Perplexity AI.'
  },
  {
    id: 'trend_agentic_ux',
    name: 'Agentic UX',
    description: 'Area khusus ("Action Hub") di mana AI menampilkan status tugas yang sedang dikerjakannya untuk user.',
    reference: 'Claude (Projects), Microsoft Copilot Studio.'
  },
  {
    id: 'trend_micro_interactions',
    name: 'Micro-interactions',
    description: 'Animasi physics-based saat menekan tombol atau transisi antar halaman yang sangat halus.',
    reference: 'LottieFiles, Framer Motion examples.'
  },
  {
    id: 'trend_graphical_first',
    name: 'Graphical-first',
    description: 'Penggunaan ikon besar, kartu (cards), dan navigasi berbasis gestur geser (swipe).',
    reference: 'Pinterest, Raycast (desktop UI).'
  },
  {
    id: 'trend_adaptive_ui',
    name: 'Adaptive UI',
    description: 'Desain fluid grid yang tidak patah saat perangkat dibuka dari mode ponsel ke mode tablet/lipat.',
    reference: 'Material Design 3 (Google), Samsung One UI.'
  },
  {
    id: 'trend_generative_ui',
    name: 'Generative UI',
    description: 'Komponen UI yang muncul sesuai perintah teks (misal: "Buatkan tabel keuangan saya").',
    reference: 'Vercel AI SDK (Generative UI demos).'
  },
  {
    id: 'trend_zero_ui',
    name: 'Zero UI',
    description: 'Penggunaan haptic feedback dan perintah suara tanpa layar penuh (HUD).',
    reference: 'Rabbit R1, Humane Ai Pin (sebagai contoh arah desain).'
  },
  {
    id: 'trend_digital_fairness',
    name: 'Digital Fairness',
    description: 'Fokus pada kontras tinggi, navigasi keyboard yang jelas, dan tanpa jebakan dark pattern.',
    reference: 'W3C WAI Guidelines, Gov.uk (contoh aksesibilitas terbaik).'
  }
];

export default function WizardMode({
  currentTheme,
  setTheme,
  userApiKey,
  onBackToLanding,
  onFinishWizard
}: WizardModeProps) {
  const styles = themeStyles[currentTheme];
  
  // Wizard flow steps: 1 = Input Title/Idea, 2 = AI Refined & Suggest Features, 3 = Confirm / Customize Settings
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState<string>('');
  const [roughIdea, setRoughIdea] = useState<string>('');
  
  // AI Generated Results (Step 2)
  const [improvedDescription, setImprovedDescription] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [recommendedArchitecture, setRecommendedArchitecture] = useState<ArchitectureType>('dynamic');
  const [recommendedTheme, setRecommendedTheme] = useState<ThemeType>('minimalist');
  const [suggestedFeatures, setSuggestedFeatures] = useState<SuggestedFeature[]>([]);
  const [selectedTrends, setSelectedTrends] = useState<DesignTrend[]>(
    DESIGN_TRENDS_PRESETS.map(t => ({ ...t, isSelected: false }))
  );
  const [timelineTarget, setTimelineTarget] = useState<string>('1-2 hari');
  const [deployTarget, setDeployTarget] = useState<string>('vercel');

  // Function to request AI prompt improvement (Step 1 -> Step 2)
  const handleImprovePrompt = async () => {
    if (!title.trim()) {
      setErrorMsg('Judul aplikasi wajib diisi.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    setLoadingStatus('Kecerdasan Buatan (AI) sedang merancang sasis & menganalisis ide Anda...');

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (userApiKey) {
        headers['x-gemini-api-key'] = userApiKey;
      }

      const response = await fetch('/api/gemini/improve-prompt', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ title, roughIdea })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI Server untuk optimasi prompt.');
      }

      const data = await response.json();
      
      setImprovedDescription(data.improvedDescription || '');
      setTargetAudience(data.targetAudience || '');
      setRecommendedArchitecture(data.recommendedArchitecture || 'dynamic');
      setRecommendedTheme(data.recommendedTheme || 'minimalist');
      
      // Auto-select all suggestions by default
      const features = (data.suggestedFeatures || []).map((f: any) => ({
        ...f,
        isSelected: true
      }));
      setSuggestedFeatures(features);
      
      // Pre-apply recommended theme to current system
      if (data.recommendedTheme) {
        setTheme(data.recommendedTheme);
      }

      setStep(2);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal merancang proposal aplikasi.');
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle feature selection
  const handleToggleFeature = (id: string) => {
    setSuggestedFeatures(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, isSelected: !f.isSelected };
      }
      return f;
    }));
  };

  // Function to toggle trend selection
  const handleToggleTrend = (id: string) => {
    setSelectedTrends(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, isSelected: !t.isSelected };
      }
      return t;
    }));
  };

  // Function to finalize wizard & trigger full PRD compilation
  const handleGenerateFullPrd = async () => {
    setLoading(true);
    setLoadingStatus('Gemini sedang menyusun draf Dokumen Kebutuhan Produk (PRD) berstandar Silicon Valley...');
    setErrorMsg(null);

    const selectedFeatures = suggestedFeatures.filter(f => f.isSelected);
    const activeTrends = selectedTrends.filter(t => t.isSelected);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (userApiKey) {
        headers['x-gemini-api-key'] = userApiKey;
      }

      const response = await fetch('/api/gemini/generate-prd', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          title,
          description: improvedDescription,
          targetAudience,
          architecture: recommendedArchitecture,
          theme: currentTheme,
          selectedFeatures,
          selectedTrends: activeTrends,
          timelineTarget,
          deployTarget
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI Server untuk menyusun dokumen PRD.');
      }

      const prdData = await response.json();

      const newPrd: PrdDocument = {
        id: `prd-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        description: improvedDescription,
        architecture: recommendedArchitecture,
        theme: currentTheme,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        targetAudience: targetAudience,
        sitemap: prdData.sitemap,
        contentRequirements: prdData.contentRequirements,
        performanceSeo: prdData.performanceSeo,
        userRoles: prdData.userRoles,
        databaseSchema: prdData.databaseSchema,
        apiIntegration: prdData.apiIntegration,
        stateManagement: prdData.stateManagement,
        timeline: prdData.timeline,
        outOfScope: prdData.outOfScope
      };

      onFinishWizard(newPrd);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal memproses dokumen PRD.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Wizard Header Progress */}
      <div className="mb-10 text-center relative">
        <button
          onClick={onBackToLanding}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-mono uppercase tracking-widest cursor-pointer"
          id="btn-wizard-back-landing"
        >
          <ArrowLeft className="w-4 h-4" />
          Keluar Wizard
        </button>

        <div className="inline-flex items-center gap-2 mb-3">
          <span className={`${styles.badge} py-1 px-3`}>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            Mode Asisten Pemula (Wizard)
          </span>
        </div>
        <h1 className={`${styles.title} text-2xl md:text-3xl font-black tracking-tight`}>
          Asisten <span className="text-indigo-400">Penyusun PRD Cepat</span>
        </h1>
        
        {/* Step Indicator Bullets */}
        <div className="flex justify-center items-center gap-2 mt-6 font-mono text-3xs tracking-widest text-zinc-500">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-indigo-400' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-2xs ${
              step >= 1 ? 'bg-indigo-600 text-white' : 'bg-white/[0.05] text-zinc-400'
            }`}>1</span>
            JUDUL & IDE KASAR
          </div>
          <div className="h-px w-8 bg-white/[0.08]"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-indigo-400' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-2xs ${
              step >= 2 ? 'bg-indigo-600 text-white' : 'bg-white/[0.05] text-zinc-400'
            }`}>2</span>
            OPTIMASI AI & FITUR
          </div>
        </div>
      </div>

      {/* Error Message banner */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex gap-2"
            id="wizard-error-banner"
          >
            <Info className="w-5 h-5 shrink-0" />
            <div>
              <span className="font-bold">Error:</span> {errorMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main loading state */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`${styles.card} p-12 text-center flex flex-col items-center justify-center min-h-[300px]`}
            id="wizard-loading-card"
          >
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-6" />
            <p className="text-sm font-semibold text-white max-w-md">{loadingStatus}</p>
            <p className="text-3xs text-zinc-500 font-mono tracking-widest uppercase mt-4">Proses ini memakan waktu 5-15 detik</p>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* STEP 1: TITLE & ROUGH IDEA */}
            {step === 1 && (
              <div className="space-y-6">
                <div className={`${styles.card} p-6 md:p-8 space-y-6`}>
                  <div>
                    <label className={styles.label} htmlFor="wizard-app-title">
                      Nama atau Judul Aplikasi <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="wizard-app-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Contoh: Aplikasi Kasir Cafe Pintar atau Web Portal Kesehatan Keluarga"
                      className={styles.input}
                    />
                    <p className="text-3xs text-zinc-500 font-mono mt-1.5 uppercase tracking-wider">Berikan nama yang menggambarkan fungsi utama aplikasi Anda.</p>
                  </div>

                  <div>
                    <label className={styles.label} htmlFor="wizard-app-idea">
                      Tuliskan Ide Kasar atau Deskripsi Singkat (Opsional)
                    </label>
                    <textarea 
                      id="wizard-app-idea"
                      value={roughIdea}
                      onChange={(e) => setRoughIdea(e.target.value)}
                      placeholder="Contoh: Saya ingin aplikasi kasir cafe yang bisa mencatat penjualan harian, cetak struk lewat bluetooth, ada manajemen stok kopi dan makanan, serta laporan laba rugi bulanan."
                      className={styles.textarea}
                    />
                    <p className="text-3xs text-zinc-500 font-mono mt-1.5 uppercase tracking-wider">Tuliskan dalam bahasa sehari-hari. AI akan menyempurnakannya secara ajaib.</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleImprovePrompt}
                    className={`${styles.buttonPrimary} group`}
                    id="btn-wizard-step1-next"
                  >
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Perbaiki Ide dengan AI & Cari Fitur
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: REFINED PROMPT & QUICK FEATURES OPTIONS */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Visual Recommendation Badge */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-3xs font-mono uppercase tracking-widest text-zinc-500 block">Saran Sasis</span>
                      <span className="text-xs font-bold text-white capitalize">{recommendedArchitecture} Web App</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-3xs font-mono uppercase tracking-widest text-zinc-500 block">Saran UI Tema</span>
                      <span className="text-xs font-bold text-white capitalize">{recommendedTheme} Style</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-3xs font-mono uppercase tracking-widest text-zinc-500 block">Kualitas Ide</span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Standard PM Pro</span>
                    </div>
                  </div>
                </div>

                {/* AI Refined Product Description */}
                <div className={`${styles.card} p-6 md:p-8 space-y-4`}>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                      Ide yang Disempurnakan AI
                    </h3>
                    <span className="text-3xs font-mono bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Optimasi Sukses</span>
                  </div>
                  <p className="text-xs text-zinc-350 leading-relaxed font-sans">{improvedDescription}</p>
                  
                  <div className="pt-4 border-t border-white/[0.04]">
                    <span className="text-3xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">Target Pengguna Utama:</span>
                    <p className="text-xs text-white">{targetAudience}</p>
                  </div>
                </div>

                {/* Suggested Fitur Singkat (Beginners select which features they want) */}
                <div className={`${styles.card} p-6 md:p-8 space-y-4`}>
                  <div className="border-b border-white/[0.08] pb-3">
                    <h3 className="font-bold text-sm text-white">
                      Pilihan Fitur Singkat (Pilih Fitur yang Anda Inginkan)
                    </h3>
                    <p className="text-2xs text-zinc-400 mt-1">AI merekomendasikan fitur-fitur berkelas berikut. Centang fitur yang sesuai dengan impian Anda.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {suggestedFeatures.map((feat) => (
                      <div 
                        key={feat.id}
                        onClick={() => handleToggleFeature(feat.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-3 ${
                          feat.isSelected 
                            ? 'border-indigo-500 bg-indigo-500/5 text-white shadow-[0_0_12px_rgba(99,102,241,0.08)]' 
                            : 'border-white/[0.08] bg-white/[0.01] text-zinc-400 hover:bg-white/[0.03] hover:border-white/10'
                        }`}
                      >
                        <div className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center mt-0.5 transition-all ${
                          feat.isSelected 
                            ? 'bg-indigo-600 border-indigo-500 text-white' 
                            : 'border-zinc-700 bg-black/40'
                        }`}>
                          {feat.isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xs font-bold transition-colors ${feat.isSelected ? 'text-white' : 'text-zinc-300'}`}>
                            {feat.name}
                          </h4>
                          <p className="text-2xs text-zinc-400 leading-normal">{feat.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pilihan Tren Desain UI & UX Modern */}
                <div className={`${styles.card} p-6 md:p-8 space-y-4`}>
                  <div className="border-b border-white/[0.08] pb-3">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <Palette className="w-5 h-5 text-indigo-400" />
                      Pilihan Tren Desain UI & UX Modern (Opsional)
                    </h3>
                    <p className="text-2xs text-zinc-400 mt-1">
                      Integrasikan tren desain interaktif terkini ke dalam spesifikasi PRD Anda. Centang tren yang ingin diadopsi.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {selectedTrends.map((trend) => (
                      <div 
                        key={trend.id}
                        onClick={() => handleToggleTrend(trend.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          trend.isSelected 
                            ? 'border-emerald-500 bg-emerald-500/5 text-white shadow-[0_0_12px_rgba(16,185,129,0.08)]' 
                            : 'border-white/[0.08] bg-white/[0.01] text-zinc-400 hover:bg-white/[0.03] hover:border-white/10'
                        }`}
                        id={`btn-trend-${trend.id}`}
                      >
                        <div className="flex gap-3 items-start">
                          <div className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center mt-0.5 transition-all ${
                            trend.isSelected 
                              ? 'bg-emerald-600 border-emerald-500 text-white' 
                              : 'border-zinc-700 bg-black/40'
                          }`}>
                            {trend.isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="space-y-1">
                            <h4 className={`text-xs font-bold transition-colors ${trend.isSelected ? 'text-white' : 'text-zinc-300'}`}>
                              {trend.name}
                            </h4>
                            <p className="text-2xs text-zinc-400 leading-normal">{trend.description}</p>
                          </div>
                        </div>
                        {trend.reference && (
                          <div className="mt-3 pt-2 border-t border-white/[0.04] text-[10px] text-zinc-500 italic flex items-center gap-1">
                            <span className="font-semibold text-zinc-400 not-italic">Ref:</span> {trend.reference}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sasis & Theme Override Panel (Quick config for beginners) */}
                <div className={`${styles.card} p-6 md:p-8 space-y-4`}>
                  <div className="border-b border-white/[0.08] pb-3">
                    <h3 className="font-bold text-sm text-white">
                      Konfigurasi Lanjutan (Opsional)
                    </h3>
                    <p className="text-2xs text-zinc-400 mt-1">Anda dapat menyesuaikan arsitektur teknis dan tampilan visual aplikasi secara mudah.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Architecture quick toggle */}
                    <div className="space-y-2">
                      <label className="block text-2xs font-bold text-zinc-400 uppercase tracking-wider">Arsitektur Sasis</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setRecommendedArchitecture('static')}
                          className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            recommendedArchitecture === 'static'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04]'
                          }`}
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Statis (Static Web)
                        </button>
                        <button
                          onClick={() => setRecommendedArchitecture('dynamic')}
                          className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            recommendedArchitecture === 'dynamic'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04]'
                          }`}
                        >
                          <Cpu className="w-3.5 h-3.5" />
                          Dinamis (Dynamic Web)
                        </button>
                      </div>
                    </div>

                    {/* Theme selection quick toggle */}
                    <div className="space-y-2">
                      <label className="block text-2xs font-bold text-zinc-400 uppercase tracking-wider">Gaya UI Visual</label>
                      <div className="flex gap-2">
                        {(['minimalist', 'corporate', 'cyberpunk', 'n8n'] as ThemeType[]).map((thm) => (
                          <button
                            key={thm}
                            onClick={() => {
                              setRecommendedTheme(thm);
                              setTheme(thm);
                            }}
                            className={`flex-1 py-2.5 px-2 rounded-lg border text-3xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                              currentTheme === thm
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                                : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04]'
                            }`}
                          >
                            {thm}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Garis Waktu (Timeline) */}
                    <div className="space-y-2 col-span-1 md:col-span-2 pt-4 border-t border-white/[0.04]">
                      <div className="flex justify-between items-center">
                        <label className="block text-2xs font-bold text-zinc-400 uppercase tracking-wider">Target Garis Waktu (Timeline Proyek)</label>
                        <span className="text-[10px] text-zinc-500 font-mono">Disusun otomatis oleh AI</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setTimelineTarget('1-2 hari')}
                          className={`py-3 px-4 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 cursor-pointer text-left transition-all ${
                            timelineTarget === '1-2 hari'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Zap className={`w-4 h-4 ${timelineTarget === '1-2 hari' ? 'text-yellow-300' : 'text-yellow-500'}`} />
                            <span className="font-bold">1-2 Hari</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-normal">Sangat Cepat / MVP Minimum</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTimelineTarget('1-2 minggu')}
                          className={`py-3 px-4 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 cursor-pointer text-left transition-all ${
                            timelineTarget === '1-2 minggu'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className={`w-4 h-4 ${timelineTarget === '1-2 minggu' ? 'text-indigo-250' : 'text-indigo-400'}`} />
                            <span className="font-bold">1-2 Minggu</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-normal">Standar Pengembangan Cepat</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTimelineTarget('1-2 bulan')}
                          className={`py-3 px-4 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 cursor-pointer text-left transition-all ${
                            timelineTarget === '1-2 bulan'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className={`w-4 h-4 ${timelineTarget === '1-2 bulan' ? 'text-pink-300' : 'text-pink-400'}`} />
                            <span className="font-bold">1-2 Bulan</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-normal">Kompleks / Skala Penuh</span>
                        </button>
                      </div>
                    </div>

                    {/* Target Deployment / Hosting */}
                    <div className="space-y-2 col-span-1 md:col-span-2 pt-4 border-t border-white/[0.04]">
                      <div className="flex justify-between items-center">
                        <label className="block text-2xs font-bold text-zinc-400 uppercase tracking-wider">Target Hosting / Platform Deployment</label>
                        <span className="text-[10px] text-zinc-500 font-mono">Disusun untuk optimasi infrastruktur</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setDeployTarget('vercel')}
                          className={`py-3 px-4 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 cursor-pointer text-left transition-all ${
                            deployTarget === 'vercel'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:border-white/10'
                          }`}
                          id="btn-deploy-vercel"
                        >
                          <div className="flex items-center gap-2">
                            <Cloud className={`w-4 h-4 ${deployTarget === 'vercel' ? 'text-cyan-300' : 'text-cyan-400'}`} />
                            <span className="font-bold">Vercel</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-normal">Sangat Cocok untuk SPA & Serverless (Default)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeployTarget('netlify')}
                          className={`py-3 px-4 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 cursor-pointer text-left transition-all ${
                            deployTarget === 'netlify'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:border-white/10'
                          }`}
                          id="btn-deploy-netlify"
                        >
                          <div className="flex items-center gap-2">
                            <Cloud className={`w-4 h-4 ${deployTarget === 'netlify' ? 'text-teal-300' : 'text-teal-400'}`} />
                            <span className="font-bold">Netlify</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-normal">Optimasi CDN Global untuk Static Frontend</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeployTarget('cloud_run')}
                          className={`py-3 px-4 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 cursor-pointer text-left transition-all ${
                            deployTarget === 'cloud_run'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                              : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:bg-white/[0.04] hover:border-white/10'
                          }`}
                          id="btn-deploy-cloudrun"
                        >
                          <div className="flex items-center gap-2">
                            <Cloud className={`w-4 h-4 ${deployTarget === 'cloud_run' ? 'text-orange-300' : 'text-orange-400'}`} />
                            <span className="font-bold">Cloud Run / VPS</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-normal">Sasis Containerized untuk Full-Stack Handal</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className={styles.buttonSecondary}
                    id="btn-wizard-step2-back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                  </button>

                  <button
                    onClick={handleGenerateFullPrd}
                    className={`${styles.buttonPrimary} group`}
                    id="btn-wizard-step2-next"
                  >
                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Hasilkan PRD Lengkap (AI)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
