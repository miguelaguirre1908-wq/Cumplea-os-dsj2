import React, { useState } from 'react';
import { BirthdayPerson } from '../types';
import { formatWhatsAppMessage } from '../utils/dateUtils';
import { X, MessageCircle, Copy, Check, Share2 } from 'lucide-react';

interface ShareWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  people: BirthdayPerson[];
}

export const ShareWhatsAppModal: React.FC<ShareWhatsAppModalProps> = ({
  isOpen,
  onClose,
  people,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const messageText = formatWhatsAppMessage(people);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#231E18]/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 sm:hidden" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border sm:border-[#E3D8C8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-0">
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE2D5] flex items-center justify-between bg-[#F4EDE2] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 text-[#14532D] flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2C241E] font-display leading-tight">
                Compartir Lista en WhatsApp
              </h3>
              <p className="text-xs text-[#7B6C5E]">
                Lista completa lista para enviar al grupo Desjuiciados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8E8073] hover:text-[#3B3026] hover:bg-[#EAE0D2] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message preview */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F6F1E8] border border-[#E5DACB] font-mono text-xs text-[#3D3328] whitespace-pre-wrap select-all leading-relaxed">
            {messageText}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-[#EAE2D5] bg-[#F8F4ED] flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-[#DDD3C2] text-xs sm:text-sm font-semibold text-[#4F4132] hover:bg-[#EFE8DC] transition-all cursor-pointer min-h-[44px]"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#16A34A]" />
            ) : (
              <Copy className="w-4 h-4 text-[#7A6B5C]" />
            )}
            <span>{copied ? '¡Copiado!' : 'Copiar texto'}</span>
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Abrir en WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
