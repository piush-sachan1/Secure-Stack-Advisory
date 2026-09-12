import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExecutiveGateway } from './components/ExecutiveGateway';
import { SectionHeader } from './components/SectionHeader';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SERVICES_LIST, PRACTICES } from './data/contentData';
import { ServiceDetail, AppSection } from './types';

// Direct static component imports for zero-latency switching and rock-solid stability
import { MultiCloudOpsSection } from './components/MultiCloudOpsSection';
import { DevOpsSection } from './components/DevOpsSection';
import { FinOpsSection } from './components/FinOpsSection';
import { PracticesOverview } from './components/PracticesOverview';
import { FocusAreas } from './components/FocusAreas';
import { RiskAssessmentTool } from './components/RiskAssessmentTool';
import { ComplianceTracker } from './components/ComplianceTracker';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ChannelManagerModal } from './components/ChannelManagerModal';
import { TeamSection } from './components/TeamSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { WhyUs } from './components/WhyUs';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { AdvisoryChatbot } from './components/AdvisoryChatbot';
import {
  ServicesGridSkeleton,
  PracticesOverviewSkeleton,
  ComplianceTrackerSkeleton,
  CaseStudiesSkeleton,
} from './components/ThemedSkeleton';

const sectionTransitionVariants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: 'blur(3px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.32,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(2px)',
    transition: {
      duration: 0.18,
      ease: 'easeIn' as const,
    },
  },
};

