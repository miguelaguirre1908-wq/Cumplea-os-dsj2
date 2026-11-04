import React, { useState, useEffect } from 'react';
import { MONTHS_DATA } from '../data/initialBirthdays';
import { BirthdayPerson } from '../types';
import { X, UserPlus, Edit, Save } from 'lucide-react';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (person: BirthdayPerson) => void;
  personToEdit?: BirthdayPerson | null;
}

export const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  personToEdit,
}) => {
  const [name, setName] = useState('');
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [alias, setAlias] = useState('');
  const [customNote, setCustomNote] = useState('');

  useEffect(() => {
    if (personToEdit) {
      setName(personToEdit.name);
      setMonth(personToEdit.month);
      setDay(personToEdit.day);
      setAlias(personToEdit.alias || '');
      setCustomNote(personToEdit.customNote || '');
    } else {
      setName('');
      setMonth(new Date().getMonth() + 1);
      setDay(new Date().getDate());
      setAlias('');
      setCustomNote('');
    }
  }, [personToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const person: BirthdayPerson = {
      id: personToEdit ? personToEdit.id : `manual-${Date.now()}`,
      name: name.trim(),
      month: Number(month),
      day: Number(day),
      alias: alias.trim() || undefined,
      customNote: customNote.trim() || undefined,
      isRegisteredViaForm: personToEdit ? personToEdit.isRegisteredViaForm : false,
      createdAt: personToEdit?.createdAt || new Date().toISOString(),
    };

    onSave(person);
    onClose();
  };

  const daysInSelectedMonth = new Date(2026, month, 0).getDate();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#231E18]/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 sm:hidden" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border sm:border-[#E3D8C8] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-0">
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EBE3D7] flex items-center justify-between bg-[#F4EFE6] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E4D9C8] flex items-center justify-center text-[#524334] shrink-0">
              {personToEdit ? <Edit className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2A231C] font-display leading-tight">
                {personToEdit ? 'Editar Cumpleañero' : 'Agregar Persona'}
              </h3>
              <p className="text-xs text-[#786A5D]">
                {personToEdit
                  ? 'Modifica los datos del integrante'
                  : 'Añade un integrante a la lista de Desjuiciados'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Carlos Mendoza"
              className="w-full px-4 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 focus:ring-[#8C7661]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
                Mes *
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full px-3.5 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] focus:outline-none focus:ring-2 focus:ring-[#8C7661] cursor-pointer"
              >
                {MONTHS_DATA.map((m) => (
                  <option key={m.month} value={m.month}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
                Día *
              </label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full px-3.5 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] focus:outline-none focus:ring-2 focus:ring-[#8C7661] cursor-pointer"
              >
                {Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
              Etiqueta / Alias (Opcional)
            </label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Ej. @carlitos o @~Carlos"
              className="w-full px-4 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 focus:ring-[#8C7661]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
              Nota personalizada (Opcional)
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Ej. Regalo sorpresa, gustos..."
              className="w-full px-4 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 focus:ring-[#8C7661]"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-2xl text-sm font-medium text-[#706051] hover:bg-[#EFE8DC] transition-colors cursor-pointer min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#4A3C31] text-[#FAF6F0] text-sm font-semibold hover:bg-[#382D24] transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
            >
              <Save className="w-4 h-4 text-[#D8C7B5]" />
              <span>{personToEdit ? 'Guardar Cambios' : 'Agregar a la Lista'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
