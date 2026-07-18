/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Settings, 
  Info,
  ChevronRight,
  Monitor,
  Github,
  Lock,
  Award,
  User,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LandingPage from './components/LandingPage';
import PrdEditor from './components/PrdEditor';
import WizardMode from './components/WizardMode';
import WorkshopPortal from './components/WorkshopPortal';
import { ArchitectureType, ThemeType, PrdDocument, Participant } from './types';
import { themeStyles } from './components/ThemeStyles';
import { STATIC_TEMPLATE, DYNAMIC_TEMPLATE } from './data/templates';

const LOCAL_STORAGE_KEY = 'prd_generator_saved_docs_v1';
const LOCAL_STORAGE_PARTICIPANT_KEY = 'workshop_participant_v1';

export default function App() {
  const [view, setView] = useState<'landing' | 'editor' | 'wizard' | 'portal'>('landing');
  const [theme, setTheme] = useState<ThemeType>('minimalist');
  const [architecture, setArchitecture] = useState<ArchitectureType>('static');
  const [selectedPrdId, setSelectedPrdId] = useState<string | null>(null);
  const [savedPrds, setSavedPrds] = useState<PrdDocument[]>([]);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [showLockModal, setShowLockModal] = useState(false);
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);

  // On first mount, load documents and participant from localStorage
  useEffect(() => {
    const rawParticipant = localStorage.getItem(LOCAL_STORAGE_PARTICIPANT_KEY);
    if (rawParticipant) {
      try {
        setParticipant(JSON.parse(rawParticipant));
      } catch (e) {
        console.error('Failed to parse participant data', e);
      }
    }

    const savedKey = localStorage.getItem('prd_generator_user_api_key') || '';
    setUserApiKey(savedKey);

    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawData) {
      try {
        setSavedPrds(JSON.parse(rawData));
      } catch (e) {
        console.error('Failed to parse saved PRD documents', e);
        initializeDefaultDocuments();
      }
    } else {
      initializeDefaultDocuments();
    }
  }, []);

  // Initialize two extremely rich default templates so user isn't greeted with an empty page
  const initializeDefaultDocuments = () => {
    const defaultDocs: PrdDocument[] = [
      {
        id: 'default-static-1',
        title: STATIC_TEMPLATE.title,
        description: STATIC_TEMPLATE.description,
        architecture: 'static',
        theme: 'minimalist',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 1).toISOString(), // 1 day ago
        targetAudience: STATIC_TEMPLATE.targetAudience,
        sitemap: STATIC_TEMPLATE.sitemap,
        contentRequirements: STATIC_TEMPLATE.contentRequirements,
        performanceSeo: STATIC_TEMPLATE.performanceSeo,
        timeline: STATIC_TEMPLATE.timeline,
        outOfScope: STATIC_TEMPLATE.outOfScope
      },
      {
        id: 'default-dynamic-1',
        title: DYNAMIC_TEMPLATE.title,
        description: DYNAMIC_TEMPLATE.description,
        architecture: 'dynamic',
        theme: 'corporate',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5).toISOString(), // 5 days ago
        updatedAt: new Date().toISOString(), // today
        targetAudience: DYNAMIC_TEMPLATE.targetAudience,
        sitemap: DYNAMIC_TEMPLATE.sitemap,
        contentRequirements: DYNAMIC_TEMPLATE.contentRequirements,
        performanceSeo: DYNAMIC_TEMPLATE.performanceSeo,
        userRoles: DYNAMIC_TEMPLATE.userRoles,
        databaseSchema: DYNAMIC_TEMPLATE.databaseSchema,
        apiIntegration: DYNAMIC_TEMPLATE.apiIntegration,
        stateManagement: DYNAMIC_TEMPLATE.stateManagement,
        timeline: DYNAMIC_TEMPLATE.timeline,
        outOfScope: DYNAMIC_TEMPLATE.outOfScope
      }
    ];
    setSavedPrds(defaultDocs);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultDocs));
  };

  // Sync state to localStorage whenever it changes
  const saveToLocalStorage = (docs: PrdDocument[]) => {
    setSavedPrds(docs);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(docs));
  };

  const handleRegister = (data: Participant) => {
    setParticipant(data);
    localStorage.setItem(LOCAL_STORAGE_PARTICIPANT_KEY, JSON.stringify(data));
    setView('portal');
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dan mereset profil beserta hasil ujian Anda?')) {
      setParticipant(null);
      localStorage.removeItem(LOCAL_STORAGE_PARTICIPANT_KEY);
      setView('portal');
    }
  };

  const handleUpdateProgress = (updated: Partial<Participant>) => {
    if (participant) {
      const merged = { ...participant, ...updated };
      setParticipant(merged);
      localStorage.setItem(LOCAL_STORAGE_PARTICIPANT_KEY, JSON.stringify(merged));
    }
  };

  const handleCreateNewPrd = () => {
    if (!participant) {
      setShowLockModal(true);
      return;
    }
    setSelectedPrdId(null);
    setView('editor');
  };

  const handleLoadPrd = (id: string) => {
    if (!participant) {
      setShowLockModal(true);
      return;
    }
    const found = savedPrds.find(p => p.id === id);
    if (found) {
      setSelectedPrdId(id);
      setArchitecture(found.architecture);
      setTheme(found.theme);
      setView('editor');
    }
  };

  const handleDeletePrd = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus draf PRD ini? Tindakan ini tidak dapat dibatalkan.')) {
      const filtered = savedPrds.filter(p => p.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  const handleSavePrdFromEditor = (editedDoc: Omit<PrdDocument, 'createdAt' | 'updatedAt'> & { id?: string }) => {
    const timestamp = new Date().toISOString();
    
    if (editedDoc.id && savedPrds.some(p => p.id === editedDoc.id)) {
      // Update existing document
      const updatedList = savedPrds.map(p => {
        if (p.id === editedDoc.id) {
          return {
            ...p,
            ...editedDoc,
            updatedAt: timestamp
          } as PrdDocument;
        }
        return p;
      });
      saveToLocalStorage(updatedList);
    } else {
      // Create brand new document
      const newPrd: PrdDocument = {
        ...editedDoc,
        id: `prd-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: timestamp,
        updatedAt: timestamp,
        theme: theme,
        architecture: architecture
      } as PrdDocument;
      saveToLocalStorage([newPrd, ...savedPrds]);
      setSelectedPrdId(newPrd.id); // select it so further edits update it
    }
  };

  const handleBackToLanding = () => {
    setView('landing');
  };

  const handleFinishWizard = (newPrd: PrdDocument) => {
    saveToLocalStorage([newPrd, ...savedPrds]);
    setSelectedPrdId(newPrd.id);
    setArchitecture(newPrd.architecture);
    setTheme(newPrd.theme);
    setView('editor');
  };

  const activeThemeStyle = themeStyles[theme];
  const selectedPrdObject = selectedPrdId ? savedPrds.find(p => p.id === selectedPrdId) || null : null;

  return (
    <div className={`${activeThemeStyle.wrapper} min-h-screen flex flex-col`}>
      {/* Universal Top Nav Header */}
      <header className={activeThemeStyle.navHeader} id="app-nav-header">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={handleBackToLanding}
            className="flex items-center gap-3 cursor-pointer group"
            id="nav-logo"
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              theme === 'cyberpunk' 
                ? 'bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/35 border border-emerald-500/30' 
                : theme === 'n8n'
                  ? 'bg-[#f25f4c] text-white group-hover:bg-[#fa6d5b] shadow-lg shadow-[#f25f4c]/15'
                  : 'bg-blue-600 text-white group-hover:bg-blue-700'
            }`}>
              <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform" />
            </div>
            <div>
              <span className={`font-black tracking-tighter text-xl uppercase italic leading-none block ${
                theme === 'cyberpunk' 
                  ? 'text-emerald-400 font-mono neon-glow-emerald' 
                  : theme === 'n8n'
                    ? 'text-[#f25f4c]'
                    : 'text-white'
              }`}>
                PRD Generator
              </span>
              <span className="text-3xs text-zinc-500 block leading-none font-mono tracking-widest mt-0.5">
                SYSTEM ARCHITECT v2.4.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {/* Active view breadcrumbs */}
            <div className="hidden md:flex items-center gap-1.5 text-zinc-500 font-mono text-2xs uppercase tracking-widest mr-2">
              <span 
                onClick={handleBackToLanding}
                className={`cursor-pointer transition-all hover:text-white ${view === 'landing' ? theme === 'cyberpunk' ? 'text-emerald-400 font-bold' : theme === 'n8n' ? 'text-[#f25f4c] font-bold' : 'text-indigo-400 font-bold' : ''}`}
              >
                LANDING
              </span>
              <ChevronRight className="w-3 h-3 text-zinc-700" />
              <span 
                onClick={() => setView('portal')}
                className={`cursor-pointer transition-all hover:text-white ${view === 'portal' ? theme === 'cyberpunk' ? 'text-emerald-400 font-bold' : theme === 'n8n' ? 'text-[#f25f4c] font-bold' : 'text-indigo-400 font-bold' : ''}`}
              >
                PORTAL HUB
              </span>
              <ChevronRight className="w-3 h-3 text-zinc-700" />
              <span className={`transition-all ${view === 'editor' ? theme === 'cyberpunk' ? 'text-emerald-400 font-bold' : theme === 'n8n' ? 'text-[#f25f4c] font-bold' : 'text-indigo-400 font-bold' : ''}`}>
                EDITOR
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Portal tab shortcut button */}
              <button
                onClick={() => setView(view === 'portal' ? 'landing' : 'portal')}
                className={`py-1.5 px-3 rounded-lg font-bold text-2xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                  view === 'portal'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:bg-white/[0.08]'
                }`}
                id="nav-portal-shortcut-btn"
              >
                <Award className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span>{participant ? 'Hub Portal' : 'Daftar / Portal'}</span>
              </button>

              {/* API Key Settings Button */}
              <button
                onClick={() => {
                  setTempApiKey(userApiKey);
                  setShowSettingsModal(true);
                }}
                className={`py-1.5 px-3 rounded-lg font-bold text-2xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                  userApiKey
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:bg-white/[0.08]'
                }`}
                id="nav-settings-btn"
                title="Atur API Key Gemini Anda sendiri"
              >
                <Settings className={`w-3.5 h-3.5 transition-transform duration-500 hover:rotate-90 ${userApiKey ? 'text-emerald-400' : 'text-zinc-400'}`} />
                <span>{userApiKey ? '🔑 API Kustom' : 'Atur API Key'}</span>
              </button>

              <div className="h-4 w-px bg-zinc-800 hidden sm:block"></div>

              <div className="flex items-center gap-4 text-2xs md:text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
                  <span className="text-zinc-200 tracking-wider">ENGINE READY</span>
                </div>
                <div className="h-4 w-px bg-zinc-800"></div>
                <div className="text-zinc-400 hidden sm:inline tracking-wider">VITE / REACT</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content View with Slide transitions */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <LandingPage
                currentTheme={theme}
                setTheme={setTheme}
                selectedArchitecture={architecture}
                setArchitecture={setArchitecture}
                onCreateNew={handleCreateNewPrd}
                onEnterWizard={() => {
                  if (!participant) {
                    setShowLockModal(true);
                  } else {
                    setView('wizard');
                  }
                }}
                savedPrds={savedPrds}
                onLoadPrd={handleLoadPrd}
                onDeletePrd={handleDeletePrd}
              />
            </motion.div>
          ) : view === 'wizard' ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full overflow-y-auto"
            >
              <WizardMode
                currentTheme={theme}
                setTheme={setTheme}
                userApiKey={userApiKey}
                onBackToLanding={handleBackToLanding}
                onFinishWizard={handleFinishWizard}
              />
            </motion.div>
          ) : view === 'editor' ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <PrdEditor
                currentTheme={theme}
                setTheme={setTheme}
                selectedPrd={selectedPrdObject}
                onSave={handleSavePrdFromEditor}
                onBack={handleBackToLanding}
              />
            </motion.div>
          ) : (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full overflow-y-auto"
            >
              <WorkshopPortal
                currentTheme={theme}
                participant={participant}
                onRegister={handleRegister}
                onLogout={handleLogout}
                onUpdateProgress={handleUpdateProgress}
                totalPrdsGenerated={savedPrds.filter(p => !p.id.startsWith('default')).length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer (Only on Landing Page to keep editor viewport maximum) */}
      {view === 'landing' && (
        <footer className={`py-8 px-4 mt-auto border-t text-center text-xs ${
          theme === 'cyberpunk' 
            ? 'bg-black border-emerald-500/15 text-emerald-600 font-mono' 
            : 'bg-white border-zinc-200/60 text-zinc-400'
        }`} id="app-footer">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="font-bold text-zinc-700 dark:text-zinc-300">PRD Generator — Portofolio Pendukung Kualitas Tinggi</p>
              <p className="text-3xs mt-1 text-zinc-400">Dirancang khusus untuk demonstrasi senior engineer dengan struktur modular, optimasi performa tinggi, & responsive layout.</p>
            </div>
            <div className="flex gap-4 text-3xs font-mono">
              <span className="hover:underline cursor-pointer">React 19</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Tailwind v4</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Motion API</span>
            </div>
          </div>
        </footer>
      )}

      {/* Dynamic Lock Interception Modal */}
      <AnimatePresence>
        {showLockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="lock-modal-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl border text-center space-y-4 ${
                theme === 'cyberpunk'
                  ? 'bg-black border-emerald-500/50 text-emerald-400'
                  : theme === 'n8n'
                    ? 'bg-[#101216] border-[#f25f4c]/30 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-white'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl animate-pulse">
                  <Lock className="w-8 h-8" />
                </div>
                
                <h3 className="text-base font-bold tracking-tight text-white">Registrasi Peserta Diperlukan</h3>
                
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sesuai dengan <strong>SOP Tata Kelola Workshop</strong>, Anda diwajibkan untuk mendaftar terlebih dahulu menggunakan Gmail sebelum diizinkan mengakses fitur <strong>PRD, Pre-Test, Post-Test, Materi Pelatihan,</strong> dan <strong>Unduh E-Sertifikat</strong>.
                </p>

                <div className="w-full pt-4 border-t border-white/[0.05] flex gap-3">
                  <button
                    onClick={() => setShowLockModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-300 font-semibold text-xs cursor-pointer transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      setShowLockModal(false);
                      setView('portal');
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer transition-all shadow-[0_0_16px_rgba(99,102,241,0.2)]"
                    id="btn-modal-go-register"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings / API Key Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="settings-modal-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl border space-y-4 ${
                theme === 'cyberpunk'
                  ? 'bg-black border-emerald-500/50 text-emerald-400'
                  : theme === 'n8n'
                    ? 'bg-[#101216] border-[#f25f4c]/30 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/[0.05] pb-3">
                  <Settings className={`w-5 h-5 ${theme === 'cyberpunk' ? 'text-emerald-400' : theme === 'n8n' ? 'text-[#f25f4c]' : 'text-indigo-400'}`} />
                  <h3 className="text-sm font-bold tracking-tight text-white font-mono uppercase">Pengaturan API Key Gemini</h3>
                </div>

                <p className="text-3xs sm:text-2xs text-zinc-400 leading-relaxed text-left">
                  Secara standar, sistem menggunakan <strong>Default System API Key</strong>. Jika Anda menghadapi limit kuota demo, Anda dapat memasukkan API Key Gemini Anda sendiri dari Google AI Studio untuk akses kustom tak terbatas.
                </p>

                <div className="space-y-2 pt-2 text-left">
                  <label className="block text-3xs font-mono uppercase tracking-wider text-zinc-400">
                    Masukkan API Key Gemini Anda:
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className={`w-full py-2 pl-3 pr-10 rounded-xl text-xs font-mono outline-none bg-black/40 border ${
                        theme === 'cyberpunk'
                          ? 'border-emerald-500/30 text-emerald-400 focus:border-emerald-500'
                          : theme === 'n8n'
                            ? 'border-white/10 text-white focus:border-[#f25f4c]'
                            : 'border-white/10 text-white focus:border-indigo-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-2xl space-y-1 text-left">
                  <span className="text-3xs font-bold text-indigo-400 font-mono uppercase block">Info Penting:</span>
                  <p className="text-3xs text-zinc-400 leading-relaxed">
                    API Key Anda akan disimpan secara aman di <strong>local storage browser Anda</strong>, dan hanya dikirimkan ke server proxy aplikasi ini untuk memproses permintaan AI. API Key Anda tidak disimpan di server eksternal kami.
                  </p>
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-3xs font-bold text-indigo-400 hover:underline mt-1"
                  >
                    Dapatkan API Key gratis di Google AI Studio &rarr;
                  </a>
                </div>

                <div className="w-full pt-4 border-t border-white/[0.05] flex gap-2">
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] text-zinc-400 hover:text-white font-semibold text-2xs cursor-pointer transition-colors"
                  >
                    Batal
                  </button>
                  {userApiKey && (
                    <button
                      onClick={() => {
                        setTempApiKey('');
                        setUserApiKey('');
                        localStorage.removeItem('prd_generator_user_api_key');
                        setShowSettingsModal(false);
                      }}
                      className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold text-2xs cursor-pointer transition-colors"
                    >
                      Hapus Key
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const trimmed = tempApiKey.trim();
                      setUserApiKey(trimmed);
                      if (trimmed) {
                        localStorage.setItem('prd_generator_user_api_key', trimmed);
                      } else {
                        localStorage.removeItem('prd_generator_user_api_key');
                      }
                      setShowSettingsModal(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-2xs cursor-pointer transition-all ${
                      theme === 'cyberpunk'
                        ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : theme === 'n8n'
                          ? 'bg-[#f25f4c] text-white shadow-[0_0_12px_rgba(242,95,76,0.3)]'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                    }`}
                  >
                    Simpan Key
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
