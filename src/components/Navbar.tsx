import React from 'react';
import { Cake, UserPlus, Plus, Share2, Calendar, FileSpreadsheet, RefreshCw } from 'lucide-react';

interface NavbarProps {
  totalCount: number;
  onOpenRegisterForm: () => void;
  onOpenAddModal: () => void;
  onOpenShareModal: () => void;
  onOpenFormsConfig: () => void;
  onExportICS: () => void;
  onResetDefaults: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  onOpenRegisterForm,
  onOpenAddModal,
  onOpenShareModal,
  onOpenFormsConfig,
  onExportICS,
  onResetDefaults,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Group Name */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#ECE4D6] border border-[#DDD3C2] flex items-center justify-center text-[#554737] shadow-2xs shrink-0">
              <Cake className="w-5 h-5 sm:w-6 sm:h-6 text-[#7E6349]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-2xl font-bold tracking-tight text-[#2B2520] font-display truncate">
                  Desjuiciados
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#EFE9DE] text-[#695643] border border-[#DFD6C7] shrink-0">
                  {totalCount} 🎂
                </span>
              </div>
              <p className="text-[11px] text-[#7A6E63] hidden sm:block">
                Calendario oficial de celebraciones del parche ✨
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Primary Action: No estás en la lista? */}
            <button
              onClick={onOpenRegisterForm}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl bg-[#4A3C31] text-[#FAF6F0] hover:bg-[#382D24] transition-all shadow-sm active:scale-95 cursor-pointer min-h-[40px] sm:min-h-[44px]"
            >
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8C7B5]" />
              <span className="hidden md:inline">¿No estás en la lista?</span>
              <span>¡Regístrate!</span>
            </button>

            {/* Quick Add Manual (Visible on sm+) */}
            <button
              onClick={onOpenAddModal}
              title="Agregar cumpleañero manualmente"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-2xl bg-[#F0EAE1] text-[#4A3E33] hover:bg-[#E5DDCF] border border-[#E0D7C9] transition-all active:scale-95 cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4 text-[#6A5A4A]" />
              <span className="hidden lg:inline">Agregar</span>
            </button>

            {/* Share WhatsApp (Visible on sm+) */}
            <button
              onClick={onOpenShareModal}
              title="Compartir lista en WhatsApp"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium rounded-2xl bg-[#F0EAE1] text-[#4A3E33] hover:bg-[#E5DDCF] border border-[#E0D7C9] transition-all active:scale-95 cursor-pointer min-h-[44px]"
            >
              <Share2 className="w-4 h-4 text-[#6A5A4A]" />
              <span className="hidden xl:inline">WhatsApp</span>
            </button>

            {/* Forms connector / Admin info */}
            <button
              onClick={onOpenFormsConfig}
              title="Configuración de Google Forms"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium rounded-2xl bg-[#FAF6F0] text-[#6A5A4A] hover:bg-[#EFE7DC] border border-[#E2D8CA] transition-all active:scale-95 cursor-pointer min-h-[44px]"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#7E6A55]" />
              <span className="hidden xl:inline">Forms</span>
            </button>

            {/* Export ICS */}
            <button
              onClick={onExportICS}
              title="Exportar a Google / Apple Calendar (.ics)"
              className="hidden lg:flex p-2.5 rounded-2xl text-[#6A5A4A] hover:bg-[#EFE8DC] border border-[#E5DCCE] transition-all cursor-pointer min-h-[44px] min-w-[44px] items-center justify-center"
            >
              <Calendar className="w-4 h-4" />
            </button>

            {/* Reset Defaults button */}
            <button
              onClick={onResetDefaults}
              title="Restablecer lista original de Desjuiciados"
              className="p-2 sm:p-2.5 rounded-2xl text-[#948779] hover:text-[#524436] hover:bg-[#EFE8DC] transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
