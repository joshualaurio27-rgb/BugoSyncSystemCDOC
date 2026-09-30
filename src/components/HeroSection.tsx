import React from 'react';
import { 
  FileText, 
  Users, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Coins, 
  GraduationCap, 
  Home, 
  HeartPulse, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setSelectedProgramForApply, programs, setSelectedProgramForDetail, currentUser } = useApp();

  const handleApplyProgram = (category: string) => {
    const prog = programs.find(p => p.category.toLowerCase() === category.toLowerCase()) || programs[0];
    if (prog) {
      setSelectedProgramForApply(prog);
    } else {
      setActiveTab('programs');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Welcome & Stats Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              Official Bugo E-Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            {currentUser ? `Welcome back, ${currentUser.name}!` : 'Welcome to Barangay Bugo Resident Portal'}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1 max-w-2xl">
            Access community support services, apply for social assistance, and track your records in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-blue-50 p-3.5 rounded-xl text-center min-w-[110px] border border-blue-100">
            <span className="block text-[11px] uppercase text-blue-600 font-bold tracking-wider">Active Programs</span>
            <span className="text-2xl font-black text-blue-900 leading-tight">04</span>
          </div>
          <div className="bg-emerald-50 p-3.5 rounded-xl text-center min-w-[110px] border border-emerald-100">
            <span className="block text-[11px] uppercase text-emerald-600 font-bold tracking-wider">Processed</span>
            <span className="text-2xl font-black text-emerald-900 leading-tight">1.2k+</span>
          </div>
        </div>
      </div>

      {/* Main 4 Pillars Category Grid from Design HTML */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cash Assistance */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Cash Assistance</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4 leading-relaxed">
              Financial aid for low-income families and individuals in crisis situations.
            </p>
          </div>
          <button 
            onClick={() => handleApplyProgram('Emergency')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-xs"
          >
            Apply Now
          </button>
        </div>

        {/* Scholarship Program */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Scholarship Support</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4 leading-relaxed">
              Educational grants for deserving high school and tertiary students in Bugo.
            </p>
          </div>
          <button 
            onClick={() => handleApplyProgram('Education')}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all shadow-xs"
          >
            Apply Now
          </button>
        </div>

        {/* Housing / Livelihood Support */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-105 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Livelihood Toolkits</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4 leading-relaxed">
              Starter equipment, micro-grant starter kits, and livelihood development support.
            </p>
          </div>
          <button 
            onClick={() => handleApplyProgram('Livelihood')}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-all shadow-xs"
          >
            Apply Now
          </button>
        </div>

        {/* Medical Aid */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Medical Aid</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4 leading-relaxed">
              Maintenance medicine subsidies and hospital bills for indigent Bugo patients.
            </p>
          </div>
          <button 
            onClick={() => handleApplyProgram('Medical')}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-all shadow-xs"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Trust & SLA Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600 shadow-sm">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Digital Document Verification</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>48-Hour Barangay Social Worker Triage SLA</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('tracking')}
          className="text-blue-600 font-bold hover:underline flex items-center gap-1"
        >
          Check Existing Application <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
