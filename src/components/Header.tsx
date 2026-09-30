import React, { useState } from 'react';
import { 
  Landmark, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X, 
  FileText, 
  Compass, 
  Activity,
  CheckCircle2,
  ChevronDown,
  GitBranch
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExportGitHubModal } from './ExportGitHubModal';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    role, 
    currentUser, 
    setIsLoginModalOpen, 
    setLoginModalMode, 
    logout, 
    notifications, 
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setSelectedApplicationForTracking,
    lookupApplicationByRef,
    loginAsResident,
    loginAsStaff,
    loginAsCaptain
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchRefInput, setSearchRefInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRefInput.trim()) return;
    const found = lookupApplicationByRef(searchRefInput.trim());
    if (found) {
      setSelectedApplicationForTracking(found);
      setActiveTab('tracking');
      setIsSearchOpen(false);
      setSearchRefInput('');
      setSearchError('');
    } else {
      setSearchError(`No record found for "${searchRefInput.trim()}". Please check your Reference Code.`);
    }
  };

  return (
    <>
      <header className="bg-[#1E3A8A] text-white w-full h-16 sticky top-0 z-40 shadow-md transition-colors">
        <div className="flex justify-between items-center px-4 md:px-8 max-w-[1280px] mx-auto h-full">
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1E3A8A] font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight uppercase tracking-tight text-white">
                Barangay Bugo
              </span>
              <span className="text-xs text-blue-100/80 font-normal">
                Resident Assistance Portal
              </span>
            </div>
          </button>

          {/* Desktop Nav Links matching design exactly */}
          <nav className="hidden md:flex gap-6 lg:gap-8 h-full items-center text-sm font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className={`h-full flex items-center transition-all ${
                activeTab === 'home'
                  ? 'border-b-2 border-white text-white font-semibold'
                  : 'text-white/80 hover:text-white transition-opacity'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`h-full flex items-center transition-all ${
                activeTab === 'programs'
                  ? 'border-b-2 border-white text-white font-semibold'
                  : 'text-white/80 hover:text-white transition-opacity'
              }`}
            >
              Assistance Programs
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`h-full flex items-center transition-all ${
                activeTab === 'tracking'
                  ? 'border-b-2 border-white text-white font-semibold'
                  : 'text-white/80 hover:text-white transition-opacity'
              }`}
            >
              Application Status
            </button>
            <button
              onClick={() => {
                if (!currentUser) {
                  setLoginModalMode('login');
                  setIsLoginModalOpen(true);
                } else {
                  setActiveTab('profile');
                }
              }}
              className={`h-full flex items-center transition-all ${
                activeTab === 'profile'
                  ? 'border-b-2 border-white text-white font-semibold'
                  : 'text-white/80 hover:text-white transition-opacity'
              }`}
            >
              Resident Profile
            </button>

            {(role === 'staff' || role === 'captain') && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`h-full flex items-center gap-1.5 transition-all ${
                  activeTab === 'admin'
                    ? 'border-b-2 border-emerald-300 text-emerald-300 font-semibold'
                    : 'text-emerald-200/90 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Staff Admin
              </button>
            )}
          </nav>

          {/* Right Action Icons & Portal CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Export Code to GitHub */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              title="Export Code to GitHub"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-800/80 hover:bg-blue-700 text-white rounded text-xs font-medium border border-blue-600/50 transition-all shadow-xs"
            >
              <GitBranch className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">Export Code</span>
            </button>

            {/* Fast Quick Tracker Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              title="Quick Tracker Search"
              className="text-white/80 hover:text-white p-2 rounded hover:bg-blue-800/60 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                title="Notifications"
                className="text-white/80 hover:text-white p-2 rounded hover:bg-blue-800/60 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#1E3A8A]"></span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 text-gray-800">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                    <span className="font-bold text-sm text-gray-900">Notifications</span>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-blue-600 hover:underline font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2 text-xs">
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No notifications yet.</p>
                    ) : (
                      notifications.slice(0, 5).map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.applicationRef) {
                              const found = lookupApplicationByRef(notif.applicationRef);
                              if (found) {
                                setSelectedApplicationForTracking(found);
                                setActiveTab('tracking');
                                setIsNotifOpen(false);
                              }
                            }
                          }}
                          className={`p-2.5 rounded-lg cursor-pointer transition-colors border ${
                            !notif.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-transparent hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span className="font-bold text-gray-900 text-[12px]">{notif.title}</span>
                            <span className="text-[10px] text-gray-500 whitespace-nowrap">{notif.timestamp}</span>
                          </div>
                          <p className="text-gray-600 text-[11px] line-clamp-2 leading-relaxed">{notif.message}</p>
                          {notif.applicationRef && (
                            <span className="inline-block mt-1 text-[10px] text-blue-600 font-bold hover:underline">
                              View {notif.applicationRef} →
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Role Switcher Pill for reviewer demonstration */}
            <div className="hidden lg:flex items-center bg-blue-950/60 border border-blue-700/50 rounded-lg px-2 py-1 text-[11px]">
              <span className="text-blue-200 mr-1.5 font-medium">Role:</span>
              <button
                onClick={loginAsResident}
                className={`px-2 py-0.5 rounded transition-all ${
                  role === 'resident' ? 'bg-blue-600 text-white font-semibold shadow-xs' : 'text-blue-200 hover:text-white'
                }`}
              >
                Resident
              </button>
              <button
                onClick={loginAsStaff}
                className={`px-2 py-0.5 rounded transition-all ${
                  role === 'staff' ? 'bg-blue-600 text-white font-semibold shadow-xs' : 'text-blue-200 hover:text-white'
                }`}
              >
                Staff
              </button>
              <button
                onClick={loginAsCaptain}
                className={`px-2 py-0.5 rounded transition-all ${
                  role === 'captain' ? 'bg-blue-600 text-white font-semibold shadow-xs' : 'text-blue-200 hover:text-white'
                }`}
              >
                Captain
              </button>
            </div>

            {/* Resident Portal CTA Button */}
            {!currentUser ? (
              <button
                onClick={() => {
                  setLoginModalMode('login');
                  setIsLoginModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded text-xs font-semibold text-white transition-all shadow-sm active:scale-[0.98]"
              >
                Log In
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 bg-blue-800/80 hover:bg-blue-700 border border-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-[#1E3A8A] flex items-center justify-center text-[10px] font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline max-w-[110px] truncate font-medium">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in text-gray-800">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-bold text-xs text-gray-900 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-500 capitalize">{role} • {currentUser.purok}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      My Resident Account
                    </button>
                    
                    <button
                      onClick={() => {
                        setActiveTab('tracking');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"
                    >
                      <Activity className="w-3.5 h-3.5 text-gray-500" />
                      My Applications
                    </button>

                    {(role === 'staff' || role === 'captain') && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-blue-700 hover:bg-blue-50 flex items-center gap-2 font-semibold"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        Admin Management
                      </button>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-blue-800 rounded"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1E3A8A] border-t border-blue-800 px-4 py-3 space-y-2 shadow-lg text-white">
            <button
              onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${activeTab === 'home' ? 'bg-blue-700 text-white font-semibold' : 'text-blue-100 hover:bg-blue-800'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('programs'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${activeTab === 'programs' ? 'bg-blue-700 text-white font-semibold' : 'text-blue-100 hover:bg-blue-800'}`}
            >
              Assistance Programs
            </button>
            <button
              onClick={() => { setActiveTab('tracking'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${activeTab === 'tracking' ? 'bg-blue-700 text-white font-semibold' : 'text-blue-100 hover:bg-blue-800'}`}
            >
              Application Status
            </button>
            <button
              onClick={() => { 
                if (!currentUser) {
                  setLoginModalMode('login');
                  setIsLoginModalOpen(true);
                } else {
                  setActiveTab('profile');
                }
                setIsMobileMenuOpen(false); 
              }}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${activeTab === 'profile' ? 'bg-blue-700 text-white font-semibold' : 'text-blue-100 hover:bg-blue-800'}`}
            >
              Resident Profile
            </button>
            
            <div className="pt-2 border-t border-blue-700 flex items-center justify-between text-xs text-blue-200">
              <span>Switch Role:</span>
              <div className="flex gap-1">
                <button onClick={loginAsResident} className="px-2 py-1 bg-blue-800 rounded hover:bg-blue-700 text-white">Resident</button>
                <button onClick={loginAsStaff} className="px-2 py-1 bg-blue-800 rounded hover:bg-blue-700 text-white">Staff</button>
                <button onClick={loginAsCaptain} className="px-2 py-1 bg-blue-800 rounded hover:bg-blue-700 text-white">Captain</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Quick Tracking Search Dialog */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => { setIsSearchOpen(false); setSearchError(''); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 text-[#1E3A8A] mb-1">
              <Search className="w-5 h-5" />
              <h3 className="font-bold text-lg text-gray-900">Track Application Status</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Enter your official Reference Code (e.g., <code className="bg-blue-50 px-1.5 py-0.5 rounded text-blue-700 font-mono font-medium">BUG-2026-8941</code>)
            </p>

            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="e.g. BUG-2026-8941"
                  value={searchRefInput}
                  onChange={(e) => { setSearchRefInput(e.target.value); setSearchError(''); }}
                  autoFocus
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                {searchError && (
                  <p className="text-xs text-rose-600 mt-1.5">{searchError}</p>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(false); setSearchError(''); }}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold rounded-lg transition-all"
                >
                  Lookup Application
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
              <span>Demo Quick Codes:</span>
              <div className="flex gap-1.5">
                <button 
                  type="button" 
                  onClick={() => setSearchRefInput('BUG-2026-8941')}
                  className="text-blue-600 underline font-mono hover:text-blue-800"
                >
                  BUG-2026-8941
                </button>
                <span>•</span>
                <button 
                  type="button" 
                  onClick={() => setSearchRefInput('BUG-2026-9120')}
                  className="text-blue-600 underline font-mono hover:text-blue-800"
                >
                  BUG-2026-9120
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export to GitHub Modal */}
      <ExportGitHubModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />
    </>
  );
};
