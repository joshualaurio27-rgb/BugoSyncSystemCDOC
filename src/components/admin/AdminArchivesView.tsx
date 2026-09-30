import React, { useState } from 'react';
import { 
  Archive, 
  Clock, 
  Trash2, 
  RotateCcw, 
  Search, 
  Filter, 
  ShieldCheck, 
  Activity, 
  Plus, 
  X, 
  FileText, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Server,
  Download,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BUGO_PUROKS } from '../../data/mockData';
import { ActivityLogItem, ArchiveItem } from '../../types';

export const AdminArchivesView: React.FC = () => {
  const { 
    activityLogs, 
    archivedItems, 
    residentsList, 
    restoreArchivedItem, 
    deleteArchivedItemPermanently, 
    logActivity,
    archiveRecord
  } = useApp();

  const [activeTab, setActiveTab] = useState<'attendance' | 'archives' | 'system-status'>('attendance');
  const [searchFilter, setSearchFilter] = useState('');
  const [purokFilter, setPurokFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Time-in/Time-out modal
  const [showLogModal, setShowLogModal] = useState(false);
  const [logForm, setLogForm] = useState({
    residentName: 'Maria Clara Santos',
    actionType: 'Time-In' as ActivityLogItem['actionType'],
    locationOrService: 'Front Desk - Window 1 (General Inquiries)',
    officerInCharge: 'Desk Officer Elena',
    details: 'Physical visit to Barangay Hall for inquiries.'
  });

  // Archive new item modal
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archForm, setArchForm] = useState({
    title: '',
    originalCategory: 'Document' as ArchiveItem['originalCategory'],
    referenceCode: '',
    reasonForArchive: ''
  });

  const handleRecordTimeIn = (e: React.FormEvent) => {
    e.preventDefault();
    const resident = residentsList.find(r => r.name === logForm.residentName);
    logActivity({
      residentName: logForm.residentName,
      residentIdNumber: resident?.residentIdNumber || 'BG-RES-000',
      purok: resident?.purok || 'Zone 1 - Centro Riverside',
      actionType: logForm.actionType,
      locationOrService: logForm.locationOrService,
      officerInCharge: logForm.officerInCharge,
      status: 'Completed',
      details: logForm.details
    });
    setShowLogModal(false);
    setLogForm({
      residentName: 'Maria Clara Santos',
      actionType: 'Time-In',
      locationOrService: 'Front Desk - Window 1 (General Inquiries)',
      officerInCharge: 'Desk Officer Elena',
      details: 'Physical visit to Barangay Hall for inquiries.'
    });
  };

  const handleArchiveNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    archiveRecord({
      title: archForm.title,
      originalCategory: archForm.originalCategory,
      referenceCode: archForm.referenceCode || `BG-ARCH-${Math.floor(1000 + Math.random() * 9000)}`,
      deletedBy: 'Hon. Juan Dela Cruz (Brgy. Admin)',
      reasonForArchive: archForm.reasonForArchive || 'Routine administrative archiving.',
      originalData: { note: 'Manual archive file entry' }
    });
    setShowArchiveModal(false);
    setArchForm({ title: '', originalCategory: 'Document', referenceCode: '', reasonForArchive: '' });
  };

  // Filtered attendance logs
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.residentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.residentIdNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.locationOrService.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.officerInCharge.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesPurok = purokFilter === 'All' || log.purok === purokFilter;
    return matchesSearch && matchesPurok;
  });

  // Filtered archived files
  const filteredArchives = archivedItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (item.referenceCode && item.referenceCode.toLowerCase().includes(searchFilter.toLowerCase())) ||
      item.reasonForArchive.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.originalCategory === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Archives & Activity Logs
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Track resident Time-In / Time-Out logs, manage archived records, and monitor system status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'attendance' ? (
            <button
              onClick={() => setShowLogModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Record Resident Time-In / Out</span>
            </button>
          ) : activeTab === 'archives' ? (
            <button
              onClick={() => setShowArchiveModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold transition shadow-xs"
            >
              <Archive className="w-4 h-4" />
              <span>Archive Record / File</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* System Status Tracking Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0c532b] flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">System State</p>
            <p className="text-sm font-extrabold text-emerald-700 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational & Synced
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Time-In Logs</p>
            <p className="text-xl font-extrabold text-gray-900 mt-0.5">
              {activityLogs.length} Logged
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Archived Files</p>
            <p className="text-xl font-extrabold text-gray-900 mt-0.5">
              {archivedItems.length} Records
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Audit Security</p>
            <p className="text-sm font-extrabold text-gray-800 mt-0.5">
              Verified Immutable
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-gray-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`pb-3.5 transition flex items-center gap-2 ${
            activeTab === 'attendance'
              ? 'text-[#0c532b] border-b-2 border-[#0c532b]'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Resident Time-In / Time-Out Logs</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            {activityLogs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('archives')}
          className={`pb-3.5 transition flex items-center gap-2 ${
            activeTab === 'archives'
              ? 'text-[#0c532b] border-b-2 border-[#0c532b]'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>Archived & Deleted Files</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            {archivedItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('system-status')}
          className={`pb-3.5 transition flex items-center gap-2 ${
            activeTab === 'system-status'
              ? 'text-[#0c532b] border-b-2 border-[#0c532b]'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>System Status & Audit</span>
        </button>
      </div>

      {/* 1. Resident Time-In / Time-Out Logs Tab */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-gray-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by resident name, ID, desk..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-gray-50 text-xs pl-9 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#0c532b]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-500">Zone / Purok:</span>
              <select
                value={purokFilter}
                onChange={(e) => setPurokFilter(e.target.value)}
                className="bg-gray-50 text-xs px-3 py-2 rounded-xl border border-gray-200 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
              >
                <option value="All">All Zones (1-10)</option>
                {BUGO_PUROKS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-4">Resident & ID</th>
                    <th className="py-3.5 px-4">Action Type</th>
                    <th className="py-3.5 px-4">Service Window / Location</th>
                    <th className="py-3.5 px-4">Officer on Duty</th>
                    <th className="py-3.5 px-4">Timestamp</th>
                    <th className="py-3.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        No activity records found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/80 transition">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-gray-900">{log.residentName}</p>
                          <p className="text-[11px] text-gray-400 font-mono">{log.residentIdNumber} • {log.purok}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            log.actionType === 'Time-In' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : log.actionType === 'Time-Out'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            <Clock className="w-3 h-3" />
                            <span>{log.actionType}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-gray-800">{log.locationOrService}</p>
                          {log.details && <p className="text-[10px] text-gray-400 truncate max-w-xs">{log.details}</p>}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-gray-600">
                          {log.officerInCharge}
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                          {log.timestamp}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-50 text-[#0c532b]">
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Archived & Deleted Files Tab */}
      {activeTab === 'archives' && (
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-gray-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search archived files, ref code, reason..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-gray-50 text-xs pl-9 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#0c532b]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-500">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-gray-50 text-xs px-3 py-2 rounded-xl border border-gray-200 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
              >
                <option value="All">All Categories</option>
                <option value="Resident Record">Resident Record</option>
                <option value="Service Application">Service Application</option>
                <option value="Blotter Report">Blotter Report</option>
                <option value="Document">Document</option>
                <option value="Notice">Notice</option>
              </select>
            </div>
          </div>

          {/* Archived Records Grid / Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredArchives.length === 0 ? (
              <div className="md:col-span-3 py-12 text-center text-gray-400 bg-white rounded-2xl border border-gray-200">
                No archived records found.
              </div>
            ) : (
              filteredArchives.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                        {item.originalCategory}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {item.referenceCode}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      <strong>Reason:</strong> {item.reasonForArchive}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] text-gray-400">
                      <p>Archived by: <strong className="text-gray-700">{item.deletedBy}</strong></p>
                      <p>Date: {item.deletedAt}</p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => restoreArchivedItem(item.id)}
                        className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#0c532b] font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteArchivedItemPermanently(item.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                        title="Permanent Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 3. System Status & Audit Tab */}
      {activeTab === 'system-status' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                System Status & Administrative Diagnostic Center
              </h3>
              <p className="text-xs text-gray-500">
                Real-time metrics, node uptime, and data integrity verification for Barangay Bugo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1 text-xs">
                <p className="font-bold text-gray-500">Database Sync Engine</p>
                <p className="text-base font-extrabold text-[#0c532b]">100% Real-Time Synchronized</p>
                <p className="text-[11px] text-gray-400">Zero latency across Admin & Resident portals</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1 text-xs">
                <p className="font-bold text-gray-500">Data Redundancy & Backups</p>
                <p className="text-base font-extrabold text-blue-700">Encrypted Cloud Storage</p>
                <p className="text-[11px] text-gray-400">Hourly snapshot automated</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1 text-xs">
                <p className="font-bold text-gray-500">Role-Based Access Control</p>
                <p className="text-base font-extrabold text-indigo-700">Strict Official Multi-Role</p>
                <p className="text-[11px] text-gray-400">Admin status modification rights strictly locked</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0c532b]" />
                <span>Barangay Bugo Portal System Status: Fully Operational</span>
              </p>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                All citizen services, clearance generation routines, real-time notifications, and archive logs are operating at normal capacity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal 1: Record Resident Time-In / Time-Out */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Record Resident Attendance / Visit</h3>
              <button onClick={() => setShowLogModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordTimeIn} className="space-y-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Resident</label>
                <select
                  value={logForm.residentName}
                  onChange={(e) => setLogForm({ ...logForm, residentName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                >
                  {residentsList.map(r => (
                    <option key={r.id} value={r.name}>{r.name} ({r.residentIdNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Action Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLogForm({ ...logForm, actionType: 'Time-In' })}
                    className={`py-2 rounded-xl font-bold transition text-xs ${
                      logForm.actionType === 'Time-In' ? 'bg-[#0c532b] text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Time-In (Entry)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogForm({ ...logForm, actionType: 'Time-Out' })}
                    className={`py-2 rounded-xl font-bold transition text-xs ${
                      logForm.actionType === 'Time-Out' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Time-Out (Exit)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Service Desk / Location</label>
                <input
                  type="text"
                  required
                  value={logForm.locationOrService}
                  onChange={(e) => setLogForm({ ...logForm, locationOrService: e.target.value })}
                  placeholder="e.g. Front Desk - Window 1, Health Center, SK Office"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Officer on Duty</label>
                <input
                  type="text"
                  required
                  value={logForm.officerInCharge}
                  onChange={(e) => setLogForm({ ...logForm, officerInCharge: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Notes / Purpose of Visit</label>
                <textarea
                  rows={2}
                  value={logForm.details}
                  onChange={(e) => setLogForm({ ...logForm, details: e.target.value })}
                  placeholder="Purpose of visit..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Archive File */}
      {showArchiveModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Archive Record / File</h3>
              <button onClick={() => setShowArchiveModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleArchiveNewItem} className="space-y-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Record Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Expired Barangay Certificate, Closed Permit"
                  value={archForm.title}
                  onChange={(e) => setArchForm({ ...archForm, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Original Category</label>
                <select
                  value={archForm.originalCategory}
                  onChange={(e) => setArchForm({ ...archForm, originalCategory: e.target.value as any })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                >
                  <option value="Document">Document</option>
                  <option value="Resident Record">Resident Record</option>
                  <option value="Service Application">Service Application</option>
                  <option value="Blotter Report">Blotter Report</option>
                  <option value="Notice">Notice</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Reference Code (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. BG-CLR-2025-098"
                  value={archForm.referenceCode}
                  onChange={(e) => setArchForm({ ...archForm, referenceCode: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Reason for Archiving</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Annual renewal completed, duplicate resolved, case amicably closed."
                  value={archForm.reasonForArchive}
                  onChange={(e) => setArchForm({ ...archForm, reasonForArchive: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowArchiveModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
                >
                  Archive Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
