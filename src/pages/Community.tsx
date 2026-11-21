import React from 'react';
import {
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { SERVER_CONFIG } from '../config/serverConfig';
import { Card3D } from '../components/ui/Card3D';
import {
  McPickaxe,
  McShield,
  McCompass,
  McSword,
} from '../components/ui/MinecraftIcons';
import {
  PixelSteveSprite,
  PixelAlexSprite,
  PixelDiamondKnightSprite,
  PixelNetheritePaladinSprite,
  PixelRedstoneEngineerSprite,
  PixelWolfSprite,
} from '../components/entities/PixelEntitySprites';

export const Community: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto">
      {/* Community Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 mb-12 mc-panel shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50 scale-105"
          style={{ backgroundImage: `url('/assets/images/harbor-village.jpeg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ffff] bg-cyan-950/80 border border-cyan-500/40 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <McCompass size={14} />
            Fellow Pioneers
          </span>
          <h1 className="text-3xl sm:text-5xl font-minecraft font-bold text-white tracking-tight uppercase mc-shadow">
            COMMUNITY & GUILDS
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed font-minecraft">
            The heart of Love Pixel is our player community. Join our Discord guild, participate in architectural build contests, and apply for the Creator Media Program.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            {SERVER_CONFIG.isDiscordConfigured ? (
              <a
                href={SERVER_CONFIG.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Official Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-minecraft mc-panel text-slate-300">
                <MessageSquare className="w-4 h-4 text-[#55ffff]" />
                <span>Discord Guild Opening at Public Launch</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Community Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card3D glowColor="rgba(6, 182, 212, 0.2)">
          <div className="mc-panel p-8 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl mc-slot text-[#55ffff] flex items-center justify-center mb-6 shadow-lg">
                <McSword size={36} />
              </div>
              <h3 className="text-lg font-minecraft font-bold text-white mb-2 mc-shadow">
                Creator Media Program
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-minecraft mb-4">
                Streamers and YouTube builders receive the exclusive [MEDIA] prefix, custom camera tools for cinematic timelapses, and monthly crate support for community events.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-minecraft text-[#55ffff]">
              Requirements: 500+ active followers
            </div>
          </div>
        </Card3D>

        <Card3D glowColor="rgba(16, 185, 129, 0.2)">
          <div className="mc-panel p-8 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl mc-slot text-[#55ff55] flex items-center justify-center mb-6 shadow-lg">
                <McPickaxe size={36} />
              </div>
              <h3 className="text-lg font-minecraft font-bold text-white mb-2 mc-shadow">
                Weekly Build Contests
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-minecraft mb-4">
                Showcase your creativity in our themed community building showcases. Winners have their builds immortalized on the community hall of fame and earn store vouchers.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-minecraft text-[#55ff55]">
              Judged by Community & Staff
            </div>
          </div>
        </Card3D>

        <Card3D glowColor="rgba(245, 158, 11, 0.2)">
          <div className="mc-panel p-8 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl mc-slot text-[#ffaa00] flex items-center justify-center mb-6 shadow-lg">
                <McShield size={36} />
              </div>
              <h3 className="text-lg font-minecraft font-bold text-white mb-2 mc-shadow">
                Staff & Helper Team
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-minecraft mb-4">
                Dedicated community moderators ensure a toxic-free and grief-protected environment 24/7. Staff applications open periodically to active, mature community members.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-minecraft text-[#ffaa00]">
              Volunteer positions open upon launch
            </div>
          </div>
        </Card3D>
      </div>

      {/* Community Pioneer Skins Roster */}
      <div className="mc-panel p-8 sm:p-10 rounded-3xl mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full inline-block mb-2">
              Character Ecosystem
            </span>
            <h2 className="text-xl sm:text-3xl font-minecraft font-bold text-white uppercase mc-shadow">
              OFFICIAL REALM PIONEER ARCHETYPES
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-minecraft mt-1">
              Every canon Minecraft player skin is celebrated across our server community and events.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-minecraft text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#55ff55] animate-pulse" />
            <span>9 DEFAULT SKINS + TITAN GEAR</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'steve', name: 'Steve', role: 'Classic Miner', color: '#0891b2', sprite: <PixelSteveSprite size={24} animate /> },
            { id: 'alex', name: 'Alex', role: 'Wilderness Scout', color: '#4d7c0f', sprite: <PixelAlexSprite size={24} animate /> },
            { id: 'knight', name: 'Knight', role: 'Enchanted Champion', color: '#0284c7', sprite: <PixelDiamondKnightSprite size={24} animate /> },
            { id: 'paladin', name: 'Paladin', role: 'Ancient Vanguard', color: '#334155', sprite: <PixelNetheritePaladinSprite size={24} animate /> },
            { id: 'redstone', name: 'Mechanist', role: 'Redstone Engineer', color: '#dc2626', sprite: <PixelRedstoneEngineerSprite size={24} animate /> },
            { id: 'companion', name: 'Guardian', role: 'Tamed Companion', color: '#f59e0b', sprite: <PixelWolfSprite size={26} animate /> },
          ].map(pioneer => (
            <div
              key={pioneer.id}
              className="mc-slot p-4 rounded-xl flex flex-col items-center text-center group hover:border-[#55ff55]/50 transition-all cursor-pointer"
            >
              <div className="mb-3 py-1 group-hover:scale-115 transition-transform duration-200">
                {pioneer.sprite}
              </div>
              <span className="text-xs font-minecraft font-bold text-white block mc-shadow">
                {pioneer.name}
              </span>
              <span className="text-[10px] font-minecraft text-slate-400 mt-0.5 block truncate w-full">
                {pioneer.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Hierarchy Overview */}
      <div className="mc-panel p-8 sm:p-10 rounded-3xl">
        <h2 className="text-xl sm:text-2xl font-minecraft font-bold text-white mb-6 uppercase mc-shadow">
          SERVER LEADERSHIP HIERARCHY
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-minecraft">
          <div className="mc-slot p-4 rounded-xl">
            <span className="text-[#c084fc] font-bold block">[OWNER / DEV]</span>
            <span className="text-white font-semibold mt-1 block">Pixel Engineering Core</span>
            <span className="text-slate-400 text-[10px] mt-1 font-minecraft block">Infrastructure & Plugin Architecture</span>
          </div>
          <div className="mc-slot p-4 rounded-xl">
            <span className="text-[#f43f5e] font-bold block">[ADMIN]</span>
            <span className="text-white font-semibold mt-1 block">Operations Lead</span>
            <span className="text-slate-400 text-[10px] mt-1 font-minecraft block">Economy Balance & Event Directors</span>
          </div>
          <div className="mc-slot p-4 rounded-xl">
            <span className="text-[#38bdf8] font-bold block">[MOD]</span>
            <span className="text-white font-semibold mt-1 block">Moderation Team</span>
            <span className="text-slate-400 text-[10px] mt-1 font-minecraft block">In-Game Chat & Rule Enforcement</span>
          </div>
          <div className="mc-slot p-4 rounded-xl">
            <span className="text-[#55ff55] font-bold block">[HELPER]</span>
            <span className="text-white font-semibold mt-1 block">Guide Team</span>
            <span className="text-slate-400 text-[10px] mt-1 font-minecraft block">New Player Onboarding & Assistance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
