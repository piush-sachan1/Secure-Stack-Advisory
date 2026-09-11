import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import { fileURLToPath } from "url";
interface RiskAssessmentInput {
  aiFeatures: string[];
  cloudProviders: string[];
  governancePolicy: string;
  dataHandling: string;
  incidentMaturity: string;
  exposureSurface: string;
  teamSize: string;
  industrySector?: string;
}

interface FindingItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  impact: string;
  technicalExplanation: string;
  recommendedMitigation: string;
}

interface AssessmentResult {
  riskScore: number;
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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));

// Initialize Google GenAI client lazily/safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Deterministic heuristic fallback in case of network or API error
function generateFallbackAssessment(input: RiskAssessmentInput): AssessmentResult {
  let score = 25;
  const isAgentic = input.aiFeatures.includes("autonomous_agents");
  const isRag = input.aiFeatures.includes("rag_retrieval");
  const isChat = input.aiFeatures.includes("llm_chat");
  const isPii = input.dataHandling === "pii_confidential";
  const noGov = input.governancePolicy === "none";
  const noSecOps = input.incidentMaturity === "none";
  const isPublic = input.exposureSurface === "public_internet";

  if (isAgentic) score += 25;
  if (isRag) score += 15;
  if (isChat) score += 10;
  if (isPii) score += 20;
  if (noGov) score += 15;
  if (noSecOps) score += 15;
  if (isPublic) score += 10;

  score = Math.min(Math.max(score, 18), 96);

  let tier: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Moderate';
  if (score >= 80) tier = 'Critical';
  else if (score >= 60) tier = 'High';
  else if (score >= 40) tier = 'Moderate';
  else tier = 'Low';

  const findings = [];

  if (isAgentic) {
    findings.push({
      id: "f-agent-1",
      title: "Unconstrained Autonomous Tool Execution and Privilege Escalation",
      severity: "Critical" as const,
      category: "AI Agent Security",
      impact: "Adversaries can exploit indirect prompt injection to trigger malicious tool calls with internal credentials.",
      technicalExplanation: "Autonomous agents with programmatic API or database access lack strict deterministic boundary checks, making function arguments vulnerable to instruction hijack.",
      recommendedMitigation: "Implement a human-in-the-loop gate for destructive mutations, enforce strict JSON schema validators on all tool payloads, and adopt per-tenant ephemeral credentials.",
    });
  }

  if (isRag) {
    findings.push({
      id: "f-rag-2",
      title: "Vector Pipeline Data Exfiltration via Poisoned Documents",
      severity: "High" as const,
      category: "RAG & Vector Security",
      impact: "Unauthorized tenants or attackers can inject adversarial payload chunks into chunking parsers or bypass ACLs.",
      technicalExplanation: "Vector embeddings lack inherent security metadata, meaning similarity search results can blend unauthenticated context into generation prompts.",
      recommendedMitigation: "Enforce pre-retrieval and post-retrieval identity metadata filtering directly on the vector database index prior to prompt interpolation.",
    });
  }

  if (isPii || noGov) {
    findings.push({
      id: "f-gov-3",
      title: "Sensitive Data Egress via Third-Party Model Providers",
      severity: "High" as const,
      category: "Data Privacy & Governance",
      impact: "Customer confidential data or PII could leak into third-party telemetry, training pipelines, or cross-tenant cache.",
      technicalExplanation: "Outbound payload serialization lacks automated client-side cryptographic masking or zero-data-retention (ZDR) validation at the gateway tier.",
      recommendedMitigation: "Deploy a stateless reverse proxy inspection proxy that strips regex-matched PII/secrets before egress and signs vendor zero-retention enterprise agreements.",
    });
  }

  if (findings.length < 3) {
    findings.push({
      id: "f-cloud-4",
      title: "Over-Privileged Cloud IAM Roles Supporting AI Inference Workloads",
      severity: "Medium" as const,
      category: "Cloud Infrastructure",
      impact: "Compromised compute containers or microservices can assume broad administrative IAM permissions.",
      technicalExplanation: "AI serving pods frequently inherit cluster-wide administrator access or default service accounts rather than fine-grained workload identities.",
      recommendedMitigation: "Migrate to GCP Workload Identity / AWS IRSA with minimal KMS, Secrets Manager, and storage permissions strictly scoped to read-only model buckets.",
    });
  }

  return {
    riskScore: score,
    riskTier: tier,
    summary: `Your architecture exhibits notable attack surfaces in ${isAgentic ? "agentic function calling" : "AI pipeline orchestration"} across ${input.cloudProviders.join(", ").toUpperCase() || "cloud infrastructure"}. Without isolated validation tiers, prompt-driven injections and data leakage represent urgent vectors.`,
    primaryRiskDrivers: [
      isAgentic ? "Agentic tool privilege escalation" : "Inference payload validation gaps",
      isPii ? "Sensitive data transmission to external APIs" : "Undefined tenant isolation boundaries",
      noGov ? "Absence of formalized AI safety policies" : "Unmonitored prompt telemetry",
    ],
    findings: findings.slice(0, 3),
    recommendedPractice: {
      title: "AI Security & Governance Review",
      rationale: "Conduct an adversarial threat modeling sprint to isolate model tool endpoints, validate RAG ingestion, and establish NIST AI RMF governance controls.",
      targetMilestone: "2-Week Architecture Threat Modeling & Red Teaming Sprint",
    },
    complianceImpact: [
      { framework: "NIST AI RMF 1.0", statusNote: "MAP 1.1 & GOVERN 1.2 controls require formal risk mapping before production deployment." },
      { framework: "ISO/IEC 42001", statusNote: "Annex A.6 (AI System Impact Assessment) mandates documented data boundary verification." },
      { framework: "SOC 2 Type II", statusNote: "Third-party AI API vendor risk assessments must be integrated into vendor management reviews." },
    ],
  };
}

