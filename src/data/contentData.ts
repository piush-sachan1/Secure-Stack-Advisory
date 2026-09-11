import {
  PracticeArea,
  ServiceDetail,
  ConsultantProfile,
  ProcessStage,
  InsightPost,
  CloudPlatformSpec,
  DevOpsAgilePractice,
  FinOpsOptimizationItem,
} from '../types';

export const COMPANY_INFO = {
  name: "SecureStack Advisory",
  tagline: "Engineering-First Security for Modern Cloud & AI Architectures",
  heroSubtitle: "We evaluate the architecture you actually shipped — identifying exploitable flaws in AI systems, cloud infrastructure, and software delivery pipelines before adversaries do.",
  email: "advisory@securestack.io",
  phone: "+1 (415) 890-4128",
  pgpKeyId: "4A9E 810C 2B77 D30F 99E1",
  locations: ["San Francisco, CA", "New York, NY", "London, UK"],
  foundedYear: "2019",
};

export const TRUST_METRICS = [
  {
    value: "14+",
    label: "Avg. Consultant Experience",
    detail: "Direct access to senior principals only",
  },
  {
    value: "240+",
    label: "Complex Assessments",
    detail: "Across AI, cloud, and core product stacks",
  },
  {
    value: "100%",
    label: "Engineering Pedigree",
    detail: "CISSP, CCSP, OSCP, and Cloud Architect certified",
  },
  {
    value: "AWS · GCP · Azure",
    label: "Multi-Cloud Depth",
    detail: "Native primitives, IAM graphs, and K8s fabrics",
  },
];

export const PRACTICES: PracticeArea[] = [
  {
    id: "ai-security",
    title: "AI Security & Governance",
    tagline: "Threat modeling and adversarial testing for LLM, RAG, and agentic workflows.",
    description: "Defend against prompt injection, insecure deserialization, vector exfiltration, and unauthorized autonomous tool execution with defensible controls aligned to NIST AI RMF and ISO/IEC 42001.",
    serviceCount: 4,
    highlightCapabilities: [
      "LLM & Agentic Threat Modeling",
      "Indirect Prompt Injection Testing",
      "Vector / RAG Isolation Audits",
      "NIST AI RMF & ISO 42001 Mapping",
    ],
    icon: "Cpu",
  },
  {
    id: "multi-cloud-ops",
    title: "Multi-Cloud Operations & 24/7 SRE",
    tagline: "AWS, GCP & Azure environment architecture, landing zones, and 24/7 managed operations.",
    description: "Turnkey multi-cloud environments built on Terraform/OpenTofu. We provide round-the-clock 24/7 follow-the-sun SRE monitoring, 15-minute Sev-1 response SLAs, and automated incident runbooks.",
    serviceCount: 5,
    highlightCapabilities: [
      "AWS, GCP & Azure Landing Zones",
      "24/7 Incident Response & 15m SLA",
      "Terraform / OpenTofu IaC Fabrics",
      "Multi-Region Failover & Disaster Recovery",
    ],
    icon: "Cloud",
  },
  {
    id: "agile-devops",
    title: "Agile DevOps & CI/CD Delivery",
    tagline: "High-velocity GitOps, trunk-based delivery, and automated zero-downtime canary pipelines.",
    description: "Ship software multiple times per day with absolute confidence. We engineer ephemeral test environments per PR, progressive canary rollouts with automated rollback, and DORA elite metrics.",
    serviceCount: 4,
    highlightCapabilities: [
      "Trunk-Based GitOps & Ephemeral PR Envs",
      "Zero-Downtime Blue/Green & Canary Releases",
      "Automated SLO Metric Rollback Gates",
      "DORA Elite Benchmarking & Telemetry",
    ],
    icon: "Terminal",
  },
  {
    id: "finops-optimization",
    title: "Enterprise FinOps & Cloud Cost Reduction",
    tagline: "Unit economics, automated waste elimination, and commitment portfolio engineering.",
    description: "Reclaim 25% to 40% of cloud spend across AWS, GCP, and Azure without sacrificing performance. We implement the FinOps Foundation lifecycle (Inform, Optimize, Operate) and PR cost gates.",
    serviceCount: 4,
    highlightCapabilities: [
      "Multi-Cloud Waste Reclamation Scrapers",
      "Savings Plans, Azure RI & GCP CUD Arbitrage",
      "Kubernetes Compute & Memory Rightsizing",
      "Infracost Pull Request Cost Guardrails",
    ],
    icon: "TrendingDown",
  },
  {
    id: "devsecops",
    title: "DevSecOps & Application Security",
    tagline: "Secure SDLC engineering, CI/CD pipeline defense, and high-impact penetration testing.",
    description: "Embed automated security gates into GitHub Actions, GitLab, and ArgoCD without degrading developer velocity. Replace cosmetic compliance checklists with exploit-driven application reviews.",
    serviceCount: 5,
    highlightCapabilities: [
      "CI/CD Supply Chain Hardening",
      "Infrastructure as Code (IaC) Gates",
      "Source Code & API Pen Testing",
      "Sigstore Cosign & Artifact Provenance",
    ],
    icon: "ShieldCheck",
  },
  {
    id: "advisory-compliance",
    title: "Advisory & Sovereign Compliance",
    tagline: "Pragmatic security leadership, SOC 2 / ISO 27001 readiness, and incident response.",
    description: "Bridging board-level governance with hands-on infrastructure reality. We build verifiable security programs, architect defensible audit postures, and simulate adversary breaches through purple teaming.",
    serviceCount: 4,
    highlightCapabilities: [
      "Fractional CISO & Security Roadmaps",
      "SOC 2 Type II & ISO 27001 Readiness",
      "Breach & Ransomware Tabletop Drills",
      "Third-Party Vendor Risk Frameworks",
    ],
    icon: "Award",
  },
];

