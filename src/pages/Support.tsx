import React, { useState } from 'react';
import {
  ChevronDown,
  Send,
  CheckCircle,
  Copy,
  Check,
  MessageSquare,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { SERVER_CONFIG } from '../config/serverConfig';
import {
  McCompass,
  McGrassBlock,
  McChest,
} from '../components/ui/MinecraftIcons';
import { useAudio } from '../context/useAudio';
import { PixelClericSprite, PixelIronGolemSprite } from '../components/entities/PixelEntitySprites';

export const Support: React.FC = () => {
  const { playXpOrb } = useAudio();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Connection Issue');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketRefId, setTicketRefId] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Anti-spam throttle: 15s between submissions
    const now = Date.now();
    if (now - lastSubmitTime < 15000) {
      setFormError('Please wait a moment before preparing another ticket.');
      return;
    }

    const trimmedName = ticketName.trim();
    const trimmedEmail = ticketEmail.trim();
    const trimmedMsg = ticketMessage.trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 48) {
      setFormError('Minecraft username must be between 2 and 48 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 80) {
      setFormError('Please provide a valid contact email address.');
      return;
    }

    if (!trimmedMsg || trimmedMsg.length < 10 || trimmedMsg.length > 1000) {
      setFormError('Detailed message must be between 10 and 1000 characters.');
      return;
    }

    // Generate unique reproducible ticket reference code
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const dateObj = new Date();
    const refCode = `PMC-${dateObj.getFullYear()}-${randomHex}`;
    setTicketRefId(refCode);
    setTicketDate(dateObj.toLocaleDateString());
    setLastSubmitTime(now);
    setTicketSubmitted(true);
    playXpOrb(1.15);
  };

  const formattedTicketDetails = `**Love Pixel Support Ticket [${ticketRefId}]**
Category: ${ticketCategory}
Player IGN: ${ticketName.trim()}
Contact Email: ${ticketEmail.trim()}
Date: ${ticketDate}
Server: ${SERVER_CONFIG.serverAddress}

Message:
${ticketMessage.trim()}`;

  const handleCopyTicket = async () => {
    try {
      await navigator.clipboard.writeText(formattedTicketDetails);
      setCopied(true);
      playXpOrb(1.1);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-6xl w-full mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-3">
          <PixelClericSprite size={26} animate />
          <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ffff] bg-cyan-950/80 border border-cyan-500/40 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <McCompass size={14} />
            Librarian & Cleric Knowledge Desk
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-minecraft font-bold text-white tracking-tight uppercase mc-shadow">
          SUPPORT & FAQ
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed font-minecraft">
          Need help joining the realm, troubleshooting connection timeouts, or inquiring about store delivery? We've got you covered.
        </p>
      </div>

      {/* Quick Troubleshooting Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="mc-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl mc-slot text-[#55ff55] flex items-center justify-center mb-4 shadow-md">
              <McGrassBlock size={32} />
            </div>
            <h3 className="text-base font-minecraft font-bold text-white mb-2 mc-shadow">Java Connection Guide</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-minecraft">
              Multiplayer &gt; Add Server &gt; IP: <code className="text-[#55ff55] font-minecraft font-bold">{SERVER_CONFIG.serverAddress}</code>. Compatible with versions 1.20 - 1.21.x.
            </p>
          </div>
        </div>

        <div className="mc-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl mc-slot text-[#55ffff] flex items-center justify-center mb-4 shadow-md">
              <McCompass size={32} />
            </div>
            <h3 className="text-base font-minecraft font-bold text-white mb-2 mc-shadow">Bedrock / Mobile Setup</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-minecraft">
              Play &gt; Servers &gt; Add External Server. Address: <code className="text-[#55ffff] font-minecraft font-bold">{SERVER_CONFIG.serverAddress}</code> with Port: <code className="text-[#55ffff] font-minecraft font-bold">{SERVER_CONFIG.serverPortBedrock}</code>.
            </p>
          </div>
        </div>

        <div className="mc-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl mc-slot text-[#ffaa00] flex items-center justify-center mb-4 shadow-md">
              <McChest size={32} />
            </div>
            <h3 className="text-base font-minecraft font-bold text-white mb-2 mc-shadow">Store Delivery Latency</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-minecraft">
              Perks synchronize automatically upon logging in within 1 to 5 minutes. If offline at purchase, rewards wait until your next realm join.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-minecraft font-bold text-white mb-6 uppercase mc-shadow">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-4">
          {SERVER_CONFIG.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="mc-panel rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-minecraft font-bold text-white hover:text-[#55ff55] transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#55ff55] transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4 font-minecraft">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Ticket Submission Form */}
      <div className="mc-panel p-8 sm:p-10 rounded-3xl">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="flex-shrink-0">
            <PixelIronGolemSprite size={32} animate />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-minecraft font-bold text-white uppercase mc-shadow">
              SUBMIT A SUPPORT INQUIRY
            </h2>
            <p className="text-xs text-slate-400 font-minecraft mt-0.5">
              Guarded by Realm Wardens. Our engineering staff typically responds within 12 to 24 hours.
            </p>
          </div>
        </div>

        {ticketSubmitted ? (
          <div className="p-8 rounded-2xl mc-slot text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-[#55ff55] mx-auto" />
            <h3 className="text-xl font-minecraft font-bold text-white mc-shadow">
              Support Ticket Prepared [{ticketRefId}]
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto font-minecraft leading-relaxed">
              Your inquiry has been validated and compiled with reference ID <span className="text-[#55ffff] font-bold">{ticketRefId}</span>. All official support is handled directly through our verified Discord ticketing bot for live, real-time responses from our engineering staff within 12–24 hours.
            </p>

            {/* Formatted Ticket Snippet */}
            <div className="max-w-lg mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
              <div className="flex items-center justify-between text-[11px] font-minecraft text-slate-400 border-b border-slate-800/80 pb-2">
                <span>REFERENCE: <span className="text-[#55ffff]">{ticketRefId}</span></span>
                <span>CATEGORY: <span className="text-emerald-400">{ticketCategory}</span></span>
              </div>
              <p className="text-xs text-slate-200 font-minecraft line-clamp-3">
                {ticketMessage}
              </p>
              <div className="text-[10px] text-slate-500 font-minecraft pt-1">
                From: {ticketName} ({ticketEmail})
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={SERVER_CONFIG.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playXpOrb(1.2)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-[0_0_20px_rgba(85,255,85,0.35)] flex items-center justify-center gap-2 cursor-pointer text-slate-950"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Discord Support Ticket</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyTicket}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button text-slate-200 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#55ff55]" />
                    <span className="text-[#55ff55]">Details Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Ticket Info</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setTicketSubmitted(false);
                  setTicketMessage('');
                  setFormError(null);
                }}
                className="text-xs text-slate-400 hover:text-white font-minecraft underline cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-minecraft flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-minecraft font-bold uppercase text-slate-300 mb-1.5">
                  Minecraft Username / Name (2-48 chars)
                </label>
                <input
                  type="text"
                  required
                  maxLength={48}
                  value={ticketName}
                  onChange={e => setTicketName(e.target.value)}
                  placeholder="e.g. Alex_Voxel"
                  className="w-full px-4 py-2.5 rounded-xl mc-slot text-xs text-white focus:outline-none focus:border-emerald-500 font-minecraft"
                />
              </div>

              <div>
                <label className="block text-[11px] font-minecraft font-bold uppercase text-slate-300 mb-1.5">
                  Contact Email (for staff responses)
                </label>
                <input
                  type="email"
                  required
                  maxLength={80}
                  value={ticketEmail}
                  onChange={e => setTicketEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl mc-slot text-xs text-white focus:outline-none focus:border-emerald-500 font-minecraft"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-minecraft font-bold uppercase text-slate-300 mb-1.5">
                Issue Category
              </label>
              <select
                value={ticketCategory}
                onChange={e => setTicketCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl mc-slot text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer font-minecraft"
              >
                <option value="Connection Issue">Connection / Join Timeout</option>
                <option value="Store Delivery">Store Delivery / Item Sync</option>
                <option value="Bug Report">Realm Bug / Glitch Report</option>
                <option value="Rule Violation">Player Conduct / Grief Report</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-minecraft font-bold uppercase text-slate-300 mb-1.5">
                Detailed Message (10-1000 chars)
              </label>
              <textarea
                required
                rows={4}
                maxLength={1000}
                value={ticketMessage}
                onChange={e => setTicketMessage(e.target.value)}
                placeholder="Describe what occurred, any error messages displayed, and steps to reproduce..."
                className="w-full px-4 py-2.5 rounded-xl mc-slot text-xs text-white focus:outline-none focus:border-emerald-500 font-minecraft"
              />
              <div className="text-[10px] text-slate-500 font-minecraft text-right mt-1">
                {ticketMessage.length} / 1000
              </div>
            </div>

            <button
              type="submit"
              className="px-7 py-3.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-lg transition-all flex items-center gap-2.5 cursor-pointer text-slate-950"
            >
              <Send className="w-4 h-4" />
              <span>Compile & Submit Ticket</span>
            </button>
          </form>
        )}
      </div>

      <div className="text-center text-[11px] font-minecraft text-slate-400 mt-12">
        {SERVER_CONFIG.disclaimer}
      </div>
    </div>
  );
};
