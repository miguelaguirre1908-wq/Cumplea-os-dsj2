import React from 'react';
import { MONTHS_DATA } from '../data/initialBirthdays';
import { BirthdayPerson } from '../types';
import { X, Calendar, Sparkles, CalendarDays, ChevronRight } from 'lucide-react';

interface MobileMonthSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMonth: number | 'all' | 'upcoming';
  onSelectMonth: (month: number | 'all' | 'upcoming') => void;
  people: BirthdayPerson[];
}

export const MobileMonthSheet: React.FC<MobileMonthSheetProps> = ({
  isOpen,
  onClose,
  selectedMonth,
  onSelectMonth,
  people,
}) => {
  if (!isOpen) return null;

  const getMonthCount = (monthNum: number) => {
    return people.filter((p) => p.month === monthNum).length;
  };

  const handleSelect = (month: number | 'all' | 'upcoming') => {
    onSelectMonth(month);
    onClose();
    if (typeof month === 'number') {
      setTimeout(() => {
        const el = document.getElementById(`month-${month}`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#231E18]/60 backdrop-blur-sm sm:hidden animate-fadeIn">
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-h-[85vh] bg-[#FAF8F5] rounded-t-3xl border-t border-[#E2D5C3] shadow-2xl p-5 overflow-y-auto flex flex-col z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE2D3] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EFE7D8] text-[#554637] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2A231C] font-display">
                Explorar por Mes
              </h3>
              <p className="text-[11px] text-[#7A6B5C]">
                {people.length} integrantes en el calendario
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8E8073] hover:text-[#3B3026] hover:bg-[#EAE0D2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => handleSelect('all')}
            className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
              selectedMonth === 'all'
                ? 'bg-[#3D3126] text-[#FAF5ED] border-[#3D3126]'
                : 'bg-white text-[#524334] border-[#E5DACB] hover:bg-[#F2ECE1]'
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>Todos los meses</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                selectedMonth === 'all' ? 'bg-[#554637] text-white' : 'bg-[#EFE7D8] text-[#554637]'
              }`}
            >
              {people.length}
            </span>
          </button>

          <button
            onClick={() => handleSelect('upcoming')}
            className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
              selectedMonth === 'upcoming'
                ? 'bg-[#3D3126] text-[#FAF5ED] border-[#3D3126]'
                : 'bg-white text-[#524334] border-[#E5DACB] hover:bg-[#F2ECE1]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>Próximos</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-2 gap-2">
          {MONTHS_DATA.map((m) => {
            const count = getMonthCount(m.month);
            const isSelected = selectedMonth === m.month;

            return (
              <button
                key={m.month}
                onClick={() => handleSelect(m.month)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'bg-[#3D3126] text-[#FAF5ED] border-[#3D3126] shadow-sm'
                    : 'bg-white text-[#4A3D30] border-[#E8DEC9] hover:bg-[#F4EEE4]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold font-display">{m.name}</div>
                  <div className="text-[10px] opacity-70">{m.season}</div>
                </div>

                {count > 0 ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected
                        ? 'bg-[#554637] text-[#FAF5ED]'
                        : 'bg-[#EFE6D8] text-[#5A4A3A]'
                    }`}
                  >
                    {count}
                  </span>
                ) : (
                  <span className="text-[10px] opacity-40">—</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
