import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck2, 
  Megaphone, 
  Settings, 
  LogOut, 
  Archive,
  Plus, 
  ShieldCheck, 
  FileText, 
  X, 
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BugoLogo } from '../BugoLogo';
import { TopNavBar } from '../TopNavBar';
import { AdminDashboardView } from './AdminDashboardView';
import { 
  AdminResidentsView, 
  AdminStatusTrackingView, 
  AdminAnnouncementsView, 
  AdminSettingsView 
} from './AdminOperationsViews';
import { AdminArchivesView } from './AdminArchivesView';
import { BUGO_PUROKS } from '../../data/mockData';

export const AdminLayout: React.FC = () => {
  const { 
    adminTab, 
    setAdminTab, 
    logout,
    addNewResidentRecord,
    addAnnouncement,
    residentsList
  } = useApp();

  // Modals state
  const [showNewResidentModal, setShowNewResidentModal] = useState(false);
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [showClearanceModal, setShowClearanceModal] = useState(false);

  // Form states
  const [resForm, setResForm] = useState({ name: '', email: '', contact: '', purok: BUGO_PUROKS[0], income: '₱8,500.00' });
  const [annForm, setAnnForm] = useState({ title: '', category: 'General' as const, description: '', iconType: 'general' as const });
  const [clearanceForm, setClearanceForm] = useState({ residentName: 'Maria Clara Santos', purpose: 'Employment Requirement', issuedDate: '2026-08-31' });
  const [clearanceGenerated, setClearanceGenerated] = useState(false);

  const pendingApprovalsCount = residentsList.filter(r => r.registrationStatus === 'Pending Approval').length;

  const handleCreateResident = (e: React.FormEvent) => {
    e.preventDefault();
    addNewResidentRecord({
      name: resForm.name,
      email: resForm.email,
      contactNumber: resForm.contact,
      purok: resForm.purok,
      householdIncome: resForm.income
    });
    setShowNewResidentModal(false);
    setResForm({ name: '', email: '', contact: '', purok: BUGO_PUROKS[0], income: '₱8,500.00' });
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title: annForm.title,
      category: annForm.category,
      description: annForm.description,
      date: 'Today',
      iconType: annForm.iconType,
      status: 'Published'
    });
    setShowNewAnnouncementModal(false);
    setAnnForm({ title: '', category: 'General', description: '', iconType: 'general' });
  };

  interface NavItem {
    id: 'dashboard' | 'residents' | 'status-tracking' | 'announcements' | 'archives';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'residents', label: 'Residents', icon: Users, badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined },
    { id: 'status-tracking', label: 'Status Tracking', icon: FileCheck2 },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'archives', label: 'Archives', icon: Archive },
  ];

  return (
    <div className="min-h-screen flex bg-[#f0f4f9] text-gray-800 font-sans antialiased">
      {/* Left Sidebar (Hidden on Mobile Web, Visible on Desktop) */}
      <aside className="hidden md:flex w-60 bg-white border-r border-gray-200 flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen z-40">
        <div>
          {/* Brand Logo in sidebar */}
          <div className="p-5 border-b border-gray-100">
            <BugoLogo size="md" />
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0c532b] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#0c532b]' : 'bg-[#ea580c] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Settings & Sign Out */}
        <div className="p-3 border-t border-gray-100 space-y-2">
          <button
            onClick={() => setAdminTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              adminTab === 'settings'
                ? 'bg-[#0c532b] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
            }`}
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Settings</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNavBar />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-5 md:p-8 pb-24 md:pb-8 max-w-7xl w-full mx-auto">
          {adminTab === 'dashboard' && (
            <AdminDashboardView 
              onNavigateTab={(tab) => setAdminTab(tab)}
              onOpenNewResidentModal={() => setShowNewResidentModal(true)}
              onOpenNewAnnouncementModal={() => setShowNewAnnouncementModal(true)}
              onOpenClearanceModal={() => {
                setClearanceGenerated(false);
                setShowClearanceModal(true);
              }}
            />
          )}

          {adminTab === 'residents' && (
            <AdminResidentsView />
          )}

          {adminTab === 'status-tracking' && (
            <AdminStatusTrackingView />
          )}

          {adminTab === 'announcements' && (
            <AdminAnnouncementsView />
          )}

          {adminTab === 'archives' && (
            <AdminArchivesView />
          )}

          {adminTab === 'settings' && (
            <AdminSettingsView />
          )}
        </main>

        {/* Mobile Bottom Quick Navigation Bar for Admin (Hidden on Desktop) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setAdminTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${adminTab === 'dashboard' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </button>
          <button
            onClick={() => setAdminTab('residents')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl relative transition ${adminTab === 'residents' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Residents</span>
            {pendingApprovalsCount > 0 && (
              <span className="absolute top-0.5 right-2 w-2 h-2 bg-amber-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setAdminTab('status-tracking')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${adminTab === 'status-tracking' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FileCheck2 className="w-5 h-5" />
            <span className="text-[10px]">Tracking</span>
          </button>
          <button
            onClick={() => setAdminTab('announcements')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${adminTab === 'announcements' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Megaphone className="w-5 h-5" />
            <span className="text-[10px]">Advisories</span>
          </button>
          <button
            onClick={() => setAdminTab('archives')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${adminTab === 'archives' ? 'text-[#0c532b] font-bold' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Archive className="w-5 h-5" />
            <span className="text-[10px]">Archives</span>
          </button>
        </div>
      </div>

      {/* Modal 1: Register Resident Modal */}
      {showNewResidentModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Register Resident Manually</h2>
              <button onClick={() => setShowNewResidentModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateResident} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juan Carlos Dela Cruz"
                  value={resForm.name}
                  onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="resident@gmail.com"
                  value={resForm.email}
                  onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  required
                  placeholder="0917 123 4567"
                  value={resForm.contact}
                  onChange={(e) => setResForm({ ...resForm, contact: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Purok / Zone</label>
                <select
                  value={resForm.purok}
                  onChange={(e) => setResForm({ ...resForm, purok: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                >
                  {BUGO_PUROKS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewResidentModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
                >
                  Save Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Create Announcement Modal */}
      {showNewAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Broadcast Announcement</h2>
              <button onClick={() => setShowNewAnnouncementModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Water Interruption Notice"
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
                  <option value="General">General Notice</option>
                  <option value="Water">Water Interruption</option>
                  <option value="Health">Health & Medical</option>
                  <option value="Sports">Sports & SK</option>
                  <option value="Assembly">Barangay Assembly</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Announcement description for citizens..."
                  value={annForm.description}
                  onChange={(e) => setAnnForm({ ...annForm, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
              >
                Publish Notice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Official Barangay Clearance Generator */}
      {showClearanceModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Official Barangay Clearance Generator</h2>
              <button onClick={() => setShowClearanceModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!clearanceGenerated ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Select Resident</label>
                  <select
                    value={clearanceForm.residentName}
                    onChange={(e) => setClearanceForm({ ...clearanceForm, residentName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  >
                    {residentsList.map(r => (
                      <option key={r.id} value={r.name}>{r.name} ({r.residentIdNumber})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Purpose of Clearance</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Local Employment Requirement, Postal ID, Bank Account"
                    value={clearanceForm.purpose}
                    onChange={(e) => setClearanceForm({ ...clearanceForm, purpose: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setClearanceGenerated(true)}
                  className="w-full py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
                >
                  Generate Stamped Certificate
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Official Stamped Document Preview */}
                <div className="p-6 bg-amber-50/40 border-2 border-dashed border-gray-300 rounded-2xl text-center space-y-3 font-serif text-gray-800">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Republic of the Philippines<br />
                    City of Cagayan de Oro<br />
                    <strong className="text-gray-900 font-extrabold font-sans">BARANGAY BUGO</strong>
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#0c532b] underline">
                    BARANGAY CLEARANCE CERTIFICATION
                  </h3>
                  <p className="text-[11px] leading-relaxed text-gray-700 text-justify px-2">
                    To whom it may concern: This certifies that <strong>{clearanceForm.residentName}</strong> is a bona fide resident of Barangay Bugo with good moral standing in the community and no derogatory record.
                  </p>
                  <div className="text-left text-[10px] text-gray-600 pt-2">
                    <p><strong>Purpose:</strong> {clearanceForm.purpose}</p>
                    <p><strong>Control No:</strong> BG-CLR-2026-9042</p>
                  </div>
                  <div className="pt-4 flex justify-between items-end text-[10px]">
                    <div className="text-left">
                      <p className="font-bold text-emerald-800">OFFICIALLY SEALED</p>
                      <p className="text-gray-400">Dry seal validated</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold border-t border-gray-800 pt-1">HON. JUAN DELA CRUZ</p>
                      <p className="text-gray-500">Punong Barangay</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Clearance</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearanceModal(false)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
