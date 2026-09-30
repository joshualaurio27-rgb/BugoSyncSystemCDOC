import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  ChevronDown, 
  Camera, 
  User, 
  FileText, 
  Users, 
  Megaphone,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Settings,
  CreditCard,
  CheckCircle2,
  Building,
  Upload,
  GitBranch
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BugoLogo } from './BugoLogo';
import { ExportGitHubModal } from './ExportGitHubModal';

export const TopNavBar: React.FC = () => {
  const { 
    currentUser, 
    role, 
    logout, 
    notifications = [], 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    searchQuery,
    setSearchQuery,
    residentsList,
    applications,
    programs,
    announcements,
    activityLogs,
    adminTab,
    setAdminTab,
    residentTab,
    setResidentTab,
    setSelectedApplicationForReview,
    updateUserProfile
  } = useApp();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileInfoModal, setShowProfileInfoModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter(n => !n.read).length;
  const pendingResidentsCount = (residentsList || []).filter(r => r.role === 'resident' && !r.isVerified).length;

  // Handle clicking outside of search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search items
  const cleanQ = (searchQuery || '').trim().toLowerCase();
  const matchingResidents = cleanQ ? residentsList.filter(r => 
    r.name.toLowerCase().includes(cleanQ) || 
    r.purok.toLowerCase().includes(cleanQ) || 
    r.residentIdNumber.toLowerCase().includes(cleanQ)
  ).slice(0, 3) : [];

  const matchingApplications = cleanQ ? applications.filter(a => 
    a.referenceCode.toLowerCase().includes(cleanQ) || 
    a.applicantName.toLowerCase().includes(cleanQ) || 
    a.programTitle.toLowerCase().includes(cleanQ)
  ).slice(0, 3) : [];

  const matchingPrograms = cleanQ ? programs.filter(p => 
    p.title.toLowerCase().includes(cleanQ) || 
    p.category.toLowerCase().includes(cleanQ) ||
    p.tagline.toLowerCase().includes(cleanQ)
  ).slice(0, 3) : [];

  const matchingAnnouncements = cleanQ ? announcements.filter(an => 
    an.title.toLowerCase().includes(cleanQ) || 
    an.description.toLowerCase().includes(cleanQ)
  ).slice(0, 3) : [];

  const totalResultsCount = matchingResidents.length + matchingApplications.length + matchingPrograms.length + matchingAnnouncements.length;

  // Avatar file upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateUserProfile({ avatarUrl: reader.result });
          setShowAvatarModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetAvatar = (url: string) => {
    updateUserProfile({ avatarUrl: url });
    setShowAvatarModal(false);
  };

  const handleRemovePhoto = () => {
    updateUserProfile({ avatarUrl: undefined });
    setShowAvatarModal(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Functional Live Search Input */}
      <div ref={searchContainerRef} className="flex-1 max-w-lg relative min-w-0">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search residents, reference codes, services, advisories..."
            value={searchQuery}
            onFocus={() => setShowSearchResults(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            className="w-full bg-[#f8fafc] hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400 text-xs sm:text-sm pl-9 pr-8 py-2 rounded-full border border-gray-200 focus:border-[#0c532b] focus:ring-2 focus:ring-[#0c532b]/20 outline-none transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setShowSearchResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {showSearchResults && cleanQ && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50 p-2 space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1.5">
              <span>Search Results ({totalResultsCount})</span>
              <button 
                onClick={() => setShowSearchResults(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                Close
              </button>
            </div>

            {totalResultsCount === 0 ? (
              <div className="p-6 text-center text-gray-500 text-xs">
                No matching records found for "{searchQuery}".
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {/* 1. Applications & Requests */}
                {matchingApplications.length > 0 && (
                  <div className="space-y-1">
                    <p className="px-3 text-[10px] font-extrabold text-[#0c532b] uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>Applications & Reference Codes</span>
                    </p>
                    {matchingApplications.map(app => (
                      <button
                        key={app.id}
                        onClick={() => {
                          if (role === 'admin') {
                            setSelectedApplicationForReview(app);
                            setAdminTab('status-tracking');
                          } else {
                            setResidentTab('dashboard');
                          }
                          setShowSearchResults(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/60 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-gray-900">{app.referenceCode}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                              {app.status}
                            </span>
                          </div>
                          <p className="text-gray-500 text-[11px] mt-0.5">{app.applicantName} • {app.programTitle}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0c532b] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                )}

                {/* 2. Residents */}
                {matchingResidents.length > 0 && (
                  <div className="space-y-1">
                    <p className="px-3 text-[10px] font-extrabold text-[#0c532b] uppercase tracking-wider flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Residents</span>
                    </p>
                    {matchingResidents.map(res => (
                      <button
                        key={res.id}
                        onClick={() => {
                          if (role === 'admin') {
                            setAdminTab('residents');
                          } else {
                            setResidentTab('profile');
                          }
                          setShowSearchResults(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/60 transition flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#0c532b] text-white flex items-center justify-center font-bold text-xs">
                            {res.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{res.name}</p>
                            <p className="text-gray-500 text-[11px]">{res.residentIdNumber} • {res.purok}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0c532b] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                )}

                {/* 3. Services / Programs */}
                {matchingPrograms.length > 0 && (
                  <div className="space-y-1">
                    <p className="px-3 text-[10px] font-extrabold text-[#0c532b] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Assistance Services</span>
                    </p>
                    {matchingPrograms.map(prog => (
                      <button
                        key={prog.id}
                        onClick={() => {
                          if (role === 'admin') {
                            setAdminTab('status-tracking');
                          } else {
                            setResidentTab('services');
                          }
                          setShowSearchResults(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/60 transition flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-bold text-gray-900">{prog.title}</p>
                          <p className="text-gray-500 text-[11px]">{prog.category} • {prog.processingTime}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0c532b] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                )}

                {/* 4. Announcements */}
                {matchingAnnouncements.length > 0 && (
                  <div className="space-y-1">
                    <p className="px-3 text-[10px] font-extrabold text-[#0c532b] uppercase tracking-wider flex items-center gap-1">
                      <Megaphone className="w-3 h-3" />
                      <span>Announcements</span>
                    </p>
                    {matchingAnnouncements.map(ann => (
                      <button
                        key={ann.id}
                        onClick={() => {
                          if (role === 'admin') {
                            setAdminTab('announcements');
                          } else {
                            setResidentTab('announcements');
                          }
                          setShowSearchResults(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/60 transition flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-bold text-gray-900">{ann.title}</p>
                          <p className="text-gray-500 text-[11px]">{ann.category} • {ann.date}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0c532b] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Actions: Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5 ml-2 sm:ml-4">
        {/* Export to GitHub */}
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] border border-blue-200 hover:border-blue-300 rounded-full text-xs font-semibold transition-all shadow-xs"
          title="Export Project Files to GitHub"
        >
          <GitBranch className="w-3.5 h-3.5 text-blue-700" />
          <span className="hidden sm:inline">Export to GitHub</span>
          <span className="sm:hidden">Export</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 bg-[#0c532b] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="font-semibold text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-green-100 hover:text-white underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3.5 text-xs hover:bg-gray-50 transition cursor-pointer flex items-start gap-3 ${!n.read ? 'bg-green-50/40' : ''}`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {n.type === 'status_update' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ) : n.type === 'announcement' ? (
                          <Megaphone className="w-4 h-4 text-blue-600" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{n.title}</p>
                        <p className="text-gray-600 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-gray-400 text-[10px] mt-1">{n.timestamp}</p>
                      </div>
                      {!n.read && (
                        <div className="w-2 h-2 rounded-full bg-[#0c532b] mt-1.5 flex-shrink-0" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info with optional Photo */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-gray-100/80 transition-colors focus:outline-none"
          >
            <div className="text-right hidden md:block">
              <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight truncate max-w-[140px]">
                {currentUser?.name || (role === 'admin' ? 'Brgy. Bugo Admin' : 'Resident')}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
                {role === 'admin' ? 'Administrator' : 'Resident Profile'}
              </p>
            </div>

            {/* Circular Avatar / Photo */}
            <div className="relative">
              {currentUser?.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#0c532b] shadow-xs"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#0c532b] border-2 border-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs overflow-hidden">
                  {role === 'admin' ? (
                    <span className="text-[10px] font-extrabold tracking-tight">ADMIN</span>
                  ) : (
                    <span>{currentUser?.name ? currentUser.name.charAt(0) : 'R'}</span>
                  )}
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {/* User Profile Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
              <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                <p className="font-bold text-gray-900 truncate">{currentUser?.name || (role === 'admin' ? 'Hon. Juan Dela Cruz' : 'Resident')}</p>
                <p className="text-gray-500 text-[11px] truncate">{currentUser?.email || 'admin@bugo.gov.ph'}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0c532b]">
                    {role === 'admin' ? 'Barangay Official' : 'Resident Portal'}
                  </span>
                  {currentUser?.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      <CheckCircle2 className="w-3 h-3 text-blue-700" />
                      <span>Verified Citizen</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="p-1 space-y-0.5 border-b border-gray-100">
                {/* 1. Resident Profile / Official Info Drawer Trigger */}
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setShowProfileInfoModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-800 hover:bg-emerald-50 hover:text-[#0c532b] rounded-xl font-medium transition"
                >
                  <User className="w-4 h-4 text-[#0c532b]" />
                  <span className="font-bold">
                    {role === 'admin' ? 'Official Profile & Info' : 'Resident Profile & Digital ID'}
                  </span>
                </button>

                {/* 2. Help */}
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (role === 'resident') {
                      setResidentTab('help');
                    } else {
                      setAdminTab('settings');
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition"
                >
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                  <span>Help</span>
                </button>

                {/* 3. Settings (Contains Change Profile) */}
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (role === 'resident') {
                      setResidentTab('settings');
                    } else {
                      setAdminTab('settings');
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span>Settings</span>
                </button>
              </div>

              {/* 4. Sign Out */}
              <div className="p-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resident Digital Profile & Information Modal (Accessed via Top Right Profile) */}
      {showProfileInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 border border-gray-200 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0c532b]">
                  Barangay Citizen Registry
                </span>
                <h2 className="text-lg font-extrabold text-gray-900">
                  {role === 'admin' ? 'Barangay Official Credentials' : 'Official Resident Profile & Records'}
                </h2>
              </div>
              <button 
                onClick={() => setShowProfileInfoModal(false)} 
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Digital ID Card Container */}
            <div className="bg-gradient-to-br from-[#0c532b] via-[#0f6837] to-[#083a1e] rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden border-2 border-emerald-400/30">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-400/30">
                <div>
                  <p className="text-[9px] tracking-widest uppercase font-bold text-emerald-200">Republic of the Philippines</p>
                  <h3 className="text-sm font-extrabold tracking-tight">BARANGAY BUGO, CAGAYAN DE ORO</h3>
                  <p className="text-[9px] text-emerald-200">Official Citizen Digital Identification</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white text-[#0c532b] font-extrabold flex items-center justify-center text-sm shadow-xs">
                  BG
                </div>
              </div>

              <div className="py-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/40 overflow-hidden flex items-center justify-center text-2xl font-extrabold text-white flex-shrink-0 shadow-md">
                  {currentUser?.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'BG'}</span>
                  )}
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                    {role === 'admin' ? 'Administrator' : 'Verified Resident'}
                  </span>
                  <h4 className="text-lg font-extrabold tracking-tight leading-snug">
                    {currentUser?.name || (role === 'admin' ? 'Hon. Juan Dela Cruz' : 'Maria Clara Santos')}
                  </h4>
                  <p className="text-xs text-emerald-100 font-medium">{currentUser?.purok || 'Zone 1 - Centro Riverside'}</p>
                  
                  <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start text-[10px]">
                    <span className="px-2 py-0.5 bg-white/20 text-white rounded-md font-mono font-bold">
                      {currentUser?.residentIdNumber || 'BG-RES-2026-001'}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-400 text-emerald-950 rounded-md font-bold">
                      Voter: {currentUser?.voterStatus || 'Registered'}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-300 text-emerald-950 rounded-md font-bold">
                      Status: {currentUser?.isVerified ? 'Verified' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-400/30 flex justify-between items-center text-[9px] text-emerald-200">
                <span>Registered: {currentUser?.registeredDate || '2026-01-15'}</span>
                <span className="font-bold text-white uppercase tracking-wider">Official Bugo Records</span>
              </div>
            </div>

            {/* Resident Full System Records & Information */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <h4 className="font-bold text-gray-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#0c532b]" />
                  <span>Citizen Information & Household Profile</span>
                </h4>
                <button
                  onClick={() => {
                    setShowProfileInfoModal(false);
                    if (role === 'resident') {
                      setResidentTab('settings');
                    } else {
                      setAdminTab('settings');
                    }
                  }}
                  className="text-[11px] text-[#0c532b] font-bold hover:underline"
                >
                  Edit in Settings &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <span className="text-gray-400 block text-[11px]">Full Legal Name:</span>
                  <span className="font-bold text-gray-900">{currentUser?.name || 'Maria Clara Santos'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Resident ID Number:</span>
                  <span className="font-mono font-bold text-gray-900">{currentUser?.residentIdNumber || 'BG-RES-2026-001'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Zone / Purok:</span>
                  <span className="font-semibold text-gray-800">{currentUser?.purok || 'Zone 1 - Centro Riverside'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Complete Address:</span>
                  <span className="font-medium text-gray-800">{currentUser?.address || 'Zone 1, Bugo, Cagayan de Oro City'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Contact Phone:</span>
                  <span className="font-semibold text-gray-800">{currentUser?.contactNumber || '0917 555 4321'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Email Address:</span>
                  <span className="font-medium text-gray-800 truncate block">{currentUser?.email || 'resident@bugo.gov.ph'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Monthly Household Income:</span>
                  <span className="font-bold text-emerald-700">{currentUser?.householdIncome || '₱8,500.00'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Dependents in Family:</span>
                  <span className="font-bold text-gray-800">{currentUser?.familyMembersCount || 4} Members</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">Primary Occupation:</span>
                  <span className="font-semibold text-gray-800">{currentUser?.occupation || 'Market Vendor / Resident'}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px]">COMELEC Voter Status:</span>
                  <span className="font-bold text-gray-900">{currentUser?.voterStatus || 'Registered Voter'}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowProfileInfoModal(false);
                  if (role === 'resident') setResidentTab('settings');
                  else setAdminTab('settings');
                }}
                className="flex-1 py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Go to Settings & Profile Updates</span>
              </button>
              <button
                type="button"
                onClick={() => setShowProfileInfoModal(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Picture Upload Modal (Optional for both Admin and Resident) */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-gray-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Customize Profile Picture</h3>
              <button onClick={() => setShowAvatarModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full mx-auto border-4 border-[#0c532b]/20 shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Profile picture is optional for both Residents and Barangay Officials.
              </p>
            </div>

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="hidden" 
            />

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Camera className="w-4 h-4" />
                <span>Upload Custom Photo</span>
              </button>

              <div className="pt-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">
                  Or select preset avatar:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
                  ].map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectPresetAvatar(url)}
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#0c532b] transition transform hover:scale-105 mx-auto"
                    >
                      <img src={url} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {currentUser?.avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="w-full py-2 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition"
                >
                  Remove Current Picture
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export to GitHub Modal */}
      <ExportGitHubModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
      />
    </header>
  );
};
