import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Search,
  User,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import type { ProductCategory } from '../config/storeConfig';
import { ProductCard } from '../components/store/ProductCard';
import { CurrencySelector } from '../components/store/CurrencySelector';
import { useCart } from '../context/useCart';
import { useAudio } from '../context/useAudio';
import { MinecraftUserModal } from '../components/store/MinecraftUserModal';
import {
  McGrassBlock,
  McShield,
  McChest,
  McEmerald,
  McRedstone,
  McEnderPearl,
  McClock
} from '../components/ui/MinecraftIcons';
import {
  PixelDiamondKnightSprite,
  PixelAllaySprite,
  PixelRedstoneEngineerSprite
} from '../components/entities/PixelEntitySprites';

export const Store: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    (urlCategory as ProductCategory) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameMode, setSelectedGameMode] = useState<string>('all');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const { minecraftUsername } = useCart();
  const { playXpOrb } = useAudio();

  const categoryIcons: Record<string, React.ReactNode> = {
    all: <McGrassBlock size={16} />,
    ranks: <McShield size={16} />,
    keys: <McChest size={16} />,
    cosmetics: <McEmerald size={16} />,
    boosters: <McRedstone size={16} />,
    bundles: <McEnderPearl size={16} />,
  };

  const filteredProducts = useMemo(() => {
    return STORE_CONFIG.products.filter(product => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Game Mode match
      if (selectedGameMode !== 'all' && product.gameMode !== selectedGameMode) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesPerks = product.perks.some(p => p.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesPerks) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedGameMode, searchQuery]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto">
      {/* Store Header Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 mb-10 border border-slate-700/60 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50 scale-105"
          style={{ backgroundImage: `url('/assets/images/harbor-village.jpeg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full inline-block mb-3">
              Official Server Ranks & Upgrades
            </span>
            <h1 className="text-3xl sm:text-5xl font-minecraft font-bold text-white tracking-tight mc-shadow">
              LOVE PIXEL STORE
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-minecraft">
              Select your rank tier below. Rank purchases are coordinated through our official Discord server where staff confirm your selected rank and arrange delivery to your Minecraft account.
            </p>

            {/* Official Discord Community & Linking Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://discord.gg/lovepixel"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playXpOrb(1.1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mc-button-primary text-slate-950 text-xs font-minecraft font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(85,255,85,0.3)] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Official Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsUserModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-[#55ff55] text-xs font-minecraft transition-all text-slate-200 cursor-pointer"
              >
                <User className="w-4 h-4 text-[#55ff55]" />
                <span>
                  {minecraftUsername ? (
                    <>
                      Player: <span className="font-bold text-[#55ff55]">{minecraftUsername}</span> (Change)
                    </>
                  ) : (
                    <span>Link Minecraft Username for In-Game Delivery</span>
                  )}
                </span>
              </button>

              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#55ffff]" />
                <span>Mojang Guidelines Compliant</span>
              </span>
            </div>

            <p className="text-[11px] text-[#55ffff] font-minecraft mt-3.5 flex items-center gap-1.5">
              <span>&ldquo;Join the Love Pixel community on Discord to request your rank.&rdquo;</span>
            </p>
          </div>

          {/* Living Realm Courier Card */}
          <div className="hidden lg:flex flex-col items-center gap-3 p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-xl max-w-xs text-center">
            <div className="flex items-center gap-3">
              <PixelDiamondKnightSprite size={28} animate />
              <PixelAllaySprite size={26} animate />
              <PixelRedstoneEngineerSprite size={28} animate />
            </div>
            <div>
              <span className="text-xs font-minecraft font-bold text-white block">Realm Courier Delivery</span>
              <span className="text-[10px] text-slate-400 font-minecraft leading-tight">Instant UUID sync to all online game modes & realms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Category Controls */}
      <div className="space-y-6 mb-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {STORE_CONFIG.categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  playXpOrb(1.0);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'mc-button-primary text-slate-950 shadow-[0_0_20px_rgba(85,255,85,0.3)]'
                    : 'mc-button text-slate-300 hover:text-white'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Currency & Game Mode Filters Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl mc-panel backdrop-blur-md">
          {/* Search bar */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search ranks, keys, cosmetics, perks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#55ff55] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  playXpOrb(0.9);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Currency Switcher & Game Mode Dropdown */}
          <div className="flex flex-wrap items-center gap-4 justify-between sm:justify-end">
            {/* Currency Selector Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-minecraft">Currency:</span>
              <CurrencySelector variant="full" />
            </div>

            {/* Game Mode Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-minecraft hidden sm:inline">Realm:</span>
              <select
                value={selectedGameMode}
                onChange={e => {
                  setSelectedGameMode(e.target.value);
                  playXpOrb(0.95);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#55ff55] cursor-pointer"
              >
                <option value="all">All Realms (Global)</option>
                <option value="Global">Global Network</option>
                <option value="Survival SMP">Survival SMP</option>
                <option value="Skyblock Realms">Skyblock Realms</option>
                <option value="Dungeons RPG">Dungeons RPG</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 mc-panel rounded-2xl max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-[#ffaa00] mx-auto mb-3" />
          <h3 className="text-lg font-minecraft font-bold text-white mc-shadow">No products found</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4 font-minecraft">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedGameMode('all');
              playXpOrb(0.85);
            }}
            className="px-4 py-2 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Delivery Notice & Store Policies Banner */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-slate-850">
        <div className="p-6 rounded-2xl mc-panel flex items-start gap-4">
          <McClock size={24} className="text-[#55ff55] flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-minecraft font-bold text-white uppercase mc-shadow">Automated Server Delivery</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed font-minecraft">
              {STORE_CONFIG.deliveryNotice}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl mc-panel flex items-start gap-4">
          <McShield size={24} className="text-[#55ffff] flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-minecraft font-bold text-white uppercase mc-shadow">Fair Play & Security Guarantee</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed font-minecraft">
              Purchases are processed securely and comply with Minecraft Commercial Guidelines. Chargeback attempts will invoke network protection.
            </p>
          </div>
        </div>
      </div>

      <MinecraftUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
};
