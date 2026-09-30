import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Eye, 
  Check, 
  X, 
  AlertCircle, 
  UserCheck, 
  ChevronRight, 
  Plus, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Megaphone, 
  Settings, 
  Save, 
  RefreshCw,
  FileCheck2,
  Paperclip,
  Ban,
  ShieldAlert,
  ZoomIn,
  CreditCard,
  Building,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus, AssistanceApplication, ResidentUser } from '../../types';
import { BUGO_PUROKS, MONTHLY_INCOME_OPTIONS, NATIONALITY_OPTIONS } from '../../data/mockData';

// ----------------------------------------------------
// 1. ADMIN RESIDENTS VIEW & REGISTRATION APPROVAL
// ----------------------------------------------------
export const AdminResidentsView: React.FC = () => {
  const { 
    residentsList, 
    approveResidentRegistration, 
    rejectResidentRegistration,
    verifyResidentAccount,
    banResidentAccount,
    unbanResidentAccount,
    addNewResidentRecord
  } = useApp();

  const [filterPurok, setFilterPurok] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Verified' | 'Banned'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState<ResidentUser | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [residentToBan, setResidentToBan] = useState<ResidentUser | null>(null);
  const [banReasonInput, setBanReasonInput] = useState('Violation of barangay policy / unverified residency');

  // New resident manual form
  const [newForm, setNewForm] = useState({
    name: '',
    email: '',
    contact: '',
    nationality: 'Filipino',
    purok: BUGO_PUROKS[0],
    income: MONTHLY_INCOME_OPTIONS[2],
    familyCount: 4,
    occupation: 'Resident'
  });

  const filteredResidents = residentsList.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.residentIdNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurok = filterPurok === 'All' || res.purok.includes(filterPurok);
    const matchesStatus = filterStatus === 'All' 
      ? true 
      : filterStatus === 'Pending' 
      ? res.registrationStatus === 'Pending Approval' 
      : filterStatus === 'Banned'
      ? (res.isBanned || res.registrationStatus === 'Banned')
      : res.isVerified && !res.isBanned;

    return matchesSearch && matchesPurok && matchesStatus;
  });

  const pendingCount = residentsList.filter(r => r.registrationStatus === 'Pending Approval').length;
  const bannedCount = residentsList.filter(r => r.isBanned || r.registrationStatus === 'Banned').length;

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addNewResidentRecord({
      name: newForm.name,
      email: newForm.email,
      contactNumber: newForm.contact,
      nationality: newForm.nationality,
      purok: newForm.purok,
      householdIncome: newForm.income,
      familyMembersCount: Number(newForm.familyCount),
      occupation: newForm.occupation
    });
    setShowAddModal(false);
    setNewForm({
      name: '',
      email: '',
      contact: '',
      nationality: 'Filipino',
      purok: BUGO_PUROKS[0],
      income: MONTHLY_INCOME_OPTIONS[2],
      familyCount: 4,
      occupation: 'Resident'
    });
  };

  const handleOpenBanModal = (res: ResidentUser) => {
    setResidentToBan(res);
    setBanReasonInput('Violation of barangay residency criteria or fraudulent submission');
    setShowBanModal(true);
  };

  const handleConfirmBan = () => {
    if (!residentToBan) return;
    banResidentAccount(residentToBan.id, banReasonInput);
    setShowBanModal(false);
    setResidentToBan(null);
    if (selectedResident && selectedResident.id === residentToBan.id) {
      setSelectedResident(null);
    }
  };

  const handleUnban = (res: ResidentUser) => {
    unbanResidentAccount(res.id);
    if (selectedResident && selectedResident.id === res.id) {
      setSelectedResident(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Resident Accounts & Citizen Registry
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Verify citizen registrations, evaluate residency status, and manage banned accounts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0c532b] hover:bg-[#094222] text-white text-sm font-semibold rounded-lg transition shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Resident Manually</span>
        </button>
      </div>

      {/* Pending Registration Alert Banner */}
      {pendingCount > 0 && (
        <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ea580c] text-white flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#9a3412]">
                {pendingCount} Resident Registration{pendingCount > 1 ? 's' : ''} Awaiting Admin Approval
              </h3>
              <p className="text-xs text-[#c2410c]">
                Review submitted citizen credentials, verify account authenticity, or approve registration.
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilterStatus('Pending')}
            className="px-3.5 py-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold rounded-lg transition shadow-xs self-start sm:self-auto flex-shrink-0"
          >
            Review Pending ({pendingCount})
          </button>
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resident name, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0c532b]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterStatus('All')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === 'All' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All ({residentsList.length})
            </button>
            <button
              onClick={() => setFilterStatus('Pending')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                filterStatus === 'Pending' ? 'bg-[#ea580c] text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>Pending Approval</span>
              {pendingCount > 0 && (
                <span className="w-4 h-4 bg-white text-[#ea580c] text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilterStatus('Verified')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === 'Verified' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilterStatus('Banned')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                filterStatus === 'Banned' ? 'bg-rose-700 text-white shadow-xs' : 'text-gray-500 hover:text-rose-700'
              }`}
            >
              <span>Banned</span>
              {bannedCount > 0 && (
                <span className="w-4 h-4 bg-rose-100 text-rose-800 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {bannedCount}
                </span>
              )}
            </button>
          </div>

          {/* Purok Filter */}
          <select
            value={filterPurok}
            onChange={(e) => setFilterPurok(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#0c532b]"
          >
            <option value="All">All Zones / Puroks</option>
            {BUGO_PUROKS.map(p => (
              <option key={p} value={p.split(' - ')[0]}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Residents Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Resident Details</th>
                <th className="px-6 py-3.5">Resident ID</th>
                <th className="px-6 py-3.5">Zone / Purok</th>
                <th className="px-6 py-3.5">Household & Income</th>
                <th className="px-6 py-3.5">Account Status</th>
                <th className="px-6 py-3.5 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResidents.map((res) => {
                const isPending = res.registrationStatus === 'Pending Approval';
                const isBanned = res.isBanned || res.registrationStatus === 'Banned';

                return (
                  <tr key={res.id} className={`hover:bg-gray-50/60 transition ${isBanned ? 'bg-rose-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full font-bold flex items-center justify-center text-xs overflow-hidden ${
                          isBanned ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-[#0c532b]/10 text-[#0c532b]'
                        }`}>
                          {res.avatarUrl ? (
                            <img src={res.avatarUrl} alt={res.name} className="w-full h-full object-cover" />
                          ) : (
                            res.name.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 flex items-center gap-1.5">
                            <span>{res.name}</span>
                            {isBanned && (
                              <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-rose-600 text-white rounded-md">BANNED</span>
                            )}
                          </p>
                          <p className="text-[11px] text-gray-400">{res.email} • {res.contactNumber}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-gray-700">
                      {res.residentIdNumber}
                    </td>

                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {res.purok}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{res.householdIncome || '₱8,500.00'}</p>
                      <p className="text-[11px] text-gray-400">{res.familyMembersCount || 4} family dependents</p>
                    </td>

                    <td className="px-6 py-4">
                      {isBanned ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          <Ban className="w-3 h-3 text-rose-700" />
                          <span>Account Banned</span>
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa]">
                          <Clock className="w-3 h-3 animate-spin" />
                          <span>Pending Approval</span>
                        </span>
                      ) : res.registrationStatus === 'Rejected' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
                          <XCircle className="w-3 h-3" />
                          <span>Rejected</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Resident</span>
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1. If Pending Registration -> Approve / Reject */}
                        {isPending && (
                          <>
                            <button
                              onClick={() => approveResidentRegistration(res.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[#0c532b] hover:bg-[#094222] text-white text-[11px] font-bold rounded-lg transition shadow-xs"
                              title="Approve and Verify Resident Account"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>

                            <button
                              onClick={() => rejectResidentRegistration(res.id, 'Incomplete residency proof.')}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-lg border border-rose-200 transition"
                              title="Reject Registration"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {/* 2. If Unverified or Rejected -> Verify Action */}
                        {!res.isVerified && !isPending && !isBanned && (
                          <button
                            onClick={() => verifyResidentAccount(res.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition shadow-xs"
                            title="Verify and Approve Account"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verify Account</span>
                          </button>
                        )}

                        {/* 3. If Banned -> Unban Action */}
                        {isBanned && (
                          <button
                            onClick={() => handleUnban(res)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition shadow-xs"
                            title="Unban this resident account"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Unban Account</span>
                          </button>
                        )}

                        {/* 4. Ban Account Button (if not already banned) */}
                        {!isBanned && (
                          <button
                            onClick={() => handleOpenBanModal(res)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-lg border border-rose-200 transition"
                            title="Ban resident account from system"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Ban</span>
                          </button>
                        )}

                        {/* 5. View Full Profile Modal */}
                        <button
                          onClick={() => setSelectedResident(res)}
                          className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-[11px] rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Profile</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Ban Account Modal */}
      {showBanModal && residentToBan && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-rose-700">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-base font-extrabold text-gray-900">Ban Resident Account</h3>
              </div>
              <button onClick={() => setShowBanModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 space-y-1">
              <p className="font-bold">Are you sure you want to ban {residentToBan.name}?</p>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                This resident will be blocked from logging into the portal and applying for barangay services until unbanned by an administrator.
              </p>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Official Grounds / Ban Reason</label>
              <textarea
                rows={3}
                required
                value={banReasonInput}
                onChange={(e) => setBanReasonInput(e.target.value)}
                placeholder="Enter justification (e.g. Ineligible residency, falsified documents, policy violation)..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 font-medium outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBanModal(false)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBan}
                className="flex-1 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Confirm Ban</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resident Detail Modal with Administrative Controls */}
      {selectedResident && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl space-y-4 my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0c532b]">Official Registry Dossier</span>
                <h2 className="text-base font-extrabold text-gray-900">{selectedResident.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedResident(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resident Header Info */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#0c532b]/10 text-[#0c532b] font-extrabold text-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                {selectedResident.avatarUrl ? (
                  <img src={selectedResident.avatarUrl} alt={selectedResident.name} className="w-full h-full object-cover" />
                ) : (
                  selectedResident.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900">{selectedResident.name}</h3>
                <p className="text-xs font-mono text-gray-600 font-semibold">{selectedResident.residentIdNumber}</p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    selectedResident.isBanned 
                      ? 'bg-rose-100 text-rose-800'
                      : selectedResident.isVerified 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedResident.isBanned ? 'Banned Account' : selectedResident.isVerified ? 'Verified Citizen' : 'Pending Verification'}
                  </span>
                  <span className="text-[10px] font-medium text-gray-500">Reg: {selectedResident.registeredDate}</span>
                </div>
              </div>
            </div>

            {/* Ban Notification in Modal if Banned */}
            {selectedResident.isBanned && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800">
                <span className="font-bold block">Account Ban Details:</span>
                <p className="text-rose-700 mt-0.5">{selectedResident.banReason || 'Administrative policy violation.'}</p>
              </div>
            )}

            {/* Resident Dossier Particulars */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Purok / Zone:</span>
                <span className="font-bold text-gray-800">{selectedResident.purok}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Complete Address:</span>
                <span className="font-semibold text-gray-800 text-right">{selectedResident.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nationality:</span>
                <span className="font-bold text-gray-800">{selectedResident.nationality || 'Filipino'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contact Number:</span>
                <span className="font-semibold text-gray-800">{selectedResident.contactNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email Address:</span>
                <span className="font-semibold text-gray-800">{selectedResident.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Household Income:</span>
                <span className="font-bold text-emerald-700">{selectedResident.householdIncome || '₱8,500.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Family Members:</span>
                <span className="font-semibold text-gray-800">{selectedResident.familyMembersCount || 4} dependents</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">COMELEC Voter Status:</span>
                <span className="font-bold text-gray-800">{selectedResident.voterStatus || 'Registered Voter'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Occupation:</span>
                <span className="font-semibold text-gray-800">{selectedResident.occupation || 'Resident'}</span>
              </div>
            </div>

            {/* Admin Quick Action Controls inside profile */}
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {!selectedResident.isVerified && !selectedResident.isBanned && (
                  <button
                    type="button"
                    onClick={() => {
                      approveResidentRegistration(selectedResident.id);
                      setSelectedResident(null);
                    }}
                    className="py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Verify & Approve Account</span>
                  </button>
                )}

                {selectedResident.isBanned ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleUnban(selectedResident);
                    }}
                    className="col-span-2 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Unban & Restore Account</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenBanModal(selectedResident);
                    }}
                    className="py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition flex items-center justify-center gap-1.5"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Ban Account</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedResident(null)}
                  className={`py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition ${
                    selectedResident.isVerified && !selectedResident.isBanned ? 'col-span-1' : ''
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Resident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Add Resident to Official Registry</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juan C. Dela Cruz"
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="juan@gmail.com"
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block font-bold text-gray-700">Contact Number</label>
                    <span className="text-[10px] text-gray-400">{newForm.contact.length}/12</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={12}
                    required
                    placeholder="09171234567"
                    value={newForm.contact}
                    onChange={(e) => setNewForm({ ...newForm, contact: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nationality</label>
                  <select
                    value={newForm.nationality}
                    onChange={(e) => setNewForm({ ...newForm, nationality: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  >
                    {NATIONALITY_OPTIONS.map(nat => (
                      <option key={nat} value={nat}>{nat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Purok / Zone</label>
                  <select
                    value={newForm.purok}
                    onChange={(e) => setNewForm({ ...newForm, purok: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  >
                    {BUGO_PUROKS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Monthly Income</label>
                  <select
                    value={newForm.income}
                    onChange={(e) => setNewForm({ ...newForm, income: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  >
                    {MONTHLY_INCOME_OPTIONS.map((inc) => (
                      <option key={inc} value={inc}>{inc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Dependents Count</label>
                  <input
                    type="number"
                    min="1"
                    value={newForm.familyCount}
                    onChange={(e) => setNewForm({ ...newForm, familyCount: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
                >
                  Save Resident Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------
// 2. ADMIN STATUS TRACKING & SERVICE APPLICATIONS VIEW
// ----------------------------------------------------
export const AdminStatusTrackingView: React.FC = () => {
  const { 
    applications, 
    updateApplicationStatus,
    selectedApplicationForReview,
    setSelectedApplicationForReview
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Evaluation modal remarks & approved amount
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [reviewApprovedAmount, setReviewApprovedAmount] = useState('');
  const [zoomedRequirement, setZoomedRequirement] = useState<{ title: string; url: string; type: string } | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.programTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReview = (app: AssistanceApplication) => {
    setSelectedApplicationForReview(app);
    setReviewRemarks(app.evaluatorNotes || '');
    setReviewApprovedAmount(app.approvedAmount || app.requestedAmount || '');
  };

  const handleApplyStatusChange = (newStatus: ApplicationStatus) => {
    if (!selectedApplicationForReview) return;

    updateApplicationStatus(
      selectedApplicationForReview.id,
      newStatus,
      'Hon. Juan Dela Cruz (Barangay Administrator)',
      reviewRemarks,
      reviewApprovedAmount
    );

    setSelectedApplicationForReview(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Status Tracking & Applications Review
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Official administrative pipeline for reviewing submitted resident requirements, verifying identity proofs, and issuing approval decisions.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-800 rounded-xl border border-blue-200 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-blue-700" />
          <span>Requirements Inspection Pipeline</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reference code, applicant, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0c532b]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs font-semibold">
          {['All', 'Submitted', 'Under Review', 'Documents Verified', 'Approved', 'Ready for Release', 'Rejected'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl transition ${
                statusFilter === s 
                  ? 'bg-[#0c532b] text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Reference Code</th>
                <th className="px-6 py-3.5">Service Requested</th>
                <th className="px-6 py-3.5">Applicant & Zone</th>
                <th className="px-6 py-3.5">Submission Date</th>
                <th className="px-6 py-3.5">Current Status</th>
                <th className="px-6 py-3.5 text-right">Review Requirements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/60 transition">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                      {app.referenceCode}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{app.programTitle}</p>
                    <span className="text-[10px] font-semibold text-gray-400">{app.programCategory}</span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{app.applicantName}</p>
                    <p className="text-[11px] text-gray-400">{app.purok} • {app.contactNumber}</p>
                  </td>

                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {app.submissionDate}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      app.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : app.status === 'Under Review' || app.status === 'Documents Verified'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : app.status === 'Ready for Release'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : app.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>{app.status}</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleOpenReview(app)}
                      className="px-3.5 py-1.5 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-lg transition shadow-xs inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Requirements</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Application Evaluation & Submitted Requirements Inspection Modal */}
      {selectedApplicationForReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 border border-gray-200 shadow-2xl space-y-5 my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0c532b]">Official Requirements & Evaluation Review</span>
                <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                  <span>{selectedApplicationForReview.programTitle}</span>
                  <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                    {selectedApplicationForReview.referenceCode}
                  </span>
                </h2>
              </div>
              <button 
                onClick={() => setSelectedApplicationForReview(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Applicant Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl text-xs">
              <div>
                <span className="text-gray-400 block font-semibold">Applicant Name:</span>
                <span className="font-bold text-gray-900 text-sm">{selectedApplicationForReview.applicantName}</span>
                <span className="text-gray-500 block">{selectedApplicationForReview.purok}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">Contact & Email:</span>
                <span className="font-semibold text-gray-800">{selectedApplicationForReview.contactNumber}</span>
                <span className="text-gray-500 block">{selectedApplicationForReview.email}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-semibold">Submitted On:</span>
                <span className="font-bold text-gray-800">{selectedApplicationForReview.submissionDate}</span>
                <span className="text-[11px] font-semibold text-[#0c532b] block">{selectedApplicationForReview.programCategory}</span>
              </div>

              <div className="col-span-2 sm:col-span-3 pt-2 border-t border-gray-200/60">
                <span className="text-gray-400 block font-semibold">Application Reason / Stated Purpose:</span>
                <p className="font-medium text-gray-800 mt-0.5 leading-relaxed bg-white p-2.5 rounded-xl border border-gray-200">
                  {selectedApplicationForReview.purposeOrDiagnosis}
                </p>
              </div>
            </div>

            {/* SUBMITTED REQUIREMENTS & ID CARDS INSPECTION SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#0c532b]" />
                  <span>Submitted Resident ID Verification (Front & Back)</span>
                </h4>
                <span className="text-[11px] font-semibold text-gray-500">Click any image to zoom in</span>
              </div>

              {/* ID Cards Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Front of ID */}
                <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0c532b]" />
                      <span>Front of Valid ID</span>
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Submitted
                    </span>
                  </div>

                  <div 
                    onClick={() => setZoomedRequirement({
                      title: `Front of ID - ${selectedApplicationForReview.applicantName}`,
                      url: selectedApplicationForReview.idCardFrontUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
                      type: 'Valid Government / Barangay ID (Front)'
                    })}
                    className="relative group cursor-pointer aspect-video rounded-xl bg-gray-900 overflow-hidden border border-emerald-300/60 shadow-xs flex items-center justify-center"
                  >
                    <img 
                      src={selectedApplicationForReview.idCardFrontUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'} 
                      alt="Front of ID"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1.5 text-white text-xs font-bold">
                      <ZoomIn className="w-4 h-4" />
                      <span>Click to Inspect Full Size</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 text-center font-medium">Valid Government / Barangay Citizen ID Front View</p>
                </div>

                {/* Back of ID */}
                <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0c532b]" />
                      <span>Back of Valid ID</span>
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Submitted
                    </span>
                  </div>

                  <div 
                    onClick={() => setZoomedRequirement({
                      title: `Back of ID - ${selectedApplicationForReview.applicantName}`,
                      url: selectedApplicationForReview.idCardBackUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
                      type: 'Valid Government / Barangay ID (Back)'
                    })}
                    className="relative group cursor-pointer aspect-video rounded-xl bg-gray-900 overflow-hidden border border-emerald-300/60 shadow-xs flex items-center justify-center"
                  >
                    <img 
                      src={selectedApplicationForReview.idCardBackUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'} 
                      alt="Back of ID"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1.5 text-white text-xs font-bold">
                      <ZoomIn className="w-4 h-4" />
                      <span>Click to Inspect Full Size</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 text-center font-medium">Valid Government / Barangay Citizen ID Back View</p>
                </div>
              </div>

              {/* Supporting Requirement Documents Checklist */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-gray-500" />
                  <span>Supporting Documents & Certifications ({selectedApplicationForReview.documents.length})</span>
                </h4>
                <div className="space-y-2">
                  {selectedApplicationForReview.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0c532b]/10 text-[#0c532b] flex items-center justify-center font-bold">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block">{doc.name}</span>
                          <span className="text-[10px] text-gray-400">File size: {doc.size} • Type: {doc.type || 'Official Document'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setZoomedRequirement({
                            title: doc.name,
                            url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=900&auto=format&fit=crop&q=80',
                            type: doc.type || 'Official Requirement Attachment'
                          })}
                          className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-bold text-[11px] transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#0c532b]" />
                          <span>View Doc</span>
                        </button>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Timeline History */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>Status History & Audit Trail</span>
              </h4>
              <div className="space-y-2 border-l-2 border-gray-200 ml-3 pl-3 text-xs">
                {selectedApplicationForReview.timeline.map((entry, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#0c532b]"></div>
                    <p className="font-bold text-gray-900">{entry.status} <span className="text-[10px] font-normal text-gray-400">• {entry.timestamp}</span></p>
                    <p className="text-[11px] text-gray-500">{entry.remarks || 'Status logged by ' + entry.officerName}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Form / Remarks */}
            <div className="space-y-3 pt-3 border-t border-gray-100 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Approved Grant Amount (if applicable)</label>
                  <input
                    type="text"
                    value={reviewApprovedAmount}
                    onChange={(e) => setReviewApprovedAmount(e.target.value)}
                    placeholder="e.g. ₱5,000.00"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 font-bold text-emerald-800 outline-none focus:ring-2 focus:ring-[#0c532b]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Evaluator / Approving Officer</label>
                  <input
                    type="text"
                    disabled
                    value="Hon. Juan Dela Cruz (Barangay Administrator)"
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl p-2.5 font-medium text-gray-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Evaluator Notes / Officer Remarks</label>
                <textarea
                  rows={2}
                  placeholder="Enter remarks for the applicant (e.g. Requirements verified, ready for check pickup at Session Hall)..."
                  value={reviewRemarks}
                  onChange={(e) => setReviewRemarks(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              {/* Status Action Buttons */}
              <div className="space-y-1.5 pt-1">
                <label className="block font-bold text-gray-700">Administrative Decision:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyStatusChange('Under Review')}
                    className="py-2.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 transition text-center"
                  >
                    Under Review
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyStatusChange('Documents Verified')}
                    className="py-2.5 px-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-xl border border-sky-200 transition text-center"
                  >
                    Docs Verified
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyStatusChange('Approved')}
                    className="py-2.5 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-xs text-center"
                  >
                    Approve Request
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyStatusChange('Ready for Release')}
                    className="py-2.5 px-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition shadow-xs text-center"
                  >
                    Ready for Release
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => handleApplyStatusChange('Rejected')}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition inline-flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject Application</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedApplicationForReview(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Requirement / ID Zoom Modal */}
      {zoomedRequirement && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-4 border border-gray-800 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">{zoomedRequirement.title}</h3>
                <span className="text-[11px] text-gray-500 font-medium">{zoomedRequirement.type}</span>
              </div>
              <button
                onClick={() => setZoomedRequirement(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
              <img 
                src={zoomedRequirement.url} 
                alt={zoomedRequirement.title} 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Document verified by resident authentication pipeline</span>
              </span>
              <button
                onClick={() => setZoomedRequirement(null)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition"
              >
                Back to Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------
// 3. ADMIN ANNOUNCEMENTS VIEW
// ----------------------------------------------------
export const AdminAnnouncementsView: React.FC = () => {
  const { announcements, addAnnouncement } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [annForm, setAnnForm] = useState({
    title: '',
    category: 'General' as const,
    description: '',
    iconType: 'general' as const
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title: annForm.title,
      category: annForm.category,
      description: annForm.description,
      date: 'Today',
      iconType: annForm.iconType,
      status: 'Published'
    });
    setShowModal(false);
    setAnnForm({ title: '', category: 'General', description: '', iconType: 'general' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Barangay Announcements
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Publish official notices and advisories to the Barangay Bugo citizen portal.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0c532b] hover:bg-[#094222] text-white text-sm font-semibold rounded-lg transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-[#0c532b] rounded-md">
                  {ann.category}
                </span>
                <span className="text-xs text-gray-400">{ann.date}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mt-2">{ann.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-3">{ann.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>{ann.viewsCount} views</span>
              <span className="text-emerald-700 font-semibold">{ann.status || 'Published'}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Publish Barangay Notice</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Medical Checkup at Covered Court"
                  value={annForm.title}
                  onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={annForm.category}
                  onChange={(e) => setAnnForm({ ...annForm, category: e.target.value as any })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                >
                  <option value="Water">Water Interruption</option>
                  <option value="Health">Health & Medical</option>
                  <option value="Sports">Sports & SK</option>
                  <option value="Assembly">Barangay Assembly</option>
                  <option value="General">General Notice</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Announcement Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write notice details for residents..."
                  value={annForm.description}
                  onChange={(e) => setAnnForm({ ...annForm, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
              >
                Broadcast to Resident Portal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------
// 4. ADMIN SETTINGS VIEW
// ----------------------------------------------------
export const AdminSettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          System & Secretariat Settings
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Barangay Bugo administrative configuration and security parameters.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs max-w-2xl space-y-4 text-xs">
        <h3 className="text-sm font-bold text-gray-900">Barangay Secretariat Details</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-600 mb-1">LGU / Barangay Unit</label>
            <input 
              type="text" 
              readOnly 
              value="Barangay Bugo, Cagayan de Oro City"
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-600 mb-1">Punong Barangay (Captain)</label>
            <input 
              type="text" 
              readOnly 
              value="Hon. Juan Dela Cruz"
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-bold"
            />
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#0c532b] flex-shrink-0" />
          <p className="text-[11px] text-[#0c532b] font-medium">
            Barangay Citizen & Administrative Portal is encrypted with role-based access control. All status updates and registrations are timestamped on audit logs.
          </p>
        </div>
      </div>
    </div>
  );
};