export const FOCUS_AREAS = {
  aiSecurity: {
    badge: "Specialized Discipline",
    title: "AI & LLM Threat Modeling Under Real Adversarial Conditions",
    problem: "Most enterprise AI deployments bolt LLMs directly onto internal databases and tool execution layers with zero boundary isolation. Traditional WAFs and static scanners cannot catch indirect prompt injection, poisoned RAG context, or compromised agentic tool calls that execute destructive database mutations.",
    capabilities: [
      {
        title: "Agentic Tool Execution Boundaries",
        detail: "We audit parameter validation, token scope limitations, and privilege boundaries for AI agents invoking external APIs or DB transactions.",
      },
      {
        title: "Prompt Injection & Jailbreak Simulation",
        detail: "Adversarial testing targeting both direct user inputs and secondary indirect injection vectors hidden inside retrieved vector chunks.",
      },
      {
        title: "Vector Ingestion & Embedding Protection",
        detail: "Verification of tenant segregation, metadata filter enforcement, and access control validation within vector stores (Pinecone, pgvector, Qdrant).",
      },
      {
        title: "Governance Aligned to NIST AI RMF & ISO 42001",
        detail: "Actionable translation of regulatory standards into concrete architectural gates, data provenance logs, and risk registers your engineers can actually ship.",
      },
    ],
  },
  cloudSecurity: {
    badge: "Cloud Infrastructure",
    title: "Cloud Architecture Hardening & Identity Boundary Enforcement",
    problem: "Modern cloud breaches rarely exploit zero-day kernel vulnerabilities; they exploit misconfigured trust relationships, wildcard IAM role assumptions, and unmonitored egress paths. We evaluate your actual Terraform states, identity federation graphs, and Kubernetes manifests to eliminate lateral movement vectors.",
    capabilities: [
      {
        title: "Effective Permission Graph Analysis",
        detail: "We map transitive IAM permissions across AWS Organization SCPs, IAM roles, and GCP Service Accounts to strip latent privilege escalation paths.",
      },
      {
        title: "Production Kubernetes Hardening",
        detail: "Auditing admission controllers (Kyverno/OPA), pod security standards, container runtime isolation, and cluster network micro-segmentation.",
      },
      {
        title: "Detection Engineering & Telemetry Auditing",
        detail: "Validating that AWS GuardDuty, Security Hub, or Google Cloud Security Command Center generate actionable alerts tested against simulated adversarial commands.",
      },
      {
        title: "Secure Cloud Egress & Micro-Segmentation",
        detail: "Designing zero-trust egress filtering, Transit Gateway architectures, and VPC Service Controls to prevent exfiltration during container compromise.",
      },
    ],
  },
};

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: "ai-security-review",
    practiceId: "ai-security",
    title: "AI Security & Red Teaming",
    tagline: "Adversarial evaluation of LLMs, RAG retrieval pipelines, and autonomous agent tool loops.",
    shortDescription: "Comprehensive threat modeling and penetration testing targeting model manipulation, prompt injection, data exfiltration, and excessive agency.",
    problem: "Engineering teams are deploying generative AI features into customer-facing products at breakneck speed. Standard security testing tools cannot evaluate stochastic systems, leaving applications exposed to prompt jailbreaks, tenant-data leakage via RAG context, and malicious tool invocation.",
    methodology: [
      {
        phase: "Phase 1: Architecture & Data Flow Mapping",
        description: "We review prompt assembly pipelines, vector embedding retrieval tiers, system prompts, and tool schema definitions to map trust boundaries.",
      },
      {
        phase: "Phase 2: Adversarial Injection & Jailbreak Testing",
        description: "Hands-on blackbox and whitebox testing simulating direct jailbreaks, multi-turn payload smuggling, and indirect prompt injection through external documents.",
      },
      {
        phase: "Phase 3: Agentic Tool Privilege Escalation",
        description: "Testing whether the LLM can be manipulated into executing unauthorized tools, mutating sensitive DB records, or performing SSRF against internal microservices.",
      },
      {
        phase: "Phase 4: Mitigation Engineering & Guardrail Integration",
        description: "Delivering drop-in validation patterns, schema strictness rules, and automated telemetry alerts to block recurrence.",
      },
    ],
    deliverables: [
      "Executive Technical Risk Briefing with prioritized exploit paths",
      "Detailed Proof-of-Concept exploit scripts demonstrating vulnerable injection surfaces",
      "Remediation guidance with concrete code examples (Python/TypeScript/Terraform)",
      "NIST AI RMF 1.0 & OWASP Top 10 for LLM compliance cross-walk",
    ],
    faq: [
      {
        question: "Do you need access to our model weights or training cluster?",
        answer: "No. For proprietary or closed API models (OpenAI, Anthropic, Gemini), we evaluate the application layer, system prompts, retrieval pipelines, and tool execution boundaries. For self-hosted open models, architecture reviews are conducted without touching raw weight arrays.",
      },
      {
        question: "How does this differ from traditional web app penetration testing?",
        answer: "Standard web pen testing inspects deterministic protocols (SQL injection, XSS). AI security evaluates probabilistic decision logic, semantic jailbreaks, context window poisoning, and autonomous function calling privileges.",
      },
      {
        question: "What is the typical engagement duration?",
        answer: "Standard AI Security Assessments run between 2 to 3 weeks depending on the number of model integration points, vector stores, and external tool endpoints.",
      },
    ],
    tags: ["LLM Threat Modeling", "Prompt Injection", "RAG Security", "NIST AI RMF", "Agent Guardrails"],
  },
  {
    id: "devsecops-pipeline",
    practiceId: "devsecops",
    title: "DevSecOps & Pipeline Hardening",
    tagline: "Embed non-blocking security guardrails directly into GitHub, GitLab, and ArgoCD workflows.",
    shortDescription: "Auditing CI/CD runners, secret sprawl, third-party GitHub Actions provenance, and automated IaC verification gates.",
    problem: "Developers bypass security tools that generate false-positive noise or slow build times down by 30 minutes. Meanwhile, attacker groups weaponize CI/CD runner environments and software supply chain vulnerabilities.",
    methodology: [
      { phase: "Audit", description: "Review runner topologies, token lifetime defaults, and secret storage practices." },
      { phase: "Hardening", description: "Configure OpenID Connect (OIDC) to eliminate long-lived cloud keys from CI/CD runners." },
      { phase: "Automation", description: "Implement pre-commit and PR-level static analysis with low false-positive rule tuning." },
    ],
    deliverables: [
      "Hardened GitHub Actions / GitLab CI pipeline definitions",
      "OIDC Cloud Provider configuration scripts (AWS IAM / GCP Workload Identity)",
      "Supply chain provenance validation checklist (SLSA Level 2+)",
    ],
    faq: [
      {
        question: "Will this slow down our development release cycles?",
        answer: "No. Our philosophy is zero-friction gates: pre-receive hooks run under 2 seconds, and heavy container analysis runs asynchronously without blocking hotfix branches.",
      },
    ],
    tags: ["CI/CD Security", "OIDC", "Supply Chain", "IaC Scanning", "SLSA"],
  },
  {
    id: "appsec-pentest",
    practiceId: "devsecops",
    title: "Application Security & Pentesting",
    tagline: "Manual, adversarial penetration testing of modern Single Page Apps, GraphQL, and microservices.",
    shortDescription: "In-depth testing focusing on complex business logic flaws, broken object-level authorization (BOLA), and multi-tenant isolation.",
    problem: "Automated vulnerability scanners miss 90% of business logic bypasses and authorization flaws. Skeptical enterprise buyers require evidence of rigorous, human-driven adversarial testing.",
    methodology: [
      { phase: "Reconnaissance", description: "API reverse engineering, endpoint enumeration, and authorization state discovery." },
      { phase: "Exploitation", description: "Manual manipulation of tenant tokens, IDOR parameters, and race conditions." },
      { phase: "Reporting", description: "Documented reproductions with curl commands, raw HTTP traces, and fix pull requests." },
    ],
    deliverables: [
      "Attestation letter suitable for enterprise customer vendor risk reviews",
      "Comprehensive vulnerability report with CVSS 3.1 scoring and business impact mapping",
      "Free retesting of all patched vulnerabilities within 60 days",
    ],
    faq: [
      {
        question: "Can we use this report for enterprise sales security questionnaires?",
        answer: "Yes. We provide both an executive attestation of testing and a detailed technical report formatted for enterprise procurement teams.",
      },
    ],
    tags: ["BOLA / IDOR", "GraphQL", "Auth0 / Cognito", "API Security", "Manual Pentest"],
  },
  {
    id: "aws-architecture",
    practiceId: "cloud-security",
    title: "AWS Security Architecture Review",
    tagline: "Deep audit of AWS Organizations, Service Control Policies, IAM trust graphs, and network isolation.",
    shortDescription: "Eliminating cross-account compromise paths, excessive IAM permissions, unencrypted storage, and blind spots in GuardDuty / CloudTrail.",
    problem: "Organizations accumulate sprawling AWS environments with hundreds of IAM roles, orphaned security groups, and incomplete audit logs that fail during incident investigations.",
    methodology: [
      { phase: "Organization Review", description: "Evaluating Root SCPs, AWS Control Tower baselines, and cross-account trust." },
      { phase: "IAM Graphing", description: "Identifying privilege escalation paths across sts:AssumeRole chains." },
      { phase: "Data Plane Validation", description: "Auditing S3 bucket policies, KMS key grants, and RDS network accessibility." },
    ],
    deliverables: [
      "Visual IAM trust graph highlighting latent privilege escalation chains",
      "Terraform remediation snippets for IAM and Security Group hardening",
      "CloudTrail and GuardDuty gap analysis report",
    ],
    faq: [
      {
        question: "Do you need admin access to our production AWS accounts?",
        answer: "No. We utilize a strictly read-only SecurityAudit IAM role with zero data modification or customer data decryption privileges.",
      },
    ],
    tags: ["AWS Organizations", "IAM Graphs", "GuardDuty", "KMS", "Terraform"],
  },
  {
    id: "gcp-security",
    practiceId: "cloud-security",
    title: "GCP Security & Sovereign Controls",
    tagline: "Google Cloud Organization hierarchy audits, VPC Service Controls, and Workload Identity.",
    shortDescription: "Hardening enterprise Google Cloud foundations, BigQuery access controls, and Security Command Center Premium posture.",
    problem: "GCP's resource hierarchy (Org > Folder > Project) creates inherited permission traps, and misconfigured VPC Service Controls frequently break production workloads.",
    methodology: [
      { phase: "Hierarchy Analysis", description: "Review IAM inheritance and Organization Policies at folder and project levels." },
      { phase: "Perimeter Verification", description: "Design and test VPC Service Controls (VPC-SC) perimeters to stop egress." },
      { phase: "Workload Identity", description: "Transition all compute instances and GKE workloads from service account keys to token federation." },
    ],
    deliverables: [
      "VPC Service Controls architecture blueprint with dry-run telemetry validation",
      "Service Account key elimination roadmap",
      "Google Cloud Security Command Center tuning matrix",
    ],
    faq: [
      {
        question: "Can VPC-SC be configured without disrupting active production users?",
        answer: "Yes. We use VPC-SC Dry-Run mode and log analysis to validate all legitimate service calls before enforcing hard perimeter boundaries.",
      },
    ],
    tags: ["VPC Service Controls", "GCP Org Policies", "BigQuery IAM", "Workload Identity"],
  },
  {
    id: "kubernetes-security",
    practiceId: "cloud-security",
    title: "Kubernetes & Container Hardening",
    tagline: "Cluster hardening for EKS, GKE, and self-managed Kubernetes platforms.",
    shortDescription: "Auditing admission controllers, network policies, runtime telemetry (Falco), and container escape vectors.",
    problem: "Default Kubernetes installations allow pods to communicate uninhibited across namespaces and access instance metadata services (IMDS), enabling container breakouts to compromise the entire AWS/GCP account.",
    methodology: [
      { phase: "Control Plane Audit", description: "Review API server flags, etcd encryption, and cluster RBAC assignments." },
      { phase: "Workload Policy", description: "Deploy Kyverno / Gatekeeper policies enforcing read-only root filesystems and non-root users." },
      { phase: "Network Microsegmentation", description: "Implement Calico or Cilium network policies blocking unauthenticated east-west traffic." },
    ],
    deliverables: [
      "Production-tested Kyverno / OPA policy definitions",
      "IMDSv2 and metadata endpoint isolation manifests",
      "RBAC privilege reduction audit log",
    ],
    faq: [
      {
        question: "Does this apply to managed services like EKS and GKE?",
        answer: "Yes, managed control planes still leave 80% of cluster security (pod security standards, network policies, IAM node roles) in your hands.",
      },
    ],
    tags: ["EKS", "GKE", "Kyverno", "Cilium", "Container Escape Defense"],
  },
  {
    id: "vciso-advisory",
    practiceId: "advisory-compliance",
    title: "Technical Advisory & Virtual CISO",
    tagline: "Senior security engineering leadership tailored for scaleups and growth-stage companies.",
    shortDescription: "Strategic security roadmaps, board presentation decks, enterprise sales diligence acceleration, and incident response readiness.",
    problem: "Hiring a full-time CISO costs $450k+ and often results in disconnected governance. Fast-growing software firms need engineering-literate leadership to close enterprise deals and satisfy security audits.",
    methodology: [
      { phase: "Baseline Assessment", description: "Map current security controls against CIS Critical Security Controls v8." },
      { phase: "Strategic Roadmap", description: "Prioritize top 5 engineering-led risk reductions over a 90-day horizon." },
      { phase: "Execution & Oversight", description: "Weekly steering meetings, procurement questionnaire approvals, and red-team drills." },
    ],
    deliverables: [
      "Enterprise Security Whitepaper for your prospective enterprise buyers",
      "Prioritized 12-month engineering security roadmap",
      "Executive Board risk briefing deck",
    ],
    faq: [
      {
        question: "How involved are you with our enterprise customer sales calls?",
        answer: "We join prospective customer security reviews as your acting Head of Security, directly answering architectural questions from enterprise risk teams.",
      },
    ],
    tags: ["vCISO", "Enterprise Sales Diligence", "Board Reporting", "CIS Controls"],
  },
  {
    id: "soc2-compliance",
    practiceId: "advisory-compliance",
    title: "SOC 2 & ISO 27001 Readiness",
    tagline: "Defensible compliance programs driven by automated infrastructure evidence, not manual screenshots.",
    shortDescription: "Preparing cloud-native SaaS companies for clean SOC 2 Type I/II and ISO/IEC 27001:2022 audits with automated evidence collection.",
    problem: "Traditional compliance consultants saddle engineering teams with spreadsheet rituals and manual screenshot taking that break the moment engineers commit new code.",
    methodology: [
      { phase: "Gap Analysis", description: "Evaluate existing Terraform, GitHub, and cloud configurations against Trust Services Criteria." },
      { phase: "Policy & Code Mapping", description: "Draft developer-friendly security policies and wire automated CI/CD evidence pipelines." },
      { phase: "Audit Defense", description: "Directly represent your technical controls to AICPA-accredited auditors during the audit window." },
    ],
    deliverables: [
      "Complete set of tailored, modern security policies (MD / Git-tracked)",
      "Automated evidence collection hooks into your cloud environment",
      "Auditor negotiation and deficiency remediation defense",
    ],
    faq: [
      {
        question: "Do you integrate with compliance platforms like Vanta or Drata?",
        answer: "Yes, we frequently configure and tune platforms like Vanta, Drata, and Secureframe to ensure tests pass without generating endless false alerts for developers.",
      },
    ],
    tags: ["SOC 2 Type II", "ISO 27001:2022", "Audit Defense", "Automated Evidence"],
  },
];

