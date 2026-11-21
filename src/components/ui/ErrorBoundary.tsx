import { Component, type ErrorInfo, type ReactNode } from 'react';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { RefreshCw, Home, ExternalLink, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorType: 'network' | 'render' | 'unknown';
  errorMessage?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorType: 'unknown',
  };

  public static getDerivedStateFromError(error: Error): State {
    const message = error.message || '';
    const isNetwork =
      message.toLowerCase().includes('network') ||
      message.toLowerCase().includes('fetch') ||
      message.toLowerCase().includes('failed to fetch') ||
      message.toLowerCase().includes('load');

    return {
      hasError: true,
      errorType: isNetwork ? 'network' : 'render',
      errorMessage: 'An unexpected application chunk issue occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log privately to internal telemetry without exposing secrets or stack traces to UI
    if (import.meta.env.DEV) {
      console.error('[Love Pixel ErrorBoundary Caught]:', error, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, errorType: 'unknown' });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isNetwork = this.state.errorType === 'network';

      return (
        <div className="min-h-screen bg-[#080a0f] text-slate-100 flex items-center justify-center p-4">
          <div className="mc-panel max-w-xl w-full p-8 sm:p-10 rounded-3xl text-center border border-slate-800 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl mc-slot text-[#ffaa00] flex items-center justify-center mx-auto shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-minecraft font-bold uppercase tracking-widest text-[#ffaa00] bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full inline-block mb-3">
                {isNetwork ? 'Connection Anomaly' : 'Application Recovered'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-minecraft font-bold text-white mc-shadow">
                {isNetwork ? 'NETWORK SYNC INTERRUPTED' : 'CHUNK RENDERING ANOMALY'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-minecraft leading-relaxed mt-2 max-w-md mx-auto">
                {isNetwork
                  ? 'A temporary network interruption prevented loading remote world assets. Please check your connection and retry.'
                  : 'An unexpected rendering error occurred. Your game data is safe. Let us take you back to spawn.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry World Load</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Spawn</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs font-minecraft text-slate-400">
              <span>Need help? Reach out on our </span>
              <a
                href={SERVER_CONFIG.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#55ffff] underline hover:text-white inline-flex items-center gap-1"
              >
                <span>Official Discord</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
