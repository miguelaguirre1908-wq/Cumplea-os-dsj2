import confetti from 'canvas-confetti';
import { BirthdayPerson } from '../types';

export interface ZodiacInfo {
  sign: string;
  symbol: string;
  element: string;
  dates: string;
}

export function getZodiacSign(month: number, day: number): ZodiacInfo {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: 'Aries', symbol: '♈', element: 'Fuego', dates: '21 Mar - 19 Abr' };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: 'Tauro', symbol: '♉', element: 'Tierra', dates: '20 Abr - 20 May' };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: 'Géminis', symbol: '♊', element: 'Aire', dates: '21 May - 20 Jun' };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: 'Cáncer', symbol: '♋', element: 'Agua', dates: '21 Jun - 22 Jul' };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: 'Leo', symbol: '♌', element: 'Fuego', dates: '23 Jul - 22 Ago' };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: 'Virgo', symbol: '♍', element: 'Tierra', dates: '23 Ago - 22 Sep' };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: 'Libra', symbol: '♎', element: 'Aire', dates: '23 Sep - 22 Oct' };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: 'Escorpio', symbol: '♏', element: 'Agua', dates: '23 Oct - 21 Nov' };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: 'Sagitario', symbol: '♐', element: 'Fuego', dates: '22 Nov - 21 Dic' };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: 'Capricornio', symbol: '♑', element: 'Tierra', dates: '22 Dic - 19 Ene' };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: 'Acuario', symbol: '♒', element: 'Aire', dates: '20 Ene - 18 Feb' };
  } else {
    return { sign: 'Piscis', symbol: '♓', element: 'Agua', dates: '19 Feb - 20 Mar' };
  }
}

export function getDaysUntilBirthday(month: number, day: number): {
  daysLeft: number;
  isToday: boolean;
  nextDate: Date;
} {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Create date for this year's birthday
  const birthdayThisYear = new Date(currentYear, month - 1, day, 0, 0, 0, 0);
  const today = new Date(currentYear, now.getMonth(), now.getDate(), 0, 0, 0, 0);

  let nextBirthday = birthdayThisYear;
  if (birthdayThisYear < today) {
    // Already passed this year, next one is next year
    nextBirthday = new Date(currentYear + 1, month - 1, day, 0, 0, 0, 0);
  }

  const diffTime = nextBirthday.getTime() - today.getTime();
  const daysLeft = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const isToday = daysLeft === 0;

  return { daysLeft, isToday, nextDate: nextBirthday };
}

export function getNextBirthdays(people: BirthdayPerson[], count = 3): {
  person: BirthdayPerson;
  daysLeft: number;
  isToday: boolean;
}[] {
  const listWithDays = people.map((p) => {
    const { daysLeft, isToday } = getDaysUntilBirthday(p.month, p.day);
    return { person: p, daysLeft, isToday };
  });

  return listWithDays
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, count);
}

export function triggerWarmConfetti() {
  try {
    // Subtle, elegant champagne, cream & warm gold confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4A373', '#E9D8A6', '#CCD5AE', '#E29578', '#A98467', '#F3E9DC'],
      disableForReducedMotion: true,
    });
  } catch (e) {
    console.log('Confetti not available:', e);
  }
}

export function triggerBigCelebration() {
  try {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#C5A880', '#534336', '#E6DEC9', '#DDB892', '#7F4F24', '#EDE0D4'],
      });
    }, 250);
  } catch (e) {
    console.log('Confetti failed:', e);
  }
}

export function formatWhatsAppMessage(people: BirthdayPerson[]): string {
  const monthNames = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

  let msg = `🎂 *CUMPLEAÑOS GRUPO DESJUICIADOS* ✨\n\n`;

  for (let m = 1; m <= 12; m++) {
    const monthPeople = people
      .filter((p) => p.month === m)
      .sort((a, b) => a.day - b.day);

    if (monthPeople.length > 0) {
      msg += `*${monthNames[m - 1]}*\n`;
      monthPeople.forEach((p) => {
        const displayTag = p.alias && p.alias.trim() ? p.alias : p.name;
        msg += `• ${p.day.toString().padStart(2, '0')} - ${displayTag}\n`;
      });
      msg += `\n`;
    }
  }

  msg += `🎉 _Actualizado desde la web oficial de Cumpleaños Desjuiciados_`;
  return msg;
}

export function exportToICS(people: BirthdayPerson[]): void {
  const currentYear = new Date().getFullYear();
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Desjuiciados//Cumpleaños//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Cumpleaños Desjuiciados 🎂',
    'X-WR-TIMEZONE:America/Bogota',
  ];

  people.forEach((p) => {
    const mStr = p.month.toString().padStart(2, '0');
    const dStr = p.day.toString().padStart(2, '0');
    const dtStart = `${currentYear}${mStr}${dStr}`;
    const dtEnd = `${currentYear}${mStr}${dStr}`;

    icsContent.push(
      'BEGIN:VEVENT',
      `UID:cumple-desjuiciados-${p.id}@app`,
      `DTSTAMP:${currentYear}0101T000000Z`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `RRULE:FREQ=YEARLY`,
      `SUMMARY:🎂 Cumpleaños de ${p.name} (${p.alias || 'Desjuiciados'})`,
      `DESCRIPTION:¡Hoy celebra su cumpleaños ${p.name} del grupo Desjuiciados! 🎉`,
      'STATUS:CONFIRMED',
      'TRANSP:TRANSPARENT',
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Cumpleaños_Desjuiciados.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
