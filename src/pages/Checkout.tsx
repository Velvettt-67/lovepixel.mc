import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
  ArrowLeft,
  User,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { useCurrency } from '../context/useCurrency';
import { useAudio } from '../context/useAudio';
import { SERVER_CONFIG } from '../config/serverConfig';
import { MinecraftUserModal } from '../components/store/MinecraftUserModal';
import { McShield } from '../components/ui/MinecraftIcons';

export const Checkout: React.FC = () => {
  const { cart, subtotal, minecraftUsername } = useCart();
  const { currency, formatProductPrice, getProductPrice, formatAmount } = useCurrency();
  const { playXpOrb } = useAudio();

  const [copied, setCopied] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 max-w-xl mx-auto text-center">
        <div className="mc-panel p-10 rounded-3xl text-center space-y-4">
          <h2 className="text-xl font-minecraft font-bold text-white mc-shadow">
            No Items Selected
          </h2>
          <p className="text-xs text-slate-400 font-minecraft">
            Your cart is currently empty. Please select a rank from our catalogue before opening a ticket.
          </p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary text-slate-950"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>
        </div>
      </div>
    );
  }

  const itemsSummaryText = cart
    .map(
      (item) =>
        `- ${item.product.name} (x${item.quantity}) — ${formatProductPrice(item.product)} each`
    )
    .join('\n');

  const ticketClipboardText = `**Love Pixel Rank Purchase Ticket Request**
Server Address: ${SERVER_CONFIG.serverAddress}
Minecraft IGN: ${minecraftUsername || '[Enter your exact in-game name]'}
Platform / Edition: Java & Bedrock
Selected Currency: ${currency}

**Items Requested:**
${itemsSummaryText}

**Total Amount:** ${formatAmount(subtotal)} (${currency})
*Note: Screenshot of rank selection attached in this ticket.*`;

  const handleCopyTicket = async () => {
    try {
      await navigator.clipboard.writeText(ticketClipboardText);
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
      desc: 'Join our community via https://discord.gg/lovepixel.',
    },
    {
      num: '2',
      title: 'Open a rank-purchase ticket',
      desc: 'Go to the tickets channel and open a new Rank Purchase ticket.',
    },
    {
      num: '3',
      title: 'Include a screenshot of your selected rank',
      desc: `Attach a screenshot showing your rank in the store with ${currency} price.`,
    },
    {
      num: '4',
      title: 'Provide your exact Minecraft username',
      desc: 'State your in-game name and whether you play on Java or Bedrock.',
    },
    {
      num: '5',
      title: 'Wait for staff confirmation',
      desc: 'Staff will confirm your selection and provide safe payment instructions.',
    },
    {
      num: '6',
      title: 'Delivery to your account',
      desc: 'After verification, the team will arrange delivery of your rank in-game.',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs font-minecraft text-slate-400 hover:text-[#55ff55] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
      </div>

      {/* Main Panel */}
      <div className="mc-panel p-6 sm:p-10 rounded-3xl space-y-8 border border-slate-700/80 shadow-2xl">
        {/* Header */}
        <div>
          <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
            <McShield size={14} />
            Official Discord Ticket Purchase Flow
          </span>
          <h1 className="text-2xl sm:text-3xl font-minecraft font-bold text-white tracking-tight mc-shadow">
            DISCORD PURCHASE TICKET PREPARATION
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-minecraft">
            &ldquo;Join our official Discord server to complete your rank purchase. Our staff will help you confirm your selected rank, provide the applicable payment instructions, and arrange delivery to your Minecraft account.&rdquo;
          </p>
        </div>

        {/* Selected Items Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-minecraft font-bold text-white uppercase tracking-wider">
              Selected Order Items ({cart.length})
            </h3>
            <span className="text-xs font-minecraft text-[#55ff55] font-bold">
              {currency} Mode
            </span>
          </div>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-3 text-xs font-minecraft"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                  />
                  <div>
                    <span className="text-white font-bold block">{item.product.name}</span>
                    <span className="text-slate-400 text-[11px]">
                      Qty: {item.quantity} • {formatProductPrice(item.product)} each
                    </span>
                  </div>
                </div>

                <span className="text-white font-bold font-mono">
                  {formatAmount(getProductPrice(item.product) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between text-base font-bold text-white">
            <span className="font-minecraft text-xs">Total Amount:</span>
            <span className="text-xl font-minecraft text-[#55ff55] mc-shadow-green">
              {formatAmount(subtotal)} <span className="text-xs text-slate-400 font-mono">{currency}</span>
            </span>
          </div>
        </div>

        {/* Minecraft Username Linking Box */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              {minecraftUsername ? (
                <img
                  src={`https://mc-heads.net/avatar/${minecraftUsername}/36`}
                  alt=""
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="w-8 h-8 rounded"
                />
              ) : (
                <User className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div>
              <span className="text-[11px] font-minecraft uppercase text-slate-400 block">
                Target Minecraft Username:
              </span>
              <span className="text-sm font-minecraft font-bold text-[#55ff55]">
                {minecraftUsername ? minecraftUsername : 'Not set (You can provide this in your ticket)'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsUserModalOpen(true)}
            className="text-xs font-minecraft font-semibold px-3 py-1.5 rounded-lg mc-button text-[#55ff55] cursor-pointer"
          >
            {minecraftUsername ? 'Change' : 'Set IGN'}
          </button>
        </div>

        {/* Step-by-Step Discord Purchase Process */}
        <div className="space-y-3">
          <h3 className="text-xs font-minecraft font-bold text-[#55ffff] uppercase tracking-wider">
            Ticket Submission Instructions:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((s) => (
              <div
                key={s.num}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
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

        {/* Copyable Ticket Block */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-minecraft font-bold text-slate-300">
              Ready-to-Paste Ticket Message:
            </span>
            <button
              onClick={handleCopyTicket}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-minecraft font-bold mc-button text-slate-200 hover:text-white cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#55ff55]" />
                  <span className="text-[#55ff55]">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Ticket Text</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-[#080a0f] border border-slate-850 text-xs text-[#55ffff] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {ticketClipboardText}
          </pre>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-3 pt-2">
          <a
            href="https://discord.gg/lovepixel"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playXpOrb(1.2)}
            className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-[0_0_25px_rgba(85,255,85,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer text-slate-950 text-center"
          >
            <MessageSquare className="w-4 h-4" />
            <span>JOIN DISCORD & OPEN A TICKET</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <p className="text-center text-[11px] text-slate-400 font-minecraft">
            Permanent invitation URL: <span className="text-[#55ffff] underline">https://discord.gg/lovepixel</span>
          </p>
        </div>

        {/* Transparency and Safety Notices */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <div className="flex items-start gap-2.5 text-xs text-slate-400 font-minecraft">
            <ShieldCheck size={16} className="text-[#55ff55] flex-shrink-0 mt-0.5" />
            <span>
              <strong>Manual Delivery Notice:</strong> Joining Discord and opening a ticket are required to complete the current manual purchase process. Delivery timing depends on staff verification and availability.
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-amber-300/80 font-minecraft">
            <ShieldAlert size={16} className="text-[#ffaa00] flex-shrink-0 mt-0.5" />
            <span>
              <strong>Account Security:</strong> Love Pixel staff will NEVER ask for your Minecraft password, Microsoft login, authentication tokens, or recovery codes.
            </span>
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
