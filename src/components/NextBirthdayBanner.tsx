import React from 'react';
import { BirthdayPerson } from '../types';
import { getNextBirthdays, getZodiacSign, triggerWarmConfetti, triggerBigCelebration } from '../utils/dateUtils';
import { Sparkles, MessageCircle, PartyPopper, CalendarClock, ChevronRight } from 'lucide-react';
import { MONTHS_DATA } from '../data/initialBirthdays';

interface NextBirthdayBannerProps {
  people: BirthdayPerson[];
  onSelectMonth: (month: number) => void;
}

export const NextBirthdayBanner: React.FC<NextBirthdayBannerProps> = ({
  people,
  onSelectMonth,
}) => {
  const upcoming = getNextBirthdays(people, 3);
  if (upcoming.length === 0) return null;

  const nextPerson = upcoming[0];
  const otherUpcoming = upcoming.slice(1);
  const zodiac = getZodiacSign(nextPerson.person.month, nextPerson.person.day);
  const monthInfo = MONTHS_DATA.find((m) => m.month === nextPerson.person.month);

  const getCelebrationMessage = (person: BirthdayPerson) => {
    const text = encodeURIComponent(
      `¡Feliz Cumpleaños ${person.name} (${person.alias || ''})! 🎉🎂 Que la pases genial y que cumplas muchos más con toda la familia de Desjuiciados! 🥂✨`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#F6F0E6] via-[#FDFBF7] to-[#F1EAE0] border border-[#E5DACB] rounded-3xl p-4 sm:p-8 shadow-sm my-4 sm:my-6 transition-all relative overflow-hidden">
      {/* Decorative subtle background circle */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#EDE3D3]/50 blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
        {/* Left Column: Primary Next Birthday */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#544335] text-[#FAF5ED]">
              <Sparkles className="w-3.5 h-3.5 text-[#E6D4BE]" />
              {nextPerson.isToday ? '¡Hoy está cumpliendo!' : 'Próxima Celebración'}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFE6D8] text-[#63513F] border border-[#E0D5C4]">
              {zodiac.symbol} {zodiac.sign}
            </span>

            <span className="text-xs text-[#7B6E61] font-medium">
              {monthInfo?.name} {nextPerson.person.day}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-4xl font-bold tracking-tight text-[#2B231D] font-display flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span>{nextPerson.person.name}</span>
              {nextPerson.person.alias && (
                <span className="text-sm sm:text-xl font-normal text-[#8A7867]">
                  {nextPerson.person.alias}
                </span>
              )}
            </h2>

            <p className="text-xs sm:text-base text-[#685A4C] mt-1 flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-[#A89481] shrink-0" />
              {nextPerson.isToday ? (
                <strong className="text-[#8C4A26] font-semibold">
                  ¡Es hoy! ¡A celebrar con toda la energía! 🥳
                </strong>
              ) : nextPerson.daysLeft === 1 ? (
                <span>
                  ¡Falta solo <strong>1 día</strong> (Mañana)!
                </span>
              ) : (
                <span>
                  Faltan <strong>{nextPerson.daysLeft} días</strong> para celebrar su fecha especial.
                </span>
              )}
            </p>
          </div>

          {/* Action buttons for next birthday */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            <a
              href={getCelebrationMessage(nextPerson.person)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#14532D] border border-[#25D366]/30 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 text-[#16A34A]" />
              <span>Felicitar en WhatsApp</span>
            </a>

            <button
              onClick={() => {
                if (nextPerson.isToday) {
                  triggerBigCelebration();
                } else {
                  triggerWarmConfetti();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#FAF6EE] hover:bg-[#EFE5D7] text-[#4F4032] border border-[#DFD4C3] text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm cursor-pointer min-h-[44px]"
            >
              <PartyPopper className="w-4 h-4 text-[#B58B58]" />
              <span>Lanzar confeti 🎉</span>
            </button>

            <button
              onClick={() => onSelectMonth(nextPerson.person.month)}
              className="text-xs text-[#7A6855] hover:text-[#3B3026] underline underline-offset-4 font-medium transition-colors cursor-pointer py-1 px-2"
            >
              Ver {monthInfo?.name}
            </button>
          </div>
        </div>

        {/* Right Column: Other upcoming birthdays */}
        <div className="lg:col-span-5 lg:border-l lg:border-[#E8DEC9] lg:pl-6 space-y-2 sm:space-y-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E8DEC9]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#796A5B]">
              Los que le siguen
            </h3>
            <span className="text-[11px] text-[#958778]">Próximos días</span>
          </div>

          <div className="space-y-2">
            {otherUpcoming.map((item) => {
              const mData = MONTHS_DATA.find((m) => m.month === item.person.month);
              const z = getZodiacSign(item.person.month, item.person.day);
              return (
                <div
                  key={item.person.id}
                  onClick={() => onSelectMonth(item.person.month)}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#FAF8F4] hover:bg-[#F2ECE1] border border-[#E9DFD2] transition-all cursor-pointer group active:scale-98"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EFE7D8] text-[#554636] flex flex-col items-center justify-center font-display border border-[#DFD5C3]">
                      <span className="text-[10px] sm:text-xs font-semibold leading-tight text-[#8A7969]">
                        {mData?.shortName}
                      </span>
                      <span className="text-xs sm:text-sm font-bold leading-tight">
                        {item.person.day}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#2C241E] group-hover:text-[#634E3C] transition-colors">
                        {item.person.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#827467]">
                        {item.person.alias || `${z.symbol} ${z.sign}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#EAE1D3] text-[#5A493A]">
                      en {item.daysLeft} d
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#A89886] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
