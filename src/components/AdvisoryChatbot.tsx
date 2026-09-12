import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useApp } from '../context/AppContext';
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

const DEFAULT_WELCOME = "Welcome to SecureStack Advisory. I am your Lead Cloud & Security Advisory Engineer. Ask me anything regarding Multi-Cloud Architecture (AWS, GCP, Azure), 24/7 Managed SRE Operations, Agile DevOps/GitOps deployment pipelines, FinOps cost reduction, or AI Threat Modeling. All queries are backed by real-time Google Search grounding.";

const DEFAULT_PROMPTS = [
  "How can we reduce AWS NAT Gateway transfer costs?",
  "Azure Landing Zones vs AWS Control Tower key differences",
  "Trunk-based deployment pipeline with automated canary rollback",
  "GCP BigQuery FinOps & slot reservation optimization",
  "NIST AI RMF & OWASP Top 10 for LLM prompt injection defenses",
];

export const AdvisoryChatbot: React.FC<AdvisoryChatbotProps> = ({ onOpenConsultation }) => {
  const { t, language } = useApp();
  const welcomeText = t?.chatbot?.welcome || DEFAULT_WELCOME;
  const promptsList = t?.chatbot?.prompts || DEFAULT_PROMPTS;
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSearch, setEnableSearch] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // If conversation only contains welcome message, refresh it when language switches
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-msg') {
        return [
          {
            id: 'welcome-msg',
            role: 'assistant',
            content: welcomeText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [welcomeText]);

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
          language,
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
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Mobile Backdrop when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 sm:hidden animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed z-50 ${isOpen ? 'inset-x-0 bottom-0 top-10 sm:inset-auto sm:bottom-6 sm:right-6' : 'bottom-4 right-4 sm:bottom-6 sm:right-6'}`}>
        {/* Floating Trigger Button (Compact Icon) */}
        {!isOpen && (
          <div className="relative group">
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-cyan-300 text-slate-950 shadow-xl shadow-cyan-500/35 hover:shadow-cyan-400/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border border-cyan-200/60 flex items-center justify-center"
              aria-label="Open AI Cloud & Cyber Advisor"
              title="Open AI Cloud & Cyber Advisor"
            >
              {/* Online pulse beacon */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950" />
              </span>

              {/* Bot Icon */}
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 transition-transform group-hover:rotate-6" />
            </button>

            {/* Desktop Tooltip */}
            <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/95 border border-slate-700/80 text-cyan-300 text-xs font-mono shadow-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {t?.chatbot?.askPill || 'Ask AI Advisor'}
              </div>
            </div>
          </div>
        )}

        {/* Expandable Full Chat Window / Mobile Bottom Sheet */}
        {isOpen && (
          <div
            className={`flex flex-col bg-[#0b0f19] border border-cyan-500/40 sm:rounded-2xl rounded-t-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden transition-all duration-200 h-full sm:h-auto animate-in fade-in zoom-in-95 ${
              isExpanded
                ? 'w-full sm:w-[660px] sm:h-[85vh] sm:max-h-[760px]'
                : 'w-full sm:w-[480px] sm:h-[620px] sm:max-h-[85vh]'
            }`}
          >
            {/* Mobile Sheet Pull Bar */}
            <div className="sm:hidden flex items-center justify-center pt-2 pb-1 bg-[#0d1322]">
              <div className="w-10 h-1 rounded-full bg-slate-700" />
            </div>

            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0d1322] via-[#090d16] to-[#0d1322] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {t?.chatbot?.title || 'Cloud & Cyber Advisor'}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                      Live
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">
                    {t?.chatbot?.subtitle || 'AWS · GCP · Azure · DevOps · FinOps'}
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
                {t?.chatbot?.suggestedQueriesLabel || 'Suggested Architecture Queries:'}
              </div>
              <div className="flex gap-1.5 pb-1">
                {promptsList.map((prompt, pIdx) => (
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
            <div className="p-2.5 sm:p-3 bg-[#0d1322] border-t border-slate-800 shrink-0">
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
                  placeholder={t?.chatbot?.inputPlaceholder || 'Ask about AWS, GCP, Azure, GitOps, or FinOps...'}
                  disabled={isLoading}
                  className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-cyan-400 rounded-lg px-3 py-2 text-sm sm:text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10px] text-slate-500 font-mono mt-2 px-1 gap-1">
                <span>Gemini 3.8 + Search Grounding</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenConsultation?.('AI Advisory Followup');
                  }}
                  className="text-cyan-400 hover:underline cursor-pointer text-left"
                >
                  {t?.chatbot?.bookHumanCta || 'Book Human Principal Review'} →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
