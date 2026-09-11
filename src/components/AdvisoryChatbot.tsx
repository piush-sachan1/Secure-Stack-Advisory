import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Search,
  ExternalLink,
  RotateCcw,
  Bot,
  User,
  ShieldCheck,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface AdvisoryChatbotProps {
  onOpenConsultation?: (topic?: string) => void;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    role: 'assistant',
    content: "Welcome to SecureStack Advisory. I am your Lead Cloud & Security Advisory Engineer. Ask me anything regarding Multi-Cloud Architecture (AWS, GCP, Azure), 24/7 Managed SRE Operations, Agile DevOps/GitOps deployment pipelines, FinOps cost reduction, or AI Threat Modeling. All queries are backed by real-time Google Search grounding.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const SUGGESTED_PROMPTS = [
  "How can we reduce AWS NAT Gateway transfer costs?",
  "Azure Landing Zones vs AWS Control Tower key differences",
  "Trunk-based deployment pipeline with automated canary rollback",
  "GCP BigQuery FinOps & slot reservation optimization",
  "NIST AI RMF & OWASP Top 10 for LLM prompt injection defenses",
];

export const AdvisoryChatbot: React.FC<AdvisoryChatbotProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSearch, setEnableSearch] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send past messages (excluding welcome message if not user/assistant)
      const payloadMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          enableSearch,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "I couldn't process that response. Please try again or schedule a direct consultation.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingChunks: data.groundingChunks || [],
        webSearchQueries: data.webSearchQueries || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Advisory chat request failed:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "Our advisory service is currently under high load. For pressing architecture reviews, please book a direct consultation with our principal cloud architects below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages(DEFAULT_MESSAGES);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-500 text-slate-950 font-mono text-xs font-bold shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-all cursor-pointer border border-cyan-300/40"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950" />
          </div>
          <Bot className="w-4 h-4 text-slate-950" />
          <span>Ask AI Cloud Advisor</span>
          <span className="text-[10px] bg-slate-950/80 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
            Grounding ON
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col bg-[#0b0f19] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'w-[95vw] sm:w-[650px] h-[85vh] max-h-[750px]'
              : 'w-[92vw] sm:w-[460px] h-[600px] max-h-[82vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0d1322] via-[#090d16] to-[#0d1322] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Cloud & Cyber Advisor
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                    Live
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  AWS · GCP · Azure · DevOps · FinOps
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setEnableSearch(!enableSearch)}
                title={enableSearch ? 'Search Grounding Active' : 'Search Grounding Inactive'}
                className={`p-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  enableSearch
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/60'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize size' : 'Expand window'}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer hidden sm:inline-flex"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cyber-grid bg-[#080b12]">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-cyan-600 text-slate-950 font-medium ml-auto'
                        : msg.isError
                        ? 'bg-rose-950/40 border border-rose-800/60 text-rose-200'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Grounding chunks citations if available */}
                    {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
                        <div className="text-[10px] font-mono uppercase text-cyan-400 flex items-center gap-1">
                          <Search className="w-2.5 h-2.5" />
                          <span>Grounded Sources & Benchmarks:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.groundingChunks.slice(0, 3).map((chunk, cIdx) => (
                            <a
                              key={cIdx}
                              href={chunk.uri}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                            >
                              <span className="truncate max-w-[140px]">{chunk.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={`text-[9px] font-mono mt-1.5 text-right ${
                        isUser ? 'text-slate-900/70' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs font-mono p-2">
                <div className="w-6 h-6 rounded bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span>Synthesizing multi-cloud advisory response</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel (when message count is low) */}
          {messages.length <= 3 && (
            <div className="p-2.5 bg-[#090d16] border-t border-slate-800 overflow-x-auto">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1.5 px-1">
                Suggested Architecture Queries:
              </div>
              <div className="flex gap-1.5 pb-1">
                {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-colors whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-[#0d1322] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about AWS, GCP, Azure, GitOps, or FinOps..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2 px-1">
              <span>Powered by Gemini 3.8 + Search Grounding</span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenConsultation?.('AI Advisory Followup');
                }}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Book Human Principal Review →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
