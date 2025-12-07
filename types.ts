
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[]; // Array of paragraphs
  category: string;
  readTime: string;
}

export interface RoomGuide {
  id: string;
  name: string;
  icon: any;
  hazards: string[];
  dos: string[];
  donts: string[];
  checklist: string[];
  homeownerFix: string[];
  electricianFix: string[];
}

export interface ApplianceGuide {
  id: string;
  name: string;
  safeUsage: string[];
  signsOfOverload: string[];
  wiringDamage: string[];
  outletReqs: string;
  whenToUnplug: string[];
  whenToReplace: string;
  warnings: string[];
  childSafety: string;
  inspectionFreq: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  whyItMatters: string; // New educational field
  options: {
    label: string;
    score: number; // 0 = Safe, 5 = Danger
  }[];
}

export interface HazardImage {
  id: string;
  src: string;
  title: string;
  description: string;
  risk: string;
  prevention: string;
}

export interface LoadItem {
  name: string;
  watts: number;
  qty: number;
  hoursPerDay?: number; // Added for cost calc
}

// New Interface for Tenant Tool
export interface TenantIssue {
  id: string;
  label: string;
  technicalTerm: string;
  riskDescription: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
}

// New Interface for Hardware Guide
export interface HardwareItem {
  id: string;
  name: string;
  aka: string; // Also known as
  description: string;
  ratings: string[]; // e.g. ["10A", "16A", "20A"]
  selectionRule: string; // e.g. "Load Current * 1.25"
  tip: string;
  standards?: string[]; // e.g. ["IEC 60898"]
}

// New Interface for Glossary
export interface GlossaryTerm {
  term: string;
  definition: string;
  simple: string; // "Like a..."
}
