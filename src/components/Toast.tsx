import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="toast-notice fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-stone-900 text-white rounded-2xl shadow-2xl border border-stone-700 animate-slideUp text-xs sm:text-sm font-medium">
      <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
