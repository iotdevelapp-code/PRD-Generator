/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeType } from '../types';

export interface ThemeClasses {
  wrapper: string;
  card: string;
  cardHeader: string;
  buttonPrimary: string;
  buttonSecondary: string;
  input: string;
  textarea: string;
  badge: string;
  title: string;
  heading: string;
  textMuted: string;
  sidebar: string;
  previewPaper: string;
  label: string;
  activeTab: string;
  inactiveTab: string;
  navHeader: string;
}

export const themeStyles: Record<ThemeType, ThemeClasses> = {
  minimalist: {
    wrapper: 'bg-[#050505] text-zinc-100 font-sans min-h-screen transition-colors duration-300 selection:bg-zinc-700 selection:text-white',
    card: 'bg-white/[0.03] border border-white/[0.08] backdrop-blur-[12px] rounded-xl hover:border-zinc-700/60 transition-all duration-300',
    cardHeader: 'text-zinc-100 font-display font-semibold text-lg',
    buttonPrimary: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950 rounded-lg transition-all shadow-sm font-semibold py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    buttonSecondary: 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08] rounded-lg transition-all font-medium py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50',
    input: 'w-full bg-white/[0.03] text-zinc-100 placeholder-zinc-650 border border-white/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500/25 focus:border-zinc-400 px-4 py-2.5 text-sm transition-all',
    textarea: 'w-full bg-white/[0.03] text-zinc-100 placeholder-zinc-650 border border-white/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500/25 focus:border-zinc-400 px-4 py-2.5 text-sm transition-all min-h-[100px]',
    badge: 'bg-white/[0.04] text-zinc-300 font-medium rounded px-2.5 py-1 text-xs border border-white/[0.08] inline-flex items-center gap-1',
    title: 'font-display font-extrabold tracking-tight text-white',
    heading: 'font-display font-bold text-white border-b border-white/[0.08] pb-3',
    textMuted: 'text-zinc-450 text-sm leading-relaxed',
    sidebar: 'bg-[#050505] border-r border-white/[0.08]',
    previewPaper: 'bg-white/[0.03] border border-white/[0.08] backdrop-blur-[12px] p-8 md:p-12 shadow-xl rounded-xl max-w-none text-zinc-200',
    label: 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2',
    activeTab: 'bg-zinc-100 text-zinc-950 font-semibold rounded-lg px-4 py-2 text-sm shadow-sm transition-all',
    inactiveTab: 'text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded-lg px-4 py-2 text-sm transition-all',
    navHeader: 'bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08] sticky top-0 z-30',
  },
  corporate: {
    wrapper: 'bg-[#050505] text-[#E5E5E5] font-sans min-h-screen transition-colors duration-300 selection:bg-indigo-600 selection:text-white',
    card: 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] backdrop-blur-[12px] rounded-xl hover:border-indigo-500/50 transition-all duration-300',
    cardHeader: 'text-white font-sans font-bold text-lg',
    buttonPrimary: 'bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-600/20 font-semibold py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    buttonSecondary: 'bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] text-zinc-350 border border-[rgba(255,255,255,0.08)] rounded-lg transition-all font-semibold py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50',
    input: 'w-full bg-[rgba(255,255,255,0.03)] text-white placeholder-zinc-500 border border-[rgba(255,255,255,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 px-4 py-2.5 text-sm transition-all',
    textarea: 'w-full bg-[rgba(255,255,255,0.03)] text-white placeholder-zinc-500 border border-[rgba(255,255,255,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 px-4 py-2.5 text-sm transition-all min-h-[100px]',
    badge: 'bg-indigo-500/10 text-indigo-400 font-semibold rounded px-2.5 py-1 text-xs border border-indigo-500/20 inline-flex items-center gap-1',
    title: 'font-sans font-extrabold tracking-tight text-white',
    heading: 'font-sans font-bold text-white border-b border-[rgba(255,255,255,0.08)] pb-3',
    textMuted: 'text-zinc-400 text-sm leading-relaxed',
    sidebar: 'bg-[#050505] border-r border-[rgba(255,255,255,0.08)]',
    previewPaper: 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] p-8 md:p-12 shadow-xl rounded-xl max-w-none text-zinc-200',
    label: 'block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-2',
    activeTab: 'bg-indigo-600 text-white font-semibold rounded-lg px-4 py-2 text-sm shadow-md transition-all',
    inactiveTab: 'text-zinc-400 hover:text-white hover:bg-[rgba(255,255,255,0.04)] rounded-lg px-4 py-2 text-sm transition-all',
    navHeader: 'bg-[#050505]/95 border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-30 shadow-sm',
  },
  cyberpunk: {
    wrapper: 'bg-[#050505] text-emerald-300 font-mono min-h-screen selection:bg-emerald-500 selection:text-black transition-colors duration-300',
    card: 'bg-black border border-emerald-500/30 rounded-none hover:border-emerald-400 transition-all duration-300 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-emerald-500 neon-border-emerald',
    cardHeader: 'text-emerald-400 font-mono font-bold tracking-wider uppercase text-lg border-b border-emerald-500/20 pb-2 flex items-center justify-between',
    buttonPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-black rounded-none transition-all font-bold tracking-widest uppercase py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer border-b-4 border-emerald-700 hover:border-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed',
    buttonSecondary: 'bg-zinc-950 hover:bg-zinc-900 text-emerald-400 border border-emerald-500/40 rounded-none transition-all font-bold tracking-wider uppercase py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50',
    input: 'w-full bg-zinc-950 text-emerald-400 placeholder-emerald-900 border border-emerald-500/30 rounded-none focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 px-4 py-2.5 text-xs transition-all font-mono',
    textarea: 'w-full bg-zinc-950 text-emerald-400 placeholder-emerald-900 border border-emerald-500/30 rounded-none focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 px-4 py-2.5 text-xs transition-all font-mono min-h-[100px]',
    badge: 'bg-zinc-900 text-emerald-400 font-bold rounded-none px-2.5 py-1 text-xs border border-emerald-500/30 uppercase tracking-widest inline-flex items-center gap-1',
    title: 'font-mono font-black tracking-widest text-emerald-400 uppercase neon-glow-emerald',
    heading: 'font-mono font-bold text-cyan-400 border-b border-emerald-500/30 pb-3 uppercase tracking-wide neon-glow-cyan',
    textMuted: 'text-zinc-450 text-xs leading-relaxed font-mono',
    sidebar: 'bg-zinc-950 border-r border-emerald-500/20',
    previewPaper: 'bg-black border border-emerald-500/40 p-8 md:p-12 shadow-[0_0_20px_rgba(16,185,129,0.1)] rounded-none max-w-none text-emerald-300 font-mono',
    label: 'block text-2xs font-bold text-emerald-500 uppercase tracking-widest mb-2',
    activeTab: 'bg-emerald-500 text-black font-bold rounded-none px-4 py-2 text-xs border-b-2 border-emerald-700 uppercase tracking-wider transition-all',
    inactiveTab: 'text-emerald-500/60 hover:text-emerald-400 hover:bg-zinc-900 rounded-none px-4 py-2 text-xs uppercase tracking-wider transition-all border border-transparent hover:border-emerald-500/20',
    navHeader: 'bg-zinc-950/95 border-b border-emerald-500/20 sticky top-0 z-30 shadow-[0_4px_20px_rgba(0,0,0,0.8)]',
  },
  n8n: {
    wrapper: 'bg-[#0a0b0d] text-slate-100 font-sans min-h-screen bg-dot-grid-dark transition-colors duration-300 relative selection:bg-[#f25f4c]/30 selection:text-[#f25f4c]',
    card: 'bg-[#111318]/90 border border-white/[0.06] backdrop-blur-[12px] rounded-2xl hover:border-[#f25f4c]/40 hover:shadow-[0_0_25px_rgba(242,95,76,0.08)] transition-all duration-300 relative overflow-visible',
    cardHeader: 'text-white font-display font-bold text-lg flex items-center gap-2',
    buttonPrimary: 'bg-[#f25f4c] hover:bg-[#fa6d5b] text-white rounded-xl transition-all shadow-lg shadow-[#f25f4c]/20 font-bold py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    buttonSecondary: 'bg-[#1a1d24] hover:bg-[#222731] text-slate-200 border border-white/[0.08] rounded-xl transition-all font-semibold py-2.5 px-5 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50',
    input: 'w-full bg-[#161920]/80 text-slate-100 placeholder-zinc-550 border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f25f4c]/20 focus:border-[#f25f4c] px-4 py-2.5 text-sm transition-all',
    textarea: 'w-full bg-[#161920]/80 text-slate-100 placeholder-zinc-550 border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f25f4c]/20 focus:border-[#f25f4c] px-4 py-2.5 text-sm transition-all min-h-[100px]',
    badge: 'bg-[#f25f4c]/10 text-[#f25f4c] font-bold rounded-full px-3 py-1 text-xs border border-[#f25f4c]/15 inline-flex items-center gap-1.5',
    title: 'font-display font-black tracking-tight text-white',
    heading: 'font-display font-bold text-white border-b border-white/[0.08] pb-3',
    textMuted: 'text-slate-400 text-sm leading-relaxed',
    sidebar: 'bg-[#0a0b0d] border-r border-white/[0.06]',
    previewPaper: 'bg-[#111318]/95 border border-white/[0.08] p-8 md:p-12 shadow-2xl rounded-2xl max-w-none text-slate-200 relative overflow-hidden',
    label: 'block text-xs font-bold text-[#f25f4c] uppercase tracking-wider mb-2',
    activeTab: 'bg-[#f25f4c] text-white font-bold rounded-xl px-4 py-2 text-sm shadow-md shadow-[#f25f4c]/15 transition-all',
    inactiveTab: 'text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl px-4 py-2 text-sm transition-all',
    navHeader: 'bg-[#0a0b0d]/95 backdrop-blur-md border-b border-white/[0.06] sticky top-0 z-30 shadow-md',
  },
};
