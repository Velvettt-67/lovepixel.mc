import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Check,
  ArrowLeft,
  Gift,
  AlertCircle,
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/useCart';
import { useCurrency } from '../context/useCurrency';
import { useAudio } from '../context/useAudio';
import { ProductCard } from '../components/store/ProductCard';
import { CurrencySelector } from '../components/store/CurrencySelector';
import { RankPurchaseModal } from '../components/store/RankPurchaseModal';
import {
  McChest,
  McShield,
  McClock,
  McCompass,
  McDiamond
} from '../components/ui/MinecraftIcons';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, minecraftUsername, setMinecraftUsername } = useCart();
  const { formatProductPrice, currency } = useCurrency();
  const { playXpOrb } = useAudio();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);
  const [recipientUsername, setRecipientUsername] = useState('');
  const [usernameInput, setUsernameInput] = useState(minecraftUsername);
  const [error, setError] = useState<string | null>(null);

  const product = STORE_CONFIG.products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 text-center max-w-md mx-auto">
        <div className="mc-panel p-8 rounded-2xl border border-slate-800">
          <AlertCircle className="w-12 h-12 text-[#ffaa00] mx-auto mb-4" />
          <h2 className="text-xl font-minecraft font-bold text-white mc-shadow">PRODUCT NOT FOUND</h2>
          <p className="text-xs text-slate-300 mt-2 mb-6 font-minecraft leading-relaxed">
            The requested product item does not exist or may have been updated.
          </p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary text-slate-950"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Validate recipient if gifted
    if (isGift && !recipientUsername.trim()) {
      setError('Please specify the recipient Minecraft username for this gift.');
      return;
    }

    if (!isGift && usernameInput.trim()) {
      setMinecraftUsername(usernameInput.trim());
    }

    addToCart(product, quantity, isGift, isGift ? recipientUsername.trim() : undefined);
    playXpOrb(1.1);
    setError(null);
  };

  const handleInstantBuy = () => {
    playXpOrb(1.15);
    setIsBuyModalOpen(true);
  };

  const relatedProducts = STORE_CONFIG.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-xs font-minecraft font-semibold text-slate-400 hover:text-[#55ff55] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store Catalogue</span>
        </Link>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Large authentic screenshot */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-[4/3] bg-slate-950">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded text-[11px] font-minecraft font-bold uppercase tracking-wider bg-[#55ff55] text-slate-950 shadow-lg">
                  {product.badge}
                </span>
              )}
              <span className="px-3 py-1 rounded text-[11px] font-minecraft font-bold uppercase tracking-wider bg-black/70 text-[#55ffff] border border-cyan-500/30 backdrop-blur-md">
                {product.gameMode}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] font-minecraft text-slate-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <McClock size={14} className="text-[#ffaa00]" />
              <span>Duration: {product.duration}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Purchasing & Perks */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55]">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-minecraft text-slate-400">
                <McCompass size={14} className="text-[#55ffff]" />
                <span>{product.gameMode}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-minecraft font-bold text-white tracking-tight mb-3 mc-shadow">
              {product.name}
            </h1>

            {/* Price Display */}
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="text-3xl font-minecraft font-bold text-[#55ff55] mc-shadow-green block">
                  {formatProductPrice(product)}
                </span>
                <span className="text-xs font-minecraft text-slate-400">
                  {currency} • Arranged via Official Discord Ticket
                </span>
              </div>
              <CurrencySelector variant="compact" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-minecraft">
              {product.description}
            </p>

            {/* Perks List */}
            <div className="mc-panel p-5 rounded-2xl space-y-2.5 mb-6">
              <h3 className="text-xs font-minecraft font-bold uppercase tracking-wider text-white flex items-center gap-1.5 mb-3 mc-shadow">
                <McDiamond size={15} />
                Included Perks & Contents
              </h3>
              {product.perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-minecraft">
                  <Check className="w-4 h-4 text-[#55ff55] flex-shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Minecraft In-Game Name / Gifting configuration */}
            <div className="mc-panel p-5 rounded-2xl space-y-4 mb-6">
              <div>
                <label className="block text-xs font-minecraft font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Target Minecraft Player:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={isGift ? recipientUsername : usernameInput}
                    onChange={e => {
                      if (isGift) {
                        setRecipientUsername(e.target.value);
                      } else {
                        setUsernameInput(e.target.value);
                      }
                      setError(null);
                    }}
                    placeholder="Enter case-sensitive Minecraft username"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {(isGift ? recipientUsername : usernameInput) && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <img
                        src={`https://mc-heads.net/avatar/${isGift ? recipientUsername : usernameInput}/24`}
                        alt=""
                        onError={e => (e.currentTarget.style.display = 'none')}
                        className="w-5 h-5 rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Gift Toggle */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={e => {
                      setIsGift(e.target.checked);
                      playXpOrb(1.0);
                    }}
                    className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <Gift className="w-3.5 h-3.5 text-[#ffaa00]" />
                  <span>This is a gift for a friend</span>
                </label>
              </div>

              {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}
            </div>

            {/* Quantity Controls (for non-permanent items) */}
            {product.duration !== 'Permanent' && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-minecraft uppercase text-slate-400">
                  Quantity:
                </span>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    onClick={() => {
                      setQuantity(Math.max(1, quantity - 1));
                      playXpOrb(0.95);
                    }}
                    className="px-3 py-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      setQuantity(quantity + 1);
                      playXpOrb(1.05);
                    }}
                    className="px-3 py-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.isPriceConfigured}
                className={`flex-1 w-full py-3.5 px-6 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mc-button ${
                  product.isPriceConfigured
                    ? 'text-white'
                    : 'text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <McChest size={16} />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleInstantBuy}
                disabled={!product.isPriceConfigured}
                className={`flex-1 w-full py-3.5 px-6 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mc-button-primary ${
                  product.isPriceConfigured
                    ? 'shadow-[0_0_20px_rgba(85,255,85,0.3)]'
                    : 'text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <span>Buy Now (Discord Flow)</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 font-minecraft pt-2 text-center">
              <McShield size={14} className="text-[#55ff55] flex-shrink-0" />
              <span>Purchases arranged via official Discord tickets on <a href="https://discord.gg/lovepixel" target="_blank" rel="noopener noreferrer" className="text-[#55ffff] underline hover:text-white">discord.gg/lovepixel</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-slate-850">
          <h2 className="text-xl sm:text-2xl font-minecraft font-bold text-white mb-6 mc-shadow">
            OTHER {product.category.toUpperCase()} ITEMS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Rank Purchase Modal */}
      <RankPurchaseModal
        product={product}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </div>
  );
};
