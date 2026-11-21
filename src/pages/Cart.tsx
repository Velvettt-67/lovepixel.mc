import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  ArrowLeft,
  User,
  Gift,
  ExternalLink,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { useCurrency } from '../context/useCurrency';
import { useAudio } from '../context/useAudio';
import { MinecraftUserModal } from '../components/store/MinecraftUserModal';
import { CurrencySelector } from '../components/store/CurrencySelector';
import { RankPurchaseModal } from '../components/store/RankPurchaseModal';
import { McChest, McShield } from '../components/ui/MinecraftIcons';

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    minecraftUsername,
    clearCart,
  } = useCart();
  const { currency, formatProductPrice, getProductPrice, formatAmount } = useCurrency();
  const { playXpOrb } = useAudio();

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 max-w-xl mx-auto text-center">
        <div className="mc-panel p-10 rounded-3xl text-center">
          <div className="w-16 h-16 rounded-2xl mc-slot text-[#55ff55] flex items-center justify-center mx-auto mb-4">
            <McChest size={32} />
          </div>
          <h1 className="text-2xl font-minecraft font-bold text-white mb-2 mc-shadow">
            Your Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mb-8 max-w-sm mx-auto leading-relaxed font-minecraft">
            You haven&apos;t selected any ranks, crate keys, or cosmetics yet. Explore our digital catalogue to upgrade your adventure.
          </p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-lg shadow-emerald-500/20 transition-all cursor-pointer text-slate-950"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Storefront</span>
          </Link>
        </div>
      </div>
    );
  }

  const selectedProductForModal = cart[0]?.product || null;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1680px] w-full mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55]">
            Review Selected Ranks & Perks
          </span>
          <h1 className="text-3xl font-minecraft font-bold text-white tracking-tight mc-shadow">
            SHOPPING CART
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <CurrencySelector variant="full" />

          <button
            onClick={() => {
              clearCart();
              playXpOrb(0.8);
            }}
            className="text-xs font-minecraft text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg border border-rose-900/40 bg-rose-950/20"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Linked Player Profile Strip */}
          <div className="mc-panel p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
                {minecraftUsername ? (
                  <img
                    src={`https://mc-heads.net/avatar/${minecraftUsername}/36`}
                    alt=""
                    onError={e => (e.currentTarget.style.display = 'none')}
                    className="w-8 h-8 rounded"
                  />
                ) : (
                  <User className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <span className="text-[11px] font-minecraft uppercase text-slate-400 block">
                  Delivery Player IGN:
                </span>
                <span className="text-sm font-minecraft font-bold text-[#55ff55]">
                  {minecraftUsername ? minecraftUsername : 'Not set (Provide in your Discord ticket)'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsUserModalOpen(true)}
              className="text-xs font-minecraft font-semibold px-3 py-1.5 rounded-lg mc-button text-[#55ff55] transition-colors cursor-pointer"
            >
              {minecraftUsername ? 'Change' : 'Link IGN'}
            </button>
          </div>

          {/* Items List */}
          {cart.map(item => {
            const itemPrice = getProductPrice(item.product);
            const lineTotal = itemPrice * item.quantity;

            return (
              <div
                key={item.product.id + (item.recipientUsername || '')}
                className="mc-panel p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-base font-minecraft font-bold text-white hover:text-[#55ff55] transition-colors mc-shadow"
                      >
                        {item.product.name}
                      </Link>
                      {item.isGift && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-minecraft px-2 py-0.5 rounded bg-amber-500/10 text-[#ffaa00] border border-amber-500/30">
                          <Gift className="w-2.5 h-2.5" />
                          <span>Gift to {item.recipientUsername}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-minecraft block mt-0.5">
                      {item.product.category.toUpperCase()} • {item.product.gameMode}
                    </span>
                    <span className="text-sm font-minecraft font-bold text-[#55ff55] block mt-1">
                      {formatProductPrice(item.product)} each
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800">
                    <button
                      onClick={() => {
                        updateQuantity(item.product.id, item.quantity - 1);
                        playXpOrb(0.95);
                      }}
                      className="px-3 py-1 text-slate-400 hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        updateQuantity(item.product.id, item.quantity + 1);
                        playXpOrb(1.05);
                      }}
                      className="px-3 py-1 text-slate-400 hover:text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-base font-minecraft font-bold text-white w-28 text-right">
                    {formatAmount(lineTotal)}
                  </span>

                  <button
                    onClick={() => {
                      removeFromCart(item.product.id);
                      playXpOrb(0.85);
                    }}
                    aria-label="Remove item"
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Continue Shopping Link */}
          <div className="pt-2 flex items-center justify-between">
            <Link
              to="/store"
              className="inline-flex items-center gap-2 text-xs font-minecraft text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Browsing Store</span>
            </Link>

            <button
              onClick={() => setIsInstructionModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-minecraft text-[#55ffff] hover:underline cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How Discord purchasing works</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Discord Instructions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="mc-panel p-6 rounded-3xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-sm font-minecraft font-bold text-white uppercase tracking-wider mc-shadow">
                Cart Summary
              </h3>
              <span className="text-xs font-minecraft text-[#55ff55] font-bold">
                {currency} Mode
              </span>
            </div>

            <div className="space-y-3 text-xs font-minecraft">
              <div className="flex justify-between text-slate-400">
                <span>Selected Items ({cart.length}):</span>
                <span className="text-white font-mono">{formatAmount(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Platform:</span>
                <span className="text-[#55ffff]">Discord Ticket</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery:</span>
                <span className="text-[#55ff55]">Staff-Assisted Manual RCON</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-bold text-white items-baseline">
                <span className="font-minecraft text-xs">Total:</span>
                <span className="text-xl font-minecraft text-[#55ff55] font-bold mc-shadow-green">
                  {formatAmount(subtotal)} <span className="text-xs text-slate-400 font-mono">{currency}</span>
                </span>
              </div>
            </div>

            {/* Required Discord Purchase Instructions Panel */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2.5">
              <span className="text-xs font-minecraft font-bold text-[#55ff55] flex items-center gap-1.5 uppercase">
                <MessageSquare className="w-3.5 h-3.5" />
                Discord Purchase Action
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-minecraft">
                &ldquo;Your rank is in the cart. To complete this purchase, join our official Discord and open a rank-purchase ticket. Include a screenshot of your selected rank so staff can confirm the request.&rdquo;
              </p>
            </div>

            {/* Prominent Discord Action Button */}
            <a
              href="https://discord.gg/lovepixel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playXpOrb(1.2)}
              className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-[0_0_25px_rgba(85,255,85,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-slate-950 text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>JOIN DISCORD & CONTINUE</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Secondary Option: Ticket Preparation Page */}
            <Link
              to="/checkout"
              className="w-full py-3 px-4 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Prepare Ticket Details & Summary</span>
            </Link>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 text-[10px] text-slate-400 space-y-1 font-minecraft">
              <div className="flex items-center gap-1.5 text-slate-300">
                <McShield size={14} className="text-[#55ff55]" />
                <span>Verified Community Purchasing</span>
              </div>
              <p className="text-slate-500">
                Purchases are arranged manually with server staff. We will never request account passwords or security credentials.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MinecraftUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />

      <RankPurchaseModal
        product={selectedProductForModal}
        isOpen={isInstructionModalOpen}
        onClose={() => setIsInstructionModalOpen(false)}
      />
    </div>
  );
};
