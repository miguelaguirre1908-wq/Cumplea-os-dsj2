import React from 'react';
import { CalendarDays, Search, UserPlus, Share2, MoreHorizontal } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenMonthSheet: () => void;
  onFocusSearch: () => void;
  onOpenRegister: () => void;
  onOpenShare: () => void;
  onOpenMore: () => void;
  totalCount: number;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenMonthSheet,
  onFocusSearch,
  onOpenRegister,
  onOpenShare,
  onOpenMore,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Navegación móvil"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EAE1D3] px-3 py-2 shadow-lg sm:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Meses Button */}
        <button
          onClick={onOpenMonthSheet}
          className="flex flex-col items-center justify-center p-1.5 text-[#6B5A4B] active:text-[#3B2E23] active:scale-95 transition-all min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <CalendarDays className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Meses</span>
        </button>

        {/* Search Button */}
        <button
          onClick={onFocusSearch}
          className="flex flex-col items-center justify-center p-1.5 text-[#6B5A4B] active:text-[#3B2E23] active:scale-95 transition-all min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Buscar</span>
        </button>

        {/* Center Primary CTA: ¡Regístrate! */}
        <button
          onClick={onOpenRegister}
          className="relative -top-2 flex flex-col items-center justify-center px-3.5 py-2 rounded-2xl bg-[#4A3C31] text-[#FAF6F0] shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <UserPlus className="w-4 h-4 text-[#E6D5C3]" />
            <span className="text-xs font-bold whitespace-nowrap">¡Regístrate!</span>
          </div>
          <span className="text-[9px] text-[#D4C3B2] leading-none mt-0.5">¿No estás?</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex flex-col items-center justify-center p-1.5 text-[#6B5A4B] active:text-[#3B2E23] active:scale-95 transition-all min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </button>

        {/* More options Button */}
        <button
          onClick={onOpenMore}
          className="flex flex-col items-center justify-center p-1.5 text-[#6B5A4B] active:text-[#3B2E23] active:scale-95 transition-all min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Opciones</span>
        </button>
      </div>
    </nav>
  );
};
