import React from 'react';
import { Search, X, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'day' | 'name' | 'soonest';
  onSortChange: (sort: 'day' | 'name' | 'soonest') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 sm:py-4">
      {/* Search box */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#998A7B]" />
        <input
          id="main-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre, @alias o signo..."
          className="w-full pl-10 pr-9 py-2.5 bg-[#FAF8F5] border border-[#E4D9CA] rounded-2xl text-xs sm:text-sm text-[#2D251F] placeholder-[#A49688] focus:outline-none focus:ring-2 focus:ring-[#8C7661] focus:border-transparent transition-all shadow-2xs min-h-[44px]"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#998A7B] hover:text-[#42352A] transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Controls: Sort and View Mode */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
        {/* Sort selector */}
        <div className="flex-1 sm:flex-initial flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E4D9CA] rounded-2xl px-3 py-2 text-xs text-[#524436] min-h-[44px]">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#887868] shrink-0" />
          <span className="hidden sm:inline text-[#887868]">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'day' | 'name' | 'soonest')}
            className="bg-transparent text-xs font-semibold text-[#3F3327] focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="day">Día del mes</option>
            <option value="soonest">Más cercano a hoy</option>
            <option value="name">Nombre (A - Z)</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-[#FAF8F5] border border-[#E4D9CA] rounded-2xl p-1 shrink-0 min-h-[44px]">
          <button
            onClick={() => onViewModeChange('grid')}
            title="Vista de cuadrícula"
            className={`p-2 rounded-xl transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
              viewMode === 'grid'
                ? 'bg-[#423529] text-[#FAF6F0] shadow-2xs'
                : 'text-[#847566] hover:text-[#423529]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            title="Vista compacta de lista"
            className={`p-2 rounded-xl transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
              viewMode === 'list'
                ? 'bg-[#423529] text-[#FAF6F0] shadow-2xs'
                : 'text-[#847566] hover:text-[#423529]'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
