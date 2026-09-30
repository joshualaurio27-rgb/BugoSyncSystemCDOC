import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Plus, 
  Printer, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building,
  Edit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ResidentProfile: React.FC = () => {
  const { 
    currentUser, 
    applications, 
    setActiveTab, 
    setSelectedApplicationForTracking, 
    setSelectedApplicationForVoucher,
    setSelectedProgramForApply,
    programs,
    setIsLoginModalOpen,
    setLoginModalMode
  } = useApp();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState(currentUser?.address || '');
  const [addressSaved, setAddressSaved] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-blue-600">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Resident Portal Access</h2>
          <p className="text-xs text-gray-500">
            Please sign in to view your verified resident identity, past assistance applications, and claim vouchers.
          </p>
          <button
            onClick={() => {
              setLoginModalMode('login');
              setIsLoginModalOpen(true);
            }}
            className="w-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-blue-700 transition-all shadow-xs"
          >
            Login to Resident Portal
          </button>
        </div>
      </div>
    );
  }

  const myApplications = applications.filter(
    a => a.applicantId === currentUser.id || a.applicantName.toLowerCase().includes(currentUser.name.toLowerCase())
  );

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 3000);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
            Barangay Bugo Resident Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Resident Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your community assistance submissions, documents, and verified resident record.
          </p>
        </div>

        <button
          onClick={() => {
            if (programs.length > 0) setSelectedProgramForApply(programs[0]);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Apply for New Assistance
        </button>
      </div>

      {/* Resident Identity Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {currentUser.name}
                </h2>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Resident
                </span>
              </div>
              <p className="text-xs font-mono text-gray-500 mt-1">
                Resident ID: <strong className="text-gray-800">{currentUser.residentIdNumber}</strong> • Registered: {currentUser.registeredDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs w-full md:w-auto bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Purok / Sitio:</span>
              <span className="font-bold text-gray-800">{currentUser.purok}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Contact:</span>
              <span className="font-bold text-gray-800">{currentUser.contactNumber}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Active Requests:</span>
              <span className="font-bold text-blue-700">{myApplications.length} Applications</span>
            </div>
          </div>
        </div>

        {/* Address Row */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            {isEditingAddress ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleSaveAddress}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[11px] font-bold"
                >
                  Save
                </button>
              </div>
            ) : (
              <span>Permanent Residence: <strong className="text-gray-900">{updatedAddress || currentUser.address}</strong></span>
            )}
          </div>
          {!isEditingAddress && (
            <button
              onClick={() => setIsEditingAddress(true)}
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-bold"
            >
              <Edit2 className="w-3 h-3" /> Update Address
            </button>
          )}
        </div>
        {addressSaved && (
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">✓ Resident address updated in record.</p>
        )}
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              My Assistance Requests & History
            </h3>
            <p className="text-xs text-gray-500">
              Monitor step-by-step progress and access official disbursement claim vouchers.
            </p>
          </div>
        </div>

        {myApplications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-800">No applications filed yet</p>
            <p className="text-xs text-gray-500 mt-1 mb-4">You have not submitted any assistance requests under this resident account.</p>
            <button
              onClick={() => setActiveTab('programs')}
              className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 shadow-xs transition-all"
            >
              Browse Available Programs
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-4">Reference Code</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Date Filed</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      {app.referenceCode}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {app.programTitle}
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 font-mono">
                      {app.submissionDate}
                    </td>
                    <td className="py-3.5 px-4 text-gray-900 font-bold">
                      {app.approvedAmount || app.requestedAmount || 'Under Assessment'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        app.status === 'Disbursed' || app.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Needs Additional Requirements'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApplicationForTracking(app);
                          setActiveTab('tracking');
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-bold hover:underline"
                      >
                        Track Status
                      </button>
                      {(app.status === 'Approved' || app.status === 'Scheduled for Payout' || app.status === 'Disbursed') && (
                        <button
                          onClick={() => setSelectedApplicationForVoucher(app)}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1 transition-all"
                        >
                          <Printer className="w-3 h-3" /> Voucher
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
