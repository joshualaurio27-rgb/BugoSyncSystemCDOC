import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Filter, 
  Search, 
  Download, 
  Printer, 
  Edit3, 
  Plus, 
  Check, 
  X, 
  Eye, 
  MapPin, 
  Coins,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, AssistanceApplication, ProgramCategory } from '../types';
import { BUGO_PUROKS } from '../data/mockData';

export const AdminPortal: React.FC = () => {
  const { 
    applications, 
    programs, 
    updateApplicationStatus, 
    addNewProgram, 
    updateProgramStatus, 
    role, 
    currentUser,
    setSelectedApplicationForVoucher 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'queue' | 'roster' | 'programs'>('queue');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPurok, setFilterPurok] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Evaluation Modal
  const [evaluatingApp, setEvaluatingApp] = useState<AssistanceApplication | null>(null);
  const [actionStatus, setActionStatus] = useState<ApplicationStatus>('Approved');
  const [actionRemarks, setActionRemarks] = useState('');
  const [actionAmount, setActionAmount] = useState('₱5,000.00');
  const [actionDate, setActionDate] = useState('September 12, 2026 at 9:00 AM');
  const [actionVenue, setActionVenue] = useState('Barangay Bugo Covered Court - Window 1');
  const [actionSuccess, setActionSuccess] = useState('');

  // New Program Modal State
  const [isAddProgOpen, setIsAddProgOpen] = useState(false);
  const [newProgTitle, setNewProgTitle] = useState('');
  const [newProgCategory, setNewProgCategory] = useState<ProgramCategory>('Financial');
  const [newProgDesc, setNewProgDesc] = useState('');
  const [newProgMax, setNewProgMax] = useState('₱5,000.00');
  const [newProgDeadline, setNewProgDeadline] = useState('Dec 31, 2026');
  const [newProgTarget, setNewProgTarget] = useState('All Qualified Bugon-ons');

  // Metrics
  const totalApps = applications.length;
  const pendingCount = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;
  const approvedCount = applications.filter(a => a.status === 'Approved' || a.status === 'Scheduled for Payout').length;
  const disbursedCount = applications.filter(a => a.status === 'Disbursed').length;

  const filteredApps = applications.filter(app => {
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    const matchesPurok = filterPurok === 'All' || app.purok === filterPurok;
    const matchesSearch = 
      app.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.programTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPurok && matchesSearch;
  });

  const handleOpenEvaluation = (app: AssistanceApplication) => {
    setEvaluatingApp(app);
    setActionRemarks('');
    setActionAmount(app.requestedAmount || '₱5,000.00');
    setActionSuccess('');
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingApp) return;

    const officer = currentUser?.name || 'Barangay Bugo Evaluator';

    updateApplicationStatus(
      evaluatingApp.id,
      actionStatus,
      actionRemarks || `Application transitioned to ${actionStatus} by ${officer}`,
      officer,
      actionAmount,
      actionStatus === 'Scheduled for Payout' ? actionDate : undefined,
      actionStatus === 'Scheduled for Payout' ? actionVenue : undefined
    );

    setActionSuccess(`Status for ${evaluatingApp.referenceCode} successfully updated to ${actionStatus}!`);
    setTimeout(() => {
      setEvaluatingApp(null);
      setActionSuccess('');
    }, 1200);
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgTitle.trim()) return;

    addNewProgram({
      title: newProgTitle,
      category: newProgCategory,
      tagline: newProgDesc.slice(0, 80),
      description: newProgDesc,
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900',
      status: 'Active',
      badgeText: 'New',
      deadline: newProgDeadline,
      targetAudience: newProgTarget,
      maxBenefitAmount: newProgMax,
      allocatedBudget: 300000,
      disbursedBudget: 0,
      slotsAvailable: 50,
      totalSlots: 50,
      requirements: ['Barangay Indigency Certificate', 'Valid Government ID'],
      eligibilityCriteria: ['Bonafide resident of Barangay Bugo', 'Low-income household status']
    });

    setIsAddProgOpen(false);
    setNewProgTitle('');
    setNewProgDesc('');
  };

  const handleExportCSV = () => {
    const headers = ['ReferenceCode,ApplicantName,Program,Purok,Contact,Status,DateFiled,ApprovedAmount\n'];
    const rows = applications.map(a => 
      `"${a.referenceCode}","${a.applicantName}","${a.programTitle}","${a.purok}","${a.contactNumber}","${a.status}","${a.submissionDate}","${a.approvedAmount || a.requestedAmount || ''}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Barangay_Bugo_Assistance_Master_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Admin Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Administrative & Evaluation Console
            </span>
            <span className="text-xs text-gray-400">Authorized Personnel Only</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 tracking-tight">
            Barangay Bugo Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Centralized digital triage for verifying, evaluating, and disbursing community assistance requests.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Download className="w-4 h-4 text-blue-600" /> Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Printer className="w-4 h-4 text-blue-600" /> Print Summary
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">Total Submissions</span>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{totalApps}</p>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">100% Digital via Portal</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">Pending Evaluation</span>
          <p className="text-2xl md:text-3xl font-bold text-amber-600 mt-1">{pendingCount}</p>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">Requires Desk Action</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">Approved / Scheduled</span>
          <p className="text-2xl md:text-3xl font-bold text-emerald-600 mt-1">{approvedCount}</p>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Payout Vouchers Active</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">Completed Payouts</span>
          <p className="text-2xl md:text-3xl font-bold text-blue-800 mt-1">{disbursedCount}</p>
          <span className="text-[11px] text-gray-500 font-semibold mt-1 block">COA Audited Records</span>
        </div>
      </div>

      {/* Nav Tabs within Admin */}
      <div className="flex border-b border-gray-200 gap-2 bg-white rounded-t-xl px-4 pt-3 border-t border-x">
        <button
          onClick={() => setActiveAdminTab('queue')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeAdminTab === 'queue'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Evaluation Queue ({filteredApps.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('roster')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeAdminTab === 'roster'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Beneficiary Roster
        </button>
        <button
          onClick={() => setActiveAdminTab('programs')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeAdminTab === 'programs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Program Management ({programs.length})
        </button>
      </div>

      {/* TAB 1: Evaluation Queue */}
      {activeAdminTab === 'queue' && (
        <div className="bg-white border border-gray-200 rounded-b-xl -mt-6 p-6 shadow-sm space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                <Filter className="w-3.5 h-3.5 text-blue-600" /> Filter:
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Documents Verified">Documents Verified</option>
                <option value="Approved">Approved</option>
                <option value="Scheduled for Payout">Scheduled for Payout</option>
                <option value="Disbursed">Disbursed</option>
                <option value="Needs Additional Requirements">Needs Requirements</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={filterPurok}
                onChange={(e) => setFilterPurok(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Bugo Puroks</option>
                {BUGO_PUROKS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ref, resident, program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Queue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3 px-3.5">Ref Code</th>
                  <th className="py-3 px-3.5">Applicant Name</th>
                  <th className="py-3 px-3.5">Program</th>
                  <th className="py-3 px-3.5">Purok / Sitio</th>
                  <th className="py-3 px-3.5">Filed Date</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-gray-400">
                      No assistance applications match the active filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3.5 px-3.5 font-mono font-bold text-blue-700">
                        {app.referenceCode}
                      </td>
                      <td className="py-3.5 px-3.5 font-bold text-gray-900">
                        {app.applicantName}
                      </td>
                      <td className="py-3.5 px-3.5 text-gray-600 font-medium">
                        {app.programTitle}
                      </td>
                      <td className="py-3.5 px-3.5 text-gray-600">
                        {app.purok}
                      </td>
                      <td className="py-3.5 px-3.5 text-gray-400 font-mono text-[11px]">
                        {app.submissionDate}
                      </td>
                      <td className="py-3.5 px-3.5">
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
                      <td className="py-3.5 px-3.5 text-right">
                        <button
                          onClick={() => handleOpenEvaluation(app)}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-xs"
                        >
                          Evaluate & Audit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Master Beneficiary Roster */}
      {activeAdminTab === 'roster' && (
        <div className="bg-white border border-gray-200 rounded-b-xl -mt-6 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Official Barangay Bugo Assistance Beneficiary Roster
              </h3>
              <p className="text-xs text-gray-500">
                Certified registry for DILG and Commission on Audit (COA) compliance reporting.
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 self-start shadow-xs transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export Official Roster
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-2.5 px-3">No.</th>
                  <th className="py-2.5 px-3">Ref ID</th>
                  <th className="py-2.5 px-3">Beneficiary</th>
                  <th className="py-2.5 px-3">Purok</th>
                  <th className="py-2.5 px-3">Program Category</th>
                  <th className="py-2.5 px-3">Amount (PHP)</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Voucher Slip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app, index) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-400 font-mono">{index + 1}</td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">{app.referenceCode}</td>
                    <td className="py-3 px-3 font-bold text-gray-900">{app.applicantName}</td>
                    <td className="py-3 px-3 text-gray-600">{app.purok}</td>
                    <td className="py-3 px-3 text-gray-600">{app.programCategory}</td>
                    <td className="py-3 px-3 font-bold text-emerald-700">{app.approvedAmount || app.requestedAmount}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedApplicationForVoucher(app)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-[11px] hover:underline"
                      >
                        Print Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Program Management */}
      {activeAdminTab === 'programs' && (
        <div className="bg-white border border-gray-200 rounded-b-xl -mt-6 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Community Welfare Programs Configuration
              </h3>
              <p className="text-xs text-gray-500">
                Manage assistance quotas, active application deadlines, and program budgets.
              </p>
            </div>
            <button
              onClick={() => setIsAddProgOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-all self-start"
            >
              <Plus className="w-4 h-4" /> Add Assistance Program
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map((prog) => (
              <div key={prog.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                      {prog.category}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mt-1">{prog.title}</h4>
                  </div>
                  <select
                    value={prog.status}
                    onChange={(e) => updateProgramStatus(prog.id, e.target.value as any)}
                    className="text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1 font-bold text-gray-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">{prog.description}</p>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-gray-200">
                  <div>
                    <span className="text-gray-400 font-medium">Benefit Cap:</span>
                    <p className="font-bold text-gray-900">{prog.maxBenefitAmount}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Available Slots:</span>
                    <p className="font-bold text-emerald-700">{prog.slotsAvailable} / {prog.totalSlots}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluation Action Modal */}
      {evaluatingApp && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden relative">
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-blue-200 font-bold">
                  {evaluatingApp.referenceCode}
                </span>
                <h3 className="text-lg sm:text-xl font-bold">
                  Application Evaluation & Triage
                </h3>
              </div>
              <button onClick={() => setEvaluatingApp(null)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionSuccess && (
              <div className="p-3 bg-emerald-50 text-xs text-emerald-800 font-bold text-center border-b border-emerald-100">
                {actionSuccess}
              </div>
            )}

            <form onSubmit={handleSaveEvaluation} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* Applicant Overview */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Beneficiary Name:</span>
                    <span className="font-bold text-gray-900 text-sm">{evaluatingApp.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Program:</span>
                    <span className="font-bold text-gray-900">{evaluatingApp.programTitle}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Purok:</span>
                    <span className="text-gray-800">{evaluatingApp.purok}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Monthly Income:</span>
                    <span className="text-gray-800 font-medium">{evaluatingApp.householdMonthlyIncome}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Declared Need / Statement:</span>
                  <p className="text-gray-800 bg-white p-2.5 rounded-lg border border-gray-200 mt-1 leading-relaxed">
                    {evaluatingApp.purposeOrDiagnosis}
                  </p>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Attached Verification Documents ({evaluatingApp.documents.length}):</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {evaluatingApp.documents.map(d => (
                      <span key={d.id} className="bg-white border border-gray-200 px-2.5 py-1 rounded-md text-[11px] text-blue-700 font-semibold">
                        ✓ {d.name} ({d.size})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Selector */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-gray-900 block mb-1">
                    Update Decision Status *
                  </label>
                  <select
                    value={actionStatus}
                    onChange={(e) => setActionStatus(e.target.value as ApplicationStatus)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 font-bold focus:outline-none focus:border-blue-600"
                  >
                    <option value="Documents Verified">1. Documents Verified (Desk Officer)</option>
                    <option value="Under Review">2. Under Review (Committee Assessment)</option>
                    <option value="Approved">3. Approved (Punong Barangay Endorsement)</option>
                    <option value="Scheduled for Payout">4. Scheduled for Payout (Treasurer)</option>
                    <option value="Disbursed">5. Disbursed & Completed (Cash Claimed)</option>
                    <option value="Needs Additional Requirements">⚠ Needs Additional Requirements (Request Resident)</option>
                    <option value="Rejected">✖ Disapproved / Ineligible</option>
                  </select>
                </div>

                {actionStatus === 'Scheduled for Payout' && (
                  <div className="grid grid-cols-2 gap-2 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                    <div>
                      <label className="text-[11px] font-bold text-emerald-900 block mb-1">Payout Date & Time</label>
                      <input
                        type="text"
                        value={actionDate}
                        onChange={(e) => setActionDate(e.target.value)}
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-emerald-900 block mb-1">Payout Venue</label>
                      <input
                        type="text"
                        value={actionVenue}
                        onChange={(e) => setActionVenue(e.target.value)}
                        className="w-full bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-900"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-900 block mb-1">Approved Benefit Amount (PHP)</label>
                  <input
                    type="text"
                    value={actionAmount}
                    onChange={(e) => setActionAmount(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-900 block mb-1">
                    Official Evaluator Remarks & Resident Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={actionRemarks}
                    onChange={(e) => setActionRemarks(e.target.value)}
                    placeholder="Enter notes, specific document instructions, or approval justification..."
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-600 leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEvaluatingApp(null)}
                  className="px-4 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-xs"
                >
                  Save & Notify Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Program Modal */}
      {isAddProgOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsAddProgOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Assistance Program</h3>
            <form onSubmit={handleCreateProgram} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-gray-900 block mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barangay Bugo Nutrition Subsidy"
                  value={newProgTitle}
                  onChange={(e) => setNewProgTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-900 block mb-1">Category</label>
                  <select
                    value={newProgCategory}
                    onChange={(e) => setNewProgCategory(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-blue-600"
                  >
                    <option value="Financial">Financial</option>
                    <option value="Education">Education</option>
                    <option value="Medical">Medical</option>
                    <option value="Livelihood">Livelihood</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-900 block mb-1">Benefit Grant</label>
                  <input
                    type="text"
                    value={newProgMax}
                    onChange={(e) => setNewProgMax(e.target.value)}
                    placeholder="₱5,000.00"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-900 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProgDesc}
                  onChange={(e) => setNewProgDesc(e.target.value)}
                  placeholder="Program objectives and scope..."
                  className="w-full border border-gray-200 rounded-lg p-2.5 font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProgOpen(false)}
                  className="px-4 py-2 text-gray-500 font-semibold hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-xs"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
