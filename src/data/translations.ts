import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  langCode: SupportedLanguage;
  langName: string;
  flag: string;
  marketTarget: string;
  marketBadge: string;
  header: {
    platformsCat: string;
    securityCat: string;
    advisoryCat: string;
    multiCloud: string;
    multiCloudBadge: string;
    devops: string;
    finops: string;
    finopsBadge: string;
    riskTool: string;
    riskToolBadge: string;
    compliance: string;
    complianceBadge: string;
    practices: string;
    catalog: string;
    process: string;
    insights: string;
    bookReview: string;
    sreNocActive: string;
    slaText: string;
    bookMobileCta: string;
    ndaNotice: string;
    switchPrompt: string;
  };
  hero: {
    categoryPillDesktop: string;
    categoryPillMobile: string;
    headlinePart1: string;
    headlineHighlight: string;
    subtitle: string;
    bookCta: string;
    riskCta: string;
    exploreCta: string;
    badgeNda: string;
    badgeSre: string;
    badgeCert: string;
    metric1Label: string;
    metric1Detail: string;
    metric2Label: string;
    metric2Detail: string;
    metric3Label: string;
    metric3Detail: string;
    metric4Label: string;
    metric4Detail: string;
  };
  sections: {
    multiCloudEyebrow: string;
    multiCloudTitle: string;
    multiCloudDesc: string;
    devopsEyebrow: string;
    devopsTitle: string;
    devopsDesc: string;
    finopsEyebrow: string;
    finopsTitle: string;
    finopsDesc: string;
    riskEyebrow: string;
    riskTitle: string;
    riskDesc: string;
    complianceEyebrow: string;
    complianceTitle: string;
    complianceDesc: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesDesc: string;
    processEyebrow: string;
    processTitle: string;
    processDesc: string;
    whyUsEyebrow: string;
    whyUsTitle: string;
    whyUsDesc: string;
    teamEyebrow: string;
    teamTitle: string;
    teamDesc: string;
    insightsEyebrow: string;
    insightsTitle: string;
    insightsDesc: string;
    contactEyebrow: string;
    contactTitle: string;
    contactDesc: string;
    contactBannerTitle: string;
    contactBannerDesc: string;
  };
  socials: {
    sectionTitle: string;
    sectionSubtitle: string;
    editChannelsBtn: string;
    officialBroadcasts: string;
    followNotice: string;
    channelModalTitle: string;
    channelModalDesc: string;
    saveBtn: string;
    resetBtn: string;
    cancelBtn: string;
    successToast: string;
  };
  footer: {
    tagline: string;
    encryptedComms: string;
    directWire: string;
    locations: string;
    rightsReserved: string;
    zeroVendorPolicy: string;
    responsibleDisclosure: string;
    securityPrivacy: string;
    termsEngagement: string;
  };
  chatbot: {
    welcome: string;
    askPill: string;
    title: string;
    subtitle: string;
    suggestedQueriesLabel: string;
    prompts: string[];
    inputPlaceholder: string;
    bookHumanCta: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    langCode: 'en',
    langName: 'English',
    flag: '🇺🇸',
    marketTarget: 'Global Enterprise & US Standard',
    marketBadge: 'Global / NIST & SOC 2',
    header: {
      platformsCat: 'PLATFORMS & SRE',
      securityCat: 'SECURITY & ASSESSMENTS',
      advisoryCat: 'ADVISORY & FIRM',
      multiCloud: 'Multi-Cloud 24/7',
      multiCloudBadge: 'AWS · GCP · Azure',
      devops: 'Agile DevOps & GitOps',
      finops: 'FinOps Optimization',
      finopsBadge: 'ROI Calculator',
      riskTool: 'AI Risk Snapshot Tool',
      riskToolBadge: 'Interactive',
      compliance: 'Compliance Tracker',
      complianceBadge: 'SOC 2 · ISO',
      practices: 'Core Practices',
      catalog: 'Consulting Catalog',
      process: 'Operating Model',
      insights: 'Advisory Insights',
      bookReview: 'Book Review',
      sreNocActive: '24/7 SRE NOC Active',
      slaText: '< 15m Sev-1 SLA',
      bookMobileCta: 'Book Architecture Scoping Call',
      ndaNotice: 'Mutual NDA Enforced · Direct Access to Principals',
      switchPrompt: 'Select Market & Language',
    },
    hero: {
      categoryPillDesktop: 'AWS · GCP · Azure · Agile DevOps · FinOps · AI Security',
      categoryPillMobile: 'Multi-Cloud · DevOps · FinOps · Cyber',
      headlinePart1: 'We architect & defend the infrastructure you ',
      headlineHighlight: 'actually shipped.',
      subtitle: 'Independent cloud, SRE & security advisory for engineering leaders. We streamline AWS, GCP & Azure environments, implement automated agile GitOps rollouts, cut cloud waste by 30%+ via FinOps, and threat-model modern AI systems.',
      bookCta: 'Book Architecture Review',
      riskCta: 'Free AI Risk Snapshot',
      exploreCta: 'Explore Practices',
      badgeNda: 'Mutual NDA Enforced',
      badgeSre: '24/7 Managed SRE',
      badgeCert: 'Tri-Cloud Certified',
      metric1Label: 'Avg. Consultant Experience',
      metric1Detail: 'Direct access to senior principals only',
      metric2Label: 'Complex Assessments',
      metric2Detail: 'Across AI, cloud, and core product stacks',
      metric3Label: 'Engineering Pedigree',
      metric3Detail: 'CISSP, CCSP, OSCP, and Cloud Architect certified',
      metric4Label: 'Multi-Cloud Depth',
      metric4Detail: 'Native primitives, IAM graphs, and K8s fabrics',
    },
    sections: {
      multiCloudEyebrow: 'Hyperscaler Architecture & Managed SRE',
      multiCloudTitle: 'Enterprise Multi-Cloud Infrastructure & 24/7 Operations',
      multiCloudDesc: 'Production-grade landing zones, hardened Kubernetes clusters, and round-the-clock follow-the-sun SRE operations across AWS, GCP, and Azure.',
      devopsEyebrow: 'Delivery Pipeline Engineering',
      devopsTitle: 'Agile DevOps, GitOps & Continuous Delivery',
      devopsDesc: 'Automated ephemeral pull-request environments, progressive canary rollouts, and DORA metrics benchmarking for zero-downtime engineering velocity.',
      finopsEyebrow: 'Unit Economics & Cloud Spend Reduction',
      finopsTitle: 'Enterprise FinOps & Cloud Cost Optimization',
      finopsDesc: 'Reclaim 25% to 40% of cloud spend across AWS, GCP, and Azure without sacrificing latency, throughput, or engineering velocity.',
      riskEyebrow: 'Self-Service Security Evaluation',
      riskTitle: 'AI & Cloud Architecture Risk Diagnostic',
      riskDesc: 'Inspect your LLM integrations, RAG vectors, IAM controls, and data pipelines against industry threat models in under 3 minutes.',
      complianceEyebrow: 'Defensible Governance & Controls',
      complianceTitle: 'Unified Security & Compliance Monitor',
      complianceDesc: 'Live tracking of control evidence across SOC 2 Type II, ISO/IEC 27001, NIST CSF 2.0, BSI C5, and EU NIS-2 directives.',
      servicesEyebrow: 'Catalog of Specialized Engagements',
      servicesTitle: 'Consulting Services & Assessments',
      servicesDesc: 'Tap any service to inspect our named methodology, verification deliverables, and technical scoping criteria.',
      processEyebrow: 'Standard Operating Model',
      processTitle: 'Six-Stage Engagement Lifecycle',
      processDesc: 'Every technical engagement follows an audited, repeatable methodology designed to minimize production disruption while systematically mapping critical trust boundaries.',
      whyUsEyebrow: 'Principled Differentiation',
      whyUsTitle: 'Why Technical Teams Trust SecureStack',
      whyUsDesc: 'We built this advisory because traditional cybersecurity consultancies deliver generic compliance reports while missing the critical exploit paths in modern cloud and AI stacks.',
      teamEyebrow: 'Principal-Led Engagements',
      teamTitle: 'Senior Cloud & Security Practitioners',
      teamDesc: 'Our clients work directly with veteran cloud architects, principal security researchers, and SRE leaders.',
      insightsEyebrow: 'Field Research & Technical Bulletins',
      insightsTitle: 'Advisory Engineering Insights',
      insightsDesc: 'Deep-dive architectural teardowns, incident post-mortems, and technical implementation guides authored by our advisory principals.',
      contactEyebrow: 'Technical Engagement Inquiries',
      contactTitle: 'Confidential Scoping',
      contactDesc: 'All communications and architecture disclosures are held strictly confidential. We execute bilateral non-disclosure agreements prior to reviewing system topology diagrams.',
      contactBannerTitle: 'Ready to eliminate critical attack surfaces before your adversaries find them?',
      contactBannerDesc: 'Book a 30-minute confidential scoping call with a senior security engineer. We will review your architecture under mutual NDA and provide a definitive assessment proposal within 48 hours.',
    },
    socials: {
      sectionTitle: 'Official Media & Technical Channels',
      sectionSubtitle: 'Direct broadcasts, teardown video series, and security alerts from our engineering team.',
      editChannelsBtn: 'Edit Channel Names',
      officialBroadcasts: 'Official Media Channels & Technical Broadcasts',
      followNotice: 'Follow for real-time CVE alerts, cloud architecture benchmarks, and live webinars.',
      channelModalTitle: 'Configure Social Media & Broadcast Channels',
      channelModalDesc: 'Update the channel handles, names, and links displayed across the advisory portal.',
      saveBtn: 'Save Channel Names',
      resetBtn: 'Reset to Defaults',
      cancelBtn: 'Cancel',
      successToast: 'Channel names updated successfully across the site.',
    },
    footer: {
      tagline: 'Engineering-first cloud, SRE & cybersecurity advisory for technical leaders. We design multi-cloud landing zones, implement automated agile GitOps rollouts, cut cloud waste via FinOps, and threat-model AI architectures under real adversarial conditions.',
      encryptedComms: 'Encrypted Comms',
      directWire: 'Direct Wire',
      locations: 'Offices',
      rightsReserved: 'All rights reserved. Operating under mutual confidentiality agreements.',
      zeroVendorPolicy: 'Zero Vendor Resale Policy',
      responsibleDisclosure: 'Responsible Disclosure',
      securityPrivacy: 'Security & Privacy',
      termsEngagement: 'Terms of Engagement',
    },
    chatbot: {
      welcome: "Welcome to SecureStack Advisory. I am your Lead Cloud & Security Advisory Engineer. Ask me anything regarding Multi-Cloud Architecture (AWS, GCP, Azure), 24/7 Managed SRE Operations, Agile DevOps/GitOps deployment pipelines, FinOps cost reduction, or AI Threat Modeling. All queries are backed by real-time Google Search grounding.",
      askPill: "Ask AI Advisor",
      title: "Cloud & Cyber Advisor",
      subtitle: "AWS · GCP · Azure · DevOps · FinOps",
      suggestedQueriesLabel: "Suggested Architecture Queries:",
      prompts: [
        "How can we reduce AWS NAT Gateway transfer costs?",
        "Azure Landing Zones vs AWS Control Tower key differences",
        "Trunk-based deployment pipeline with automated canary rollback",
        "GCP BigQuery FinOps & slot reservation optimization",
        "NIST AI RMF & OWASP Top 10 for LLM prompt injection defenses",
      ],
      inputPlaceholder: "Ask about AWS, GCP, Azure, GitOps, or FinOps...",
      bookHumanCta: "Book Human Principal Review",
    },
  },
  de: {
    langCode: 'de',
    langName: 'Deutsch',
    flag: '🇩🇪',
    marketTarget: 'DACH, BSI C5 & NIS-2 Cyber-Markt',
    marketBadge: 'DACH / NIS-2 & BSI C5',
    header: {
      platformsCat: 'PLATTFORMEN & SRE',
      securityCat: 'SICHERHEIT & AUDITS',
      advisoryCat: 'BERATUNG & KANZLEI',
      multiCloud: 'Multi-Cloud 24/7',
      multiCloudBadge: 'AWS · GCP · Azure',
      devops: 'Agile DevOps & GitOps',
      finops: 'FinOps-Optimierung',
      finopsBadge: 'ROI-Kalkulator',
      riskTool: 'KI-Risiko-Snapshot-Tool',
      riskToolBadge: 'Interaktiv',
      compliance: 'Compliance-Monitor',
      complianceBadge: 'NIS-2 · SOC 2 · ISO',
      practices: 'Kernbereiche',
      catalog: 'Beratungskatalog',
      process: 'Vorgehensmodell',
      insights: 'Fachartikel & Analysen',
      bookReview: 'Prüfung buchen',
      sreNocActive: '24/7 SRE-Leitstand aktiv',
      slaText: '< 15 Min Sev-1 SLA',
      bookMobileCta: 'Architekturprüfung anfragen',
      ndaNotice: 'Gegenseitige Vertraulichkeitsvereinbarung (NDA) · Direkter Partnerzugang',
      switchPrompt: 'Markt- & Sprachauswahl',
    },
    hero: {
      categoryPillDesktop: 'AWS · GCP · Azure · Agile DevOps · FinOps · KI-Sicherheit (NIS-2 / BSI C5)',
      categoryPillMobile: 'Multi-Cloud · DevOps · FinOps · Cyber',
      headlinePart1: 'Wir sichern & optimieren die Infrastruktur, die Sie ',
      headlineHighlight: 'tatsächlich betreiben.',
      subtitle: 'Unabhängige Cloud-, SRE- und Cybersicherheits-Beratung für technische Führungskräfte. Wir auditieren AWS-, GCP- und Azure-Umgebungen, implementieren automatisierte GitOps-Pipelines, senken Cloud-Ausgaben um 30%+ und schützen moderne KI-Systeme nach BSI- und NIS-2-Standards.',
      bookCta: 'Architekturprüfung buchen',
      riskCta: 'Kostenloser KI-Risiko-Snapshot',
      exploreCta: 'Kernbereiche ansehen',
      badgeNda: 'Gegenseitige NDA-Garantie',
      badgeSre: '24/7 Verwaltetes SRE-NOC',
      badgeCert: 'Tri-Cloud & BSI-zertifiziert',
      metric1Label: 'Ø Beratererfahrung',
      metric1Detail: 'Ausschließlicher Direktkontakt zu leitenden Principals',
      metric2Label: 'Komplexe Audits',
      metric2Detail: 'Für KI-Systeme, Hyperscaler und Kerninfrastrukturen',
      metric3Label: 'Zertifizierungsgrad',
      metric3Detail: 'CISSP, CCSP, OSCP und BSI C5 Lead Auditor akkreditiert',
      metric4Label: 'Multi-Cloud-Tiefe',
      metric4Detail: 'Native IAM-Graphen, Terraform-Fabrics und K8s-Cluster',
    },
    sections: {
      multiCloudEyebrow: 'Hyperscaler-Architektur & Verwaltetes SRE',
      multiCloudTitle: 'Enterprise Multi-Cloud-Infrastruktur & 24/7 Leitstand',
      multiCloudDesc: 'Produktionsreife Landing Zones, gehärtete Kubernetes-Cluster und 24/7 Follow-the-Sun-SRE-Betrieb für AWS, Google Cloud und Microsoft Azure.',
      devopsEyebrow: 'Lieferpipeline-Engineering',
      devopsTitle: 'Agile DevOps, GitOps & Kontinuierliche Bereitstellung',
      devopsDesc: 'Automatisierte temporäre PR-Testumgebungen, progressive Canary-Rollouts und DORA-Benchmarking für unterbrechungsfreie Softwarebereitstellung.',
      finopsEyebrow: 'Einheitenökonomie & Cloud-Kostenreduktion',
      finopsTitle: 'Enterprise FinOps & Cloud-Kostenoptimierung',
      finopsDesc: 'Rückgewinnung von 25% bis 40% der monatlichen Cloud-Ausgaben in AWS, GCP und Azure ohne Beeinträchtigung von Latenz oder Systemzuverlässigkeit.',
      riskEyebrow: 'Interaktive Sicherheitsbewertung',
      riskTitle: 'KI- & Cloud-Architektur Risiko-Diagnostik',
      riskDesc: 'Überprüfen Sie Ihre LLM-Integrationen, RAG-Vektordatenbanken, IAM-Richtlinien und Datenpipelines in unter 3 Minuten auf kritische Schwachstellen.',
      complianceEyebrow: 'Nachweisbare Governance & BSI-Konformität',
      complianceTitle: 'Zentraler Sicherheits- und Compliance-Monitor',
      complianceDesc: 'Echtzeit-Nachweisführung für EU NIS-2, BSI C5 (Cloud Computing Compliance Criteria), ISO/IEC 27001, SOC 2 Type II und DSGVO.',
      servicesEyebrow: 'Katalog Spezialisierter Beratungsengagements',
      servicesTitle: 'Beratungsdienste & Architekturbewertungen',
      servicesDesc: 'Klicken Sie auf ein Engagement, um Vorgehensmethodik, Prüfungsdokumente und technische Scoping-Kriterien im Detail zu inspizieren.',
      processEyebrow: 'Standardisiertes Betriebsmodell',
      processTitle: '6-Phasen-Engagements-Lebenszyklus',
      processDesc: 'Jedes technische Mandat folgt einer auditierten, wiederholbaren Methodik zur Minimierung von Produktionsstörungen bei systematischer Analyse aller Vertrauensgrenzen.',
      whyUsEyebrow: 'Fundierte Differenzierung',
      whyUsTitle: 'Warum führende Tech-Unternehmen SecureStack vertrauen',
      whyUsDesc: 'Wir haben diese Kanzlei gegründet, weil herkömmliche Beratungsunternehmen oft unzureichende Checklisten-Berichte liefern, während reale Exploit-Pfade im Cloud- und KI-Stack unentdeckt bleiben.',
      teamEyebrow: 'Principal-Geführte Mandate',
      teamTitle: 'Leitende Cloud- & Cybersicherheits-Experten',
      teamDesc: 'Unsere Mandanten arbeiten direkt mit erfahrenen Cloud-Architekten, Sicherheitsforschern und SRE-Direktoren zusammen.',
      insightsEyebrow: 'Forschungsberichte & Technische Bulletins',
      insightsTitle: 'Architektur-Analysen & Fachberichte',
      insightsDesc: 'Tiefgehende Analysen realer Zwischenfälle, Post-Mortems und technische Implementierungsleitfäden von unseren leitenden Beratern.',
      contactEyebrow: 'Technische Anfragen & Mandatsprüfung',
      contactTitle: 'Vertrauliche Technische Erstberatung',
      contactDesc: 'Sämtliche Kommunikationen und Architekturunterlagen unterliegen strengster Vertraulichkeit. Wir schließen vor Beginn eine gegenseitige NDA-Vereinbarung ab.',
      contactBannerTitle: 'Bereit, kritische Angriffsflächen zu schließen, bevor Angreifer sie finden?',
      contactBannerDesc: 'Vereinbaren Sie ein 30-minütiges vertrauliches Scoping-Gespräch mit einem leitenden Sicherheitsingenieur. Unter beidseitiger NDA erhalten Sie innerhalb von 48 Stunden ein verbindliches Prüfungskonzept.',
    },
    socials: {
      sectionTitle: 'Offizielle Medienkanäle & Technische Briefings',
      sectionSubtitle: 'Direkte Video-Teardowns, Live-Briefings und Sicherheitswarnungen unseres Engineering-Teams.',
      editChannelsBtn: 'Kanalnamen bearbeiten',
      officialBroadcasts: 'Offizielle Medienkanäle & Technische Übertragungen',
      followNotice: 'Abonnieren Sie für Zero-Day-Warnungen, Cloud-Architektur-Benchmarks und Experten-Webinare.',
      channelModalTitle: 'Social-Media- & Broadcast-Kanäle konfigurieren',
      channelModalDesc: 'Aktualisieren Sie Kanalnamen, Benutzernamen und Links für das gesamte Portal.',
      saveBtn: 'Kanalnamen speichern',
      resetBtn: 'Auf Standard zurücksetzen',
      cancelBtn: 'Abbrechen',
      successToast: 'Kanalnamen wurden erfolgreich im gesamten Portal aktualisiert.',
    },
    footer: {
      tagline: 'Engineering-getriebene Cloud-, SRE- und Cybersicherheits-Beratung für technische Entscheider. Wir konzipieren Multi-Cloud-Landing-Zones, implementieren automatisierte GitOps-Pipelines, senken Cloud-Kosten via FinOps und prüfen KI-Architekturen unter realen Bedingungen.',
      encryptedComms: 'Verschlüsselte Kommunikation',
      directWire: 'Direkter Telefonanschluss',
      locations: 'Standorte',
      rightsReserved: 'Alle Rechte vorbehalten. Tätig unter gegenseitigen Vertraulichkeitsvereinbarungen.',
      zeroVendorPolicy: 'Reine Unabhängigkeit ohne Hersteller-Wiederverkauf',
      responsibleDisclosure: 'Responsible Disclosure',
      securityPrivacy: 'Sicherheit & Datenschutz',
      termsEngagement: 'Mandatsbedingungen',
    },
    chatbot: {
      welcome: "Willkommen bei SecureStack Advisory. Ich bin Ihr Lead Cloud- & Sicherheitsberater. Stellen Sie mir Fragen zu Multi-Cloud-Architekturen (AWS, GCP, Azure), 24/7 SRE-Betrieb, GitOps-Bereitstellungspipelines, FinOps-Kostenoptimierung oder KI-Bedrohungsmodellen (BSI C5 & NIS-2). Gestützt durch Google-Suche in Echtzeit.",
      askPill: "KI-Berater fragen",
      title: "Cloud- & Cyber-Berater",
      subtitle: "AWS · GCP · Azure · DevOps · FinOps",
      suggestedQueriesLabel: "Empfohlene Architektur-Abfragen:",
      prompts: [
        "Wie senken wir AWS NAT Gateway-Transferkosten?",
        "Unterschiede Azure Landing Zones vs AWS Control Tower",
        "Trunk-basierte GitOps-Pipeline mit automatischem Canary-Rollback",
        "GCP BigQuery FinOps & Slot-Reservierungsoptimierung",
        "NIST AI RMF & OWASP Top 10 Abwehrmaßnahmen gegen Prompt Injections",
      ],
      inputPlaceholder: "Fragen zu AWS, GCP, Azure, GitOps oder FinOps...",
      bookHumanCta: "Architekturprüfung mit Principal buchen",
    },
  },
  fr: {
    langCode: 'fr',
    langName: 'Français',
    flag: '🇫🇷',
    marketTarget: 'Marché Européen, ANSSI & NIS-2',
    marketBadge: 'UE / NIS-2 & ANSSI',
    header: {
      platformsCat: 'PLATEFORMES & SRE',
      securityCat: 'SÉCURITÉ & AUDITS',
      advisoryCat: 'CONSEIL & CABINET',
      multiCloud: 'Multi-Cloud 24/7',
      multiCloudBadge: 'AWS · GCP · Azure',
      devops: 'DevOps Agile & GitOps',
      finops: 'Optimisation FinOps',
      finopsBadge: 'Calculateur ROI',
      riskTool: 'Diagnostic Risque IA',
      riskToolBadge: 'Interactif',
      compliance: 'Suivi Conformité',
      complianceBadge: 'NIS-2 · SOC 2 · ISO',
      practices: 'Domaines Clés',
      catalog: 'Catalogue de Conseil',
      process: 'Méthodologie',
      insights: 'Analyses & Veille',
      bookReview: 'Planifier Audit',
      sreNocActive: 'NOC SRE 24/7 Actif',
      slaText: '< 15m SLA Sev-1',
      bookMobileCta: 'Demander un Audit d’Architecture',
      ndaNotice: 'Accord NDA bilatéral · Accès direct aux associés',
      switchPrompt: 'Sélectionner Marché & Langue',
    },
    hero: {
      categoryPillDesktop: 'AWS · GCP · Azure · DevOps Agile · FinOps · Sécurité IA (NIS-2 / ANSSI)',
      categoryPillMobile: 'Multi-Cloud · DevOps · FinOps · Cyber',
      headlinePart1: 'Nous sécurisons & optimisons l’infrastructure que vous avez ',
      headlineHighlight: 'réellement déployée.',
      subtitle: 'Cabinet indépendant d’ingénierie Cloud, SRE et Cybersécurité pour dirigeants techniques. Nous auditions vos environnements AWS, GCP et Azure, industrialisons vos pipelines GitOps, réduisons vos coûts de 30%+ et sécurisons vos architectures d’IA moderne.',
      bookCta: 'Planifier un Audit d’Architecture',
      riskCta: 'Diagnostic Risque IA Gratuit',
      exploreCta: 'Explorer les Pratiques',
      badgeNda: 'Garantie NDA Bilatérale',
      badgeSre: 'Supervision SRE Managée 24/7',
      badgeCert: 'Certifications Tri-Cloud & SecNum',
      metric1Label: 'Expérience Moyenne',
      metric1Detail: 'Contact direct exclusif avec des associés seniors',
      metric2Label: 'Missions Complexes',
      metric2Detail: 'Systèmes d’IA, hyperscalers et infrastructures critiques',
      metric3Label: 'Excellence Technique',
      metric3Detail: 'Certifiés CISSP, CCSP, OSCP et architectes Cloud',
      metric4Label: 'Expertise Multi-Cloud',
      metric4Detail: 'Graphes IAM natifs, matrices Terraform et fabrics K8s',
    },
    sections: {
      multiCloudEyebrow: 'Architecture Hyperscaler & SRE Managé',
      multiCloudTitle: 'Infrastructures Multi-Cloud & Centre Opérationnel 24/7',
      multiCloudDesc: 'Landing zones prêtes pour la production, clusters Kubernetes durcis et supervision SRE follow-the-sun 24/7 sur AWS, GCP et Azure.',
      devopsEyebrow: 'Ingénierie de Livraison Continue',
      devopsTitle: 'DevOps Agile, GitOps & Déploiement Continu',
      devopsDesc: 'Environnements de test éphémères par PR, déploiements canary progressifs et métriques DORA pour une vélocité sans interruption.',
      finopsEyebrow: 'Économie Unitaire & Réduction des Coûts',
      finopsTitle: 'FinOps Entreprise & Optimisation Budgétaire Cloud',
      finopsDesc: 'Récupérez de 25% à 40% de vos dépenses cloud sur AWS, GCP et Azure sans compromettre la latence ni la cadence de développement.',
      riskEyebrow: 'Évaluation Sécurité en Libre-Service',
      riskTitle: 'Diagnostic de Risque IA & Architecture Cloud',
      riskDesc: 'Évaluez vos intégrations LLM, bases vectorielles RAG et contrôles IAM face aux menaces réelles en moins de 3 minutes.',
      complianceEyebrow: 'Gouvernance & Conformité Réglementaire',
      complianceTitle: 'Moniteur Centralisé de Sécurité & Conformité',
      complianceDesc: 'Suivi continu des preuves de conformité pour la directive UE NIS-2, ISO/IEC 27001, SOC 2 Type II et le RGPD.',
      servicesEyebrow: 'Catalogue d’Engagements Spécialisés',
      servicesTitle: 'Services de Conseil & Audits d’Architecture',
      servicesDesc: 'Consultez les méthodologies, livrables certifiés et critères de cadrage technique de chaque engagement.',
      processEyebrow: 'Modèle Opératoire Standardisé',
      processTitle: 'Cycle d’Engagement en Six Étapes',
      processDesc: 'Chaque mission technique s’appuie sur une méthodologie auditée et reproductible pour limiter tout impact en production.',
      whyUsEyebrow: 'Différenciation Fondée sur l’Ingénierie',
      whyUsTitle: 'Pourquoi les Équipes Techniques Choisissent SecureStack',
      whyUsDesc: 'Nous avons créé ce cabinet car les auditeurs traditionnels livrent des rapports théoriques sans identifier les réels chemins d’attaque dans le Cloud et l’IA.',
      teamEyebrow: 'Missions Menées par des Associés',
      teamTitle: 'Experts Seniors Cloud & Cybersécurité',
      teamDesc: 'Nos clients échangent directement avec des architectes cloud expérimentés et des chercheurs en cybersécurité reconnus.',
      insightsEyebrow: 'Recherche Appliquée & Bulletins Techniques',
      insightsTitle: 'Notes de Synthèse & Analyses d’Architecture',
      insightsDesc: 'Retours d’expérience techniques, autopsies d’incidents réels et guides d’implémentation rédigés par nos consultants seniors.',
      contactEyebrow: 'Demandes Techniques & Cadrage',
      contactTitle: 'Cadrage Technique Confidentiel',
      contactDesc: 'Toutes les communications et schémas d’architecture sont strictement confidentiels. Nous signons un accord de non-divulgation avant tout échange.',
      contactBannerTitle: 'Prêt à éliminer les vulnérabilités critiques avant vos adversaires ?',
      contactBannerDesc: 'Réservez un échange de cadrage confidentiel de 30 minutes avec un ingénieur senior en sécurité sous accord NDA.',
    },
    socials: {
      sectionTitle: 'Chaînes Officielles & Médias Techniques',
      sectionSubtitle: 'Vidéos de décorticage d’architectures, alertes de sécurité et webinaires de notre équipe d’ingénierie.',
      editChannelsBtn: 'Modifier les Noms de Chaînes',
      officialBroadcasts: 'Chaînes Officielles & Diffusions Techniques',
      followNotice: 'Suivez nos alertes vulnérabilités zéro-day, benchmarks cloud et séminaires en direct.',
      channelModalTitle: 'Configurer les Chaînes Médias & Réseaux Sociaux',
      channelModalDesc: 'Mettez à jour les noms, identifiants et liens des chaînes diffusés sur le portail.',
      saveBtn: 'Enregistrer les Noms',
      resetBtn: 'Restaurer par Défaut',
      cancelBtn: 'Annuler',
      successToast: 'Les noms de chaînes ont été mis à jour avec succès.',
    },
    footer: {
      tagline: 'Cabinet de conseil en ingénierie Cloud, SRE et Cybersécurité pour dirigeants techniques. Conception de landing zones multi-cloud, déploiements GitOps automatisés, optimisation FinOps et audit d’IA en conditions réelles.',
      encryptedComms: 'Communications Chiffrées',
      directWire: 'Ligne Directe',
      locations: 'Bureaux',
      rightsReserved: 'Tous droits réservés. Interventions sous accords bilatéraux de confidentialité.',
      zeroVendorPolicy: 'Politique stricte de non-revente de logiciels tiers',
      responsibleDisclosure: 'Divulgation Responsable',
      securityPrivacy: 'Sécurité & Données Privées',
      termsEngagement: 'Conditions Générales d’Engagement',
    },
    chatbot: {
      welcome: "Bienvenue sur SecureStack Advisory. Je suis votre Ingénieur Principal Conseil Cloud & Cybersécurité. Posez-moi vos questions sur les architectures multi-cloud (AWS, GCP, Azure), les opérations SRE 24/7, l'intégration GitOps, l'optimisation FinOps ou les audits de sécurité IA (SecNum & NIS-2). Réponses appuyées par la recherche Google en temps réel.",
      askPill: "Poser une question à l'IA",
      title: "Conseiller Cloud & Cyber",
      subtitle: "AWS · GCP · Azure · DevOps · FinOps",
      suggestedQueriesLabel: "Suggestions d'architectures :",
      prompts: [
        "Comment réduire les coûts de transit AWS NAT Gateway ?",
        "Différences clés entre Azure Landing Zones et AWS Control Tower",
        "Pipeline GitOps trunk-based avec rollback automatique canary",
        "Optimisation FinOps des slots de réservation GCP BigQuery",
        "NIST AI RMF & Top 10 OWASP contre les injections de prompt",
      ],
      inputPlaceholder: "Interrogez sur AWS, GCP, Azure, GitOps ou FinOps...",
      bookHumanCta: "Prendre RDV avec un Architecte Principal",
    },
  },
};
