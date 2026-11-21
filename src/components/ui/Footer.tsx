import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PixelLogo } from './PixelLogo';
import { CopyIpButton } from './CopyIpButton';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { AssetCreditsModal } from './AssetCreditsModal';
import { McCompass, McEmerald, McBookQuill, McShield } from './MinecraftIcons';
import {
  PixelSteveSprite,
  PixelAlexSprite,
  PixelWolfSprite,
  PixelPigSprite,
  PixelSheepSprite,
  PixelBeeSprite,
  PixelAllaySprite,
  PixelRedstoneEngineerSprite,
} from '../entities/PixelEntitySprites';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <>
      <footer className="relative bg-[#05070a] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-850">
            {/* Col 1: Brand & Identity */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="inline-block">
                <PixelLogo size="lg" showTagline={true} />
              </Link>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed font-minecraft">
                A cinematic Minecraft universe forged for builders, explorers, and competitive pioneers. Custom voxel mechanics, vibrant survival realms, and a transparent digital storefront.
              </p>
              
              {/* Server Quick Connect Pill */}
              <div className="pt-1 pb-2">
                <CopyIpButton variant="compact" />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setCreditsOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-minecraft bg-emerald-950/60 text-[#55ff55] border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors cursor-pointer"
                >
                  <McShield size={14} />
                  <span>Verify Asset Credits & Licenses</span>
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('pixel_mc_replay_intro'))}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-minecraft bg-slate-900/80 text-amber-400 border border-amber-500/30 hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title="Replay the Minecraft TNT Cinematic Intro"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Replay Intro</span>
                </button>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-minecraft font-bold uppercase tracking-wider text-white flex items-center gap-1.5 mc-shadow">
                <McCompass size={15} />
                Network
              </h4>
              <ul className="space-y-2 text-xs font-minecraft text-slate-300">
                <li><Link to="/" className="hover:text-[#55ff55] transition-colors block">Home</Link></li>
                <li><Link to="/#game-modes" className="hover:text-[#55ff55] transition-colors block">Survival SMP</Link></li>
                <li><Link to="/#game-modes" className="hover:text-[#55ff55] transition-colors block">Skyblock Realms</Link></li>
                <li><Link to="/#game-modes" className="hover:text-[#55ff55] transition-colors block">Mythic Dungeons</Link></li>
              </ul>
            </div>

            {/* Col 3: Storefront */}
            <div className="space-y-3">
              <h4 className="text-xs font-minecraft font-bold uppercase tracking-wider text-white flex items-center gap-1.5 mc-shadow">
                <McEmerald size={15} />
                Store
              </h4>
              <ul className="space-y-2 text-xs font-minecraft text-slate-300">
                <li><Link to="/store" className="hover:text-[#55ff55] transition-colors block">Catalogue</Link></li>
                <li><Link to="/store/ranks" className="hover:text-[#55ff55] transition-colors block">Ranks</Link></li>
                <li><Link to="/store/keys" className="hover:text-[#55ff55] transition-colors block">Crate Keys</Link></li>
                <li><Link to="/store/cosmetics" className="hover:text-[#55ff55] transition-colors block">Cosmetics</Link></li>
                <li><Link to="/cart" className="hover:text-[#55ff55] transition-colors block">Shopping Cart</Link></li>
              </ul>
            </div>

            {/* Col 4: Community & Rules */}
            <div className="space-y-3">
              <h4 className="text-xs font-minecraft font-bold uppercase tracking-wider text-white flex items-center gap-1.5 mc-shadow">
                <McBookQuill size={15} />
                Community & Rules
              </h4>
              <ul className="space-y-2 text-xs font-minecraft text-slate-300">
                <li><Link to="/community" className="hover:text-[#55ff55] transition-colors block">Discord & Events</Link></li>
                <li><Link to="/rules" className="hover:text-[#55ff55] transition-colors block">Server Rules</Link></li>
                <li><Link to="/support" className="hover:text-[#55ff55] transition-colors block">Help & FAQ</Link></li>
                <li>
                  <button
                    onClick={() => setCreditsOpen(true)}
                    className="hover:text-[#55ff55] transition-colors text-left cursor-pointer font-minecraft text-xs block"
                  >
                    Asset Transparency
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Living Minecraft Bedrock Stroll (Adventurers & Fauna Parade) */}
          <div className="my-8 p-4 rounded-2xl bg-black/70 border border-slate-800/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] font-minecraft text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#55ff55] animate-pulse" />
              <span className="font-bold text-white">LIVING REALM ECOSYSTEM</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">Pioneers & Peaceful Companions</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto py-1 px-2 max-w-full">
              <div title="Steve (Pioneer Miner)">
                <PixelSteveSprite size={20} animate />
              </div>
              <div title="Alex (Wilderness Scout)">
                <PixelAlexSprite size={20} animate />
              </div>
              <div title="Tamed Wolf Companion">
                <PixelWolfSprite size={22} animate />
              </div>
              <div title="Pasture Pig">
                <PixelPigSprite size={20} animate />
              </div>
              <div title="Fluffy Sheep">
                <PixelSheepSprite size={20} animate />
              </div>
              <div title="Luminescent Allay">
                <PixelAllaySprite size={18} animate />
              </div>
              <div title="Honey Bee">
                <PixelBeeSprite size={18} animate />
              </div>
              <div title="Redstone Mechanist">
                <PixelRedstoneEngineerSprite size={20} animate />
              </div>
            </div>
          </div>

          {/* Mandatory Mojang Disclaimer Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <p className="text-xs font-minecraft tracking-wide text-slate-200">
              {SERVER_CONFIG.disclaimer}
            </p>
            <p className="text-[10px] sm:text-[11px] font-minecraft text-slate-400 mt-1.5 leading-relaxed">
              Minecraft is copyright Mojang AB and Microsoft Corporation. Love Pixel is an independent community server project and is not endorsed by or affiliated with Mojang Studios.
            </p>
          </div>

          {/* Copyright Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-minecraft text-slate-400 gap-4">
            <div>
              © {CURRENT_YEAR} Love Pixel Network. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/rules" className="hover:text-[#55ff55] transition-colors">Terms of Service</Link>
              <Link to="/rules" className="hover:text-[#55ff55] transition-colors">Privacy Policy</Link>
              <Link to="/support" className="hover:text-[#55ff55] transition-colors">Support Desk</Link>
            </div>
          </div>
        </div>
      </footer>

      <AssetCreditsModal isOpen={creditsOpen} onClose={() => setCreditsOpen(false)} />
    </>
  );
};
