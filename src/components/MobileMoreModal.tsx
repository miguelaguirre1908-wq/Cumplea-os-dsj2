import React from 'react';
import {
  X,
  Plus,
  FileSpreadsheet,
  Calendar,
  RefreshCw,
  Sparkles,
  Info,
} from 'lucide-react';

interface MobileMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddModal: () => void;
  onOpenFormsConfig: () => void;
  onExportICS: () => void;
  onResetDefaults: () => void;
}

export const MobileMoreModal: React.FC<MobileMoreModalProps> = ({
  isOpen,
  onClose,
  onOpenAddModal,
  onOpenFormsConfig,
  onExportICS,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#231E18]/60 backdrop-blur-sm sm:hidden animate-fadeIn">
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-h-[85vh] bg-[#FAF8F5] rounded-t-3xl border-t border-[#E2D5C3] shadow-2xl p-5 overflow-y-auto flex flex-col z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE2D3] mb-4">
          <div>
            <h3 className="text-base font-bold text-[#2A231C] font-display">
              Más Opciones & Herramientas
            </h3>
            <p className="text-[11px] text-[#7A6B5C]">
              Gestión del calendario Desjuiciados
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8E8073] hover:text-[#3B3026] hover:bg-[#EAE0D2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Items */}
        <div className="space-y-2">
          {/* Add Manual */}
          <button
            onClick={() => {
              onClose();
              onOpenAddModal();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E8DEC9] text-[#3D3126] hover:bg-[#F4EEE4] active:scale-98 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EFE7D8] text-[#554637] flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">Agregar cumpleañero manualmente</div>
              <div className="text-xs text-[#7D6E60]">Añadir nombre, día y mes directo a la lista</div>
            </div>
          </button>

          {/* Google Forms Config */}
          <button
            onClick={() => {
              onClose();
              onOpenFormsConfig();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E8DEC9] text-[#3D3126] hover:bg-[#F4EEE4] active:scale-98 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EFE7D8] text-[#554637] flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">Google Forms & Registros</div>
              <div className="text-xs text-[#7D6E60]">Ver respuestas guardadas y configurar link</div>
            </div>
          </button>

          {/* Export Calendar */}
          <button
            onClick={() => {
              onClose();
              onExportICS();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E8DEC9] text-[#3D3126] hover:bg-[#F4EEE4] active:scale-98 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EFE7D8] text-[#554637] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">Descargar Calendario (.ics)</div>
              <div className="text-xs text-[#7D6E60]">Sincroniza con Google Calendar o iPhone</div>
            </div>
          </button>

          {/* Reset Defaults */}
          <button
            onClick={() => {
              onClose();
              onResetDefaults();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFF8F8] border border-[#F0D5D5] text-[#991B1B] hover:bg-[#FEE2E2] active:scale-98 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold">Restablecer 44 integrantes</div>
              <div className="text-xs text-[#B91C1C]/80">Volver a la lista inicial del grupo</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
