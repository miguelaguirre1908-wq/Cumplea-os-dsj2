export interface BirthdayPerson {
  id: string;
  name: string;
  month: number; // 1 to 12
  day: number;   // 1 to 31
  phone?: string; // WhatsApp o celular
  alias?: string;
  customNote?: string;
  avatarSeed?: string;
  isRegisteredViaForm?: boolean;
  createdAt?: string;
}

export interface MonthMeta {
  month: number;
  name: string;
  shortName: string;
  season: string;
  bgAccent: string;
  pillColor: string;
  badgeColor: string;
  description: string;
}

export interface GoogleFormsSettings {
  formUrl: string;
  formNameFieldEntry?: string;
  formDateFieldEntry?: string;
  formAliasFieldEntry?: string;
  formNotesFieldEntry?: string;
  autoSync: boolean;
}

export interface FormSubmissionRecord {
  id: string;
  name: string;
  month: number;
  day: number;
  phone: string;
  alias?: string;
  notes?: string;
  timestamp: string;
  syncedToGoogleForms: boolean;
}
