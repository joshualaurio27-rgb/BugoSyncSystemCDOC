import React, { useState } from 'react';
import { 
  Users, 
  FileCheck2, 
  UserCheck, 
  Megaphone, 
  Plus, 
  UserPlus, 
  FileText, 
  ArrowUpRight, 
  Calendar, 
  ChevronRight, 
  Volume2, 
  Trash2, 
  Lightbulb, 
  Droplet, 
  Cross, 
  Activity, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminDashboardViewProps {
  onNavigateTab: (tab: 'dashboard' | 'residents' | 'status-tracking' | 'announcements' | 'settings') => void;
  onOpenNewResidentModal: () => void;
  onOpenNewAnnouncementModal: () => void;
  onOpenClearanceModal: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onNavigateTab,
  onOpenNewResidentModal,
  onOpenNewAnnouncementModal,
  onOpenClearanceModal
}) => {
  const { 
    complaints, 
    announcements, 
    residentsList, 
    applications 
  } = useApp();

  const [selectedYear, setSelectedYear] = useState('2026');

  // Chart data from mock
  const ageBreakdown = [
    { label: '0-12', value: 2.1, max: 5 },
    { label: '13-25', value: 4.2, max: 5 },
    { label: '26-40', value: 4.9, max: 5 },
    { label: '41-59', value: 2.8, max: 5 },
    { label: '60+', value: 1.4, max: 5 },
  ];

  const pendingRegistrationsCount = residentsList.filter(r => r.registrationStatus === 'Pending Approval').length;
  const pendingAppsCount = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Key metrics, resident services, and administrative status for Brgy. Bugo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenNewAnnouncementModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#dbe8f6] hover:bg-[#c9dff4] text-[#1e3a8a] text-sm font-semibold rounded-lg transition shadow-xs"
          >
            <Megaphone className="w-4 h-4" />
            <span>Post Announcement</span>
          </button>

          <button 
            onClick={onOpenNewResidentModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#0c532b] hover:bg-[#094222] text-white text-sm font-semibold rounded-lg transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Register Resident</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Residents */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Residents</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c532b] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">15,420</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +3.2%
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Verified in official database</p>
        </div>

        {/* Card 2: Service Applications In Review / Status Tracking */}
        <div 
          onClick={() => onNavigateTab('status-tracking')}
          className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#0c532b] transition"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Service Applications</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">{applications.length}</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {pendingAppsCount} for review
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '67%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1.5">Status Tracking Managed in Admin</p>
          </div>
        </div>

        {/* Card 3: Pending Registration Approvals */}
        <div 
          onClick={() => onNavigateTab('residents')}
          className={`rounded-2xl p-5 border shadow-xs flex flex-col justify-between cursor-pointer transition ${
            pendingRegistrationsCount > 0 
              ? 'bg-[#fff5f5] border-[#fecaca] hover:border-rose-400' 
              : 'bg-white border-gray-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                pendingRegistrationsCount > 0 ? 'text-rose-700' : 'text-gray-500'
              }`}>
                Registration Approvals
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                pendingRegistrationsCount > 0 ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-600'
              }`}>
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-3xl font-extrabold ${
                pendingRegistrationsCount > 0 ? 'text-rose-900' : 'text-gray-900'
              }`}>
                {pendingRegistrationsCount}
              </span>
              <span className="text-xs font-bold text-rose-600">
                {pendingRegistrationsCount > 0 ? 'Action Required' : 'All clear'}
              </span>
            </div>
          </div>
          <p className="text-xs text-rose-600 mt-4 font-medium">Click to review & approve registrations</p>
        </div>

        {/* Card 4: Published Announcements */}
        <div 
          onClick={() => onNavigateTab('announcements')}
          className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between cursor-pointer hover:border-gray-300 transition"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Announcements</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c532b] flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">{announcements.length}</span>
              <span className="text-xs font-semibold text-emerald-600">Active</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Public notices for Bugo citizens</p>
        </div>
      </div>

      {/* Middle Grid: Demographics & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Resident Demographics */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-900">Resident Demographics</h2>
              <p className="text-xs text-gray-400">Age distribution across Barangay Bugo zones</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-semibold">
              <button 
                onClick={() => setSelectedYear('2026')}
                className={`px-3 py-1 rounded-md transition ${selectedYear === '2026' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'}`}
              >
                2026
              </button>
              <button 
                onClick={() => setSelectedYear('2025')}
                className={`px-3 py-1 rounded-md transition ${selectedYear === '2025' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'}`}
              >
                2025
              </button>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Age Group</span>
              <span>Population (in thousands)</span>
            </div>

            {ageBreakdown.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>{item.label} yrs</span>
                  <span>{item.value.toFixed(1)}k ({((item.value / 15.4) * 100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-[#0c532b] h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Total Census: <strong>15,420 Citizens</strong></span>
            <button 
              onClick={() => onNavigateTab('residents')}
              className="text-[#0c532b] font-bold hover:underline"
            >
              View Full Registry &rarr;
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Quick Actions */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">Administrative Actions</h2>
            <p className="text-xs text-gray-400 mb-4">Core operational shortcuts for Barangay Bugo staff</p>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onNavigateTab('residents')}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-[#ebf4ef] border border-gray-200 hover:border-[#0c532b] rounded-xl transition text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#0c532b] flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800">Approve Registrations</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Verify resident accounts</span>
              </button>

              <button 
                onClick={() => onNavigateTab('status-tracking')}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-500 rounded-xl transition text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-blue-700 flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800">Status Tracking</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Evaluate service requests</span>
              </button>

              <button 
                onClick={onOpenNewAnnouncementModal}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-500 rounded-xl transition text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
                  <Megaphone className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800">Post Announcement</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Publish community notice</span>
              </button>

              <button 
                onClick={onOpenClearanceModal}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-500 rounded-xl transition text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-amber-700 flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800">Issue Clearance</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Official doc generator</span>
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0c532b] text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-[#0c532b]">System Online & Synchronized</p>
              <p className="text-emerald-700 text-[11px]">Direct realtime link between Resident and Admin portals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Complaints & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6: Recent Complaints */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Recent Citizen Helpdesk Reports</h2>
              <p className="text-xs text-gray-400">Community issues logged by residents</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
              {complaints.length} reports
            </span>
          </div>

          <div className="space-y-3">
            {complaints.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className="p-3.5 bg-gray-50/80 hover:bg-gray-100/80 rounded-xl border border-gray-200/80 transition flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.category === 'Noise' && <Volume2 className="w-4 h-4 text-amber-600" />}
                    {item.category === 'Sanitation' && <Trash2 className="w-4 h-4 text-rose-600" />}
                    {item.category === 'Infrastructure' && <Lightbulb className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{item.title}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                      <span>{item.reporterName}</span>
                      <span>•</span>
                      <span>{item.purok}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {item.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  item.status === 'Pending' 
                    ? 'bg-amber-100 text-amber-800'
                    : item.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6: Recent Announcements */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Official Announcements</h2>
              <p className="text-xs text-gray-400">Public advisories posted on resident portal</p>
            </div>
            <button 
              onClick={() => onNavigateTab('announcements')}
              className="text-xs font-bold text-[#0c532b] hover:underline"
            >
              View All &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className="p-3.5 bg-gray-50/80 hover:bg-gray-100/80 rounded-xl border border-gray-200/80 transition flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0c532b] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.iconType === 'water' && <Droplet className="w-4 h-4" />}
                  {item.iconType === 'medical' && <Cross className="w-4 h-4" />}
                  {item.iconType === 'sports' && <Trophy className="w-4 h-4" />}
                  {item.iconType === 'general' && <Megaphone className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-900 truncate">{item.title}</h3>
                    <span className="text-[10px] font-semibold text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
