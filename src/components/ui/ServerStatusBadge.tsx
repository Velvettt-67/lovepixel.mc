import React from 'react';
import { Activity, ShieldCheck, Clock } from 'lucide-react';
import { useServerStatus } from '../../hooks/useServerStatus';
import { SERVER_CONFIG } from '../../config/serverConfig';

interface ServerStatusBadgeProps {
  className?: string;
  variant?: 'pill' | 'panel';
}

export const ServerStatusBadge: React.FC<ServerStatusBadgeProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const status = useServerStatus();

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono transition-all ${
          status.online
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            : 'bg-slate-900/80 text-slate-300 border-slate-700/60'
        } ${className}`}
      >
        <span className="relative flex h-2 w-2">
          {status.online ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </>
          ) : status.loading ? (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 animate-pulse" />
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          )}
        </span>

        {status.loading ? (
          <span>Checking server telemetry...</span>
        ) : status.online && status.playersOnline !== null ? (
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-white">{status.playersOnline}</span>
            <span className="text-slate-400">/ {status.playersMax || '250'}</span>
            <span className="text-emerald-400">Online</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-semibold">Launch Incoming</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Whitelisting Open</span>
          </span>
        )}
      </div>
    );
  }

  // Panel variant for dedicated section
  return (
    <div
      className={`glass-panel p-6 rounded-2xl border border-slate-700/60 relative overflow-hidden ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl border ${
              status.online
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800/80 border-slate-700 text-cyan-400'
            }`}
          >
            <Activity className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-wide">
                Server Telemetry
              </h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase font-bold border ${
                  status.online
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                }`}
              >
                {status.online ? 'Online' : 'Whitelisting'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {status.online && status.motd
                ? status.motd
                : 'Live instance sync with automated backend monitoring.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase">Supported</span>
            <span className="text-slate-200 font-semibold">{SERVER_CONFIG.supportedVersions}</span>
          </div>

          <div className="bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase">Bedrock Port</span>
            <span className="text-emerald-400 font-semibold">{SERVER_CONFIG.serverPortBedrock}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-800/80">
        <div className="flex items-center gap-2.5 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>DDoS Protected Anycast Infrastructure</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-300">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Scheduled 99.9% Uptime Target</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-300">
          <Activity className="w-4 h-4 text-amber-400" />
          <span>{status.ping ? `${status.ping}ms Node Latency` : 'Sub-30ms Global Routing'}</span>
        </div>
      </div>
    </div>
  );
};
