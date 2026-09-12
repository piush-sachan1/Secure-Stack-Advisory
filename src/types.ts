export interface RiskAssessmentInput {
  aiFeatures: string[]; // e.g. ["llm_chat", "rag_retrieval", "autonomous_agents", "fine_tuned", "none"]
  cloudProviders: string[]; // e.g. ["aws", "gcp", "azure", "on_prem"]
  governancePolicy: string; // e.g. "documented", "ad_hoc", "none"
  dataHandling: string; // e.g. "pii_confidential", "anonymized", "self_hosted", "no_external"
  incidentMaturity: string; // e.g. "mature", "basic", "none"
  exposureSurface: string; // e.g. "public_internet", "b2b_authenticated", "internal_only"
  teamSize: string; // e.g. "1-20", "21-100", "100+"
  industrySector?: string; // e.g. "Fintech / Payments", "Healthcare / MedTech", "Enterprise B2B SaaS", "E-commerce"
}

export interface FindingItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  impact: string;
  technicalExplanation: string;
  recommendedMitigation: string;
}

export interface AssessmentResult {
  riskScore: number; // 0 - 100
  riskTier: 'Critical' | 'High' | 'Moderate' | 'Low';
  summary: string;
  primaryRiskDrivers: string[];
  findings: FindingItem[];
  recommendedPractice: {
    title: string;
    rationale: string;
    targetMilestone: string;
  };
  complianceImpact: {
    framework: string;
    statusNote: string;
  }[];
}

export interface PracticeArea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  serviceCount: number;
  highlightCapabilities: string[];
  icon: string;
}

export interface RelatedServiceItem {
  id: string;
  title: string;
  tagline: string;
  practice: string;
}

export interface ServiceDetail {
  id: string;
  practiceId: string;
  title: string;
  tagline: string;
  shortDescription: string;
  problem: string;
  methodology: {
    phase: string;
    description: string;
  }[];
  deliverables: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedServices?: RelatedServiceItem[];
  tags: string[];
}

export interface ConsultantProfile {
  name: string;
  role: string;
  location: string;
  avatarSeed: string;
  imageUrl?: string;
  bio: string;
  certifications: string[];
  specialties: string[];
  priorExperience: string;
}

export interface ProcessStage {
  stepNumber: number;
  name: string;
  duration: string;
  description: string;
  deliverable: string;
}

export interface CaseStudy {
  id: string;
  clientTier: string;
  industry: string;
  engagementScope: string;
  headline: string;
  problem: string;
  solution: string;
  outcomes: {
    metric: string;
    label: string;
    detail: string;
  }[];
  techStack: string[];
  deliverableLink?: string;
  quote?: {
    text: string;
    author: string;
    title: string;
  };
}

export interface InsightPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishDate: string;
  readTime: string;
  summary: string;
  author: {
    name: string;
    role: string;
  };
  keyTakeaways: string[];
  imageUrl?: string;
}

export interface ContactFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  targetPractice: string;
  timeline: string;
  message: string;
  prefilledAssessment?: {
    score: number;
    tier: string;
    recommendedPractice: string;
    keyFindingSummary: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  groundingChunks?: {
    title: string;
    uri: string;
  }[];
  webSearchQueries?: string[];
  isError?: boolean;
}

export interface CloudPlatformSpec {
  id: 'aws' | 'gcp' | 'azure';
  name: string;
  tagline: string;
  badge: string;
  logoColor: string;
  architectureHighlights: {
    title: string;
    description: string;
    services: string[];
  }[];
  support247Capabilities: {
    title: string;
    sla: string;
    details: string;
  }[];
  finOpsControls: {
    mechanism: string;
    savingsPotential: string;
    automation: string;
  }[];
}

export interface DevOpsAgilePractice {
  stage: string;
  title: string;
  agilePattern: string;
  tooling: string[];
  businessOutcome: string;
  failureGuardrail: string;
}

export interface FinOpsOptimizationItem {
  domain: string;
  initiative: string;
  typicalSavings: string;
  cadence: string;
  targetMetric: string;
  cloudCoverage: string[];
}

export type SupportedLanguage = 'en' | 'de' | 'fr';

export type SiteTheme =
  | 'cyber-obsidian'
  | 'deep-navy'
  | 'emerald-matrix'
  | 'obsidian-gold'
  | 'slate-corporate'
  | 'nordic-frost'
  | 'amethyst-stealth'
  | 'crimson-sentinel'
  | 'swiss-minimal'
  | 'light-titanium';

export interface SocialChannelItem {
  id: 'instagram' | 'facebook' | 'youtube' | 'x';
  name: string; // The editable channel name / handle (e.g. @vectorbound.cyber)
  url: string;
  description: string;
  badge?: string;
}

export interface SocialChannelsConfig {
  instagram: SocialChannelItem;
  facebook: SocialChannelItem;
  youtube: SocialChannelItem;
  x: SocialChannelItem;
}

export type AppSection = 
  | 'overview' 
  | 'cloud-ops' 
  | 'risk-tool' 
  | 'services' 
  | 'compliance' 
  | 'company' 
  | 'contact';
