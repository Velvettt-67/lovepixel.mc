import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import type { StoreProduct } from '../../config/storeConfig';
import { useCart } from '../../context/useCart';
import { useCurrency } from '../../context/useCurrency';
import { useAudio } from '../../context/useAudio';
import { Card3D } from '../ui/Card3D';
import { McCompass, McClock, McChest, McDiamond } from '../ui/MinecraftIcons';
import {
  PixelDiamondKnightSprite,
  PixelNetheritePaladinSprite,
  PixelRedstoneEngineerSprite,
  PixelAllaySprite,
  PixelSlimeSprite,
  PixelSteveSprite,
} from '../entities/PixelEntitySprites';
import { RankPurchaseModal } from './RankPurchaseModal';

interface ProductCardProps {
  product: StoreProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { formatProductPrice } = useCurrency();
  const { playXpOrb } = useAudio();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playXpOrb(1.08); // Authentic XP orb chime on adding to cart
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playXpOrb(1.15);
    setIsBuyModalOpen(true);
  };

  const badgeColorMap = {
    Featured: 'bg-emerald-600 text-white border-emerald-400 mc-shadow',
    Popular: 'bg-cyan-600 text-white border-cyan-400 mc-shadow',
    'Best Value': 'bg-amber-600 text-white border-amber-400 mc-shadow',
    Exclusive: 'bg-purple-600 text-white border-purple-400 mc-shadow',
  };

  const renderCategorySprite = () => {
    switch (product.category) {
      case 'ranks':
        return <PixelDiamondKnightSprite size={18} animate />;
      case 'cosmetics':
        return <PixelAllaySprite size={16} animate />;
      case 'keys':
        return <PixelRedstoneEngineerSprite size={18} animate />;
      case 'boosters':
        return <PixelSlimeSprite size={16} animate />;
      case 'bundles':
        return <PixelNetheritePaladinSprite size={18} animate />;
      default:
        return <PixelSteveSprite size={18} animate />;
    }
  };

  const displayPrice = formatProductPrice(product);

  return (
    <>
      <Card3D glowColor="rgba(85, 255, 85, 0.15)">
        <div className="flex flex-col h-full bg-[#15171c]/90 border border-slate-800 rounded-2xl overflow-hidden group hover:border-[#55ff55]/50 transition-all duration-300">
          {/* Image Preview Container */}
          <Link to={`/product/${product.slug}`} className="relative h-48 w-full overflow-hidden block">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15171c] via-transparent to-black/30" />

            {/* Category Sprite Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-minecraft text-slate-300 uppercase">
              {renderCategorySprite()}
              <span>{product.category}</span>
            </div>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 right-3">
                <span
                  className={`text-[9px] font-pixel uppercase tracking-wide px-2.5 py-1 rounded border shadow-lg ${
                    badgeColorMap[product.badge]
                  }`}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {/* Game Mode & Duration tags */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-minecraft px-2.5 py-1 rounded bg-black/80 text-slate-200 backdrop-blur-sm border border-white/10">
                <McCompass size={13} />
                {product.gameMode}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-minecraft px-2.5 py-1 rounded bg-black/80 text-slate-200 backdrop-blur-sm border border-white/10">
                <McClock size={13} />
                {product.duration}
              </span>
            </div>
          </Link>

          {/* Card Body */}
          <div className="flex flex-col flex-1 p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link to={`/product/${product.slug}`}>
                <h3 className="text-base font-minecraft font-bold text-white group-hover:text-[#55ff55] transition-colors leading-snug">
                  {product.name}
                </h3>
              </Link>
              <div className="text-right">
                {product.isPriceConfigured ? (
                  <span className="text-base font-minecraft font-bold text-[#55ff55] mc-shadow-green">
                    {displayPrice}
                  </span>
                ) : (
                  <span className="text-[11px] font-minecraft text-slate-400 italic">
                    Launch Price
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed font-minecraft">
              {product.shortDesc}
            </p>

            {/* Perks Preview */}
            <div className="mt-auto space-y-1.5 pt-3 border-t border-slate-800/80 mb-5">
              {product.perks.slice(0, 3).map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-minecraft">
                  <Check className="w-3.5 h-3.5 text-[#55ff55] flex-shrink-0" />
                  <span className="truncate">{perk}</span>
                </div>
              ))}
            </div>

            {/* Action Row: Buy Now & Add to Cart */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {/* Buy Now (Opens Discord Ticket Instructions Modal) */}
                <button
                  onClick={handleBuyNow}
                  disabled={!product.isPriceConfigured}
                  aria-label={`Buy ${product.name} now`}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    product.isPriceConfigured
                      ? 'mc-button-primary text-slate-950 shadow-[0_0_15px_rgba(85,255,85,0.3)]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <McDiamond size={15} />
                  <span>Buy Now</span>
                </button>

                {/* Add to Cart */}
                <button
                  onClick={handleQuickAdd}
                  disabled={!product.isPriceConfigured}
                  aria-label={`Add ${product.name} to cart`}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer mc-button text-slate-200 hover:text-white ${
                    !product.isPriceConfigured ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <McChest className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                {/* View Details Link */}
                <Link
                  to={`/product/${product.slug}`}
                  aria-label={`View details for ${product.name}`}
                  className="p-2.5 rounded-xl mc-button text-slate-300 hover:text-white transition-colors flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Buy Now Discord Purchase Instructions Modal */}
      <RankPurchaseModal
        product={product}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </>
  );
};
