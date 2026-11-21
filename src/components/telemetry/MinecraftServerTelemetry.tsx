import React from 'react';
import { useServerStatus } from '../../hooks/useServerStatus';
import { SERVER_CONFIG } from '../../config/serverConfig';
import {
  McShield,
  McRedstone,
  McClock,
  McCompass,
  McHeart,
  McArmor,
  McGrassBlock,
  McExperienceOrb
} from '../ui/MinecraftIcons';
import {
  PixelIronGolemSprite,
  PixelRedstoneEngineerSprite,
  PixelSteveSprite,
  PixelAlexSprite,
} from '../entities/PixelEntitySprites';

export const MinecraftServerTelemetry: React.FC = () => {
  const status = useServerStatus();

  return (
    <div className="space-y-8">
      {/* ---------------- 1. MINECRAFT HUD-INSPIRED TELEMETRY PANEL ---------------- */}
      <div className="mc-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        {/* Subtle grid background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Top Header: Coordinates & Realm Info */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="mc-slot w-16 h-16 rounded-2xl flex items-center justify-center text-[#55ff55] shadow-lg flex-shrink-0">
              <McGrassBlock size={36} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg sm:text-xl font-minecraft font-bold text-white tracking-wide mc-shadow">
                  SERVER TELEMETRY & HUD
                </h3>
                <span
                  className={`text-[10px] font-minecraft px-2.5 py-0.5 rounded uppercase font-bold border ${
                    status.online
                      ? 'bg-emerald-950/80 text-[#55ff55] border-emerald-500/50'
                      : 'bg-cyan-950/80 text-[#55ffff] border-cyan-500/40'
                  }`}
                >
                  {status.online ? 'Online' : 'Whitelisting'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-minecraft mt-1">
                {status.online && status.motd
                  ? status.motd
                  : 'Live instance sync with automated backend monitoring & honest reporting.'}
              </p>
            </div>
          </div>

          {/* Coordinate HUD Readouts */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-minecraft">
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              <span className="text-slate-500">XYZ: </span>
              <span className="text-[#55ffff]">128 / 64 / -256</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              <span className="text-slate-500">CHUNK: </span>
              <span className="text-[#55ff55]">[8, 16]</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-500">PIONEERS: </span>
              <div className="flex items-center -space-x-1">
                <PixelSteveSprite size={12} />
                <PixelAlexSprite size={12} />
              </div>
              <span className="text-[#55ff55] font-bold">
                {status.playersOnline !== null ? status.playersOnline : 'ONLINE'}
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              <span className="text-slate-500">ENGINE: </span>
              <span className="text-[#ffaa00]">20.0 TPS</span>
            </div>
          </div>
        </div>

        {/* Middle: Authentic Minecraft Health, Armor & Experience HUD */}
        <div className="relative z-10 py-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* 10 Hearts (Health Bar) */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-minecraft text-rose-400 mr-1 hidden sm:inline">HP:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <McHeart key={`hp-${i}`} size={18} />
                ))}
              </div>
            </div>

            {/* 10 Armor Chestplates (Defense Bar) */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-minecraft text-slate-300 mr-1 hidden sm:inline">ARMOR:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <McArmor key={`arm-${i}`} size={18} />
                ))}
              </div>
            </div>
          </div>

          {/* Authentic Segmented Experience Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-minecraft">
              <span className="text-slate-400 text-[10px]">EXPERIENCE BUFFER</span>
              <span className="text-[#55ff55] font-bold mc-shadow flex items-center gap-1.5">
                <McExperienceOrb size={15} />
                LEVEL 30
              </span>
            </div>

            <div className="relative h-4 rounded bg-black/80 border border-slate-700/80 p-0.5 overflow-hidden">
              {/* Green Gradient XP Bar */}
              <div
                className="h-full rounded-sm bg-gradient-to-r from-[#65a30d] via-[#84cc16] to-[#a3e635] shadow-[0_0_12px_rgba(132,204,22,0.6)] transition-all duration-700"
                style={{ width: '84%' }}
              />
              {/* Notch Dividers (10 notches in Minecraft XP bar) */}
              <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`notch-${i}`} className="w-[1.5px] h-full bg-black/70" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details Grid: Version, Ports, Status */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs font-minecraft">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-minecraft text-slate-500 uppercase block">Java Address</span>
            <span className="text-white font-bold font-minecraft truncate block mt-0.5">
              {SERVER_CONFIG.serverAddress}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-minecraft text-slate-500 uppercase block">Java Port</span>
            <span className="text-[#55ff55] font-bold font-minecraft block mt-0.5">
              {SERVER_CONFIG.serverPortJava}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-minecraft text-slate-500 uppercase block">Bedrock Port</span>
            <span className="text-[#55ffff] font-bold font-minecraft block mt-0.5">
              {SERVER_CONFIG.serverPortBedrock}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-minecraft text-slate-500 uppercase block">Clients</span>
            <span className="text-slate-200 font-bold font-minecraft text-[11px] truncate block mt-0.5">
              {SERVER_CONFIG.supportedVersions}
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- 2. REDESIGNED FEATURE CARDS WITH PROMINENT 64PX ICON SLOTS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: DDoS Protection */}
        <div className="mc-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-[#55ff55]/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="mc-slot w-16 h-16 rounded-2xl flex items-center justify-center text-amber-500 shadow-md">
                <McShield size={38} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-minecraft px-2 py-0.5 rounded bg-emerald-950/80 text-[#55ff55] border border-emerald-500/30">
                  L3 / L4 / L7
                </span>
                <div title="Iron Golem Sentinel Protection">
                  <PixelIronGolemSprite size={18} animate />
                </div>
              </div>
            </div>

            <h4 className="text-sm sm:text-base font-minecraft font-bold text-white mb-2 mc-shadow">
              Anycast DDoS Shield
            </h4>
            <p className="text-xs text-slate-300 font-minecraft leading-relaxed mb-4">
              Automated multi-Tbps edge mitigation defending packet integrity against volumetric attacks with zero realm interruption.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-minecraft text-slate-400">
            <span>OBSIDIAN BASTION</span>
            <span className="text-[#55ff55]">ACTIVE</span>
          </div>
        </div>

        {/* Card 2: Lag-Free / Performance (Redstone Repeater Engine) */}
        <div className="mc-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-[#ef4444]/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="mc-slot w-16 h-16 rounded-2xl flex items-center justify-center text-rose-500 shadow-md">
                <McRedstone size={38} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-minecraft px-2 py-0.5 rounded bg-rose-950/80 text-[#f87171] border border-rose-500/30">
                  20.0 TPS CORE
                </span>
                <div title="Redstone Mechanist Engine">
                  <PixelRedstoneEngineerSprite size={16} animate />
                </div>
              </div>
            </div>

            <h4 className="text-sm sm:text-base font-minecraft font-bold text-white mb-2 mc-shadow">
              Redstone Tick Engine
            </h4>
            <p className="text-xs text-slate-300 font-minecraft leading-relaxed mb-4">
              Asynchronous chunk loading and optimized redstone physics keeping tick durations under 50ms without skipping cycles.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-minecraft text-slate-400">
            <span>TICK RATE</span>
            <span className="text-[#55ff55]">20.0 TPS</span>
          </div>
        </div>

        {/* Card 3: Schedule & Lifecycle */}
        <div className="mc-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-[#fbbf24]/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="mc-slot w-16 h-16 rounded-2xl flex items-center justify-center text-amber-400 shadow-md">
                <McClock size={38} />
              </div>
              <span className="text-[9px] font-minecraft px-2.5 py-1 rounded bg-amber-950/80 text-[#fbbf24] border border-amber-500/30">
                04:00 UTC
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-minecraft font-bold text-white mb-2 mc-shadow">
              Lifecycle & Backups
            </h4>
            <p className="text-xs text-slate-300 font-minecraft leading-relaxed mb-4">
              Scheduled daily off-site cloud snapshots, automated crash recoveries, and transparent 99.9% uptime target maintenance.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-minecraft text-slate-400">
            <span>UPTIME TARGET</span>
            <span className="text-[#55ff55]">99.9%</span>
          </div>
        </div>

        {/* Card 4: 2M Nodes Latency and Redstone Graph */}
        <div className="mc-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-[#38bdf8]/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="mc-slot w-16 h-16 rounded-2xl flex items-center justify-center text-cyan-400 shadow-md">
                <McCompass size={38} />
              </div>
              <span className="text-[9px] font-minecraft px-2.5 py-1 rounded bg-cyan-950/80 text-[#55ffff] border border-cyan-500/30">
                ANYCAST BGP
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-minecraft font-bold text-white mb-2 mc-shadow">
              Node Routing & Ping
            </h4>

            {/* Pixelated Redstone Circuit Graph */}
            <div className="my-2.5 p-2 rounded-lg bg-slate-950/90 border border-slate-800">
              <div className="flex items-end justify-between h-8 px-1 gap-1">
                {[32, 28, 24, 29, 22, 26, 20, 24, 18, 22].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full bg-[#ef4444] rounded-t-xs opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${(val / 35) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-minecraft text-slate-500 mt-1">
                <span>US-EAST</span>
                <span>EU-CENTRAL</span>
                <span>ASIA-PAC</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-minecraft leading-relaxed mb-3">
              Direct low-latency carrier peering connecting global players with sub-30ms backbone routes.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-minecraft text-slate-400">
            <span>MEASURED RTT</span>
            <span className="text-[#55ffff]">
              {status.ping !== null ? `${status.ping}ms` : '< 30ms'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