export const CONSULTANTS: ConsultantProfile[] = [
  {
    name: "Marcus Vance",
    role: "Founding Principal & AI Security Practice Lead",
    location: "San Francisco, CA",
    avatarSeed: "MV",
    bio: "Former Principal Offensive Security Engineer at leading hyperscalers. Specializes in LLM parameter inversion, agentic function calling exploitation, and container isolation architectures.",
    certifications: ["CISSP", "OSCP", "AWS Security Specialty", "NIST AI RMF Fellow"],
    specialties: ["Agentic Threat Modeling", "Prompt Injection Red Teaming", "Cloud IAM Graphs"],
    priorExperience: "Ex-Lead Penetration Tester at Fortune 50 cloud infrastructure provider; 16 years offensive security experience.",
  },
  {
    name: "Elena Rostova",
    role: "Cloud Infrastructure & DevSecOps Principal",
    location: "New York, NY",
    avatarSeed: "ER",
    bio: "Seasoned infrastructure engineer and Kubernetes contributor. Advises enterprise CISOs on multi-account AWS/GCP boundary engineering and zero-trust CI/CD deployment security.",
    certifications: ["CCSP", "CKS (Certified Kubernetes Security)", "GCP Professional Cloud Architect"],
    specialties: ["Kubernetes Hardening", "GCP VPC-SC", "OIDC CI/CD Pipelines", "IaC Verification"],
    priorExperience: "Built security engineering programs for high-frequency trading platforms and fintech unicorns; 14 years hands-on engineering.",
  },
  {
    name: "Devon Chen",
    role: "Advisory & Governance Practice Lead",
    location: "London, UK",
    avatarSeed: "DC",
    bio: "Pragmatic security strategist bridging technical vulnerability remediation with board-level fiduciary oversight. Has guided over 80 high-growth software firms through successful SOC 2 and ISO 27001 certifications.",
    certifications: ["CISM", "ISO 27001 Lead Auditor", "CISSP", "CISA"],
    specialties: ["Technical vCISO", "Enterprise Diligence Acceleration", "Incident Response Playbooks"],
    priorExperience: "Former Global Security Director at publicly traded enterprise software company; 15 years advisory leadership.",
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    stepNumber: 1,
    name: "Discovery & Architecture",
    duration: "Days 1–3",
    description: "Confidential review of your architectural diagrams, cloud topologies, AI pipeline schemas, and threat vectors under mutual NDA.",
    deliverable: "Scoping Matrix & Mutual NDA Execution",
  },
  {
    stepNumber: 2,
    name: "Threat Boundary Definition",
    duration: "Days 4–6",
    description: "Defining explicit trust perimeters: where untrusted inputs meet LLM context windows, vector caches, and cloud execution environments.",
    deliverable: "Threat Model & Rules of Engagement Document",
  },
  {
    stepNumber: 3,
    name: "Adversarial Assessment",
    duration: "Weeks 2–3",
    description: "Hands-on penetration testing, prompt injection fuzzing, IAM escalation tracing, and configuration audits conducted by senior principals.",
    deliverable: "Daily High-Severity Vulnerability Disclosures",
  },
  {
    stepNumber: 4,
    name: "Findings & Evidence",
    duration: "Week 3",
    description: "A comprehensive, evidence-backed report with step-by-step reproduction steps, impact ratings, and zero automated scanner filler.",
    deliverable: "Technical Report & Executive Board Briefing",
  },
  {
    stepNumber: 5,
    name: "Remediation Guidance",
    duration: "Weeks 4–5",
    description: "Pairing directly with your engineering leads via dedicated Slack channel, reviewing PRs, and delivering verified code fixes.",
    deliverable: "Terraform / Application Code Pull Requests",
  },
  {
    stepNumber: 6,
    name: "Retesting & Attestation",
    duration: "Week 6+",
    description: "Complete validation re-test of all resolved findings, culminating in an official Attestation Letter for your enterprise buyers.",
    deliverable: "Official Security Attestation Certificate",
  },
];

