
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    // Attempt to clear local storage if it's the culprit
    try {
        if (window.confirm("This will clear your local save data to try and fix the error. Continue?")) {
            localStorage.clear();
            window.location.reload();
        }
    } catch (e) {
        window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4 text-[#d1d5db]">
          <div className="bg-[#2d2d2d] border border-red-900/50 rounded-lg p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-6 text-red-500">
               <AlertTriangle size={48} />
               <h1 className="text-2xl font-bold">Something went wrong</h1>
            </div>

            <p className="mb-4 text-gray-400">
              The application encountered a critical error and could not load.
            </p>

            {this.state.error && (
                <div className="bg-black/50 p-4 rounded text-sm font-mono text-red-400 mb-6 overflow-auto max-h-40">
                    {this.state.error.toString()}
                </div>
            )}

            <div className="flex justify-end gap-4">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                    Reload Page
                </button>
                <button
                    onClick={this.handleReset}
                    className="px-4 py-2 rounded bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50 transition-colors flex items-center gap-2"
                >
                    <RefreshCw size={16} />
                    Reset Data
                </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
