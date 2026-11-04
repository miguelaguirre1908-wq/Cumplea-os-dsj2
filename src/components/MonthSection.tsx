import React from 'react';
import { MonthMeta, BirthdayPerson } from '../types';
import { BirthdayCard } from './BirthdayCard';

interface MonthSectionProps {
  monthMeta: MonthMeta;
  people: BirthdayPerson[];
  onEdit: (person: BirthdayPerson) => void;
  onDelete: (person: BirthdayPerson) => void;
  viewMode: 'grid' | 'list';
}

export const MonthSection: React.FC<MonthSectionProps> = ({
  monthMeta,
  people,
  onEdit,
  onDelete,
  viewMode,
}) => {
  if (people.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-10 scroll-mt-24" id={`month-${monthMeta.month}`}>
      {/* Month Header Banner */}
      <div className="flex items-center justify-between gap-4 pb-3 mb-3 sm:mb-4 border-b border-[#E4D9C8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#EFE8DC] border border-[#DDD3C2] flex items-center justify-center text-[#554637] font-display font-bold text-base sm:text-lg shadow-2xs">
            {monthMeta.month}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-bold text-[#2A221B] font-display">
                {monthMeta.name}
              </h2>
              <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-[#EDE4D5] text-[#554536] border border-[#DCD1C0]">
                {people.length} {people.length === 1 ? 'cumple' : 'cumples'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#827466] mt-0.5">
              {monthMeta.season} • {monthMeta.description}
            </p>
          </div>
        </div>
      </div>

      {/* Cards List or Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
          {people.map((person) => (
            <BirthdayCard
              key={person.id}
              person={person}
              onEdit={onEdit}
              onDelete={onDelete}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {people.map((person) => (
            <BirthdayCard
              key={person.id}
              person={person}
              onEdit={onEdit}
              onDelete={onDelete}
              viewMode="list"
            />
          ))}
        </div>
      )}
    </section>
  );
};
