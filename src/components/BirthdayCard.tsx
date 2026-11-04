import React, { useState } from 'react';
import { BirthdayPerson } from '../types';
import { getDaysUntilBirthday, getZodiacSign, triggerWarmConfetti, triggerBigCelebration } from '../utils/dateUtils';
import { MessageCircle, MoreVertical, Edit2, Trash2, PartyPopper, Check, Sparkles } from 'lucide-react';
import { MONTHS_DATA } from '../data/initialBirthdays';

interface BirthdayCardProps {
  person: BirthdayPerson;
  onEdit: (person: BirthdayPerson) => void;
  onDelete: (person: BirthdayPerson) => void;
  viewMode?: 'grid' | 'list';
}

export const BirthdayCard: React.FC<BirthdayCardProps> = ({
  person,
  onEdit,
  onDelete,
  viewMode = 'grid',
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const { daysLeft, isToday } = getDaysUntilBirthday(person.month, person.day);
  const zodiac = getZodiacSign(person.month, person.day);
  const monthData = MONTHS_DATA.find((m) => m.month === person.month);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `¡Hola ${person.name}! 🎉🎂 Te deseo un muy Feliz Cumpleaños de parte de todo el grupo Desjuiciados! ¡A celebrar en grande! 🥂✨`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleCelebrate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isToday) {
      triggerBigCelebration();
    } else {
      triggerWarmConfetti();
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${person.name} (${person.alias || ''}) - ${person.day} de ${monthData?.name}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (viewMode === 'list') {
    return (
      <div
        className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all ${
          isToday
            ? 'bg-[#F9F4EB] border-[#D8C7B0] ring-2 ring-[#C5A880]/50 shadow-sm'
            : 'bg-[#FAF8F5] border-[#E8DFD2] hover:border-[#D6C7B2] hover:bg-[#F5EFE4]'
        }`}
      >
        {/* Left: Day & Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            onClick={handleCelebrate}
            title="Celebrar"
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-display shrink-0 cursor-pointer transition-transform active:scale-95 ${
              isToday
                ? 'bg-[#4B3C2F] text-[#FAF5EC] shadow-xs'
                : 'bg-[#EFE8DC] text-[#4A3C2F] border border-[#DDD3C2] group-hover:bg-[#E5DCCE]'
            }`}
          >
            <span className="text-[10px] uppercase font-bold leading-none text-[#7D6B5A]">
              {monthData?.shortName}
            </span>
            <span className="text-base font-bold leading-tight">
              {person.day}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm sm:text-base font-bold text-[#2A231C] truncate font-display">
                {person.name}
              </h4>
              {person.alias && (
                <span className="text-xs text-[#7B6D5E] font-normal truncate">
                  {person.alias}
                </span>
              )}
              {person.isRegisteredViaForm && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#EAE2D5] text-[#554637] font-medium">
                  Form
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#857667] mt-0.5">
              <span>
                {zodiac.symbol} {zodiac.sign}
              </span>
              <span>•</span>
              <span
                className={
                  isToday
                    ? 'font-bold text-[#8C4A26]'
                    : daysLeft <= 7
                    ? 'font-semibold text-[#664D36]'
                    : ''
                }
              >
                {isToday
                  ? '🎂 ¡HOY!'
                  : daysLeft === 1
                  ? '¡Mañana!'
                  : `Faltan ${daysLeft}d`}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            onClick={handleWhatsApp}
            title="Felicitar en WhatsApp"
            className="p-2 sm:p-2.5 rounded-xl text-[#2E7D32] hover:bg-[#E2F0D9] active:scale-95 transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={handleCelebrate}
            title="Lanzar confeti"
            className="p-2 sm:p-2.5 rounded-xl text-[#8E7356] hover:bg-[#EFE6D8] active:scale-95 transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <PartyPopper className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(person)}
            title="Editar"
            className="p-2 rounded-xl text-[#857667] hover:text-[#3B3026] hover:bg-[#EFE6D8] transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(person)}
            title="Eliminar"
            className="p-2 rounded-xl text-[#A67878] hover:text-[#991B1B] hover:bg-[#FEE2E2] transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className={`group relative rounded-3xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
        isToday
          ? 'bg-gradient-to-b from-[#FAF4EA] to-[#F2E8D8] border-[#D2BEA4] shadow-md ring-2 ring-[#C5A880]/60'
          : 'bg-[#FAF8F5] border-[#E8DFD2] hover:border-[#D5C7B4] hover:shadow-xs hover:bg-[#FBF9F7]'
      }`}
    >
      <div>
        {/* Card Header: Day Badge & Top Actions */}
        <div className="flex items-start justify-between gap-3">
          <div
            onClick={handleCelebrate}
            title="Celebrar"
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center font-display shadow-2xs cursor-pointer transition-transform active:scale-95 ${
              isToday
                ? 'bg-[#3D2F23] text-[#FAF5ED]'
                : 'bg-[#EFE7D8] text-[#443628] border border-[#DED3C2] group-hover:bg-[#E5DCCE]'
            }`}
          >
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#796754]">
              {monthData?.shortName}
            </span>
            <span className="text-lg sm:text-xl font-extrabold leading-none mt-0.5">
              {person.day}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Days Left Chip */}
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                isToday
                  ? 'bg-[#934A26] text-[#FAF6F0] animate-pulse'
                  : daysLeft <= 7
                  ? 'bg-[#EADDC9] text-[#554331]'
                  : 'bg-[#EFE7DC] text-[#716152]'
              }`}
            >
              {isToday ? (
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#FFD6A5]" /> ¡Hoy!
                </span>
              ) : daysLeft === 1 ? (
                '¡Mañana!'
              ) : (
                `en ${daysLeft} d`
              )}
            </span>

            {/* Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-xl text-[#928272] hover:text-[#403328] hover:bg-[#EFE7DB] transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-10 z-30 w-44 rounded-2xl bg-[#FAF8F5] border border-[#E2D6C5] shadow-lg py-1.5 text-xs text-[#4F4133]">
                    <button
                      onClick={(e) => {
                        setShowMenu(false);
                        handleCopy(e);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-[#EFE8DC] flex items-center gap-2 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-[#968473]" />
                      )}
                      <span>{copied ? 'Copiado' : 'Copiar datos'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onEdit(person);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-[#EFE8DC] flex items-center gap-2 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#968473]" />
                      <span>Editar persona</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDelete(person);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-[#FEE2E2] text-[#991B1B] flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Member Name and Alias */}
        <div className="mt-3.5">
          <h3 className="text-base sm:text-lg font-bold text-[#2A221B] font-display leading-snug group-hover:text-[#503E2F] transition-colors">
            {person.name}
          </h3>
          {person.alias && (
            <p className="text-xs text-[#7A6B5C] font-medium mt-0.5">
              {person.alias}
            </p>
          )}
          {person.customNote && (
            <p className="text-xs text-[#8A7A6B] italic mt-1 line-clamp-2">
              "{person.customNote}"
            </p>
          )}
        </div>

        {/* Zodiac & Tag */}
        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EFE8DB] text-[#5C4C3C] border border-[#DDD3C2]">
            <span>{zodiac.symbol}</span>
            <span>{zodiac.sign}</span>
          </span>

          {person.isRegisteredViaForm && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4DCCE] text-[#554536]">
              Registro Form
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Quick Actions */}
      <div className="pt-3.5 mt-3.5 border-t border-[#EAE1D3] flex items-center justify-between gap-2">
        <button
          onClick={handleWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#14532D] border border-[#25D366]/25 text-xs font-semibold transition-all active:scale-95 cursor-pointer min-h-[42px]"
        >
          <MessageCircle className="w-4 h-4 text-[#16A34A]" />
          <span>Felicitar</span>
        </button>

        <button
          onClick={handleCelebrate}
          title="Lanzar confeti para este cumpleañero"
          className="p-2.5 rounded-xl bg-[#EFE7DC] hover:bg-[#E4D9CA] text-[#635242] transition-all active:scale-95 cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center"
        >
          <PartyPopper className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
