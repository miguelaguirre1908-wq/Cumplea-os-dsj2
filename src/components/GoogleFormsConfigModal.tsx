import React, { useState } from 'react';
import { GoogleFormsSettings, FormSubmissionRecord } from '../types';
import { MONTHS_DATA } from '../data/initialBirthdays';
import { loadFormSubmissions, saveFormsConfig } from '../utils/storage';
import { X, FileSpreadsheet, ExternalLink, Download, Check, Save, Info } from 'lucide-react';

interface GoogleFormsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GoogleFormsSettings;
  onSaveConfig: (newConfig: GoogleFormsSettings) => void;
}

export const GoogleFormsConfigModal: React.FC<GoogleFormsConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formUrl, setFormUrl] = useState(config.formUrl || '');
  const [autoSync, setAutoSync] = useState(config.autoSync || false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const submissions: FormSubmissionRecord[] = loadFormSubmissions();

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GoogleFormsSettings = {
      ...config,
      formUrl: formUrl.trim(),
      autoSync,
    };
    saveFormsConfig(updated);
    onSaveConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const headers = ['Nombre', 'WhatsApp_Celular', 'Mes', 'Dia', 'Alias', 'Notas', 'FechaRegistro'];
    const rows = submissions.map((s) => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${(s.phone || '').replace(/"/g, '""')}"`,
      s.month,
      s.day,
      `"${(s.alias || '').replace(/"/g, '""')}"`,
      `"${(s.notes || '').replace(/"/g, '""')}"`,
      `"${s.timestamp}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'registros_cumpleanos_desjuiciados.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#231E18]/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 sm:hidden" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border sm:border-[#E3D8C8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-0">
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE2D5] flex items-center justify-between bg-[#F4EDE2] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E6DACB] text-[#554636] flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2C241E] font-display leading-tight">
                Integración Google Forms
              </h3>
              <p className="text-xs text-[#7B6C5E]">
                Configuración y repositorio de respuestas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8E8073] hover:text-[#3B3026] hover:bg-[#EAE0D2] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm text-[#4A3E31]">
          {/* Info Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F4ECE0] border border-[#E1D5C2] space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#3B2F23]">
              <Info className="w-4 h-4 text-[#8C6D4C]" />
              <span>¿Cómo funciona el registro en FORMS?</span>
            </div>
            <p className="text-[#685949] leading-relaxed">
              Cualquier integrante que use el botón <strong>"¡Regístrate!"</strong> queda almacenado en este tablero y en el historial de registros. Puedes además conectar la URL de tu Google Form oficial.
            </p>
          </div>

          {/* Form Settings */}
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5">
                Enlace a tu Google Form (Opcional)
              </label>
              <input
                type="url"
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                placeholder="https://docs.google.com/forms/d/e/.../viewform"
                className="w-full px-4 py-3 bg-white border border-[#E1D6C5] rounded-2xl text-xs sm:text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 focus:ring-[#8C7661]"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#4A3C31] text-[#FAF6F0] text-xs sm:text-sm font-semibold hover:bg-[#382D24] transition-all cursor-pointer min-h-[44px]"
              >
                {savedSuccess ? (
                  <Check className="w-4 h-4 text-[#86EFAC]" />
                ) : (
                  <Save className="w-4 h-4 text-[#D8C7B5]" />
                )}
                <span>{savedSuccess ? '¡Guardado!' : 'Guardar Enlace'}</span>
              </button>

              {formUrl && formUrl.startsWith('http') && (
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#7A6956] hover:text-[#3B3024] font-semibold underline underline-offset-4 min-h-[44px] items-center"
                >
                  <span>Abrir Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </form>

          {/* Submissions Section */}
          <div className="space-y-3 pt-2 border-t border-[#EAE0D2]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A4B3C]">
                  Registros guardados ({submissions.length})
                </h4>
                <p className="text-[11px] text-[#86786A]">
                  Personas añadidas desde el botón de Forms
                </p>
              </div>
              {submissions.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#DDD2C0] text-xs font-semibold text-[#524436] hover:bg-[#EFE8DC] transition-colors cursor-pointer min-h-[40px]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              )}
            </div>

            {submissions.length === 0 ? (
              <div className="p-5 rounded-2xl bg-[#F6F1E8] border border-[#E5DACB] text-center text-xs text-[#8A7B6D]">
                Aún no hay nuevos registros. Cuando alguien use el botón de registro aparecerá en esta lista.
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-2xl bg-white border border-[#E4D9C8] flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#2A231C]">
                        {sub.name} {sub.alias ? `(${sub.alias})` : ''}
                      </p>
                      <p className="text-[11px] text-[#867768]">
                        {sub.day} de {MONTHS_DATA.find((m) => m.month === sub.month)?.name} • {new Date(sub.timestamp).toLocaleDateString()}
                        {sub.phone && <span className="ml-1 text-[#2E7D32] font-semibold">• 📱 {sub.phone}</span>}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAE2D5] text-[#554536]">
                      Guardado
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
