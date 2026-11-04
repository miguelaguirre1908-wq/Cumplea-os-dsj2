import { BirthdayPerson, MonthMeta } from '../types';

export const MONTHS_DATA: MonthMeta[] = [
  {
    month: 1,
    name: 'Enero',
    shortName: 'Ene',
    season: 'Comienzo de año',
    bgAccent: 'bg-[#FBF8F2]',
    pillColor: 'border-[#E6DEC9] text-[#5A4F3D]',
    badgeColor: 'bg-[#EFE8D8] text-[#504432]',
    description: 'Capricornio & Acuario',
  },
  {
    month: 2,
    name: 'Febrero',
    shortName: 'Feb',
    season: 'Mes del amor y la amistad',
    bgAccent: 'bg-[#FAF6F3]',
    pillColor: 'border-[#EBDCD3] text-[#63493E]',
    badgeColor: 'bg-[#F5E8E0] text-[#5A3F33]',
    description: 'Acuario & Piscis',
  },
  {
    month: 3,
    name: 'Marzo',
    shortName: 'Mar',
    season: 'Buena vibra y primavera',
    bgAccent: 'bg-[#F9F7F1]',
    pillColor: 'border-[#DFDEC8] text-[#4E5139]',
    badgeColor: 'bg-[#ECEBD7] text-[#42462E]',
    description: 'Piscis & Aries',
  },
  {
    month: 4,
    name: 'Abril',
    shortName: 'Abr',
    season: 'Alegría y celebración',
    bgAccent: 'bg-[#FAF7F2]',
    pillColor: 'border-[#EADCC8] text-[#614E36]',
    badgeColor: 'bg-[#F4E9D9] text-[#54422A]',
    description: 'Aries & Tauro',
  },
  {
    month: 5,
    name: 'Mayo',
    shortName: 'May',
    season: 'Mes de las madres y fiesta',
    bgAccent: 'bg-[#FAF8F3]',
    pillColor: 'border-[#E2DEC7] text-[#525237]',
    badgeColor: 'bg-[#ECE8D2] text-[#45452C]',
    description: 'Tauro & Géminis',
  },
  {
    month: 6,
    name: 'Junio',
    shortName: 'Jun',
    season: 'Mitad de año con toda',
    bgAccent: 'bg-[#F9F7F5]',
    pillColor: 'border-[#E2D8D2] text-[#5C4A42]',
    badgeColor: 'bg-[#EFE4DE] text-[#503E36]',
    description: 'Géminis & Cáncer',
  },
  {
    month: 7,
    name: 'Julio',
    shortName: 'Jul',
    season: 'Sol y vacaciones',
    bgAccent: 'bg-[#FAF6F0]',
    pillColor: 'border-[#E8DAC2] text-[#5C492B]',
    badgeColor: 'bg-[#F3E7D3] text-[#4E3D22]',
    description: 'Cáncer & Leo',
  },
  {
    month: 8,
    name: 'Agosto',
    shortName: 'Ago',
    season: 'Vientos y cometas',
    bgAccent: 'bg-[#FAF7F1]',
    pillColor: 'border-[#E3D9C3] text-[#534932]',
    badgeColor: 'bg-[#EDE4D0] text-[#463D26]',
    description: 'Leo & Virgo',
  },
  {
    month: 9,
    name: 'Septiembre',
    shortName: 'Sep',
    season: 'Flores y detalles',
    bgAccent: 'bg-[#FAF6F4]',
    pillColor: 'border-[#E6D8D4] text-[#5E4844]',
    badgeColor: 'bg-[#F0E3DF] text-[#4F3935]',
    description: 'Virgo & Libra',
  },
  {
    month: 10,
    name: 'Octubre',
    shortName: 'Oct',
    season: 'Disfraces y dulces',
    bgAccent: 'bg-[#FAF6F1]',
    pillColor: 'border-[#E8DCCB] text-[#5B4A34]',
    badgeColor: 'bg-[#F3E7D8] text-[#4D3D28]',
    description: 'Libra & Escorpio',
  },
  {
    month: 11,
    name: 'Noviembre',
    shortName: 'Nov',
    season: 'Víspera navideña',
    bgAccent: 'bg-[#FAF7F4]',
    pillColor: 'border-[#DFD5CD] text-[#55473F]',
    badgeColor: 'bg-[#EBE2DA] text-[#483B33]',
    description: 'Escorpio & Sagitario',
  },
  {
    month: 12,
    name: 'Diciembre',
    shortName: 'Dic',
    season: 'Navidad y fin de año',
    bgAccent: 'bg-[#FBF7F2]',
    pillColor: 'border-[#E7D6C5] text-[#5D4431]',
    badgeColor: 'bg-[#F3E4D6] text-[#4F3724]',
    description: 'Sagitario & Capricornio',
  },
];

