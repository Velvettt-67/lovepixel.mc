import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimationControls } from 'motion/react';
import { usePageTransition, usePrefersReducedMotion } from '../context/usePageTransition';
import {
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { VoxelHeroCanvas } from '../components/3d/VoxelHeroCanvas';
import { CopyIpButton } from '../components/ui/CopyIpButton';
import { ServerStatusBadge } from '../components/ui/ServerStatusBadge';
import { Card3D } from '../components/ui/Card3D';
import { ProductCard } from '../components/store/ProductCard';
import { MinecraftServerTelemetry } from '../components/telemetry/MinecraftServerTelemetry';
import { ServerGameplayShowcase } from '../components/showcase/ServerGameplayShowcase';
import { McShield, McRedstone, McGrassBlock, McChest, McCompass } from '../components/ui/MinecraftIcons';
import { SERVER_CONFIG } from '../config/serverConfig';
import { STORE_CONFIG } from '../config/storeConfig';
import { EntityShowcase } from '../components/entities/EntityShowcase';
import { AmbientEntityLayer } from '../components/entities/AmbientEntityLayer';
import {
  PixelSteveSprite,
  PixelAlexSprite,
  PixelWolfSprite,
  PixelRedstoneEngineerSprite,
  PixelAllaySprite,
  PixelBeeSprite,
  PixelNetheritePaladinSprite,
  PixelDiamondKnightSprite,
  PixelEndermanSprite,
} from '../components/entities/PixelEntitySprites';

export const Home: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { homeTransitionKey } = usePageTransition();
  const prefersReducedMotion = usePrefersReducedMotion();
  const controls = useAnimationControls();
  const isFirstMountRef = useRef(true);

  // Initial entrance animation into the homepage
  useEffect(() => {
    controls.set({
      opacity: prefersReducedMotion ? 1 : 0.35,
      y: prefersReducedMotion ? 0 : 45,
      scale: prefersReducedMotion ? 1 : 0.985,
    });
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    });
  }, [controls, prefersReducedMotion]);

  // Cinematic upward glide when Love Pixel logo is clicked to return home
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    controls.set({
      opacity: prefersReducedMotion ? 1 : 0.3,
      y: prefersReducedMotion ? 0 : 50,
      scale: prefersReducedMotion ? 1 : 0.982,
    });
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    });
  }, [homeTransitionKey, controls, prefersReducedMotion]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const featuredProducts = STORE_CONFIG.products.filter(p => p.badge || p.category === 'ranks').slice(0, 4);

  return (
    <motion.div animate={controls} className="relative min-h-screen origin-top">
      {/* ----------------- SECTION 1: CINEMATIC 3D HERO ----------------- */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Ambient Sky Allay Floating Layer */}
        <AmbientEntityLayer variant="sky-allay" />

        {/* Layered R3F 3D Canvas with authentic Nether Citadel Portal & Shader Backdrop */}
        <VoxelHeroCanvas />

        {/* Hero Content Container (Wide Layout for optimal architectural balance) */}
        <div className="relative z-10 max-w-[1680px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Typography, Brand & Actions (60% width) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left pt-6 sm:pt-10">
            {/* Status & Level Badge Pill */}
            <div className="mb-6 flex flex-wrap items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-700">
              <ServerStatusBadge variant="pill" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-[11px] font-minecraft">
                <span className="w-2 h-2 rounded-full bg-[#80ff20] animate-pulse" />
                <span className="text-[#80ff20] font-bold">LVL 30</span>
                <span className="text-slate-400">• v1.20 - 1.21.x</span>
              </div>
            </div>

            {/* Headline with Authentic Minecraft Typography */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-minecraft font-bold tracking-tight text-white mb-5 uppercase leading-tight mc-shadow">
              YOUR NEXT WORLD <br />
              <span className="text-[#55ff55] mc-shadow-green">
                BEGINS HERE.
              </span>
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-slate-200 max-w-2xl font-minecraft leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              A new world. New adventures. Your next story starts with us. Enter the realm of pure voxel craftsmanship.
            </p>

            {/* Dual CTAs & Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <Link
                to="/store"
                className="px-7 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-[0_0_25px_rgba(85,255,85,0.3)] transition-all duration-200 flex items-center justify-center gap-2.5 group active:scale-95 cursor-pointer"
              >
                <McChest size={18} />
                <span>EXPLORE THE STORE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#game-modes"
                className="px-7 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button text-slate-200 hover:text-white transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <McCompass size={18} />
                <span>JOIN THE SERVER</span>
              </a>
            </div>

            {/* Interactive Server Address Copy Panel */}
            <CopyIpButton variant="hero" />
          </div>

          {/* Right Column: Server Highlight Card framing authentic Minecraft scenery */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="mc-panel w-full max-w-lg rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
              {/* Authentic In-Game Realm Preview with Live Video */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mc-slot mb-4 group/video">
                <video
                  src="/assets/videos/gameplay-showcase.mp4"
                  poster="/assets/images/bsl-sunset-haven.jpeg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141518]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 border border-emerald-500/40 text-[10px] font-minecraft text-[#55ff55]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55ff55] animate-pulse" />
                  <span>SURVIVAL SMP • REALM 01</span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-minecraft">
                  <span className="text-white font-bold mc-shadow">CITADEL HAVEN</span>
                  <span className="text-[#55ffff]">v1.20 - 1.21.x</span>
                </div>
              </div>

              {/* Quick Realm Specs & Infrastructure Highlights */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="mc-slot p-2 rounded-lg">
                  <span className="text-[9px] font-minecraft text-slate-400 block uppercase">ENGINE</span>
                  <span className="text-xs font-minecraft font-bold text-[#55ff55]">20.0 TPS</span>
                </div>
                <div className="mc-slot p-2 rounded-lg">
                  <span className="text-[9px] font-minecraft text-slate-400 block uppercase">DEFENSE</span>
                  <span className="text-xs font-minecraft font-bold text-[#55ffff]">ANYCAST</span>
                </div>
                <div className="mc-slot p-2 rounded-lg">
                  <span className="text-[9px] font-minecraft text-slate-400 block uppercase">CROSSPLAY</span>
                  <span className="text-xs font-minecraft font-bold text-[#ffaa00]">BEDROCK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-slate-400 flex flex-col items-center gap-1 pointer-events-none">
          <span className="text-[10px] font-minecraft uppercase tracking-widest text-slate-400">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-[#55ff55]" />
        </div>
      </section>

      {/* ----------------- SECTION 2: SERVER IDENTITY & PILLARS ----------------- */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1 rounded-full inline-block mb-3">
            Pure Voxel Craftsmanship
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-minecraft font-bold text-white tracking-tight mc-shadow">
            BUILT FOR BUILDERS. TUNED FOR PERFORMANCE.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed font-minecraft">
            Love Pixel is engineered with high-tickrate custom server hardware, authentic Mojang gameplay balance, and vibrant community-driven economies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1: Land Protection & Tamed Wolf Guardian */}
          <Card3D glowColor="rgba(85, 255, 85, 0.15)">
            <div className="mc-panel p-8 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mc-slot text-[#55ff55] flex items-center justify-center shadow-lg">
                    <McShield size={38} />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30">
                    <PixelWolfSprite size={24} animate />
                    <span className="text-[9px] font-minecraft text-emerald-300">TAMED GUARD</span>
                  </div>
                </div>
                <h3 className="text-lg font-minecraft font-bold text-white mb-2 mc-shadow">
                  Claim Land Protection
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-minecraft">
                  Sleep peacefully knowing your creations are protected. Expand your borders with claim blocks, grant granular friend permissions, and lock your chests.
                </p>
              </div>
            </div>
          </Card3D>

          {/* Pillar 2: 20 TPS Economy & Redstone Mechanist */}
          <Card3D glowColor="rgba(85, 255, 255, 0.15)">
            <div className="mc-panel p-8 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mc-slot text-[#ef4444] flex items-center justify-center shadow-lg">
                    <McRedstone size={38} />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/30">
                    <PixelRedstoneEngineerSprite size={20} animate />
                    <span className="text-[9px] font-minecraft text-red-300">20 TPS CLOCK</span>
                  </div>
                </div>
                <h3 className="text-lg font-minecraft font-bold text-white mb-2 mc-shadow">
                  Lag-Free 20 TPS Economy
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-minecraft">
                  Powered by optimized server cores and asynchronous chunk loading to preserve a butter-smooth 20 TPS tick rate even during massive mob farm automation.
                </p>
              </div>
            </div>
          </Card3D>

          {/* Pillar 3: Cross-Platform & Steve / Alex Duo */}
          <Card3D glowColor="rgba(255, 170, 0, 0.15)">
            <div className="mc-panel p-8 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mc-slot text-[#84cc16] flex items-center justify-center shadow-lg">
                    <McGrassBlock size={38} />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30">
                    <PixelSteveSprite size={18} animate />
                    <PixelAlexSprite size={18} animate />
                    <span className="text-[9px] font-minecraft text-cyan-300">CROSSPLAY</span>
                  </div>
                </div>
                <h3 className="text-lg font-minecraft font-bold text-white mb-2 mc-shadow">
                  Cross-Platform Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-minecraft">
                  Play seamlessly with friends on PC, mobile, consoles, and VR through our Geyser integration with identical inventories, skins, and mechanics.
                </p>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* ----------------- SECTION 3: WORLD & GAME MODES SHOWCASE ----------------- */}
      <section id="game-modes" className="relative py-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ffff] bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full inline-block mb-3">
              Expansive Realms
            </span>
            <h2 className="text-2xl sm:text-4xl font-minecraft font-bold text-white tracking-tight mc-shadow">
              WORLD GAME MODES
            </h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mt-3 md:mt-0 font-minecraft leading-relaxed">
            Explore dedicated survival worlds configured with custom world generation, dynamic events, and dedicated player hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVER_CONFIG.gameModes.map(mode => (
            <div
              key={mode.id}
              className="group mc-panel rounded-2xl overflow-hidden hover:border-[#55ff55]/60 transition-all duration-300 flex flex-col"
            >
              {/* Authentic Environment Screenshot Banner */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={mode.bannerImage}
                  alt={mode.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d22] via-[#1c1d22]/40 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-[10px] font-minecraft font-bold uppercase tracking-wider bg-black/70 text-[#55ff55] border border-emerald-500/30 backdrop-blur-md">
                    {mode.badge}
                  </span>
                </div>

                {/* Themed Biome Creature Accents */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-slate-700/80 backdrop-blur-md">
                  {mode.id === 'survival-smp' && (
                    <>
                      <PixelAlexSprite size={16} animate />
                      <PixelWolfSprite size={18} animate />
                    </>
                  )}
                  {mode.id === 'skyblock-islands' && (
                    <>
                      <PixelAllaySprite size={16} animate />
                      <PixelBeeSprite size={16} animate />
                    </>
                  )}
                  {mode.id === 'nether-citadel' && (
                    <>
                      <PixelNetheritePaladinSprite size={16} animate />
                      <PixelEndermanSprite size={14} animate />
                    </>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-minecraft font-bold text-white drop-shadow-md mc-shadow">
                    {mode.title}
                  </h3>
                  <p className="text-xs text-slate-200 font-minecraft drop-shadow line-clamp-1 mt-0.5">
                    {mode.tagline}
                  </p>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed font-minecraft">
                  {mode.description}
                </p>

                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800">
                  {mode.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-200 font-minecraft">
                      <CheckCircle2 className="w-4 h-4 text-[#55ff55] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/store"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Realm Store Perks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- SECTION 4: SERVER GAMEPLAY SHOWCASE (CINEMATIC UNIVERSE) ----------------- */}
      <section id="gameplay" className="relative py-16 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto scroll-mt-24">
        <ServerGameplayShowcase />
      </section>

      {/* ----------------- SECTION 5: LIVING MINECRAFT ECOSYSTEM (CHARACTERS & FAUNA) ----------------- */}
      <section id="ecosystem" className="relative py-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto scroll-mt-24">
        <EntityShowcase />
      </section>

      {/* ----------------- SECTION 6: FEATURED STORE SHOWCASE ----------------- */}
      <section id="ranks" className="relative py-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1 rounded-full inline-block mb-3">
              Official Digital Store
            </span>
            <h2 className="text-2xl sm:text-4xl font-minecraft font-bold text-white tracking-tight mc-shadow">
              FEATURED DIGITAL PERKS
            </h2>
          </div>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 text-xs font-minecraft font-bold text-[#55ff55] hover:underline transition-colors mt-4 md:mt-0"
          >
            <span>Browse Full Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ----------------- SECTION 7: LIVE SERVER STATUS & TELEMETRY ----------------- */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto">
        <MinecraftServerTelemetry />
      </section>

      {/* ----------------- SECTION 8: COMMUNITY & DISCORD ----------------- */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto">
        <div className="relative mc-panel rounded-3xl p-8 sm:p-12 overflow-hidden">
          <div
            className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ffff] bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full inline-block mb-4">
              Community Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-minecraft font-bold text-white tracking-tight mb-4 mc-shadow">
              JOIN THE LOVE PIXEL GUILD
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-minecraft">
              Connect with fellow pioneers, recruit team members for your faction, share your mega builds, and participate in weekly giveaways and server development updates.
            </p>

            {/* Pioneer Guild Skin Lineup */}
            <div className="mb-8 p-4 rounded-2xl bg-black/60 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-1.5">
                  <PixelSteveSprite size={22} className="hover:scale-125 transition-transform" />
                  <PixelAlexSprite size={22} className="hover:scale-125 transition-transform" />
                  <PixelDiamondKnightSprite size={22} className="hover:scale-125 transition-transform" />
                  <PixelNetheritePaladinSprite size={22} className="hover:scale-125 transition-transform" />
                  <PixelRedstoneEngineerSprite size={22} className="hover:scale-125 transition-transform" />
                </div>
                <div>
                  <span className="text-xs font-minecraft font-bold text-white block">
                    Guild Pioneer Roster
                  </span>
                  <span className="text-[10px] font-minecraft text-[#55ff55]">
                    +1,200 Registered Crafters
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-minecraft text-slate-300">
                <span>ALL CANON SKINS WELCOME</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/community"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <McCompass size={16} />
                <span>Explore Community Hub</span>
              </Link>

              <Link
                to="/rules"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Read Server Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 9: FREQUENTLY ASKED QUESTIONS ----------------- */}
      <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-24">
        <div className="text-center mb-12">
          <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1 rounded-full inline-block mb-3">
            Knowledge Base
          </span>
          <h2 className="text-2xl sm:text-4xl font-minecraft font-bold text-white tracking-tight mc-shadow">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 font-minecraft">
            Everything you need to know about joining, connecting, and shopping on Love Pixel.
          </p>
        </div>

        <div className="space-y-4">
          {SERVER_CONFIG.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="mc-panel rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-[#55ff55] transition-colors cursor-pointer"
                >
                  <span className="font-minecraft text-xs sm:text-sm">{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#55ff55] transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3 font-minecraft">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};
