import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Copy, Check, ShieldAlert, MessageSquare } from 'lucide-react';
import type { StoreProduct } from '../../config/storeConfig';
import { useCurrency } from '../../context/useCurrency';
import { useCart } from '../../context/useCart';
import { useAudio } from '../../context/useAudio';
import { McShield } from '../ui/MinecraftIcons';

interface RankPurchaseModalProps {
  product: StoreProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RankPurchaseModal: React.FC<RankPurchaseModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { formatProductPrice, currency } = useCurrency();
  const { minecraftUsername } = useCart();
  const { playXpOrb } = useAudio();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const formattedPrice = formatProductPrice(product);

  const ticketDetailsText = `Rank: ${product.name}
Price: ${formattedPrice} (${currency})
Minecraft Username: ${minecraftUsername || '[Enter your exact in-game name]'}
Platform: Java & Bedrock
Server: play.lovepixel.net`;

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(ticketDetailsText);
      setCopied(true);
      playXpOrb(1.15);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const steps = [
    {
      num: '1',
      title: 'Join the official Discord server',
      desc: 'Connect to our verified Discord community at discord.gg/lovepixel.',
    },
    {
      num: '2',
      title: 'Open a rank-purchase ticket',
      desc: 'Head to the support channel and open a new Rank Purchase ticket.',
    },
    {
      num: '3',
      title: 'Include a screenshot of your rank',
      desc: `Attach a screenshot showing ${product.name} and your selected currency (${currency}).`,
    },
    {
      num: '4',
      title: 'Provide your exact Minecraft username',
      desc: 'Include your case-sensitive Minecraft IGN and account edition (Java or Bedrock).',
    },
    {
      num: '5',
      title: 'Wait for staff confirmation',
      desc: 'A verified staff member will review your request and provide payment instructions.',
    },
    {
      num: '6',
      title: 'Staff arranges account delivery',
      desc: 'Once payment and details are verified, staff arrange delivery of your rank directly to your account.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c1017] border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close purchase instructions"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Selected Product Banner */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
            <McShield size={14} />
            Official Discord Purchase Flow
          </span>
        </div>

        {/* Product Summary Box */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 my-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0 bg-slate-950">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-minecraft font-bold text-white mc-shadow">
                  {product.name}
                </h3>
                {product.badge && (
                  <span className="text-[9px] font-minecraft uppercase px-2 py-0.5 rounded bg-emerald-950 text-[#55ff55] border border-emerald-500/40">
                    {product.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 font-minecraft">
                {product.category.toUpperCase()} • {product.duration}
              </span>
            </div>
          </div>

          <div className="sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
            <span className="text-xs text-slate-400 font-minecraft uppercase">Selected Price:</span>
            <span className="text-2xl font-minecraft font-bold text-[#55ff55] mc-shadow-green">
              {formattedPrice} <span className="text-xs text-slate-400 font-mono">{currency}</span>
            </span>
          </div>
        </div>

        {/* Main Copy */}
        <div className="space-y-3 mb-6">
          <h2
            id="purchase-modal-title"
            className="text-xl sm:text-2xl font-minecraft font-bold text-white tracking-tight mc-shadow"
          >
            Ready to claim your rank?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-minecraft">
            &ldquo;Join our official Discord server to complete your rank purchase. Our staff will help you confirm your selected rank, provide the applicable payment instructions, and arrange delivery to your Minecraft account.&rdquo;
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-2.5 mb-6">
          <span className="text-xs font-minecraft font-bold uppercase tracking-wider text-[#55ffff] block mb-1">
            Purchase Process Steps:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {steps.map((s) => (
              <div
                key={s.num}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[#55ff55] flex items-center justify-center text-xs font-minecraft font-bold flex-shrink-0 mt-0.5">
                  {s.num}
                </div>
                <div>
                  <h4 className="text-xs font-minecraft font-bold text-white">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-minecraft leading-tight mt-0.5">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy Details Snippet */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between gap-3 mb-6">
          <div className="truncate">
            <span className="text-[11px] text-slate-400 font-minecraft block">
              Quick Ticket Info for Staff:
            </span>
            <code className="text-xs text-[#55ffff] font-mono truncate block">
              {product.name} — {formattedPrice} ({currency}) {minecraftUsername ? `• IGN: ${minecraftUsername}` : ''}
            </code>
          </div>
          <button
            onClick={handleCopyDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-minecraft font-bold mc-button text-slate-200 hover:text-white flex-shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#55ff55]" />
                <span className="text-[#55ff55]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Info</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="https://discord.gg/lovepixel"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playXpOrb(1.2)}
            className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-[0_0_25px_rgba(85,255,85,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer text-slate-950"
          >
            <MessageSquare className="w-4 h-4" />
            <span>JOIN DISCORD & OPEN A TICKET</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="text-[10px] text-slate-400 font-minecraft">
              URL: <span className="text-[#55ffff] underline">https://discord.gg/lovepixel</span>
            </p>
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white font-minecraft underline cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        </div>

        {/* Transparency & Security Notices */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-start gap-2 text-[10px] sm:text-[11px] text-slate-400 font-minecraft">
            <McShield size={14} className="text-[#55ff55] flex-shrink-0 mt-0.5" />
            <span>
              <strong>Delivery Notice:</strong> Joining Discord and opening a ticket are required to complete this manual purchase process. Delivery timing depends on staff verification and availability—delivery is never instant prior to confirmation.
            </span>
          </div>
          <div className="flex items-start gap-2 text-[10px] sm:text-[11px] text-amber-300/80 font-minecraft">
            <ShieldAlert size={14} className="text-[#ffaa00] flex-shrink-0 mt-0.5" />
            <span>
              <strong>Security Guarantee:</strong> We will never ask for your Minecraft or Microsoft account password, authentication tokens, or recovery codes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
