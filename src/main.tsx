import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application runtime exception caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#101D2B] text-[#F7F5F0] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-xl bg-[#20252B] border border-[#C5A46D]/30 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A46D]/20 text-[#C5A46D] flex items-center justify-center font-serif text-2xl font-bold border border-[#C5A46D]/40">
              G
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-serif font-bold text-[#F7F5F0]">
                GET-AS REAL ESTATE
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                A temporary loading condition occurred. Please refresh to resume exploring our properties.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#C5A46D] hover:bg-[#b3925a] text-[#101D2B] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg active:scale-98"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
