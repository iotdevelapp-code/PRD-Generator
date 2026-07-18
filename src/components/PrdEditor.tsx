/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Copy, 
  Globe, 
  Cpu, 
  Palette, 
  Check, 
  Sparkles, 
  BookOpen, 
  Eye, 
  Edit, 
  AlertCircle,
  Clock,
  Code,
  Layout,
  Layers,
  Database,
  Users,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { PrdDocument, ArchitectureType, ThemeType } from '../types';
import { themeStyles } from './ThemeStyles';
import { STATIC_TEMPLATE, DYNAMIC_TEMPLATE, PRESETS } from '../data/templates';

interface PrdEditorProps {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  selectedPrd: PrdDocument | null;
  onSave: (prd: Omit<PrdDocument, 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  onBack: () => void;
}

export default function PrdEditor({
  currentTheme,
  setTheme,
  selectedPrd,
  onSave,
  onBack
}: PrdEditorProps) {
  const styles = themeStyles[currentTheme];

  // Document state
  const [doc, setDoc] = useState<Omit<PrdDocument, 'createdAt' | 'updatedAt'>>({
    id: '',
    title: '',
    description: '',
    architecture: 'static',
    theme: currentTheme,
    targetAudience: '',
    sitemap: '',
    contentRequirements: '',
    performanceSeo: '',
    userRoles: '',
    databaseSchema: '',
    apiIntegration: '',
    stateManagement: '',
    timeline: '',
    outOfScope: ''
  });

  // UI state
  const [activeFormTab, setActiveFormTab] = useState<'info' | 'structure' | 'technical'>('info');
  const [showPreviewMobile, setShowPreviewMobile] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<'visual' | 'markdown-parsed' | 'markdown-raw'>('visual');
  const [showPresetDropdown, setShowPresetDropdown] = useState<boolean>(false);

  // Initialize or load selected PRD
  useEffect(() => {
    if (selectedPrd) {
      setDoc({
        id: selectedPrd.id,
        title: selectedPrd.title,
        description: selectedPrd.description,
        architecture: selectedPrd.architecture,
        theme: selectedPrd.theme,
        targetAudience: selectedPrd.targetAudience,
        sitemap: selectedPrd.sitemap,
        contentRequirements: selectedPrd.contentRequirements,
        performanceSeo: selectedPrd.performanceSeo,
        userRoles: selectedPrd.userRoles || '',
        databaseSchema: selectedPrd.databaseSchema || '',
        apiIntegration: selectedPrd.apiIntegration || '',
        stateManagement: selectedPrd.stateManagement || '',
        timeline: selectedPrd.timeline || '',
        outOfScope: selectedPrd.outOfScope || ''
      });
      // Set parent theme to match PRD theme
      setTheme(selectedPrd.theme);
    } else {
      // Default empty state, but pre-set architecture to whatever was selected on landing page
      setDoc(prev => ({
        ...prev,
        theme: currentTheme
      }));
    }
  }, [selectedPrd]);

  // Keep parent theme in sync if user changes it inside editor
  useEffect(() => {
    setDoc(prev => ({ ...prev, theme: currentTheme }));
  }, [currentTheme]);

  const handleInputChange = (field: keyof PrdDocument, value: any) => {
    setDoc(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArchitectureToggle = (arch: ArchitectureType) => {
    setDoc(prev => ({
      ...prev,
      architecture: arch
    }));
  };

  // Pre-fill Template
  const handleLoadTemplate = () => {
    const template = doc.architecture === 'static' ? STATIC_TEMPLATE : DYNAMIC_TEMPLATE;
    setDoc({
      id: doc.id, // keep current ID if editing
      theme: currentTheme, // keep current selected theme
      ...template
    });
  };

  // Load selected Preset
  const handleLoadPreset = (preset: Omit<PrdDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
    setDoc({
      id: doc.id,
      theme: preset.theme || currentTheme,
      ...preset
    });
    if (preset.theme) {
      setTheme(preset.theme);
    }
    setShowPresetDropdown(false);
  };

  // Custom high-fidelity inline Markdown formatter
  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-extrabold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Custom high-fidelity Markdown structural renderer
  const parseMarkdownToElements = (mdText: string) => {
    const lines = mdText.split('\n');
    let insideList = false;
    const listItems: React.ReactNode[] = [];
    const elements: React.ReactNode[] = [];

    const flushList = (keyPrefix: string) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${keyPrefix}`} className="list-disc pl-6 my-3 space-y-1.5 text-zinc-300">
            {[...listItems]}
          </ul>
        );
        listItems.length = 0;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      
      // List items
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        insideList = true;
        const content = trimmed.substring(2);
        listItems.push(
          <li key={`li-${idx}`} className="text-sm text-zinc-300 leading-relaxed">
            {renderInlineFormatting(content)}
          </li>
        );
        return;
      } else {
        if (insideList) {
          flushList(`flush-${idx}`);
          insideList = false;
        }
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-2xl md:text-3xl font-black text-white mt-8 mb-4 border-b border-white/[0.08] pb-2 font-display">
            {trimmed.substring(2)}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-xl md:text-2xl font-bold text-white mt-6 mb-3 font-display flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#f25f4c] rounded" />
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-base md:text-lg font-bold text-[#f25f4c] mt-5 mb-2 font-display">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={idx} className="border-white/[0.08] my-6" />);
      } else if (trimmed === '') {
        elements.push(<div key={idx} className="h-2" />);
      } else {
        elements.push(
          <p key={idx} className="text-sm text-zinc-300 leading-relaxed my-2.5">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      }
    });

    if (insideList) {
      flushList('final');
    }

    return elements;
  };

  // Generate Markdown string
  const generateMarkdown = (): string => {
    let md = `# PRODUCT REQUIREMENT DOCUMENT (PRD)\n`;
    md += `## 📋 ${doc.title || 'Judul Proyek PRD'}\n\n`;
    md += `**Arsitektur:** ${doc.architecture === 'static' ? 'Web Statis (Static Web)' : 'Web Dinamis (Dynamic Web)'}\n`;
    md += `**Desain Tema:** ${doc.theme.toUpperCase()}\n\n`;
    
    md += `### 1. Ringkasan Proyek & Deskripsi\n`;
    md += `${doc.description || '*Belum ada deskripsi.*'}\n\n`;
    
    md += `### 2. Target Audiens\n`;
    md += `${doc.targetAudience || '*Belum ditentukan.*'}\n\n`;
    
    md += `### 3. Struktur Halaman & Sitemap\n`;
    md += `${doc.sitemap || '*Belum didefinisikan.*'}\n\n`;
    
    md += `### 4. Kebutuhan Konten\n`;
    md += `${doc.contentRequirements || '*Belum didefinisikan.*'}\n\n`;
    
    md += `### 5. Metrik Performa & SEO\n`;
    md += `${doc.performanceSeo || '*Belum didefinisikan.*'}\n\n`;

    if (doc.architecture === 'dynamic') {
      md += `### 6. Peran Pengguna & Otentikasi (User Roles)\n`;
      md += `${doc.userRoles || '*Belum didefinisikan.*'}\n\n`;
      
      md += `### 7. Skema Basis Data Singkat (Database Schema)\n`;
      md += `${doc.databaseSchema || '*Belum didefinisikan.*'}\n\n`;
      
      md += `### 8. Integrasi API & Endpoint Eksternal\n`;
      md += `${doc.apiIntegration || '*Belum didefinisikan.*'}\n\n`;
      
      md += `### 9. Manajemen Status Aplikasi (State Management)\n`;
      md += `${doc.stateManagement || '*Belum didefinisikan.*'}\n\n`;
    }

    md += `### ${doc.architecture === 'dynamic' ? '10' : '6'}. Timeline & Rencana Rilis\n`;
    md += `${doc.timeline || '*Belum didefinisikan.*'}\n\n`;
    
    md += `### ${doc.architecture === 'dynamic' ? '11' : '7'}. Batasan Sistem (Out of Scope)\n`;
    md += `${doc.outOfScope || '*Belum didefinisikan.*'}\n\n`;
    
    md += `--- \n*Dokumen PRD ini dibuat menggunakan PRD Generator - UI/UX Architect Powered*`;
    return md;
  };

  // Copy Markdown to Clipboard
  const handleCopyMarkdown = () => {
    const mdText = generateMarkdown();
    navigator.clipboard.writeText(mdText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Download Markdown File
  const handleDownloadMarkdown = () => {
    const mdText = generateMarkdown();
    const blob = new Blob([mdText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${(doc.title || 'PRD-Document').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save draft
  const handleSaveDraft = () => {
    onSave(doc);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
          {/* Action Sub-header bar */}
      <div className={`py-3 px-4 md:px-6 flex items-center justify-between border-b ${
        currentTheme === 'cyberpunk' 
          ? 'bg-zinc-950 border-emerald-500/20' 
          : currentTheme === 'n8n'
            ? 'bg-[#0a0b0d] border-white/[0.06]'
            : 'bg-[#050505]/95 border-white/[0.08]'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`${styles.buttonSecondary} py-1.5 px-3 rounded-lg`}
            id="btn-back-landing"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Kembali</span>
          </button>
          
          <div className="h-6 w-px bg-zinc-250 dark:bg-zinc-800" />
 
          {/* Quick theme toggles inside editor */}
          <div className="flex items-center gap-1">
            <span className="text-3xs uppercase tracking-wider font-bold text-zinc-400 mr-1 hidden lg:inline">Tema:</span>
            {(['minimalist', 'corporate', 'cyberpunk', 'n8n'] as ThemeType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-2.5 py-1 text-2xs font-semibold capitalize rounded ${
                  currentTheme === t 
                    ? currentTheme === 'cyberpunk' 
                      ? 'bg-emerald-500 text-black font-bold' 
                      : currentTheme === 'n8n'
                        ? 'bg-[#f25f4c] text-white font-bold'
                        : 'bg-white/[0.1] text-white font-bold' 
                    : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300'
                }`}
                id={`btn-editor-theme-${t}`}
              >
                {t === 'cyberpunk' ? 'Cyberpunk' : t === 'n8n' ? 'n8n Style' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Save & Export controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className={`${styles.buttonSecondary} py-1.5 px-3 text-xs flex items-center gap-1.5`}
            title="Salin sebagai Markdown"
            id="btn-copy-markdown"
          >
            {copySuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="hidden sm:inline">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Salin MD</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className={`${styles.buttonSecondary} py-1.5 px-3 text-xs flex items-center gap-1.5`}
            title="Unduh file Markdown (.md)"
            id="btn-download-markdown"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Unduh MD</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className={`${styles.buttonPrimary} py-1.5 px-4 text-xs flex items-center gap-1.5`}
            id="btn-save-draft"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Draf</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace (Split form & preview) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile View Toggle Button */}
        <div className="absolute bottom-4 right-4 z-50 md:hidden">
          <button
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            className="p-3 bg-blue-600 dark:bg-emerald-500 text-white dark:text-black rounded-full shadow-lg flex items-center gap-2 font-bold text-xs"
            id="btn-toggle-preview-mobile"
          >
            {showPreviewMobile ? (
              <>
                <Edit className="w-4 h-4" />
                Edit Form
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Lihat Preview
              </>
            )}
          </button>
        </div>

        {/* Left Side: Dynamic Form Input */}
        <div className={`w-full md:w-1/2 flex flex-col h-full border-r ${
          currentTheme === 'cyberpunk' ? 'border-emerald-500/20 bg-black' : 'bg-[#050505] border-white/[0.08]'
        } ${showPreviewMobile ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Form Tabs Navigation */}
          <div className={`p-4 border-b flex flex-wrap gap-2 items-center justify-between ${
            currentTheme === 'cyberpunk' ? 'border-emerald-500/10' : 'border-white/[0.08] bg-white/[0.01]'
          }`}>
            <div className="flex gap-1.5">
              <button
                onClick={() => setActiveFormTab('info')}
                className={activeFormTab === 'info' ? styles.activeTab : styles.inactiveTab}
                id="tab-info"
              >
                1. Info Utama
              </button>
              <button
                onClick={() => setActiveFormTab('structure')}
                className={activeFormTab === 'structure' ? styles.activeTab : styles.inactiveTab}
                id="tab-structure"
              >
                2. Struktur Web
              </button>
              <button
                onClick={() => setActiveFormTab('technical')}
                className={activeFormTab === 'technical' ? styles.activeTab : styles.inactiveTab}
                id="tab-technical"
              >
                3. Teknis & {doc.architecture === 'static' ? 'SEO' : 'DB'}
              </button>
            </div>

            {/* Template & Preset Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPresetDropdown(!showPresetDropdown)}
                className={`p-1.5 text-3xs font-bold uppercase tracking-wider rounded border border-dashed flex items-center gap-1 cursor-pointer transition-colors ${
                  currentTheme === 'cyberpunk'
                    ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/20'
                    : currentTheme === 'n8n'
                      ? 'border-[#f25f4c]/30 text-[#f25f4c] hover:bg-[#f25f4c]/10'
                      : 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10'
                }`}
                title="Pilih Preset PRD Profesional (Mahasiswa, CMS, UMKM)"
                id="btn-select-preset-dropdown"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f25f4c] animate-pulse" />
                Pilih Preset PRD ({doc.architecture.toUpperCase()})
              </button>

              {showPresetDropdown && (
                <div className="absolute right-0 mt-2 w-72 max-h-[380px] overflow-y-auto bg-[#111318] border border-white/[0.08] rounded-xl shadow-2xl z-50 p-3">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
                    <span className="text-3xs font-bold text-[#f25f4c] uppercase tracking-wider">Daftar Preset Profesional</span>
                    <button 
                      onClick={() => setShowPresetDropdown(false)}
                      className="text-3xs text-zinc-400 hover:text-white px-1.5 py-0.5 rounded bg-white/[0.04] cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>

                  {/* Kategori: Mahasiswa */}
                  <div className="mb-3 text-left">
                    <span className="text-4xs font-bold text-zinc-500 uppercase tracking-widest block mb-1 px-1">🎓 Mahasiswa</span>
                    <div className="space-y-1">
                      {PRESETS.filter(p => p.category === 'mahasiswa').map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleLoadPreset(p.data)}
                          className="w-full text-left text-2xs text-zinc-300 hover:text-white hover:bg-white/[0.04] p-1.5 rounded transition-all truncate block cursor-pointer"
                          title={p.name}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kategori: Web CMS */}
                  <div className="mb-3 text-left">
                    <span className="text-4xs font-bold text-zinc-500 uppercase tracking-widest block mb-1 px-1">🖥️ Web CMS</span>
                    <div className="space-y-1">
                      {PRESETS.filter(p => p.category === 'cms').map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleLoadPreset(p.data)}
                          className="w-full text-left text-2xs text-zinc-300 hover:text-white hover:bg-white/[0.04] p-1.5 rounded transition-all truncate block cursor-pointer"
                          title={p.name}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kategori: UMKM */}
                  <div className="mb-3 text-left">
                    <span className="text-4xs font-bold text-zinc-500 uppercase tracking-widest block mb-1 px-1">💼 Bisnis UMKM</span>
                    <div className="space-y-1">
                      {PRESETS.filter(p => p.category === 'umkm').map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleLoadPreset(p.data)}
                          className="w-full text-left text-2xs text-zinc-300 hover:text-white hover:bg-white/[0.04] p-1.5 rounded transition-all truncate block cursor-pointer"
                          title={p.name}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kategori: Umum */}
                  <div className="text-left pt-1 border-t border-white/[0.04]">
                    <span className="text-4xs font-bold text-zinc-500 uppercase tracking-widest block mb-1 px-1">⚙️ Referensi Umum</span>
                    <div className="space-y-1 mb-2">
                      {PRESETS.filter(p => p.category === 'umum').map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleLoadPreset(p.data)}
                          className="w-full text-left text-2xs text-zinc-300 hover:text-white hover:bg-white/[0.04] p-1.5 rounded transition-all truncate block cursor-pointer"
                          title={p.name}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleLoadTemplate}
                      className="w-full text-left text-2xs text-[#f25f4c] hover:bg-white/[0.04] p-1.5 rounded transition-all truncate flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      Template Dasar ({doc.architecture.toUpperCase()})
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            
            {/* Quick Architecture Switch Alert inside workspace */}
            <div className={`p-4 rounded-xl border flex gap-3 ${
              doc.architecture === 'static'
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                : 'bg-indigo-500/5 border-indigo-500/20 text-indigo-300'
            }`}>
              <AlertCircle className="w-5 h-5 shrink-0 text-emerald-500" />
              <div className="text-xs">
                <span className="font-bold">Mode Arsitektur Aktif: </span>
                <span className="underline uppercase tracking-wide font-bold">{doc.architecture} Web</span>.
                Anda dapat beralih ke mode {doc.architecture === 'static' ? 'Dinamis (Dynamic)' : 'Statis (Static)'} untuk mengubah cakupan dokumen.
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleArchitectureToggle('static')}
                    className={`px-2 py-1 rounded text-2xs font-semibold ${
                      doc.architecture === 'static'
                        ? 'bg-emerald-500 text-black'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                    id="btn-switch-static"
                  >
                    Set Statis
                  </button>
                  <button
                    onClick={() => handleArchitectureToggle('dynamic')}
                    className={`px-2 py-1 rounded text-2xs font-semibold ${
                      doc.architecture === 'dynamic'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white/[0.05] text-zinc-400 hover:bg-white/[0.1]'
                    }`}
                    id="btn-switch-dynamic"
                  >
                    Set Dinamis
                  </button>
                </div>
              </div>
            </div>

            {/* Tab 1: Info Utama */}
            {activeFormTab === 'info' && (
              <div className="space-y-4" id="form-tab-info-fields">
                <div>
                  <label className={styles.label}>Judul Proyek PRD</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Contoh: Website Portofolio & Landing Page Konsultan"
                    value={doc.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    id="input-prd-title"
                  />
                </div>

                <div>
                  <label className={styles.label}>Ringkasan & Deskripsi Proyek</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Jelaskan secara ringkas latar belakang proyek, masalah yang dipecahkan, dan visi produk."
                    value={doc.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    id="input-prd-desc"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={styles.label}>Timeline Kasar</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Contoh: 4 Minggu (Desain s.d. Rilis)"
                      value={doc.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      id="input-prd-timeline"
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Batasan (Out of Scope)</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Contoh: Belum mencakup sistem pembayaran"
                      value={doc.outOfScope}
                      onChange={(e) => handleInputChange('outOfScope', e.target.value)}
                      id="input-prd-outofscope"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Struktur Web */}
            {activeFormTab === 'structure' && (
              <div className="space-y-4" id="form-tab-structure-fields">
                <div>
                  <label className={styles.label}>Target Audiens Utama</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Siapa pengguna website Anda? Sebutkan demografi, motivasi, dan kebiasaan digital mereka."
                    value={doc.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    id="input-prd-audience"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className={styles.label}>Struktur Halaman & Sitemap</label>
                    <span className="text-3xs text-zinc-400 font-mono">Format Markdown didukung (- list)</span>
                  </div>
                  <textarea
                    className={`${styles.textarea} min-h-[160px] font-mono text-xs`}
                    placeholder={`Contoh:\n- Home: Profil singkat & CTA\n- Tentang Kami: Kisah & Anggota\n- Kontak: Form pesan`}
                    value={doc.sitemap}
                    onChange={(e) => handleInputChange('sitemap', e.target.value)}
                    id="input-prd-sitemap"
                  />
                </div>

                <div>
                  <label className={styles.label}>Kebutuhan Konten Spesifik</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Sebutkan jenis berkas, gambar, teks utama, logo, atau dokumen hukum yang harus tampil di web."
                    value={doc.contentRequirements}
                    onChange={(e) => handleInputChange('contentRequirements', e.target.value)}
                    id="input-prd-content"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Teknis */}
            {activeFormTab === 'technical' && (
              <div className="space-y-4" id="form-tab-tech-fields">
                <div>
                  <label className={styles.label}>Kebutuhan Performa & SEO</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Sebutkan metrik Core Web Vitals, optimasi keyword SEO, sitemap, meta tags, atau ketentuan aksesibilitas."
                    value={doc.performanceSeo}
                    onChange={(e) => handleInputChange('performanceSeo', e.target.value)}
                    id="input-prd-seo"
                  />
                </div>

                {/* FIELDS EXCLUSIVE TO DYNAMIC WEB */}
                {doc.architecture === 'dynamic' ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800"
                    id="dynamic-only-fields"
                  >
                    <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-2xs flex items-center gap-2">
                      <Code className="w-4 h-4 text-indigo-400 animate-pulse" />
                      <span className="font-bold text-indigo-400">Field Arsitektur Dinamis Terbuka Otomatis!</span>
                    </div>

                    <div>
                      <label className={styles.label}>Peran Pengguna & Hak Akses (User Roles)</label>
                      <textarea
                        className={styles.textarea}
                        placeholder="Contoh: Admin (kuasa penuh), Member (edit tugas sendiri), Guest (view-only)."
                        value={doc.userRoles}
                        onChange={(e) => handleInputChange('userRoles', e.target.value)}
                        id="input-prd-roles"
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Skema Basis Data Singkat (Database Schema)</label>
                      <textarea
                        className={`${styles.textarea} font-mono text-xs`}
                        placeholder="Sebutkan tabel utama dan relasinya. Contoh: Users, Proyek, Tugas, Komentar."
                        value={doc.databaseSchema}
                        onChange={(e) => handleInputChange('databaseSchema', e.target.value)}
                        id="input-prd-schema"
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Integrasi API Eksternal & Endpoint</label>
                      <textarea
                        className={styles.textarea}
                        placeholder="Integrasi dengan pihak ketiga (payment gateway, maps, login Google) dan rancangan API lokal."
                        value={doc.apiIntegration}
                        onChange={(e) => handleInputChange('apiIntegration', e.target.value)}
                        id="input-prd-api"
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Arsitektur State Management</label>
                      <textarea
                        className={styles.textarea}
                        placeholder="Cara aplikasi mengelola state. Contoh: Redux Toolkit untuk auth, SWR/React Query untuk server state, LocalStorage untuk session cache."
                        value={doc.stateManagement}
                        onChange={(e) => handleInputChange('stateManagement', e.target.value)}
                        id="input-prd-statemgmt"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs flex gap-2">
                    <HelpCircle className="w-5 h-5 text-zinc-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-zinc-300">Mencari User Roles & DB?</span> Ubah arsitektur ke <span className="font-bold underline cursor-pointer text-indigo-400" onClick={() => handleArchitectureToggle('dynamic')}>Web Dinamis</span> untuk mengaktifkan skema basis data, otentikasi peran, integrasi API, dan state management.
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right Side: Live Interactive Document Preview */}
        <div className={`w-full md:w-1/2 h-full flex flex-col overflow-y-auto p-4 md:p-6 bg-zinc-900/10 ${
          showPreviewMobile ? 'flex' : 'hidden md:flex'
        }`} id="prd-preview-container">
          
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#f25f4c]" />
              Pratinjau Dokumen
            </span>
            
            {/* Segmented Controller for Preview Modes */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 gap-1">
              <button
                onClick={() => setPreviewMode('visual')}
                className={`px-3 py-1 text-3xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  previewMode === 'visual'
                    ? 'bg-[#f25f4c] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                Tampilan Visual
              </button>
              <button
                onClick={() => setPreviewMode('markdown-parsed')}
                className={`px-3 py-1 text-3xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  previewMode === 'markdown-parsed'
                    ? 'bg-[#f25f4c] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                Pratinjau MD
              </button>
              <button
                onClick={() => setPreviewMode('markdown-raw')}
                className={`px-3 py-1 text-3xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  previewMode === 'markdown-raw'
                    ? 'bg-[#f25f4c] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                Kode Raw (.md)
              </button>
            </div>
          </div>

          {/* Condition-based Rendering of the Preview */}
          {previewMode === 'visual' && (
            <div className={styles.previewPaper} id="prd-document-paper">
              
              {/* PRD Header Branding */}
              <div className="border-b-2 border-white/[0.08] pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-3xs font-mono uppercase tracking-widest text-zinc-500">
                    Product Requirement Document (PRD)
                  </span>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
                    {doc.title || "Judul Proyek Baru"}
                  </h1>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1.5 font-mono text-3xs text-zinc-500">
                  <span className={`px-2 py-0.5 rounded-full text-4xs uppercase tracking-widest font-bold ${
                    doc.architecture === 'static'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[#f25f4c]/10 text-[#f25f4c] border border-[#f25f4c]/20'
                  }`}>
                    {doc.architecture} Web
                  </span>
                  <span>Created: {new Date().toLocaleDateString('id-ID')}</span>
                </div>
              </div>

              {/* Table of Contents / Quick overview */}
              <div className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs">
                <div className="font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Layout className="w-3.5 h-3.5" />
                  Matriks Metadata Sistem
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="text-zinc-500">Arsitektur Sasis:</span>
                    <p className="font-semibold text-zinc-200 capitalize">{doc.architecture} Web App</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Kustomisasi Gaya UI:</span>
                    <p className="font-semibold text-zinc-200 capitalize">{doc.theme} Styling</p>
                  </div>
                </div>
              </div>

              {/* Document Content Sections */}
              <div className="space-y-8 text-sm text-zinc-300 text-left">
                
                {/* Section 1: Overview */}
                <div>
                  <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                    1. Ringkasan Proyek & Deskripsi
                  </h3>
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {doc.description || "Tuliskan deskripsi proyek di form kiri untuk mengupdate bagian ini secara real-time."}
                  </p>
                </div>

                {/* Section 2: Audience */}
                <div>
                  <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                    2. Target Audiens
                  </h3>
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {doc.targetAudience || "Audiens utama belum ditentukan."}
                  </p>
                </div>

                {/* Section 3: Sitemap */}
                <div>
                  <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                    3. Struktur Halaman & Sitemap
                  </h3>
                  {doc.sitemap ? (
                    <div className="pl-4 border-l-2 border-white/[0.08] font-mono text-xs space-y-1 bg-white/[0.02] p-3 rounded text-zinc-350">
                      {doc.sitemap.split('\n').map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap">{line}</div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-550 italic">Belum ada rincian halaman.</p>
                  )}
                </div>

                {/* Section 4: Content */}
                <div>
                  <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                    4. Kebutuhan Konten Spesifik
                  </h3>
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {doc.contentRequirements || "Ketentuan materi konten belum dirinci."}
                  </p>
                </div>

                {/* Section 5: SEO */}
                <div>
                  <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                    5. Metrik Performa & SEO
                  </h3>
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {doc.performanceSeo || "Metrik optimasi performa belum dirinci."}
                  </p>
                </div>

                {/* Section 6+ Exclusive Dynamic Fields */}
                {doc.architecture === 'dynamic' && (
                  <>
                    <div>
                      <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                        6. Peran Pengguna & Otentikasi (User Roles)
                      </h3>
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {doc.userRoles || "Peran pengguna belum ditentukan."}
                      </p>
                    </div>

                    <div>
                      <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                        7. Skema Basis Data Singkat (Database Schema)
                      </h3>
                      {doc.databaseSchema ? (
                        <div className="bg-white/[0.02] p-4 rounded-lg font-mono text-xs border border-white/[0.08] text-zinc-350">
                          {doc.databaseSchema.split('\n').map((line, i) => (
                            <div key={i} className="whitespace-pre-wrap">{line}</div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-zinc-550 italic">Skema basis data belum dirancang.</p>
                      )}
                    </div>

                    <div>
                      <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                        8. Integrasi API & Endpoint Eksternal
                      </h3>
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {doc.apiIntegration || "Integrasi API belum dijabarkan."}
                      </p>
                    </div>

                    <div>
                      <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                        9. Manajemen Status Aplikasi (State Management)
                      </h3>
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {doc.stateManagement || "Arsitektur state management belum didefinisikan."}
                      </p>
                    </div>
                  </>
                )}

                {/* Section: Timeline */}
                <div>
                  <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                    {doc.architecture === 'dynamic' ? '10' : '6'}. Timeline & Rencana Rilis
                  </h3>
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {doc.timeline || "Rencana linimasa belum dijadwalkan."}
                  </p>
                </div>

                {/* Section: Out of scope */}
                <div>
                  <h3 className={`${styles.heading} text-lg font-bold mb-3`}>
                    {doc.architecture === 'dynamic' ? '11' : '7'}. Batasan Sistem (Out of Scope)
                  </h3>
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {doc.outOfScope || "Batasan ruang lingkup belum ditentukan."}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* Mode 2: Compiled Markdown Parsed HTML */}
          {previewMode === 'markdown-parsed' && (
            <div className={`${styles.previewPaper} text-left`} id="prd-document-markdown-parsed">
              <div className="prose prose-invert max-w-none text-zinc-350 space-y-4">
                {parseMarkdownToElements(generateMarkdown())}
              </div>
            </div>
          )}

          {/* Mode 3: Raw Markdown Source Editor Canvas */}
          {previewMode === 'markdown-raw' && (
            <div className="bg-[#0b0c10] border border-white/[0.08] rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto relative flex-1 flex flex-col h-full min-h-[400px]" id="prd-document-markdown-raw">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-3xs text-zinc-500 uppercase tracking-widest font-bold ml-1.5 font-mono">document.md</span>
                </div>
                <button
                  onClick={handleCopyMarkdown}
                  className="px-2 py-1 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white rounded text-3xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copySuccess ? <Check className="w-3 h-3 text-[#f25f4c]" /> : <Copy className="w-3 h-3" />}
                  {copySuccess ? 'Tersalin!' : 'Salin Kode'}
                </button>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed select-text font-mono text-zinc-300 text-3xs md:text-2xs text-left overflow-y-auto flex-1">
                {generateMarkdown()}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
