import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="toast-notice fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-charcoal text-surface-card rounded-xl shadow-xl border border-stone-800 animate-slideUp text-xs sm:text-sm font-medium">
      <CheckCircle2 size={16} className="text-[#9E8C7A] shrink-0" />
      <span>{message}</span>
    </div>
  );
}
