import React from 'react';
import { X, Printer, Landmark, QrCode, CheckCircle2, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClaimVoucherModal: React.FC = () => {
  const { selectedApplicationForVoucher, setSelectedApplicationForVoucher } = useApp();

  if (!selectedApplicationForVoucher) return null;
  const app = selectedApplicationForVoucher;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-xl w-full my-8 overflow-hidden relative">
        {/* Modal Controls Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-gray-800">Official Digital Claim Voucher</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" /> Print Voucher
            </button>
            <button
              onClick={() => setSelectedApplicationForVoucher(null)}
              className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Voucher Document */}
        <div className="p-8 space-y-6 text-gray-900 bg-white print:p-0">
          {/* Barangay Header */}
          <div className="text-center border-b-2 border-blue-600 pb-4 space-y-0.5">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Republic of the Philippines</p>
            <p className="text-[11px] uppercase font-bold text-gray-700">City of Cagayan de Oro • Province of Misamis Oriental</p>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              BARANGAY BUGO
            </h1>
            <p className="text-xs font-bold text-blue-600">OFFICE OF THE SOCIAL WELFARE & DEVELOPMENT</p>
            <div className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-0.5 rounded-full mt-2">
              Assistance Authorization & Claim Voucher
            </div>
          </div>

          {/* Reference & QR Box */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Official Claim Reference</span>
              <span className="font-mono text-xl font-bold text-blue-700 tracking-wider">{app.referenceCode}</span>
              <span className="text-[11px] text-emerald-700 block mt-0.5 font-bold">Status: {app.status.toUpperCase()}</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-1 shadow-xs mx-auto">
                <QrCode className="w-14 h-14 text-gray-800" />
              </div>
              <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 block">Scan to Verify</span>
            </div>
          </div>

          {/* Beneficiary Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border-b border-gray-100 pb-2">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Beneficiary Name:</span>
              <span className="font-bold text-gray-900 text-sm">{app.applicantName}</span>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Purok / Sitio:</span>
              <span className="font-bold text-gray-900 text-sm">{app.purok}</span>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Assistance Program:</span>
              <span className="font-bold text-gray-800">{app.programTitle}</span>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Approved Amount:</span>
              <span className="font-bold text-blue-700 text-base">{app.approvedAmount || app.requestedAmount}</span>
            </div>
          </div>

          {/* Claim Schedule */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs space-y-1">
            <p className="font-bold text-emerald-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Disbursement Schedule: {app.payoutDate || 'Regular Schedule (Monday to Friday 9:00 AM - 4:00 PM)'}
            </p>
            <p className="text-gray-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Release Venue: {app.payoutVenue || 'Barangay Bugo Covered Court - Window 1'}
            </p>
          </div>

          {/* Instructions for Claiming */}
          <div className="text-[11px] text-gray-600 space-y-1 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
            <p className="font-bold text-gray-900">Claiming Instructions:</p>
            <p>1. Present this printed claim voucher or show the digital QR code on your mobile device.</p>
            <p>2. Bring one (1) valid government-issued ID matching the registered name above.</p>
            <p>3. In case of an authorized representative, bring an authorization letter and representative ID.</p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-6 text-center text-xs">
            <div>
              <div className="border-b border-gray-400 w-40 mx-auto mb-1"></div>
              <p className="font-bold text-gray-900">HON. JUAN DELA CRUZ</p>
              <p className="text-[10px] text-gray-400 font-medium">Punong Barangay • Bugo</p>
            </div>
            <div>
              <div className="border-b border-gray-400 w-40 mx-auto mb-1"></div>
              <p className="font-bold text-gray-900">ELENA CRUZ</p>
              <p className="text-[10px] text-gray-400 font-medium">Barangay Social Welfare Officer</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end print:hidden">
          <button
            onClick={() => setSelectedApplicationForVoucher(null)}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200/60 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
