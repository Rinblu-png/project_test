import React from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#FFE2E2] border-2 border-[#C5B3D3] text-[#4A3E50] px-4 py-3 rounded-xl shadow-md">
      <CheckCircle className="w-5 h-5 text-[#C5B3D3]" />
      <span className="text-xs font-bold">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-[#6B5B72] hover:text-[#4A3E50]"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
