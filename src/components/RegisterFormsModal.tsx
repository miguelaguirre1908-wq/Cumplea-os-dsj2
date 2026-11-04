import React, { useState } from 'react';
import { MONTHS_DATA } from '../data/initialBirthdays';
import { BirthdayPerson, GoogleFormsSettings } from '../types';
import { triggerBigCelebration } from '../utils/dateUtils';
import { recordFormSubmission } from '../utils/storage';
import { saveSubmissionToFirestore } from '../firebase';
import { X, UserPlus, CheckCircle2, FileSpreadsheet, Send, Phone } from 'lucide-react';

interface RegisterFormsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPersonRegistered: (newPerson: BirthdayPerson) => void;
  formsConfig: GoogleFormsSettings;
}

export const RegisterFormsModal: React.FC<RegisterFormsModalProps> = ({
  isOpen,
  onClose,
  onPersonRegistered,
  formsConfig,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [alias, setAlias] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [successData, setSuccessData] = useState<BirthdayPerson | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!name.trim()) {
      setNameError('Por favor ingresa tu nombre.');
      hasError = true;
    } else {
      setNameError('');
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setPhoneError('El campo [WhatsApp o celular] es obligatorio.');
      hasError = true;
    } else {
      const digitsOnly = cleanPhone.replace(/[^0-9]/g, '');
      if (digitsOnly.length < 7) {
        setPhoneError('Por favor ingresa un número de teléfono o celular válido.');
        hasError = true;
      } else {
        setPhoneError('');
      }
    }

    if (hasError) return;

    const formattedAlias = alias.trim()
      ? alias.startsWith('@')
        ? alias.trim()
        : `@${alias.trim()}`
      : undefined;

    const newPerson: BirthdayPerson = {
      id: `form-${Date.now()}`,
      name: name.trim(),
      month: Number(month),
      day: Number(day),
      phone: cleanPhone,
      alias: formattedAlias,
      customNote: customNote.trim() || undefined,
      isRegisteredViaForm: true,
      createdAt: new Date().toISOString(),
    };

    // Record in local forms log
    const subRecord = {
      name: newPerson.name,
      month: newPerson.month,
      day: newPerson.day,
      phone: cleanPhone,
      alias: newPerson.alias,
      notes: newPerson.customNote,
      syncedToGoogleForms: Boolean(formsConfig.formUrl && formsConfig.formUrl.includes('google.com/forms')),
    };
    recordFormSubmission(subRecord);

    // Sync submission to Firestore
    saveSubmissionToFirestore({
      ...subRecord,
      id: `sub-${Date.now()}`,
      timestamp: new Date().toISOString(),
    });

    onPersonRegistered(newPerson);
    setSuccessData(newPerson);
    triggerBigCelebration();
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setAlias('');
    setCustomNote('');
    setNameError('');
    setPhoneError('');
    setSuccessData(null);
    onClose();
  };

  const daysInSelectedMonth = new Date(2026, month, 0).getDate();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#231E18]/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 sm:hidden" onClick={handleResetAndClose} />

      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border sm:border-[#E3D8C8] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-0">
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EBE3D7] flex items-center justify-between bg-[#F4EFE6] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E4D9C8] flex items-center justify-center text-[#524334] shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2A231C] font-display leading-tight">
                ¿No estás en la lista?
              </h3>
              <p className="text-xs text-[#786A5D]">
                Regístrate para que celebremos tu cumpleaños juntos 🎂
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-[#8E8073] hover:text-[#3B3026] hover:bg-[#EAE0D2] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {successData ? (
            <div className="text-center py-4 sm:py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E5F2E5] text-[#2E7D32] flex items-center justify-center mx-auto ring-8 ring-[#E5F2E5]/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-[#2A231C] font-display">
                  ¡Bienvenido a la lista de Desjuiciados! 🎉
                </h4>
                <p className="text-xs sm:text-sm text-[#665749] mt-1">
                  Tu cumpleaños <strong>{successData.day} de {MONTHS_DATA.find((m) => m.month === successData.month)?.name}</strong> ya fue registrado exitosamente.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F4EDE2] border border-[#E2D6C5] text-left text-xs space-y-1.5 text-[#5A4B3C]">
                <p>
                  <strong>Nombre:</strong> {successData.name}
                </p>
                {successData.phone && (
                  <p>
                    <strong>WhatsApp / Celular:</strong> {successData.phone}
                  </p>
                )}
                {successData.alias && (
                  <p>
                    <strong>Usuario/Alias:</strong> {successData.alias}
                  </p>
                )}
                <p>
                  <strong>Fecha:</strong> {successData.day} de {MONTHS_DATA.find((m) => m.month === successData.month)?.name}
                </p>
                {successData.customNote && (
                  <p>
                    <strong>Nota:</strong> {successData.customNote}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#4A3C31] text-[#FAF6F0] font-semibold text-sm hover:bg-[#382D24] transition-all cursor-pointer min-h-[44px]"
                >
                  Ver mi nombre en el calendario
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Note about Forms */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F3ECE0] border border-[#E3D7C5] flex items-start gap-2.5 text-xs text-[#635343]">
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-[#866C52] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#3B2F23]">Registro abierto a todos:</span>{' '}
                  Cualquier integrante puede inscribirse. Tu WhatsApp nos permite enviarte felicitaciones directas en tu fecha.
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5 flex items-center justify-between">
                  <span>Nombre completo o cómo te conocen *</span>
                  <span className="text-[10px] text-[#A24A30] font-semibold lowercase">Obligatorio</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="Ej. Valentina Morales, Camilo..."
                  className={`w-full px-4 py-3 bg-white border rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 transition-all ${
                    nameError
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E1D6C5] focus:ring-[#8C7661]'
                  }`}
                />
                {nameError && (
                  <p className="text-xs text-[#DC2626] font-medium mt-1">{nameError}</p>
                )}
              </div>

              {/* WhatsApp o celular (MANDATORIO) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>WhatsApp o celular *</span>
                  </span>
                  <span className="text-[10px] text-[#A24A30] font-semibold lowercase">Obligatorio</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  placeholder="Ej. 300 123 4567 o +57 310 987 6543"
                  className={`w-full px-4 py-3 bg-white border rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 transition-all ${
                    phoneError
                      ? 'border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-[#E1D6C5] focus:ring-[#8C7661]'
                  }`}
                />
                {phoneError && (
                  <p className="text-xs text-[#DC2626] font-medium mt-1">{phoneError}</p>
                )}
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
                    Mes *
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-full px-3.5 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] focus:outline-none focus:ring-2 focus:ring-[#8C7661] cursor-pointer"
                  >
                    {MONTHS_DATA.map((m) => (
                      <option key={m.month} value={m.month}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
                    Día *
                  </label>
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    className="w-full px-3.5 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] focus:outline-none focus:ring-2 focus:ring-[#8C7661] cursor-pointer"
                  >
                    {Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Alias */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
                  Apodo o Usuario de Instagram (Opcional)
                </label>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="Ej. @valen_m o ~Valen"
                  className="w-full px-4 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 focus:ring-[#8C7661]"
                />
              </div>

              {/* Custom Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
                  ¿Cómo te gusta celebrar? (Opcional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Ej. Cerveza, chocolate, buena música..."
                  className="w-full px-4 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 focus:ring-[#8C7661]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-3 rounded-2xl text-sm font-medium text-[#706051] hover:bg-[#EFE8DC] transition-colors cursor-pointer min-h-[44px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#4A3C31] text-[#FAF6F0] text-sm font-semibold hover:bg-[#382D24] transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
                >
                  <Send className="w-4 h-4 text-[#D8C7B5]" />
                  <span>Registrar Cumpleaños</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