export const INITIAL_BIRTHDAYS: BirthdayPerson[] = [
  // ENERO
  { id: 'ene-16', name: 'Carla', month: 1, day: 16, alias: '@Carla' },
  { id: 'ene-17', name: 'Dahiana Velez', month: 1, day: 17, alias: '@Dahiana Velez' },
  { id: 'ene-20', name: 'Felipolla', month: 1, day: 20, alias: '@Felipolla' },

  // FEBRERO
  { id: 'feb-06', name: 'Mauro', month: 2, day: 6, alias: 'Mauro' },
  { id: 'feb-15', name: 'Maria Jose', month: 2, day: 15, alias: '@Maria Jose' },
  { id: 'feb-17', name: 'Guty', month: 2, day: 17, alias: '@ Guty' },

  // MARZO
  { id: 'mar-12', name: 'Pollo 🐥', month: 3, day: 12, alias: '@~Pollo🐥' },
  { id: 'mar-15', name: 'Andrea', month: 3, day: 15, alias: '@Andrea' },

  // ABRIL
  { id: 'abr-22', name: 'Alejandra Gómez', month: 4, day: 22, alias: 'Alejandra Gómez' },
  { id: 'abr-30', name: 'Anyi', month: 4, day: 30, alias: 'Anyi' },

  // MAYO
  { id: 'may-08', name: 'Luisa Arroyave', month: 5, day: 8, alias: 'Luisa Arroyave' },
  { id: 'may-09', name: 'Aleja', month: 5, day: 9, alias: '@Aleja' },
  { id: 'may-10', name: 'Joha', month: 5, day: 10, alias: '@Joha' },
  { id: 'may-18', name: 'Alejandro Garrafa', month: 5, day: 18, alias: 'Alejandro Garrafa' },
  { id: 'may-20', name: 'Lizeth Villa', month: 5, day: 20, alias: 'Lizeth Villa' },
  { id: 'may-27', name: 'Kevinchi', month: 5, day: 27, alias: 'Kevinchi' },

  // JUNIO
  { id: 'jun-06', name: 'Jhonatan', month: 6, day: 6, alias: '@Jhonatan' },
  { id: 'jun-15', name: 'Kevin', month: 6, day: 15, alias: '@Kevin' },
  { id: 'jun-18', name: 'Mar', month: 6, day: 18, alias: '@Mar' },
  { id: 'jun-20', name: 'Sharick', month: 6, day: 20, alias: 'Sharick' },
  { id: 'jun-25', name: 'Jhon', month: 6, day: 25, alias: 'Jhon' },
  { id: 'jun-28', name: 'sanvil', month: 6, day: 28, alias: '@sanvil' },
  { id: 'jun-30', name: 'Alejandra Cartagena', month: 6, day: 30, alias: '@Alejandra Cartagena' },

  // JULIO
  { id: 'jul-08', name: 'Fabian', month: 7, day: 8, alias: '@Fabian' },
  { id: 'jul-20', name: 'Esteban Gomez', month: 7, day: 20, alias: 'Esteban Gomez' },
  { id: 'jul-22', name: 'Chris CR', month: 7, day: 22, alias: '@Chris CR' },
  { id: 'jul-23', name: 'Anthony', month: 7, day: 23, alias: '@Anthony' },

  // AGOSTO
  { id: 'ago-10', name: 'Lis', month: 8, day: 10, alias: '@Lis' },
  { id: 'ago-25', name: 'Jiménez', month: 8, day: 25, alias: '@Jiménez' },
  { id: 'ago-26a', name: 'Lorena 🌻', month: 8, day: 26, alias: '@Lorena🌻' },
  { id: 'ago-26b', name: 'Alejo 🫂', month: 8, day: 26, alias: 'Alejo.🫂' },
  { id: 'ago-27', name: 'Gisel Contreras', month: 8, day: 27, alias: '@Gisel Contreras' },

  // SEPTIEMBRE
  { id: 'sep-28', name: 'Verito', month: 9, day: 28, alias: '@~Verito' },

  // OCTUBRE
  { id: 'oct-08', name: 'Oscar', month: 10, day: 8, alias: '@Oscar' },
  { id: 'oct-16', name: 'Virginia', month: 10, day: 16, alias: '@Virginia' },
  { id: 'oct-19', name: 'Angel', month: 10, day: 19, alias: '@Angel' },
  { id: 'oct-22', name: 'Cami 🖤', month: 10, day: 22, alias: 'Cami.🖤' },
  { id: 'oct-24', name: 'Andrea Fresa', month: 10, day: 24, alias: '@Andrea Fresa' },

  // NOVIEMBRE
  { id: 'nov-03', name: 'Nanlly', month: 11, day: 3, alias: '@Nanlly' },
  { id: 'nov-21', name: 'Tatian', month: 11, day: 21, alias: '@Tatian' },
  { id: 'nov-22', name: 'Juan David Sánchez', month: 11, day: 22, alias: '@Juan David Sánchez' },

  // DICIEMBRE
  { id: 'dic-08', name: 'Vane', month: 12, day: 8, alias: '@Vane' },
  { id: 'dic-18', name: 'Jader', month: 12, day: 18, alias: '@Jader' },
  { id: 'dic-20', name: 'Matəo', month: 12, day: 20, alias: '@Matəo.' },
  { id: 'dic-27', name: 'Andres', month: 12, day: 27, alias: '@Andres' },
  { id: 'dic-31', name: 'Kisley', month: 12, day: 31, alias: 'Kisley' },
];
