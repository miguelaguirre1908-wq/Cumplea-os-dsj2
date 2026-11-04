import { BirthdayPerson, GoogleFormsSettings, FormSubmissionRecord } from '../types';
import { INITIAL_BIRTHDAYS } from '../data/initialBirthdays';

const STORAGE_KEY_BIRTHDAYS = 'desjuiciados_birthdays_v2';
const STORAGE_KEY_FORMS_CONFIG = 'desjuiciados_forms_config_v2';
const STORAGE_KEY_FORMS_SUBMISSIONS = 'desjuiciados_forms_submissions_v2';

export const DEFAULT_FORMS_CONFIG: GoogleFormsSettings = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfYourFormIdHere/viewform',
  formNameFieldEntry: '',
  formDateFieldEntry: '',
  formAliasFieldEntry: '',
  formNotesFieldEntry: '',
  autoSync: false,
};

export function loadBirthdays(): BirthdayPerson[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_BIRTHDAYS);
    if (!data) {
      saveBirthdays(INITIAL_BIRTHDAYS);
      return INITIAL_BIRTHDAYS;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_BIRTHDAYS;
  } catch (err) {
    console.error('Error reading birthdays from localStorage:', err);
    return INITIAL_BIRTHDAYS;
  }
}

export function saveBirthdays(list: BirthdayPerson[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_BIRTHDAYS, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving birthdays to localStorage:', err);
  }
}

export function resetBirthdaysToDefault(): BirthdayPerson[] {
  saveBirthdays(INITIAL_BIRTHDAYS);
  return INITIAL_BIRTHDAYS;
}

export function loadFormsConfig(): GoogleFormsSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEY_FORMS_CONFIG);
    if (!data) return DEFAULT_FORMS_CONFIG;
    return { ...DEFAULT_FORMS_CONFIG, ...JSON.parse(data) };
  } catch {
    return DEFAULT_FORMS_CONFIG;
  }
}

export function saveFormsConfig(config: GoogleFormsSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_FORMS_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving forms config:', err);
  }
}

export function loadFormSubmissions(): FormSubmissionRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_FORMS_SUBMISSIONS);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function recordFormSubmission(record: Omit<FormSubmissionRecord, 'id' | 'timestamp'>): FormSubmissionRecord {
  const fullRecord: FormSubmissionRecord = {
    ...record,
    id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
  };

  try {
    const existing = loadFormSubmissions();
    const updated = [fullRecord, ...existing];
    localStorage.setItem(STORAGE_KEY_FORMS_SUBMISSIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Error storing form submission:', err);
  }

  return fullRecord;
}
