import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
    this.handleReset = this.handleReset.bind(this);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset() {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900/90 border border-red-500/30 text-center space-y-4 shadow-2xl shadow-red-950/20">
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                {this.props.fallbackTitle || 'Module Temporary Interruption'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A telemetry or rendering module encountered an issue. You can reload this view to restore full connectivity.
              </p>
            </div>
            {this.state.error && (
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 truncate text-left">
                {this.state.error.message}
              </div>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reload Telemetry Module
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
