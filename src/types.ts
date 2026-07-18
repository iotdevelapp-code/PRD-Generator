/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ArchitectureType = 'static' | 'dynamic';
export type ThemeType = 'minimalist' | 'corporate' | 'cyberpunk' | 'n8n';

export interface Participant {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  campus: string;
  major: string;
  nim: string;
  profilePic: string; // Base64 data url
  registeredAt: string;
  disciplineGroup: string; // Rumpun Ilmu Keilmuan (DIKTI)
  academicYear: string; // Tahun Akademik / Semester
  codingExperience: string; // Tingkat Pengalaman Coding Tradisional (Tanpa AI)
  aiIntensity: string; // Intensitas Interaksi dengan Generative AI (3 Bulan Terakhir)
  aiToolsUsed: string[]; // Alat Vibe Coding & Asisten AI Lainnya yang Pernah Dicoba
  preTestCompleted?: boolean;
  preTestScore?: number;
  postTestCompleted?: boolean;
  postTestScore?: number;
  preTestSurveyAnswers?: Record<string, number>; // Kuesioner Evaluasi Sikap (Pre-Test)
  postTestSurveyAnswers?: Record<string, number>; // Kuesioner Evaluasi Sikap (Post-Test)
}

export interface PrdDocument {
  id: string;
  title: string;
  description: string;
  architecture: ArchitectureType;
  theme: ThemeType;
  createdAt: string;
  updatedAt: string;
  
  // Common fields
  targetAudience: string;
  sitemap: string; // Markdown or structure
  contentRequirements: string;
  performanceSeo: string;
  
  // Dynamic Web fields
  userRoles?: string;
  databaseSchema?: string;
  apiIntegration?: string;
  stateManagement?: string;
  
  // Additional sections
  timeline?: string;
  outOfScope?: string;
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  bg: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
  accentBorder: string;
  fontFamily: string;
  shadow: string;
}