// POST endpoint for AI Risk Assessment
app.post("/api/assess-risk", async (req: Request, res: Response): Promise<void> => {
  const input: RiskAssessmentInput = req.body;

  if (!input || !Array.isArray(input.aiFeatures) || !Array.isArray(input.cloudProviders)) {
    res.status(400).json({ error: "Invalid input payload: aiFeatures and cloudProviders arrays are required." });
    return;
  }

  const ai = getGeminiClient();

  if (!ai) {
    console.warn("GEMINI_API_KEY not detected. Returning robust deterministic assessment report.");
    const fallback = generateFallbackAssessment(input);
    res.json({ result: fallback, isFallback: true });
    return;
  }

  const systemPrompt = `You are a Principal Security Architect and Offensive AI Threat Modeler at SecureStack Advisory, a premier technical cybersecurity consultancy.
You are evaluating a technical organization's AI architecture inputs to deliver an objective, rigorous, and actionable security snapshot for their engineering leadership (CTO, CISO, VP Engineering).

Adhere strictly to these principles:
1. Speak with quiet authority, technical precision, and zero marketing hype.
2. Calculate a realistic, defensible Risk Score (integer 0 to 100). Higher means higher security exposure:
   - 0-39: Low risk
   - 40-59: Moderate risk
   - 60-79: High risk
   - 80-100: Critical risk (e.g. public agents with tool access + sensitive customer PII + no governance or monitoring)
3. Produce exactly 3 prioritized, specific findings with realistic technical depth (e.g. mention vector stores, indirect prompt injection, IAM workload identity, SSRF, tool execution sandboxing, data egress).
4. Recommend one of SecureStack's four practice areas:
   - "AI Security & Governance"
   - "DevSecOps & Application Security"
   - "Cloud Security"
   - "Advisory & Compliance"
5. Return strictly structured JSON matching the requested schema. Do not wrap in markdown or commentary.`;

  const userQuery = `Analyze the following architecture snapshot and provide a rigorous security assessment:
- AI Capabilities Deployed: ${input.aiFeatures.length > 0 ? input.aiFeatures.join(", ") : "None / Evaluating"}
- Cloud Infrastructure: ${input.cloudProviders.length > 0 ? input.cloudProviders.join(", ") : "Hybrid / Unspecified"}
- Governance & Policy Status: ${input.governancePolicy || "Unknown"}
- Data Handling & Model Ingestion: ${input.dataHandling || "Unknown"}
- Incident Detection & Telemetry Maturity: ${input.incidentMaturity || "Unknown"}
- External Network Exposure Surface: ${input.exposureSurface || "Unknown"}
- Engineering & Security Team Size: ${input.teamSize || "Unknown"}
${input.industrySector ? `- Industry Sector: ${input.industrySector}` : ""}

Return valid JSON with the following structure:
{
  "riskScore": number,
  "riskTier": "Critical" | "High" | "Moderate" | "Low",
  "summary": string,
  "primaryRiskDrivers": string[],
  "findings": [
    {
      "id": string,
      "title": string,
      "severity": "Critical" | "High" | "Medium" | "Low",
      "category": string,
      "impact": string,
      "technicalExplanation": string,
      "recommendedMitigation": string
    }
  ],
  "recommendedPractice": {
    "title": string,
    "rationale": string,
    "targetMilestone": string
  },
  "complianceImpact": [
    {
      "framework": string,
      "statusNote": string
    }
  ]
}`;

  try {
    let rawText = "";

    // Primary attempt using gemini-3.1-pro-preview with thinkingLevel HIGH as instructed
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: userQuery,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });
      rawText = response.text || "";
    } catch (primaryError: any) {
      console.warn("Primary gemini-3.1-pro-preview attempt failed, falling back to gemini-3.8-flash:", primaryError?.message || primaryError);

      // Fallback to gemini-3.8-flash with 2 retry attempts for transient capacity spikes
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const fallbackResponse = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: userQuery,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: "application/json",
            },
          });
          rawText = fallbackResponse.text || "";
          if (rawText) break;
        } catch (retryErr: any) {
          console.warn(`Attempt ${attempt} on gemini-3.8-flash failed:`, retryErr?.message || retryErr);
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1200));
          }
        }
      }
    }

    if (!rawText) {
      throw new Error("Empty text returned from Gemini API");
    }

    // Defensive parsing: strip code fences if present
    const cleanedJson = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsedResult: AssessmentResult = JSON.parse(cleanedJson);

    // Validate essential properties
    if (typeof parsedResult.riskScore !== "number" || !Array.isArray(parsedResult.findings)) {
      throw new Error("Invalid schema structure in parsed JSON output");
    }

    res.json({ result: parsedResult, isFallback: false });
  } catch (apiError: any) {
    console.error("Gemini API error during risk assessment:", apiError);
    const fallback = generateFallbackAssessment(input);
    res.json({
      result: fallback,
      isFallback: true,
      errorNotice: "Generated via technical baseline rules due to upstream connectivity constraints.",
    });
  }
});