export const DIFFERENTIATORS = [
  {
    title: "Engineers, Not Checklist Assessors",
    description: "We read your source code, review your Terraform state files, and write custom exploit scripts. You won't receive a 300-page regurgitation of generic Nessus scanner outputs.",
    highlight: "Hands-On Code Review",
    icon: "Code2",
  },
  {
    title: "Prioritized by Real Exploitability",
    description: "Every finding is weighted by actual reachability in your runtime environment. We disregard hypothetical CVSS theoretical alarms to focus your team on urgent breach paths.",
    highlight: "Zero False-Positive Noise",
    icon: "Target",
  },
  {
    title: "Genuine AI Security Depth",
    description: "We don't merely rebrand web application pentests as 'AI security'. We dissect vector database chunking logic, semantic jailbreak embeddings, and agent tool execution guardrails.",
    highlight: "LLM & Agent Native",
    icon: "Cpu",
  },
  {
    title: "Both Offense and Governance",
    description: "Offensive adversarial findings directly inform your regulatory filings. We bridge the gap between technical penetration tests and audit requirements for SOC 2, ISO 42001, and NIST.",
    highlight: "Audit-Ready Defense",
    icon: "Scale",
  },
];

export const INSIGHTS: InsightPost[] = [
  {
    id: "agentic-tool-threat-model",
    title: "Threat Modeling Agentic Tool Execution: Defense-in-Depth for Function Calling",
    slug: "threat-modeling-agentic-tool-execution",
    category: "AI Security Research",
    publishDate: "August 2026",
    readTime: "8 min read",
    summary: "When LLMs are granted access to external APIs or internal microservices, indirect prompt injection becomes remote code execution. Here is how to architect deterministic execution sandboxes.",
    author: {
      name: "Marcus Vance",
      role: "Founding Principal",
    },
    keyTakeaways: [
      "Why semantic intent cannot substitute for deterministic parameter schema enforcement",
      "Architecting ephemeral per-tenant service tokens for AI agents",
      "Designing human-in-the-loop gates for state-mutating database operations",
    ],
  },
  {
    id: "gcp-workload-identity-k8s",
    title: "Hardening GCP Workload Identity Federation for Multi-Tenant Kubernetes",
    slug: "hardening-gcp-workload-identity-k8s",
    category: "Cloud Security Architecture",
    publishDate: "July 2026",
    readTime: "11 min read",
    summary: "Service account keys remain the #1 compromised credential vector in Google Cloud. A technical blueprint for eliminating static JSON keys across EKS and GKE clusters.",
    author: {
      name: "Elena Rostova",
      role: "Cloud Infrastructure Principal",
    },
    keyTakeaways: [
      "Eliminating long-lived service account JSON keys from developer and CI/CD environments",
      "Configuring Workload Identity trust pools with namespace-level subject constraints",
      "Audit logging for unexpected token assumption anomalies using Security Command Center",
    ],
  },
  {
    id: "rag-vector-exfiltration",
    title: "From RAG to Remote Data Exfiltration: Attack Surfaces in Retrieval Pipelines",
    slug: "rag-vector-exfiltration-attack-surfaces",
    category: "AI Vulnerability Analysis",
    publishDate: "June 2026",
    readTime: "9 min read",
    summary: "Vector databases index text without inherent authorization semantics. We dissect how cross-tenant document poisoning allows unprivileged users to extract confidential data.",
    author: {
      name: "Marcus Vance & Devon Chen",
      role: "Principals",
    },
    keyTakeaways: [
      "Exploiting similarity threshold boundaries to trigger document leakage",
      "Implementing cryptographic metadata tagging on vector chunks before indexing",
      "Evaluating latency vs security trade-offs in post-retrieval authorization filters",
    ],
  },
];

