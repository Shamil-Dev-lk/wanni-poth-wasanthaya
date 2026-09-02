import React, { useState } from 'react';
import { Shield, Lock, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (password: string) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '200611') {
      onAuthenticate(password);
      setPassword('');
      setError(null);
    } else {
      setError('Invalid Admin Security Passcode!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-gray-200 text-left space-y-6 animate-scale-in font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C3094A] flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Authentication</h2>
            <p className="text-xs text-gray-500 font-normal">Nikaweratiya Pradeshiya Sabha Portal</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-[#C3094A] border border-red-200 p-3 rounded-xl text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              <span>Enter Security Passcode</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="••••••••"
              autoFocus
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-semibold tracking-widest focus:ring-2 focus:ring-[#C3094A] focus:border-[#C3094A] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#C3094A] hover:bg-[#8B0000] text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
