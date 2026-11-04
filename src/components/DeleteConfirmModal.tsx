import React from 'react';
import { BirthdayPerson } from '../types';
import { MONTHS_DATA } from '../data/initialBirthdays';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  person: BirthdayPerson | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  person,
}) => {
  if (!isOpen || !person) return null;

  const monthName = MONTHS_DATA.find((m) => m.month === person.month)?.name;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#231E18]/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 sm:hidden" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border sm:border-[#E3D8C8] shadow-2xl p-5 sm:p-6 space-y-4 z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-6">
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mb-1 sm:hidden" />

        <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-[#2A231C] font-display">
            ¿Eliminar a {person.name}?
          </h3>
          <p className="text-xs text-[#7A6B5D]">
            Esta persona dejará de aparecer en la lista de cumpleaños de Desjuiciados ({person.day} de {monthName}).
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#E5DACB] text-center text-xs text-[#554637]">
          <strong>{person.name}</strong> {person.alias ? `(${person.alias})` : ''} • {person.day} de {monthName}
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl text-sm font-medium text-[#6B5C4D] hover:bg-[#EFE8DC] transition-colors cursor-pointer min-h-[44px]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
          >
            <Trash2 className="w-4 h-4" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