function AppContent() {
  const [currentSection, setCurrentSection] = useState<AppSection>('overview');
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedFilterPractice, setSelectedFilterPractice] = useState<string | null>(null);
  const [prefilledConsultation, setPrefilledConsultation] = useState<{
    score: number;
    tier: string;
    recommendedPractice: string;
    keyFindingSummary: string;
  } | null>(null);

  // Sync section state with browser URL hash and handle browser Back/Forward
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (!rawHash) return;

      if (['overview', 'cloud-ops', 'risk-tool', 'services', 'compliance', 'company', 'contact'].includes(rawHash)) {
        setCurrentSection(rawHash as AppSection);
      } else if (rawHash === 'multi-cloud-ops' || rawHash === 'devops-support' || rawHash === 'finops-optimization') {
        setCurrentSection('cloud-ops');
        setTimeout(() => {
          document.getElementById(rawHash)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (rawHash === 'risk-assessment') {
        setCurrentSection('risk-tool');
      } else if (rawHash === 'compliance-tracker') {
        setCurrentSection('compliance');
      } else if (rawHash === 'team' || rawHash === 'process' || rawHash === 'why-us' || rawHash === 'case-studies' || rawHash === 'insights') {
        setCurrentSection('company');
        setTimeout(() => {
          document.getElementById(rawHash)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    // Run on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToSection = (section: AppSection, targetAnchor?: string) => {
    setCurrentSection(section);
    window.location.hash = targetAnchor ? targetAnchor : section;
    if (targetAnchor) {
      setTimeout(() => {
        const el = document.getElementById(targetAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    navigateToSection('contact');
  };

  const handleExploreServices = () => {
    navigateToSection('services');
  };

  const handleLaunchAssessment = () => {
    navigateToSection('risk-tool');
  };

  const handleSelectPractice = (practiceId: string) => {
    setSelectedFilterPractice(practiceId);
    navigateToSection('services');
  };

  const handleOpenConsultationTopic = (topicTitle?: string) => {
    setPrefilledConsultation({
      score: 0,
      tier: 'Scoped Architecture Review',
      recommendedPractice: topicTitle || 'Multi-Cloud & FinOps Architecture',
      keyFindingSummary: `Inquiry for: ${topicTitle || 'Architecture Consultation'}`,
    });
    navigateToSection('contact');
  };

  const handleLearnMoreAI = () => {
    const aiService = SERVICES_LIST.find((s) => s.id === 'ai-security-review');
    if (aiService) {
      setSelectedService(aiService);
    }
  };

  const handleLearnMoreCloud = () => {
    const cloudService = SERVICES_LIST.find((s) => s.id === 'aws-architecture');
    if (cloudService) {
      setSelectedService(cloudService);
    }
  };

  const handleSelectServiceByTitle = (title: string) => {
    const found = SERVICES_LIST.find((s) => s.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      setSelectedService(found);
      navigateToSection('services');
    } else {
      navigateToSection('services');
    }
  };

  const handleSelectRelatedService = (serviceId: string) => {
    const found = SERVICES_LIST.find((s) => s.id === serviceId);
    if (found) {
      setSelectedService(found);
    }
  };

  const handleBookForService = (serviceTitle: string) => {
    setPrefilledConsultation({
      score: 0,
      tier: 'Scoped Inquiry',
      recommendedPractice: serviceTitle,
      keyFindingSummary: `Requested Scoping for: ${serviceTitle}`,
    });
    navigateToSection('contact');
  };

  // Footer navigation handler
  const handleFooterNavigate = (sectionId: string) => {
    if (['overview', 'cloud-ops', 'risk-tool', 'services', 'compliance', 'company', 'contact'].includes(sectionId)) {
      navigateToSection(sectionId as AppSection);
    } else if (sectionId === 'multi-cloud-ops' || sectionId === 'devops-support' || sectionId === 'finops-optimization') {
      navigateToSection('cloud-ops', sectionId);
    } else if (sectionId === 'risk-assessment') {
      navigateToSection('risk-tool');
    } else if (sectionId === 'compliance-tracker') {
      navigateToSection('compliance');
    } else if (sectionId === 'team' || sectionId === 'process' || sectionId === 'why-us' || sectionId === 'insights') {
      navigateToSection('company', sectionId);
    } else if (sectionId === 'contact') {
      navigateToSection('contact');
    } else {
      navigateToSection('overview');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-sans antialiased flex flex-col justify-between">
      {/* Sticky Header with Section Navigation */}
      <Header
        currentSection={currentSection}
        onNavigate={navigateToSection}
        onBookClick={handleBookClick}
      />

      {/* Main Page Area - Rendered conditionally with Framer Motion slide-in transitions */}
      <main id="main-content" className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSection}
            variants={sectionTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {/* ========================================================================= */}
            {/* 1. OVERVIEW (HOME) SECTION                                                */}
            {/* ========================================================================= */}
            {currentSection === 'overview' && (
              <div>
                {/* Hero Section */}
                <Hero
                  onBookClick={handleBookClick}
                  onExploreServices={handleExploreServices}
                  onLaunchAssessment={handleLaunchAssessment}
                />

                {/* Executive Gateway Hub (Bento Portals, D3 Risk Gauge Demo, Telemetry) */}
                <ExecutiveGateway
                  onNavigate={navigateToSection}
                  onSelectPractice={handleSelectPractice}
                />
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. CLOUD & SRE OPERATIONS SECTION                                         */}
            {/* ========================================================================= */}
            {currentSection === 'cloud-ops' && (
              <div>
                <SectionHeader
                  currentSection="cloud-ops"
                  category="HYPERSCALER CLOUD & 24/7 SRE"
                  title="Multi-Cloud Infrastructure, Managed NOC & FinOps"
                  subtitle="Production-grade AWS, Google Cloud, and Azure landing zones paired with guaranteed 15-minute SLA Tier-3 SRE incident response, GitOps automated delivery, and algorithmic cloud cost reclamation."
                  badge="Tier-3 24/7 SRE NOC"
                  badgeColor="cyan"
                  onNavigate={navigateToSection}
                />

                <ErrorBoundary fallbackTitle="Cloud & SRE Operations View">
                  <div id="multi-cloud-ops">
                    <MultiCloudOpsSection
                      onSelectPractice={handleSelectPractice}
                      onOpenConsultation={handleOpenConsultationTopic}
                    />
                  </div>

                  <div id="devops-support">
                    <DevOpsSection onOpenConsultation={handleOpenConsultationTopic} />
                  </div>

                  <div id="finops-optimization">
                    <FinOpsSection onOpenConsultation={handleOpenConsultationTopic} />
                  </div>
                </ErrorBoundary>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. AI RISK ASSESSMENT TOOL (FLAGSHIP INTERACTIVE)                         */}
            {/* ========================================================================= */}
            {currentSection === 'risk-tool' && (
              <div>
                <SectionHeader
                  currentSection="risk-tool"
                  category="AI THREAT INTELLIGENCE & MODEL DIAGNOSTIC"
                  title="Free AI Security Risk Snapshot"
                  subtitle="Evaluate your LLM production architectures, RAG retrieval pipelines, and cloud IAM against the OWASP Top 10 for LLMs and NIST AI RMF with real-time Gemini analysis and dynamic D3 circular visualization."
                  badge="Gemini 2.5 Live"
                  badgeColor="purple"
                  onNavigate={navigateToSection}
                />

                <ErrorBoundary fallbackTitle="AI Risk Assessment Tool">
                  <div id="risk-assessment">
                    <RiskAssessmentTool
                      onSelectForConsultation={(data) => {
                        setPrefilledConsultation(data);
                        navigateToSection('contact');
                      }}
                    />
                  </div>
                </ErrorBoundary>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. ADVISORY PRACTICES & SERVICE CATALOG                                   */}
            {/* ========================================================================= */}
            {currentSection === 'services' && (
              <div>
                <SectionHeader
                  currentSection="services"
                  category="ADVISORY PRACTICES & SCOPED ENGAGEMENTS"
                  title={`${PRACTICES.length} Specialized Practice Areas & Service Catalog`}
                  subtitle={`Explore our ${PRACTICES.length} fixed-scope engineering practices and ${SERVICES_LIST.length} specialized consulting services. Every engagement delivers verifiable architecture diagrams, infrastructure-as-code implementations, and auditor-ready governance documentation.`}
                  badge="100% Fixed-Scope Guarantee"
                  badgeColor="amber"
                  onNavigate={navigateToSection}
                />

                <ErrorBoundary fallbackTitle="Advisory Catalog & Deliverables">
                  <div id="practices">
                    <PracticesOverview onSelectPractice={handleSelectPractice} />
                  </div>

                  <div id="focus-areas">
                    <FocusAreas
                      onLearnMoreAI={handleLearnMoreAI}
                      onLearnMoreCloud={handleLearnMoreCloud}
                    />
                  </div>

                  <div id="services">
                    <ServicesGrid
                      onSelectService={(service) => setSelectedService(service)}
                      selectedFilterPractice={selectedFilterPractice}
                    />
                  </div>
                </ErrorBoundary>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 5. CONTINUOUS COMPLIANCE & GOVERNANCE MATRIX                              */}
            {/* ========================================================================= */}
            {currentSection === 'compliance' && (
              <div>
                <SectionHeader
                  currentSection="compliance"
                  category="CONTINUOUS AUDIT & COMPLIANCE"
                  title="SOC 2 Type II, ISO 27001 & Multi-Regulation Tracker"
                  subtitle="Continuous posture assessment across AICPA Trust Services Criteria, ISO/IEC 27001:2022 Annex A, HIPAA, and EU NIS-2 with automated continuous evidence collection and auditor-ready policy templates."
                  badge="100% Audit Pass Rate"
                  badgeColor="emerald"
                  onNavigate={navigateToSection}
                />

                <ErrorBoundary fallbackTitle="Continuous Compliance Matrix">
                  <div id="compliance-tracker">
                    <ComplianceTracker onOpenConsultation={handleOpenConsultationTopic} />
                  </div>
                </ErrorBoundary>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 6. LEADERSHIP, METHODOLOGY & FIELD RESEARCH                               */}
            {/* ========================================================================= */}
            {currentSection === 'company' && (
              <div>
                <SectionHeader
                  currentSection="company"
                  category="ENGINEERING LEADERSHIP & METHODOLOGY"
                  title="Senior Principal Consultants, 6-Stage Process & Field Research"
                  subtitle="Battle-tested security and cloud engineering led by ex-FAANG, hyperscaler, and defense principals. Zero vendor kickbacks, zero junior staff delegation."
                  badge="Ex-FAANG Principals"
                  badgeColor="slate"
                  onNavigate={navigateToSection}
                />

                <ErrorBoundary fallbackTitle="Leadership & Engineering Insights">
                  <div id="team">
                    <TeamSection />
                  </div>

                  <div id="process">
                    <ProcessTimeline />
                  </div>

                  <div id="why-us">
                    <WhyUs />
                  </div>

                  <div id="case-studies">
                    <CaseStudiesSection
                      onScheduleConsultation={(topic) => {
                        navigateToSection('contact', 'contact');
                      }}
                    />
                  </div>

                  <div id="insights">
                    <InsightsSection />
                  </div>
                </ErrorBoundary>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 7. CONTACT & CONSULTATION SCOPING                                         */}
            {/* ========================================================================= */}
            {currentSection === 'contact' && (
              <div>
                <SectionHeader
                  currentSection="contact"
                  category="ENGAGEMENT CONSULTATION & DIRECT WIRE"
                  title="Schedule an Executive Architecture Review"
                  subtitle="Direct confidential wire with our principal engineering team. Protected under mutual non-disclosure agreement with transparent fixed-scope deliverables."
                  badge="Strict Mutual NDA"
                  badgeColor="cyan"
                  onNavigate={navigateToSection}
                />

                <ErrorBoundary fallbackTitle="Contact & Scoping Portal">
                  <div id="contact">
                    <ContactSection
                      prefilledData={prefilledConsultation}
                      onClearPrefill={() => setPrefilledConsultation(null)}
                    />
                  </div>
                </ErrorBoundary>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onSelectServiceTitle={handleSelectServiceByTitle}
        onNavigateSection={handleFooterNavigate}
      />

      {/* Modals & Overlays */}
      <ErrorBoundary fallbackTitle="Overlay Management">
        {/* Service Detail Modal (Full problem/approach/deliverables/FAQ) */}
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBookConsultation={handleBookForService}
          onSelectRelated={handleSelectRelatedService}
        />

        {/* Social Channel Manager Modal (Allows updating Instagram, Facebook, and YouTube channel names) */}
        <ChannelManagerModal />

        {/* Interactive Multi-Turn AI Cloud & Cyber Advisor with Search Grounding */}
        <AdvisoryChatbot onOpenConsultation={handleOpenConsultationTopic} />
      </ErrorBoundary>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
