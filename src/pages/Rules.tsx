import React from 'react';
import { SERVER_CONFIG } from '../config/serverConfig';
import { STORE_CONFIG } from '../config/storeConfig';
import { McBookQuill, McShield } from '../components/ui/MinecraftIcons';
import { PixelIronGolemSprite } from '../components/entities/PixelEntitySprites';

export const Rules: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-6xl w-full mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <McBookQuill size={14} />
            Guidelines & Terms
          </span>
          <span className="text-xs font-minecraft px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 inline-flex items-center gap-1.5">
            <PixelIronGolemSprite size={16} />
            <span>Sentinel Moderated</span>
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-minecraft font-bold text-white tracking-tight uppercase mc-shadow">
          SERVER RULES & CODE OF CONDUCT
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed font-minecraft">
          Love Pixel enforces a fair, welcoming, and secure environment for all players. By joining our server or interacting with our storefront, you agree to uphold these rules.
        </p>
      </div>

      {/* Rules Breakdown */}
      <div className="space-y-6 mb-16">
        {SERVER_CONFIG.rules.map(rule => (
          <div
            key={rule.id}
            className="mc-panel p-6 sm:p-8 rounded-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl mc-slot text-[#55ff55] font-minecraft font-bold flex items-center justify-center text-xs">
                  #{rule.id}
                </span>
                <h2 className="text-lg sm:text-xl font-minecraft font-bold text-white mc-shadow">
                  {rule.title}
                </h2>
              </div>

              <span
                className={`text-[10px] font-minecraft font-bold px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto border ${
                  rule.severity === 'Permanent Ban'
                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                    : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                }`}
              >
                Penalty: {rule.severity}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-200 mb-2 font-minecraft">
              {rule.summary}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-minecraft">
              {rule.details}
            </p>
          </div>
        ))}
      </div>

      {/* Store Terms & Refund Policies */}
      <div className="mc-panel p-8 sm:p-10 rounded-3xl mb-12">
        <div className="flex items-center gap-3 mb-6">
          <McShield size={24} className="text-[#55ff55]" />
          <h2 className="text-xl sm:text-2xl font-minecraft font-bold text-white uppercase mc-shadow">
            STORE TERMS & LEGAL POLICIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed font-minecraft">
          {STORE_CONFIG.policies.map((pol, idx) => (
            <div key={idx} className="p-5 rounded-2xl mc-slot">
              <h3 className="font-minecraft font-bold text-[#55ff55] uppercase tracking-wider mb-2 text-xs">
                {pol.title}
              </h3>
              <p className="text-slate-400 font-minecraft">
                {pol.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200/90 leading-relaxed font-minecraft">
          <span className="font-minecraft font-bold text-rose-400 block mb-1">Chargeback Prohibition:</span>
          {STORE_CONFIG.chargebackWarning}
        </div>
      </div>

      {/* Mojang Disclaimer */}
      <div className="text-center text-[11px] font-minecraft text-slate-400 p-4 border-t border-slate-800">
        {SERVER_CONFIG.disclaimer}
      </div>
    </div>
  );
};