export const CLOUD_PLATFORMS_DATA: CloudPlatformSpec[] = [
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    tagline: "Enterprise Control Tower, multi-account Organizations, and automated 24/7 SRE operations.",
    badge: "AWS Advanced Architecture",
    logoColor: "#FF9900",
    architectureHighlights: [
      {
        title: "AWS Control Tower & Landing Zones",
        description: "Standardized multi-account structure with automated guardrails, SCPs (Service Control Policies), and IAM Identity Center federation.",
        services: ["AWS Control Tower", "AWS Organizations", "AWS IAM Identity Center", "AWS Systems Manager"]
      },
      {
        title: "Perimeter & Network Architecture",
        description: "Transit Gateway hub-and-spoke topologies with AWS Network Firewall, private VPC endpoints, and zero public S3/RDS exposure.",
        services: ["AWS Transit Gateway", "AWS PrivateLink", "AWS WAF", "Amazon Route 53 Resolver"]
      },
      {
        title: "Managed Container & Serverless Fabrics",
        description: "Production Amazon EKS hardening with Bottlerocket OS, Karpenter autoscaling, and secure AWS Fargate execution environments.",
        services: ["Amazon EKS", "Karpenter", "AWS Fargate", "Amazon ECR"]
      },
      {
        title: "Zero-Trust Threat Detection",
        description: "Real-time threat monitoring with Amazon GuardDuty, AWS Security Hub CIS benchmarks, and automated event-driven Lambda containment.",
        services: ["Amazon GuardDuty", "AWS Security Hub", "AWS CloudTrail Lake", "Amazon Inspector"]
      }
    ],
    support247Capabilities: [
      {
        title: "15-Minute Sev-1 Critical SLA",
        sla: "15 Min Response",
        details: "Dedicated Slack/Teams bridge with active AWS Certified Solutions Architect Professionals."
      },
      {
        title: "Automated Incident Runbooks",
        sla: "Automated Triage",
        details: "EventBridge rules triggering instant isolation of compromised EC2/EKS pods or anomalous IAM sessions."
      },
      {
        title: "Proactive Synthetic Probing",
        sla: "Every 60 Seconds",
        details: "Synthetic canaries monitoring API gateway latencies, regional health, and cross-AZ failover readiness."
      }
    ],
    finOpsControls: [
      {
        mechanism: "Compute Savings Plans & RI Hedging",
        savingsPotential: "28% – 42% cost reduction",
        automation: "Dynamic 1-year and 3-year commitment blending with automated utilization monitoring to prevent lock-in."
      },
      {
        mechanism: "Karpenter Spot & Graviton Migration",
        savingsPotential: "35% – 50% on EKS compute",
        automation: "Automated pod rightsizing and ARM64 Graviton3 node migration with zero downtime."
      },
      {
        mechanism: "EBS & Orphaned Snapshot Pruning",
        savingsPotential: "$8k – $25k annual reclamation",
        automation: "Scheduled Lambda scrapers finding unattached gp2/gp3 volumes, idle NAT gateways, and unrouted Elastic IPs."
      }
    ]
  },
  {
    id: "gcp",
    name: "Google Cloud Platform (GCP)",
    tagline: "Workload Identity, Sovereign Organization Policies, and GKE enterprise platform operations.",
    badge: "Google Cloud Enterprise",
    logoColor: "#4285F4",
    architectureHighlights: [
      {
        title: "GCP Organization Policies & Resource Hierarchy",
        description: "Defensible folder structure with deterministic Org Policies: enforcing uniform bucket access, disabling external IP assignment, and restricting domain sharing.",
        services: ["Resource Manager", "Org Policy Service", "Cloud Identity", "Access Context Manager"]
      },
      {
        title: "Workload Identity Federation & Keyless Auth",
        description: "Complete eradication of static JSON service account keys across GKE, Cloud Run, and GitHub Actions via OpenID Connect trust pools.",
        services: ["Workload Identity", "Cloud KMS", "Secret Manager", "IAM Recommender"]
      },
      {
        title: "Hardened Google Kubernetes Engine (GKE)",
        description: "GKE Autopilot and private clusters with Workload Shield, Binary Authorization image verification, and Calico/Cilium network policies.",
        services: ["GKE Enterprise", "Binary Authorization", "Artifact Registry", "Cloud Armor"]
      },
      {
        title: "Security Command Center (SCC) Enterprise",
        description: "Continuous posture evaluation, container vulnerability scanning, and automated Eventarc remediation pipelines.",
        services: ["SCC Enterprise", "Cloud Audit Logs", "Chronicle SIEM", "Cloud Logging"]
      }
    ],
    support247Capabilities: [
      {
        title: "15-Minute SRE Escalation",
        sla: "15 Min Response",
        details: "Direct escalation to GCP Professional Cloud Architects with root-cause diagnostic tooling."
      },
      {
        title: "Multi-Region Cloud Interconnect Triage",
        sla: "Active Monitoring",
        details: "Dedicated health tracking of Cloud Interconnect BGP sessions and regional VPC network peering."
      },
      {
        title: "BigQuery & AI Workload Telemetry",
        sla: "Live Quota Guard",
        details: "Real-time alerts preventing BigQuery slot runaway costs or Vertex AI quota exhaustion during surge traffic."
      }
    ],
    finOpsControls: [
      {
        mechanism: "Committed Use Discounts (CUDs) Management",
        savingsPotential: "30% – 55% compute savings",
        automation: "Flexible spend-based and resource-based CUD modeling balanced against unpredictable AI surge requirements."
      },
      {
        mechanism: "GKE Workload Rightsizing & Cloud Run Auto-Scale",
        savingsPotential: "25% – 38% cluster efficiency",
        automation: "Vertical Pod Autoscaler (VPA) in recommendation mode fed into automated GitOps PRs for pod resource limits."
      },
      {
        mechanism: "BigQuery Flat-Rate Slot & Reservation Optimization",
        savingsPotential: "40% analytical spend reduction",
        automation: "Partitioning and clustering enforcement with automated query cost dry-run checks in CI/CD."
      }
    ]
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    tagline: "Cloud Adoption Framework (CAF) Landing Zones, Entra ID PIM, and Azure Arc management.",
    badge: "Microsoft Cloud Architecture",
    logoColor: "#0078D4",
    architectureHighlights: [
      {
        title: "Azure Landing Zones & Management Groups",
        description: "CAF-aligned hub-spoke subscription topology with Azure Policy initiatives enforcing CIS Azure Benchmarks and sovereign data boundaries.",
        services: ["Azure Management Groups", "Azure Policy", "Azure Blueprints", "Azure Resource Graph"]
      },
      {
        title: "Entra ID (Azure AD) PIM & Zero Trust",
        description: "Privileged Identity Management with time-bound role activations, conditional access, passkey MFA, and managed identities for all compute resources.",
        services: ["Microsoft Entra ID", "Entra PIM", "Conditional Access", "Managed Identities"]
      },
      {
        title: "Azure Kubernetes Service (AKS) Enterprise",
        description: "Private AKS clusters with Azure CNI Powered by Cilium, Azure Key Vault Secrets Provider, and Microsoft Defender for Containers.",
        services: ["Azure AKS", "Azure Container Apps", "Azure Key Vault", "Cilium CNI"]
      },
      {
        title: "Microsoft Defender for Cloud & Sentinel",
        description: "Cloud Security Posture Management (CSPM), automated regulatory compliance reports (SOC 2, HIPAA, ISO), and Sentinel SOAR automation playbooks.",
        services: ["Defender for Cloud", "Microsoft Sentinel", "Log Analytics", "Azure Monitor"]
      }
    ],
    support247Capabilities: [
      {
        title: "24/7 Global Follow-the-Sun SRE Operations",
        sla: "15 Min Response",
        details: "Round-the-clock incident response across US, EMEA, and APAC time zones for critical cloud workloads."
      },
      {
        title: "ExpressRoute & Hybrid Arc Monitoring",
        sla: "Continuous Probing",
        details: "End-to-end telemetry on hybrid cloud interconnects and Azure Arc-enabled on-premises nodes."
      },
      {
        title: "Automated PIM Session Audit",
        sla: "Instant Alerting",
        details: "Real-time anomaly detection when elevated subscription-owner privileges are activated outside change windows."
      }
    ],
    finOpsControls: [
      {
        mechanism: "Azure Reserved VM Instances & Savings Plans",
        savingsPotential: "32% – 52% virtual machine savings",
        automation: "Portfolio balancing across 1-year and 3-year commitments with automated exchange tracking."
      },
      {
        mechanism: "Azure Hybrid Benefit & Licensing Optimization",
        savingsPotential: "Up to 40% on Windows/SQL workloads",
        automation: "Automated validation that existing enterprise on-prem licenses are mapped to cloud instances correctly."
      },
      {
        mechanism: "Unused Managed Disks & App Service Plans",
        savingsPotential: "$12k – $35k annual waste cleared",
        automation: "Azure Resource Graph queries identifying unattached premium SSDs, dormant staging slots, and oversized App Service tiers."
      }
    ]
  }
];

