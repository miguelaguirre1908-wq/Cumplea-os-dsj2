import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, X, Lock, Eye, EyeOff } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentCount: number;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentCount,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError('Debes ingresar la contraseña de administrador.');
      return;
    }

    if (password === 'Dsj2') {
      setError('');
      setPassword('');
      onConfirm();
    } else {
      setError('Contraseña incorrecta. Solo administradores autorizados pueden restablecer la lista.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#231E18]/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 sm:hidden" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border sm:border-[#E3D8C8] shadow-2xl p-5 sm:p-6 space-y-4 z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-6">
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#DDD0BF] mx-auto mb-1 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-[#8E8073] hover:text-[#3B3026] hover:bg-[#EAE0D2] transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#2A231C] font-display">
            Restablecer lista original
          </h3>
          <p className="text-xs text-[#7A6B5D]">
            Esta acción restablecerá el calendario a los 44 integrantes iniciales de Desjuiciados. Cualquier registro nuevo creado será eliminado.
          </p>
        </div>

        {/* Current status */}
        <div className="p-3 rounded-2xl bg-[#F4EFE6] border border-[#E5DACB] text-xs text-[#554637] flex items-center justify-between">
          <span>Integrantes actuales en el tablero:</span>
          <span className="font-bold">{currentCount}</span>
        </div>

        {/* Form with Password */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#635343] mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#866D52]" />
              <span>Contraseña de administrador *</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ingresa la contraseña..."
                className={`w-full pl-3.5 pr-10 py-3 bg-white border rounded-2xl text-sm text-[#2D241C] placeholder-[#A89A8C] focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-[#DC2626] focus:ring-[#DC2626]'
                    : 'border-[#E1D6C5] focus:ring-[#8C7661]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#918171] hover:text-[#3B3026] cursor-pointer"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-xs text-[#DC2626] font-medium mt-1.5 animate-fadeIn">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 rounded-2xl text-sm font-medium text-[#6B5C4D] hover:bg-[#EFE8DC] transition-colors cursor-pointer min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restablecer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
