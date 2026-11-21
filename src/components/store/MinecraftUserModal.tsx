import React, { useState } from 'react';
import { User, Check, X, ShieldAlert } from 'lucide-react';
import { useCart } from '../../context/useCart';

interface MinecraftUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (username: string) => void;
}

export const MinecraftUserModal: React.FC<MinecraftUserModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { minecraftUsername, setMinecraftUsername, showToast } = useCart();
  const [inputVal, setInputVal] = useState(minecraftUsername);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim();
    if (!clean) {
      setError('Please enter your Minecraft in-game username.');
      return;
    }
    // Minecraft username rule: 3-16 chars, letters, numbers, underscores (Bedrock may include spaces or prefixes)
    if (clean.length < 3 || clean.length > 20) {
      setError('Minecraft usernames are typically 3 to 16 characters in length.');
      return;
    }

    setMinecraftUsername(clean);
    showToast(`Minecraft username saved as: ${clean}`);
    if (onConfirm) onConfirm(clean);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-minecraft font-bold text-white mc-shadow">Minecraft Username</h3>
              <p className="text-xs font-minecraft text-slate-300">Required for automated in-game item delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-minecraft font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              In-Game Username (Case-Sensitive)
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputVal}
                onChange={e => {
                  setInputVal(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. Steve_Craft99"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-minecraft text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                autoFocus
              />
              {inputVal && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <img
                    src={`https://mc-heads.net/avatar/${inputVal}/32`}
                    alt=""
                    onError={e => (e.currentTarget.style.display = 'none')}
                    className="w-6 h-6 rounded"
                  />
                </div>
              )}
            </div>
            {error && <p className="text-xs text-rose-400 mt-1.5 font-minecraft">{error}</p>}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 font-minecraft flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Double-check spelling! Store rewards are executed automatically upon payment verification via server RCON commands.
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-minecraft font-bold text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Confirm Name</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