export const DEVOPS_AGILE_DATA: DevOpsAgilePractice[] = [
  {
    stage: "01 / Branching & PR Testing",
    title: "Trunk-Based Development & Ephemeral Review Envs",
    agilePattern: "Short-lived feature branches (<24h) merged directly to trunk with on-demand isolated review clusters per Pull Request.",
    tooling: ["GitHub Actions", "vcluster", "Terraform Cloud", "ArgoCD ApplicationSets"],
    businessOutcome: "Eliminates merge-train bottlenecks; enables QA and product stakeholders to test real code in full fidelity before trunk merge.",
    failureGuardrail: "Automated PR teardown after 48 hours to prevent cloud resource leakage."
  },
  {
    stage: "02 / Security Shift-Left",
    title: "Policy-as-Code & Cryptographic Artifact Signing",
    agilePattern: "Zero static credentials in CI runners. Every container image signed with Sigstore Cosign with SBOM provenance verification.",
    tooling: ["Sigstore Cosign", "Open Policy Agent (OPA)", "Trivy", "Semgrep"],
    businessOutcome: "Prevents supply-chain attacks, halts vulnerable CVE deployments automatically, and guarantees 100% auditable build provenance.",
    failureGuardrail: "PR checks fail fast (<2 min) with precise line-level remediation instructions."
  },
  {
    stage: "03 / Continuous Delivery",
    title: "Progressive Delivery: Canary & Blue/Green Deployments",
    agilePattern: "Traffic routing shifted in gradual increments (5% -> 20% -> 50% -> 100%) while observing real-time Prometheus / Datadog latency and error metrics.",
    tooling: ["Argo Rollouts", "Flagger", "Istio Service Mesh", "Datadog / Prometheus"],
    businessOutcome: "Zero customer downtime during releases; high-risk database migrations decoupled from frontend UI deployments via feature flags.",
    failureGuardrail: "Automated instant rollback if P99 latency degrades by >15% or HTTP 5xx errors exceed 0.1%."
  },
  {
    stage: "04 / SRE & DORA Observability",
    title: "DORA Metrics & Automated Chaos Engineering",
    agilePattern: "Real-time telemetry measuring Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service (MTTR).",
    tooling: ["OpenTelemetry", "Grafana", "LitmusChaos", "PagerDuty API"],
    businessOutcome: "Teams achieve 'Elite' DORA performance: on-demand deployments with MTTR under 15 minutes and sub-0.5% rollback frequency.",
    failureGuardrail: "Automated deployment freeze triggered when quarterly error budget is consumed by >80%."
  }
];

