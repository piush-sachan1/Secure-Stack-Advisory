import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MultiCloudOpsSection } from './components/MultiCloudOpsSection';
import { DevOpsSection } from './components/DevOpsSection';
import { FinOpsSection } from './components/FinOpsSection';
import { PracticesOverview } from './components/PracticesOverview';
import { FocusAreas } from './components/FocusAreas';
import { RiskAssessmentTool } from './components/RiskAssessmentTool';
import { ComplianceTracker } from './components/ComplianceTracker';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { TeamSection } from './components/TeamSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { WhyUs } from './components/WhyUs';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdvisoryChatbot } from './components/AdvisoryChatbot';
import { SERVICES_LIST } from './data/contentData';
import { ServiceDetail } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedFilterPractice, setSelectedFilterPractice] = useState<string | null>(null);
  const [prefilledConsultation, setPrefilledConsultation] = useState<{
    score: number;
    tier: string;
    recommendedPractice: string;
    keyFindingSummary: string;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    scrollToSection('contact');
  };

  const handleExploreServices = () => {
    scrollToSection('services');
  };

  const handleLaunchAssessment = () => {
    scrollToSection('risk-assessment');
  };

  const handleSelectPractice = (practiceId: string) => {
    setSelectedFilterPractice(practiceId);
    scrollToSection('services');
  };

  const handleOpenConsultationTopic = (topicTitle?: string) => {
    setPrefilledConsultation({
      score: 0,
      tier: 'Scoped Architecture Review',
      recommendedPractice: topicTitle || 'Multi-Cloud & FinOps Architecture',
      keyFindingSummary: `Inquiry for: ${topicTitle || 'Architecture Consultation'}`,
    });
    scrollToSection('contact');
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
    } else {
      scrollToSection('services');
    }
  };

  const handleBookForService = (serviceTitle: string) => {
    setPrefilledConsultation({
      score: 0,
      tier: 'Scoped Inquiry',
      recommendedPractice: serviceTitle,
      keyFindingSummary: `Requested Scoping for: ${serviceTitle}`,
    });
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-sans antialiased">
      {/* Sticky Header */}
      <Header onBookClick={handleBookClick} />

      {/* Main Page Sections */}
      <main id="main-content">
        {/* Hero Section with Trust Metrics */}
        <Hero
          onBookClick={handleBookClick}
          onExploreServices={handleExploreServices}
          onLaunchAssessment={handleLaunchAssessment}
        />

        {/* Hyperscalers (AWS, GCP, Azure) Management & 24/7 SRE Support */}
        <MultiCloudOpsSection
          onSelectPractice={handleSelectPractice}
          onOpenConsultation={handleOpenConsultationTopic}
        />

        {/* Agile DevOps, GitOps, CI/CD Shift-Left & Canary Rollouts */}
        <DevOpsSection onOpenConsultation={handleOpenConsultationTopic} />

        {/* Enterprise FinOps & Multi-Cloud Cost Optimization Sandbox */}
        <FinOpsSection onOpenConsultation={handleOpenConsultationTopic} />

        {/* Specialized Advisory Practices Overview */}
        <PracticesOverview onSelectPractice={handleSelectPractice} />

        {/* Focus Areas Deep Dive (AI Security & Cloud Security) */}
        <FocusAreas
          onLearnMoreAI={handleLearnMoreAI}
          onLearnMoreCloud={handleLearnMoreCloud}
        />

        {/* Centerpiece: Free AI Security Risk Snapshot (Real Gemini Calls) */}
        <RiskAssessmentTool
          onSelectForConsultation={(data) => {
            setPrefilledConsultation(data);
          }}
        />

        {/* SOC 2 & ISO 27001 Compliance Tracker with Progress Rings */}
        <ComplianceTracker onOpenConsultation={handleOpenConsultationTopic} />

        {/* Services Grid (6–8 Cards + Full Detail Modal) */}
        <ServicesGrid
          onSelectService={(service) => setSelectedService(service)}
          selectedFilterPractice={selectedFilterPractice}
        />

        {/* Senior Consultant Profiles */}
        <TeamSection />

        {/* 6-Stage Engagement Timeline */}
        <ProcessTimeline />

        {/* Why Us / Differentiators */}
        <WhyUs />

        {/* Technical Insights & Research Preview */}
        <InsightsSection />

        {/* Final CTA Band & Booking Consultation Form */}
        <ContactSection
          prefilledData={prefilledConsultation}
          onClearPrefill={() => setPrefilledConsultation(null)}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectServiceTitle={handleSelectServiceByTitle}
        onNavigateSection={scrollToSection}
      />

      {/* Service Detail Modal (Full problem/approach/deliverables/FAQ) */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookConsultation={handleBookForService}
      />

      {/* Interactive Multi-Turn AI Cloud & Cyber Advisor with Search Grounding */}
      <AdvisoryChatbot onOpenConsultation={handleOpenConsultationTopic} />
    </div>
  );
}
