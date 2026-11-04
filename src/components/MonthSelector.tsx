import React from 'react';
import { MONTHS_DATA } from '../data/initialBirthdays';
import { BirthdayPerson } from '../types';
import { Sparkles, CalendarDays } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: number | 'all' | 'upcoming';
  onSelectMonth: (month: number | 'all' | 'upcoming') => void;
  people: BirthdayPerson[];
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onSelectMonth,
  people,
}) => {
  const getMonthCount = (monthNum: number) => {
    return people.filter((p) => p.month === monthNum).length;
  };

  return (
    <div className="w-full pb-1">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth">
        {/* All Months pill */}
        <button
          onClick={() => onSelectMonth('all')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 min-h-[44px] ${
            selectedMonth === 'all'
              ? 'bg-[#3D3126] text-[#FAF5ED] shadow-sm'
              : 'bg-[#F2ECE2] text-[#605041] hover:bg-[#EAE1D3] border border-[#E3D9CB]'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Todos</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              selectedMonth === 'all'
                ? 'bg-[#554637] text-[#FAF5ED]'
                : 'bg-[#E3D8C8] text-[#554637]'
            }`}
          >
            {people.length}
          </span>
        </button>

        {/* Upcoming only pill */}
        <button
          onClick={() => onSelectMonth('upcoming')}
          className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 min-h-[44px] ${
            selectedMonth === 'upcoming'
              ? 'bg-[#3D3126] text-[#FAF5ED] shadow-sm'
              : 'bg-[#F2ECE2] text-[#605041] hover:bg-[#EAE1D3] border border-[#E3D9CB]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>Próximos</span>
        </button>

        <div className="h-6 w-[1px] bg-[#DDD2C2] mx-1 shrink-0" />

        {/* 12 Months pills */}
        {MONTHS_DATA.map((m) => {
          const count = getMonthCount(m.month);
          const isSelected = selectedMonth === m.month;

          return (
            <button
              key={m.month}
              onClick={() => onSelectMonth(m.month)}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 min-h-[44px] ${
                isSelected
                  ? 'bg-[#3D3126] text-[#FAF5ED] font-semibold shadow-sm scale-105'
                  : count > 0
                  ? 'bg-[#FAF8F5] text-[#534538] hover:bg-[#EFE8DC] border border-[#E4DACB]'
                  : 'bg-[#FAF8F5]/60 text-[#9E9081] hover:bg-[#F2ECE2] border border-[#ECE3D6]'
              }`}
            >
              <span>{m.name}</span>
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isSelected
                      ? 'bg-[#554637] text-[#FAF5ED]'
                      : 'bg-[#EFE6D8] text-[#635343]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
