import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  ArrowLeft, 
  Megaphone, 
  Phone, 
  MapPin, 
  Search, 
  Clock, 
  HeartHandshake,
  CheckCircle,
  Building2,
  Calendar,
  X
} from 'lucide-react';
import { BugoLogo, BugoSealEmblem } from '../BugoLogo';
import { useApp } from '../../context/AppContext';
import { AssistanceProgram } from '../../types';

export const GuestPortalView: React.FC = () => {
  const { 
    setAuthView, 
    programs, 
    announcements, 
    searchQuery, 
    setSearchQuery 
  } = useApp();

  const [selectedProgram, setSelectedProgram] = useState<AssistanceProgram | null>(null);

  const cleanQ = (searchQuery || '').trim().toLowerCase();
  const filteredPrograms = cleanQ 
    ? programs.filter(p => p.title.toLowerCase().includes(cleanQ) || p.category.toLowerCase().includes(cleanQ))
    : programs;

  const filteredAnnouncements = cleanQ
    ? announcements.filter(a => a.title.toLowerCase().includes(cleanQ) || a.description.toLowerCase().includes(cleanQ))
    : announcements;

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex flex-col justify-between text-gray-800 font-sans antialiased">
      {/* Top Public Header */}
      <header className="bg-white border-b border-gray-200 px-6 sm:px-10 py-3.5 sticky top-0 z-30 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAuthView('welcome')}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Welcome Screen</span>
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <BugoLogo size="sm" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAuthView('login')}
            className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-[#0c532b]" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => setAuthView('register')}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0c532b] hover:bg-[#094222] rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>
      </header>

      {/* Main Guest Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-linear-to-r from-[#0c532b] to-[#15803d] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 backdrop-blur-xs text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Public Citizen Portal • Barangay Bugo, CDO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Barangay Bugo Public Services
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Explore available citizen assistance programs, public advisories, and barangay contacts. Sign in or register to submit applications online.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 text-xs space-y-2 flex-shrink-0">
            <p className="font-bold text-emerald-200">Are you a resident of Bugo?</p>
            <button
              onClick={() => setAuthView('register')}
              className="w-full py-2.5 px-4 bg-white text-[#0c532b] font-extrabold rounded-xl shadow-xs hover:bg-emerald-50 transition text-center block"
            >
              Register for Resident Account
            </button>
          </div>
        </div>

        {/* Public Services List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#0c532b]" />
                <span>Citizen Assistance Programs & Clearances</span>
              </h2>
              <p className="text-xs text-gray-500">Official services available for all verified residents</p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-xs pl-9 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#0c532b]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredPrograms.map(prog => (
              <div 
                key={prog.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-[#0c532b]">
                      {prog.category}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {prog.processingTime}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-gray-700 mb-1">Key Requirements:</p>
                    <ul className="text-[11px] text-gray-500 space-y-1">
                      {prog.requirements.slice(0, 2).map((req, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-[#0c532b] flex-shrink-0" />
                          <span className="truncate">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-800">{prog.badgeText}</span>
                  <button
                    onClick={() => setAuthView('login')}
                    className="px-4 py-2 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-xl transition shadow-xs"
                  >
                    Apply Online
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public Announcements */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-600" />
              <span>Public Announcements & Advisories</span>
            </h2>
            <p className="text-xs text-gray-500">Official bulletins released by Sangguniang Barangay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredAnnouncements.map(ann => (
              <div key={ann.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                    {ann.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{ann.date}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">{ann.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{ann.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Barangay Hall & Contact Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
              <Building2 className="w-4 h-4 text-[#0c532b]" />
              <span>Barangay Bugo Hall</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              National Highway, Bugo, Cagayan de Oro City, Misamis Oriental 9000
            </p>
            <p className="text-gray-400">Office Hours: Monday - Friday, 8:00 AM - 5:00 PM</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
              <Phone className="w-4 h-4 text-[#0c532b]" />
              <span>Barangay Bugo Contact Info</span>
            </div>
            <p className="text-gray-600 font-medium">Barangay Desk: (088) 855-1234</p>
            <p className="text-gray-600 font-medium">Bugo Health Center: (088) 855-5678</p>
            <p className="text-gray-400">Email: assistance@barangaybugo.gov.ph</p>
          </div>

          <div className="space-y-2 flex flex-col justify-between">
            <div>
              <p className="font-bold text-gray-900 text-sm">Ready to access services?</p>
              <p className="text-gray-500 mt-1">Create an account to apply for assistance and track approvals.</p>
            </div>
            <button
              onClick={() => setAuthView('register')}
              className="py-2.5 px-4 bg-[#0c532b] text-white font-bold rounded-xl hover:bg-[#094222] transition text-center shadow-xs"
            >
              Sign Up as Resident
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-5 px-6 text-center text-xs text-gray-500 space-y-1">
        <div>
          <p className="font-bold text-gray-800 text-xs sm:text-sm">
            Bugo Sync List • Sangguniang Barangay of Bugo
          </p>
          <p className="mt-0.5 text-[11px] text-gray-500">
            Barangay Public Services & Citizen Administration System • Cagayan de Oro City
          </p>
        </div>
      </footer>
    </div>
  );
};
