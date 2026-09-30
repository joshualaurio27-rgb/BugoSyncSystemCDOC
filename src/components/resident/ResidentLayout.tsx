import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  HeartHandshake, 
  MessageSquare, 
  Megaphone, 
  HelpCircle, 
  Settings, 
  LogOut,
  Upload,
  CheckCircle,
  AlertCircle,
  FileCheck2,
  Printer,
  X,
  FileText,
  ShieldCheck,
  Check,
  Clock,
  Send,
  Eye,
  Camera,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BugoLogo } from '../BugoLogo';
import { TopNavBar } from '../TopNavBar';
import { 
  ResidentDashboardView, 
  ResidentServicesView, 
  ResidentComplaintsView, 
  ResidentSettingsView,
  ResidentHelpView
} from './ResidentOperationsViews';
import { AssistanceProgram } from '../../types';
import { BUGO_PUROKS, MONTHLY_INCOME_OPTIONS } from '../../data/mockData';

export const ResidentLayout: React.FC = () => {
  const { 
    residentTab, 
    setResidentTab, 
    logout, 
    currentUser,
    submitAssistanceApplication,
    announcements
  } = useApp();

  // Registration & Service Application Fill-up Form Modal State
  const [applyingProgram, setApplyingProgram] = useState<AssistanceProgram | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State with Front and Back ID verification
  const [appForm, setAppForm] = useState({
    applicantName: currentUser?.name || 'Maria Clara Santos',
    email: currentUser?.email || 'resident@bugo.gov.ph',
    contactNumber: currentUser?.contactNumber || '0917 555 4321',
    purok: currentUser?.purok || BUGO_PUROKS[0],
    address: currentUser?.address || 'Zone 1 - Centro Riverside, Bugo, CDO',
    householdIncome: currentUser?.householdIncome || '₱8,500.00',
    familyMembersCount: currentUser?.familyMembersCount || 4,
    occupation: currentUser?.occupation || 'Market Vendor',
    purpose: '',
    agreedToTerms: false,
    idType: 'PhilSys National ID',
    frontIdFileName: 'PhilSys_ID_Front_MariaClara.jpg',
    frontIdPreviewUrl: 'https://images.unsplash.com/photo-1578852612716-854e527abf50?auto=format&fit=crop&q=80&w=400',
    backIdFileName: 'PhilSys_ID_Back_MariaClara.jpg',
    backIdPreviewUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    additionalDocName: 'Barangay_Proof_Residency_Bugo.pdf'
  });

  const [previewDocModal, setPreviewDocModal] = useState<{ title: string; url: string } | null>(null);

  const handleStartApply = (prog: AssistanceProgram) => {
    setApplyingProgram(prog);
    setSubmittedRef(null);
    setAppForm({
      applicantName: currentUser?.name || 'Maria Clara Santos',
      email: currentUser?.email || 'resident@bugo.gov.ph',
      contactNumber: currentUser?.contactNumber || '0917 555 4321',
      purok: currentUser?.purok || BUGO_PUROKS[0],
      address: currentUser?.address || 'Zone 1 - Centro Riverside, Bugo, CDO',
      householdIncome: currentUser?.householdIncome || '₱8,500.00',
      familyMembersCount: currentUser?.familyMembersCount || 4,
      occupation: currentUser?.occupation || 'Market Vendor',
      purpose: '',
      agreedToTerms: false,
      idType: 'PhilSys National ID',
      frontIdFileName: 'PhilSys_ID_Front_MariaClara.jpg',
      frontIdPreviewUrl: 'https://images.unsplash.com/photo-1578852612716-854e527abf50?auto=format&fit=crop&q=80&w=400',
      backIdFileName: 'PhilSys_ID_Back_MariaClara.jpg',
      backIdPreviewUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
      additionalDocName: 'Barangay_Proof_Residency_Bugo.pdf'
    });
  };

  const handleFrontIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAppForm(prev => ({
            ...prev,
            frontIdFileName: file.name,
            frontIdPreviewUrl: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAppForm(prev => ({
            ...prev,
            backIdFileName: file.name,
            backIdPreviewUrl: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingProgram) return;

    const formattedDocs = [
      {
        id: `doc-front-${Date.now()}`,
        name: `[Front ID] ${appForm.frontIdFileName}`,
        type: 'Image',
        docCategory: 'Front ID' as const,
        previewUrl: appForm.frontIdPreviewUrl,
        fileUrl: appForm.frontIdPreviewUrl,
        size: '1.8 MB',
        uploadDate: 'Today',
        verified: false
      },
      {
        id: `doc-back-${Date.now()}`,
        name: `[Back ID] ${appForm.backIdFileName}`,
        type: 'Image',
        docCategory: 'Back ID' as const,
        previewUrl: appForm.backIdPreviewUrl,
        fileUrl: appForm.backIdPreviewUrl,
        size: '1.6 MB',
        uploadDate: 'Today',
        verified: false
      },
      {
        id: `doc-residency-${Date.now()}`,
        name: appForm.additionalDocName,
        type: 'PDF',
        docCategory: 'Proof of Residency' as const,
        previewUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=400',
        fileUrl: '#',
        size: '1.1 MB',
        uploadDate: 'Today',
        verified: false
      }
    ];

    const ref = submitAssistanceApplication({
      programId: applyingProgram.id,
      programTitle: applyingProgram.title,
      category: applyingProgram.category,
      applicantName: appForm.applicantName,
      contactNumber: appForm.contactNumber,
      email: appForm.email,
      purok: appForm.purok,
      address: appForm.address,
      householdMonthlyIncome: appForm.householdIncome,
      familyMembersCount: Number(appForm.familyMembersCount),
      occupation: appForm.occupation,
      purposeOrDiagnosis: appForm.purpose || `Official application request for ${applyingProgram.title}. ID Type: ${appForm.idType}.`,
      documents: formattedDocs
    });

    setSubmittedRef(ref);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Apply for Services', icon: HeartHandshake },
    { id: 'complaints', label: 'Community Helpdesk', icon: MessageSquare },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ] as const;

  return (
    <div className="min-h-screen flex bg-[#f0f4f9] text-gray-800 font-sans antialiased">
      {/* Left Sidebar (Hidden on Mobile Web, Visible on Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen z-40">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <BugoLogo size="md" />
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = residentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setResidentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0c532b] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Settings and Sign Out */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={() => setResidentTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              residentTab === 'settings'
                ? 'bg-[#0c532b] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
            }`}
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Settings</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavBar />

        <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8 max-w-7xl w-full mx-auto">
          {residentTab === 'dashboard' && (
            <ResidentDashboardView 
              onApplyProgram={handleStartApply}
              onNavigateTab={(tab) => setResidentTab(tab as any)}
            />
          )}

          {residentTab === 'services' && (
            <ResidentServicesView 
              onApplyProgram={handleStartApply}
            />
          )}

          {residentTab === 'complaints' && (
            <ResidentComplaintsView />
          )}

          {residentTab === 'announcements' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Barangay Announcements & Advisories
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Official community updates broadcast by the Barangay Bugo Secretariat.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0c532b]">
                        {ann.category}
                      </span>
                      <span className="text-xs text-gray-400">{ann.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{ann.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{ann.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {residentTab === 'settings' && (
            <ResidentSettingsView />
          )}

          {residentTab === 'help' && (
            <ResidentHelpView />
          )}
        </main>

        {/* Mobile Bottom Quick Navigation Bar (Hidden on Desktop) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setResidentTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${residentTab === 'dashboard' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </button>
          <button
            onClick={() => setResidentTab('services')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${residentTab === 'services' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <HeartHandshake className="w-5 h-5" />
            <span className="text-[10px]">Services</span>
          </button>
          <button
            onClick={() => setResidentTab('complaints')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${residentTab === 'complaints' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px]">Helpdesk</span>
          </button>
          <button
            onClick={() => setResidentTab('announcements')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${residentTab === 'announcements' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Megaphone className="w-5 h-5" />
            <span className="text-[10px]">Advisories</span>
          </button>
          <button
            onClick={() => setResidentTab('help')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${residentTab === 'help' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px]">Help</span>
          </button>
        </div>
      </div>

      {/* Official Registration & Application Fill-up Form Modal with Front & Back ID */}
      {applyingProgram && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0c532b]">
                  Official Barangay Service Form
                </span>
                <h2 className="text-lg font-extrabold text-gray-900">
                  {applyingProgram.title}
                </h2>
              </div>
              <button 
                onClick={() => setApplyingProgram(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!submittedRef ? (
              <form onSubmit={handleSubmitApplication} className="space-y-5 text-xs">
                {/* Section 1: Applicant Information */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#0c532b] text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Applicant Personal Information</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={appForm.applicantName}
                        onChange={(e) => setAppForm({ ...appForm, applicantName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block font-bold text-gray-700">Contact Phone (12 Digits Max)</label>
                        <span className="text-[10px] text-gray-400">{appForm.contactNumber.replace(/\D/g, '').length}/12</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={12}
                        required
                        value={appForm.contactNumber}
                        onChange={(e) => setAppForm({ ...appForm, contactNumber: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Purok / Zone</label>
                      <select
                        value={appForm.purok}
                        onChange={(e) => setAppForm({ ...appForm, purok: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                      >
                        {BUGO_PUROKS.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Complete Street Address</label>
                      <input
                        type="text"
                        required
                        value={appForm.address}
                        onChange={(e) => setAppForm({ ...appForm, address: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Socio-Economic Profile */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#0c532b] text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Socio-Economic & Household Profile</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Monthly Household Income</label>
                      <select
                        value={appForm.householdIncome}
                        onChange={(e) => setAppForm({ ...appForm, householdIncome: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                      >
                        {MONTHLY_INCOME_OPTIONS.map((inc) => (
                          <option key={inc} value={inc}>{inc}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Dependents in Family</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={appForm.familyMembersCount}
                        onChange={(e) => setAppForm({ ...appForm, familyMembersCount: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Primary Occupation</label>
                      <input
                        type="text"
                        required
                        value={appForm.occupation}
                        onChange={(e) => setAppForm({ ...appForm, occupation: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Purpose of Application */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#0c532b] text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Service Purpose & Statement of Need</span>
                  </h4>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Specific Reason / Justification for Request
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="State the purpose of this clearance or assistance request in detail..."
                      value={appForm.purpose}
                      onChange={(e) => setAppForm({ ...appForm, purpose: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                    />
                  </div>
                </div>

                {/* Section 4: Front and Back ID Verification & Requirements */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#0c532b] text-white flex items-center justify-center text-[10px]">4</span>
                      <span>Front & Back ID Verification & Requirements</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#0c532b] bg-emerald-50 px-2 py-0.5 rounded-full">Mandatory</span>
                  </h4>

                  {/* ID Type Selector */}
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Select Valid Government ID Type</label>
                    <select
                      value={appForm.idType}
                      onChange={(e) => setAppForm({ ...appForm, idType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                    >
                      <option value="PhilSys National ID">PhilSys National ID (PhilID / ePhilID)</option>
                      <option value="Driver's License">LTO Driver's License</option>
                      <option value="Voter's ID / Certification">COMELEC Voter's ID / Certification</option>
                      <option value="Barangay Bugo Citizen ID">Barangay Bugo Official Citizen ID</option>
                      <option value="UMID / SSS ID">Unified Multi-Purpose ID (UMID / SSS)</option>
                      <option value="Philippine Passport">DFA Philippine Passport</option>
                      <option value="Senior Citizen / PWD ID">Senior Citizen / PWD Identification Card</option>
                      <option value="Student ID">DepEd / CHED Valid Student ID</option>
                    </select>
                  </div>

                  {/* Front & Back ID Uploads in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Front ID Box */}
                    <div className="p-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0c532b] transition space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#0c532b]" />
                          <span>Front of ID</span>
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Required</span>
                      </div>

                      {appForm.frontIdPreviewUrl ? (
                        <div className="space-y-2">
                          <div className="relative rounded-xl overflow-hidden h-24 bg-gray-200 border border-gray-300 group">
                            <img 
                              src={appForm.frontIdPreviewUrl} 
                              alt="Front ID Preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPreviewDocModal({ title: 'Front of ID Verification', url: appForm.frontIdPreviewUrl })}
                                className="p-1.5 bg-white text-gray-900 rounded-lg shadow-sm hover:scale-105"
                                title="Zoom Image"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-600 truncate max-w-[130px] font-mono">{appForm.frontIdFileName}</span>
                            <label className="cursor-pointer text-[#0c532b] font-bold hover:underline">
                              Change
                              <input type="file" accept="image/*" onChange={handleFrontIdUpload} className="hidden" />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-24 bg-white rounded-xl border border-gray-200 cursor-pointer hover:bg-emerald-50/50 transition">
                          <Camera className="w-6 h-6 text-gray-400 mb-1" />
                          <span className="text-[11px] font-bold text-gray-700">Upload Front Side</span>
                          <span className="text-[9px] text-gray-400">PNG, JPG, JPEG</span>
                          <input type="file" accept="image/*" onChange={handleFrontIdUpload} className="hidden" />
                        </label>
                      )}
                    </div>

                    {/* Back ID Box */}
                    <div className="p-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0c532b] transition space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#0c532b]" />
                          <span>Back of ID</span>
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Required</span>
                      </div>

                      {appForm.backIdPreviewUrl ? (
                        <div className="space-y-2">
                          <div className="relative rounded-xl overflow-hidden h-24 bg-gray-200 border border-gray-300 group">
                            <img 
                              src={appForm.backIdPreviewUrl} 
                              alt="Back ID Preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPreviewDocModal({ title: 'Back of ID Verification', url: appForm.backIdPreviewUrl })}
                                className="p-1.5 bg-white text-gray-900 rounded-lg shadow-sm hover:scale-105"
                                title="Zoom Image"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-600 truncate max-w-[130px] font-mono">{appForm.backIdFileName}</span>
                            <label className="cursor-pointer text-[#0c532b] font-bold hover:underline">
                              Change
                              <input type="file" accept="image/*" onChange={handleBackIdUpload} className="hidden" />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-24 bg-white rounded-xl border border-gray-200 cursor-pointer hover:bg-emerald-50/50 transition">
                          <Camera className="w-6 h-6 text-gray-400 mb-1" />
                          <span className="text-[11px] font-bold text-gray-700">Upload Back Side</span>
                          <span className="text-[9px] text-gray-400">PNG, JPG, JPEG</span>
                          <input type="file" accept="image/*" onChange={handleBackIdUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Supporting Document Tag */}
                  <div className="p-2.5 bg-emerald-50/80 rounded-xl flex items-center justify-between text-[11px] text-emerald-900 font-semibold border border-emerald-200/60">
                    <div className="flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-[#0c532b]" />
                      <span>Attached: Barangay Proof of Residency / Indigency Certificate</span>
                    </div>
                    <span className="text-[10px] text-emerald-700">Ready</span>
                  </div>
                </div>

                {/* Section 5: Sworn Certification */}
                <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={appForm.agreedToTerms}
                      onChange={(e) => setAppForm({ ...appForm, agreedToTerms: e.target.checked })}
                      className="mt-0.5 rounded-sm text-[#0c532b] focus:ring-[#0c532b]"
                    />
                    <span className="text-[11px] text-gray-700 leading-snug">
                      I hereby swear and certify under penalty of perjury that all information provided and ID documents attached are authentic, valid, and belong to me. I authorize Barangay Bugo to inspect and verify these credentials.
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyingProgram(null)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application & IDs</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Official Application Receipt & Acknowledgment Slip */
              <div className="space-y-4">
                <div className="p-6 bg-emerald-50/70 border-2 border-dashed border-[#0c532b]/40 rounded-3xl text-center space-y-3 font-sans">
                  <div className="w-14 h-14 rounded-full bg-[#0c532b] text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-gray-900">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-xs text-gray-500">
                      Official Acknowledgment Receipt • Barangay Bugo, CDO
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-emerald-100 text-left space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-400">Reference Tracking Code:</span>
                      <span className="font-mono font-extrabold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg text-sm">
                        {submittedRef}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Service:</span>
                      <span className="font-bold text-gray-900">{applyingProgram.title}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Applicant:</span>
                      <span className="font-semibold text-gray-800">{appForm.applicantName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">ID Attached:</span>
                      <span className="font-bold text-[#0c532b]">{appForm.idType} (Front & Back)</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Purok / Zone:</span>
                      <span className="font-semibold text-gray-800">{appForm.purok}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Submitted Timestamp:</span>
                      <span className="font-semibold text-gray-800">Just now • Synchronized</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#0c532b] font-medium px-2">
                    Your request and Front & Back ID verification have been queued for Barangay Bugo administrative review.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Receipt Slip</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplyingProgram(null)}
                    className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Document Zoom Modal */}
      {previewDocModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-4 border border-gray-200 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="font-bold text-sm text-gray-900">{previewDocModal.title}</h4>
              <button onClick={() => setPreviewDocModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
              <img src={previewDocModal.url} alt="Document Zoom" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
