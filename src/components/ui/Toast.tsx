import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X, MessageSquare, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/useCart';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 sm:px-0 animate-in slide-in-from-bottom duration-300">
      <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-[#0c1017]/95 border border-emerald-500/50 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-md">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-sm font-minecraft font-bold text-white block">
              {toastMessage}
            </span>
            <span className="text-[11px] text-slate-400 font-minecraft leading-tight block mt-0.5">
              Purchases are completed on Discord via support tickets.
            </span>
          </div>
          <button
            onClick={hideToast}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
          <Link
            to="/cart"
            onClick={hideToast}
            className="flex-1 py-1.5 px-3 rounded-lg text-[11px] font-minecraft font-bold uppercase tracking-wider mc-button-primary text-slate-950 flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <a
            href="https://discord.gg/lovepixel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-3 rounded-lg text-[11px] font-minecraft font-bold uppercase tracking-wider mc-button text-slate-200 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <MessageSquare className="w-3 h-3 text-[#55ffff]" />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </div>
  );
};