// Multi-turn AI Cloud & Cybersecurity Advisory Chatbot with Search Grounding
app.post("/api/chat", async (req: Request, res: Response) => {
  const { messages, enableSearch = true, focusDomain = "general" } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Missing or invalid messages array." });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    res.json({
      reply: "Our principal advisory engine is operating in offline mode. For immediate multi-cloud architecture scoping (AWS, GCP, Azure), 24/7 SRE support, or FinOps audit requests, please book a direct consultation below.",
      groundingChunks: [],
      webSearchQueries: [],
      sources: []
    });
    return;
  }

  const systemInstruction = `You are the Lead Cloud Architect, FinOps Strategist & Principal Security Advisor at SecureStack Advisory.
You advise CTOs, CISOs, and VP of Engineering on:
1. Multi-Cloud Infrastructure (AWS, GCP, Azure) — architecture design, landing zones, VPC topologies, sovereign cloud perimeters, and 24/7 managed SRE operations.
2. Agile DevOps Support — trunk-based GitOps, CI/CD automated gates, zero-downtime blue/green & canary deployments, ephemeral preview environments, and DORA performance metrics.
3. FinOps & Cost Optimization — unit economics, automated idle waste termination, Compute Savings Plans / Azure RIs / GCP CUDs portfolio optimization, Kubernetes rightsizing, and tag governance.
4. AI Security & Threat Modeling — prompt injection defense, LLM tool permissions, vector database ACLs, NIST AI RMF, and ISO 42001.

Tone & Style:
- Quiet authority, zero marketing fluff, technically precise, direct engineering explanations.
- Reference concrete AWS/GCP/Azure services, exact CLI/Terraform concepts, and FinOps benchmarks (e.g. typical 25-35% waste reduction).
- Keep answers structured with clear headings or bulleted execution steps.
- When Google Search is used, provide concrete real-world context.`;

  // Format messages into contents array for @google/genai
  const geminiContents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" || m.role === "model" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    let response;
    // Attempt with Google Search Grounding
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: geminiContents,
        config: {
          systemInstruction,
          tools: enableSearch ? [{ googleSearch: {} }] : undefined,
        },
      });
    } catch (searchErr: any) {
      console.warn("Search grounding attempt failed, falling back to standard inference:", searchErr?.message || searchErr);
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: geminiContents,
        config: {
          systemInstruction,
        },
      });
    }

    const replyText = response.text || "Unable to generate an advisory response at this moment.";
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];
    const groundingChunks = (groundingMetadata?.groundingChunks || []).map((chunk: any) => ({
      title: chunk.web?.title || "Reference",
      uri: chunk.web?.uri || "",
    })).filter((c: any) => c.uri);

    res.json({
      reply: replyText,
      groundingChunks,
      webSearchQueries,
      modelUsed: "gemini-3.8-flash",
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    res.status(500).json({
      error: "Advisory chat failed to complete.",
      reply: "We encountered a temporary capacity limit contacting the advisory model. Please retry or book a direct consultation with our principal cloud architects.",
    });
  }
});

// Vite dev server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SecureStack Advisory] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
