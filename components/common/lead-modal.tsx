'use client';

import LeadForm from '../home/lead-form';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  defaultValues?: {
    propertyType?: 'COMMERCIAL' | 'RESIDENTIAL' | '';
    city?: string;
    state?: string;
    projectSlug?: string;
    projectTitle?: string;
    sourcePath?: string;
  };
}

export default function LeadModal({ isOpen, onClose, projectTitle, defaultValues }: LeadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-900 px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-1">Enquire Now</p>
            <h3 className="text-white font-bold text-base leading-snug line-clamp-2">{projectTitle}</h3>
            <p className="text-gray-400 text-xs mt-1">Get exclusive pricing, floor plans & availability</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors shrink-0 mt-0.5 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          <LeadForm onSuccess={onClose} onCancel={onClose} showCancelButton={false} defaultValues={defaultValues} />
        </div>
      </div>
    </div>
  );
}
