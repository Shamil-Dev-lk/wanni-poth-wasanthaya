import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'error' | 'success';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'error', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce">
      <div
        className={`p-4 rounded-2xl shadow-2xl border flex items-start space-x-3 backdrop-blur-md ${
          type === 'error'
            ? 'bg-red-50/95 border-red-200 text-red-900'
            : 'bg-emerald-50/95 border-emerald-200 text-emerald-900'
        }`}
      >
        {type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        ) : (
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        )}
        
        <div className="flex-1 text-xs font-semibold leading-relaxed">
          {message}
        </div>

        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