export const FINOPS_DATA = {
  framework: {
    title: "The Enterprise FinOps Lifecycle (FinOps Foundation Aligned)",
    phases: [
      {
        phase: "Phase 1: Inform",
        tagline: "Visibility & Cost Allocation",
        description: "Establish 100% cost accountability across AWS, GCP, and Azure through comprehensive tag enforcement, automated showback, and real-time unit economics.",
        keyActivities: [
          "Enforce tag policies via AWS SCPs, Azure Policies, and GCP Org Constraints",
          "Map cloud costs directly to business units, engineering teams, and revenue per API call",
          "Implement real-time spend anomaly detection via Slack/Teams webhooks"
        ]
      },
      {
        phase: "Phase 2: Optimize",
        tagline: "Waste Elimination & Rightsizing",
        description: "Systematically eliminate idle infrastructure, migrate to modern silicon (Graviton/ARM), rightsize over-provisioned Kubernetes nodes, and hedge commitments.",
        keyActivities: [
          "Automated orphaned disk and unattached Elastic IP clean-up routines",
          "Kubernetes CPU/Memory request rightsizing using historical telemetry",
          "Savings Plans, Azure RIs, and GCP CUDs portfolio arbitrage to minimize on-demand rates"
        ]
      },
      {
        phase: "Phase 3: Operate",
        tagline: "Continuous Governance & Automation",
        description: "Embed FinOps gates into developer pull requests. Treat cloud cost as an engineering dimension on par with latency, availability, and security.",
        keyActivities: [
          "Infracost in GitHub Actions showing exact dollar impact before PR merge",
          "Automated scaling schedules for non-production environments (sleeping nights/weekends)",
          "Monthly C-suite executive FinOps reviews with unit cost trend forecasting"
        ]
      }
    ]
  },
  savingsBenchmarking: [
    {
      category: "Idle Resource Reclamation",
      typicalPercentage: "12% – 18%",
      description: "Unattached EBS/Managed Disks, abandoned dev databases, unrouted NAT gateways, unused load balancers."
    },
    {
      category: "Kubernetes & Compute Rightsizing",
      typicalPercentage: "20% – 35%",
      description: "Eliminating 300% over-allocated pod requests and moving to Karpenter/Spot autoscaling."
    },
    {
      category: "Commitment Arbitrage (RIs / CUDs / SPs)",
      typicalPercentage: "25% – 45%",
      description: "Active commitment portfolio management without getting locked into deprecated instance types."
    },
    {
      category: "Data Egress & Architectural Shifting",
      typicalPercentage: "15% – 28%",
      description: "Cross-AZ traffic reduction, VPC endpoint routing to eliminate NAT transfer charges, and S3 Intelligent-Tiering."
    }
  ]
};
