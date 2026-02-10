import React from 'react';
import { X, Bot, Lightbulb, Sparkles } from 'lucide-react';

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  content: string;
}

export const StrategyModal: React.FC<StrategyModalProps> = ({ isOpen, onClose, loading, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-border bg-gradient-to-r from-surface to-primary/5 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text">AI Investment Strategy</h2>
              <p className="text-xs text-muted">Powered by Gemini 3.0</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors p-1 rounded-md hover:bg-muted/10">
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 border-4 border-border rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                 <Bot className="absolute inset-0 m-auto text-primary" size={24} />
              </div>
              <p className="text-muted animate-pulse">Analyzing portfolio allocation and risk exposure...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mb-6 flex gap-3 items-start">
                 <Lightbulb className="text-blue-400 shrink-0 mt-0.5" size={18} />
                 <p className="text-sm text-blue-500/80">
                   This analysis is based on your current holdings, cost basis, and asset class distribution. It is for informational purposes only.
                 </p>
              </div>
              <div className="whitespace-pre-wrap text-text leading-relaxed font-light">
                {content}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-muted/10 hover:bg-muted/20 text-text rounded-lg text-sm font-medium transition-colors"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};