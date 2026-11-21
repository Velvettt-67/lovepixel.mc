import React from 'react';
import { X, ExternalLink, ShieldCheck, Image as ImageIcon, Volume2, Video } from 'lucide-react';
import { ASSET_MANIFEST } from '../../config/assetManifest';
import { SERVER_CONFIG } from '../../config/serverConfig';

interface AssetCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetCreditsModal: React.FC<AssetCreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-minecraft font-bold text-white mc-shadow">Asset Credits & Licensing Manifest</h2>
              <p className="text-xs font-minecraft text-slate-300">Zero AI-generated artwork • 100% genuine Minecraft community shader captures</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-emerald-400 block mb-1">Authentic Visual Verification Policy:</span>
            Love Pixel strictly prohibits AI-generated art, synthetic Minecraft landscapes, and fabricated game scenes. Every environment screenshot below is an authentic Minecraft scene captured with legitimate, world-renowned shaderpacks under proper community creator usage guidelines.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASSET_MANIFEST.map(asset => (
              <div
                key={asset.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      {asset.category === 'audio' ? (
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : asset.id.includes('video') ? (
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <ImageIcon className="w-3.5 h-3.5" />
                      )}
                      {asset.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {asset.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3">{asset.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-850 text-[11px] space-y-1">
                  <div className="text-slate-400">
                    <span className="text-slate-500">Creator:</span> <span className="text-slate-200 font-medium">{asset.creator}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">License:</span> <span className="text-slate-200">{asset.license}</span>
                  </div>
                  <div className="pt-1">
                    <a
                      href={asset.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-mono text-[11px]"
                    >
                      <span>Original Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 font-mono">
            {SERVER_CONFIG.disclaimer}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            Close Credits
          </button>
        </div>
      </div>
    </div>
  );
};
