import React from 'react';
import { X, CheckCircle2, FileText, Calendar, Users, ShieldAlert, ArrowRight, Clock, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProgramDetailModal: React.FC = () => {
  const { 
    selectedProgramForDetail, 
    setSelectedProgramForDetail, 
    setSelectedProgramForApply 
  } = useApp();

  if (!selectedProgramForDetail) return null;

  const prog = selectedProgramForDetail;

  const handleStartApply = () => {
    setSelectedProgramForApply(prog);
    setSelectedProgramForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProgramForDetail(null)}
          className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 p-2 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner with Image */}
        <div className="h-56 relative overflow-hidden bg-blue-900">
          <div
            className="w-full h-full bg-cover bg-center opacity-85"
            style={{ backgroundImage: `url('${prog.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {prog.badgeText}
              </span>
              <span className="bg-white/20 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                {prog.category} Assistance
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white">
              {prog.title}
            </h2>
            <p className="text-xs text-gray-200 mt-1">
              Barangay Bugo Community Welfare Program • Maximum Benefit: <strong className="text-white font-bold">{prog.maxBenefitAmount}</strong>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1.5">
              Program Overview
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {prog.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Application Deadline:</span>
              <span className="font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" /> {prog.deadline}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Target Beneficiaries:</span>
              <span className="font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-blue-600" /> {prog.targetAudience}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Slots Remaining:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {prog.slotsAvailable} of {prog.totalSlots} Slots
              </span>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              Who is Eligible?
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {prog.eligibilityCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Required Supporting Documents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {prog.requirements.map((req, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-gray-800 font-semibold">{req}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-2 italic">
              * Documents may be uploaded as clear mobile camera photos (JPG/PNG) or PDF scans.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedProgramForDetail(null)}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded-lg transition-colors"
          >
            Close Guidelines
          </button>

          <button
            onClick={handleStartApply}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs"
          >
            Proceed to Application <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
