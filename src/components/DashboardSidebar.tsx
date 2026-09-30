import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardSidebar: React.FC = () => {
  const { 
    applications, 
    currentUser, 
    setActiveTab, 
    setSelectedApplicationForTracking,
    setIsLoginModalOpen,
    setLoginModalMode
  } = useApp();

  const userApps = currentUser 
    ? applications.filter(a => a.applicantId === currentUser.id || a.applicantName.toLowerCase().includes(currentUser.name.toLowerCase()))
    : applications.slice(0, 3);

  const handleSelectApp = (app: typeof applications[0]) => {
    setSelectedApplicationForTracking(app);
    setActiveTab('tracking');
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Disbursed':
        return 'border-emerald-500 bg-emerald-50/70 text-emerald-900';
      case 'Under Review':
      case 'Submitted':
        return 'border-blue-500 bg-blue-50/70 text-blue-900';
      case 'Needs Additional Requirements':
        return 'border-amber-500 bg-amber-50/70 text-amber-900';
      default:
        return 'border-gray-300 bg-gray-50/80 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Disbursed':
        return 'bg-emerald-100 text-emerald-800';
      case 'Under Review':
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Needs Additional Requirements':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <aside className="w-full flex flex-col space-y-6">
      {/* My Applications Card matching Design HTML */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-gray-700 flex items-center uppercase text-xs tracking-wider">
            <FileText className="w-4 h-4 mr-2 text-blue-600" />
            My Applications
          </h2>
          <span className="text-[11px] font-semibold text-gray-500">
            {userApps.length} active
          </span>
        </div>

        <div className="p-4 space-y-3.5 flex-1">
          {userApps.length === 0 ? (
            <div className="text-center py-6 text-xs text-gray-500">
              <p>No active applications yet.</p>
              <button
                onClick={() => setActiveTab('programs')}
                className="mt-2 text-blue-600 font-bold hover:underline inline-block"
              >
                Apply for a program →
              </button>
            </div>
          ) : (
            userApps.map(app => (
              <div 
                key={app.id}
                onClick={() => handleSelectApp(app)}
                className={`p-3.5 border-l-4 rounded-r-xl cursor-pointer hover:shadow-xs transition-all ${getBorderColor(app.status)}`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold truncate">
                    {app.programTitle}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight shrink-0 ${getStatusBadgeColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Ref: <span className="font-mono font-medium">{app.referenceCode}</span> • {app.submissionDate}
                </p>

                {/* Progress bar simulation for in-review / approved */}
                <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      app.status === 'Approved' || app.status === 'Disbursed'
                        ? 'bg-emerald-600 w-full'
                        : app.status === 'Needs Additional Requirements'
                        ? 'bg-amber-500 w-1/3'
                        : 'bg-blue-600 w-2/3'
                    }`}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-gray-50/50 border-t border-gray-100">
          <button 
            onClick={() => setActiveTab('tracking')}
            className="w-full text-xs text-blue-600 font-bold hover:text-blue-800 hover:underline flex items-center justify-center gap-1"
          >
            View All Tracking History &rarr;
          </button>
        </div>
      </div>

      {/* Need Help? Dark Blue Callout Card strictly matching Design HTML */}
      <div className="bg-[#1E3A8A] text-white p-6 rounded-xl relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <h3 className="text-lg font-bold">Need Help?</h3>
          <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
            Visit the Barangay Bugo Hall or contact the Assistance Helpdesk via 0917-BUGO-INFO.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a 
              href="tel:0888552341"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#1E3A8A] hover:bg-blue-50 rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              (088) 855-2341
            </a>
            <button
              onClick={() => setActiveTab('about')}
              className="inline-flex items-center gap-1 px-3 py-2 bg-blue-700/70 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Citizen Charter
            </button>
          </div>
        </div>
        
        {/* Subtle decorative background watermark */}
        <div className="absolute right-[-15px] bottom-[-15px] opacity-10 pointer-events-none">
          <ShieldCheck className="w-36 h-36" />
        </div>
      </div>
    </aside>
  );
};
