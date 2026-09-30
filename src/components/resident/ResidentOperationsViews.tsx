import React, { useState } from 'react';
import { 
  HeartHandshake, 
  FileText, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  MessageSquare, 
  Upload, 
  Search, 
  Download, 
  CheckCircle, 
  HelpCircle, 
  FileCheck2, 
  ShieldCheck, 
  Building, 
  GraduationCap, 
  Activity, 
  ChevronRight, 
  Send, 
  Printer, 
  X,
  Phone,
  DollarSign,
  Globe,
  Briefcase,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssistanceProgram, ComplaintItem } from '../../types';
import { BUGO_PUROKS, MONTHLY_INCOME_OPTIONS, NATIONALITY_OPTIONS } from '../../data/mockData';

// ----------------------------------------------------
// 1. RESIDENT DASHBOARD VIEW
// ----------------------------------------------------
export const ResidentDashboardView: React.FC<{
  onApplyProgram: (prog: AssistanceProgram) => void;
  onNavigateTab: (tab: 'dashboard' | 'services' | 'complaints' | 'announcements' | 'profile') => void;
}> = ({ onApplyProgram, onNavigateTab }) => {
  const { currentUser, programs, announcements } = useApp();

  const isVerified = currentUser?.isVerified;

  return (
    <div className="space-y-6">
      {/* Available Barangay Services (3 Samples) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Available Barangay Services & Programs</h2>
            <p className="text-xs text-gray-500">Official assistance programs and certifications for Bugo residents</p>
          </div>
          <button
            onClick={() => onNavigateTab('services')}
            className="text-xs font-bold text-[#0c532b] hover:underline"
          >
            View All Services &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programs.slice(0, 3).map((prog) => (
            <div 
              key={prog.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-[#0c532b] transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0c532b]">
                    {prog.category}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400">{prog.processingTime}</span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0c532b] transition">
                  {prog.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {prog.tagline}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700">{prog.badgeText}</span>
                <button
                  onClick={() => onApplyProgram(prog)}
                  className="px-3.5 py-1.5 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Helpdesk report */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Community Helpdesk</h3>
              <p className="text-xs text-gray-500">Report noise disturbances, sanitation, or streetlight issues</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('complaints')}
            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition flex-shrink-0"
          >
            File Report
          </button>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Barangay Announcements</h3>
              <p className="text-xs text-gray-500">Check water interruptions, SK leagues, and medical missions</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('announcements')}
            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition flex-shrink-0"
          >
            View News
          </button>
        </div>
      </div>
    </div>
  );
};


// ----------------------------------------------------
// 2. RESIDENT SERVICES DIRECTORY & APPLICATION VIEW
// ----------------------------------------------------
export const ResidentServicesView: React.FC<{
  onApplyProgram: (prog: AssistanceProgram) => void;
}> = ({ onApplyProgram }) => {
  const { programs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = programs.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Barangay Services & Assistance Programs
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Select a service below to open the official registration fill-up form.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0c532b]"
          />
        </div>
      </div>

      {/* Services Grid (3 Samples) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPrograms.map((prog) => (
          <div 
            key={prog.id}
            className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="h-44 w-full bg-gray-100 relative overflow-hidden">
                <img 
                  src={prog.imageUrl} 
                  alt={prog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0c532b] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {prog.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {prog.processingTime}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h2 className="text-base font-extrabold text-gray-900 leading-snug">
                  {prog.title}
                </h2>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                {/* Requirements Checklist */}
                <div className="pt-2">
                  <h4 className="text-[11px] font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Key Requirements:
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {prog.requirements.slice(0, 3).map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0c532b] flex-shrink-0 mt-0.5" />
                        <span className="text-[11px]">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onApplyProgram(prog)}
                className="w-full py-3 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Fill Up Application Form</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ----------------------------------------------------
// 3. RESIDENT COMPLAINTS & HELPDESK VIEW
// ----------------------------------------------------
export const ResidentComplaintsView: React.FC = () => {
  const { complaints, addComplaint, currentUser } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [compForm, setCompForm] = useState({
    title: '',
    category: 'Noise' as const,
    purok: currentUser?.purok || BUGO_PUROKS[0],
    description: ''
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint({
      title: compForm.title,
      category: compForm.category,
      purok: compForm.purok,
      description: compForm.description,
      reporterName: currentUser?.name || 'Resident',
      reporterId: currentUser?.id || 'user-resident',
      contactNumber: currentUser?.contactNumber || '0917 555 4321'
    });
    setShowModal(false);
    setCompForm({ title: '', category: 'Noise', purok: BUGO_PUROKS[0], description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Community Helpdesk & Incident Filing
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Submit public concerns directly to Barangay Bugo peace and order officers.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0c532b] hover:bg-[#094222] text-white text-sm font-semibold rounded-lg transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>File Community Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.map((comp) => (
          <div key={comp.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                  {comp.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  comp.status === 'Pending' 
                    ? 'bg-amber-100 text-amber-800' 
                    : comp.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {comp.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-gray-900 mt-2">{comp.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-3">{comp.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Location: {comp.purok}</span>
                <span>{comp.timeAgo}</span>
              </div>
              {comp.adminRemarks && (
                <p className="text-emerald-700 font-semibold text-[10px]">
                  Action: {comp.adminRemarks}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">File Citizen Report</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Issue Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uncollected Garbage in Zone 2"
                  value={compForm.title}
                  onChange={(e) => setCompForm({ ...compForm, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={compForm.category}
                    onChange={(e) => setCompForm({ ...compForm, category: e.target.value as any })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  >
                    <option value="Noise">Noise Disturbance</option>
                    <option value="Sanitation">Sanitation / Garbage</option>
                    <option value="Infrastructure">Streetlight / Road</option>
                    <option value="Security">Peace & Order</option>
                    <option value="Other">Other Concern</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Purok / Zone</label>
                  <select
                    value={compForm.purok}
                    onChange={(e) => setCompForm({ ...compForm, purok: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  >
                    {BUGO_PUROKS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the issue, exact street landmarks, and duration..."
                  value={compForm.description}
                  onChange={(e) => setCompForm({ ...compForm, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0c532b] hover:bg-[#094222] text-white font-bold rounded-xl transition shadow-xs"
              >
                Submit to Barangay Desk
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------
// 4. RESIDENT SETTINGS VIEW (Includes Change Profile & Detail Editing)
// ----------------------------------------------------
export const ResidentSettingsView: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();
  const [photoUrl, setPhotoUrl] = useState(currentUser?.avatarUrl || '');
  
  // Profile Editable Details
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    contactNumber: currentUser?.contactNumber || '',
    nationality: currentUser?.nationality || 'Filipino',
    purok: currentUser?.purok || BUGO_PUROKS[0],
    address: currentUser?.address || '',
    householdIncome: currentUser?.householdIncome || MONTHLY_INCOME_OPTIONS[2],
    familyMembersCount: currentUser?.familyMembersCount || 4,
    occupation: currentUser?.occupation || 'Resident',
    age: currentUser?.age || 30,
    gender: currentUser?.gender || 'Female',
    voterStatus: currentUser?.voterStatus || 'Registered'
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Field validation rules
  const errors: Record<string, string> = {};
  if (!formData.name.trim()) errors.name = 'Full legal name is required';
  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
    errors.email = 'Enter a valid email address';
  }
  
  if (!formData.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (formData.contactNumber.length < 10) {
    errors.contactNumber = 'Enter at least 10-12 digits';
  } else if (formData.contactNumber.length > 12) {
    errors.contactNumber = 'Contact number must not exceed 12 digits';
  }

  if (!formData.nationality) errors.nationality = 'Nationality is required';
  if (!formData.purok) errors.purok = 'Purok / Zone selection is required';
  if (!formData.address.trim()) errors.address = 'Street address is required';
  if (!formData.householdIncome) errors.householdIncome = 'Monthly income selection is required';

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strictly numbers only, max 12 digits
    const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 12);
    setFormData(prev => ({ ...prev, contactNumber: numericOnly }));
  };

  const handleUpdatePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
          updateUserProfile({ avatarUrl: reader.result });
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    setPhotoUrl(url);
    updateUserProfile({ avatarUrl: url });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveProfileDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const allTouched: Record<string, boolean> = {
      name: true,
      email: true,
      contactNumber: true,
      nationality: true,
      purok: true,
      address: true,
      householdIncome: true
    };
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      setErrorMsg('Please complete all highlighted fields marked in red.');
      return;
    }

    updateUserProfile({
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      nationality: formData.nationality,
      purok: formData.purok,
      address: formData.address,
      householdIncome: formData.householdIncome,
      familyMembersCount: Number(formData.familyMembersCount),
      occupation: formData.occupation,
      age: Number(formData.age),
      gender: formData.gender as any,
      voterStatus: formData.voterStatus as any
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const getFieldClass = (field: string) => {
    const isRed = touched[field] && Boolean(errors[field]);
    if (isRed) {
      return 'w-full bg-rose-50/50 border-2 border-rose-500 text-rose-950 rounded-xl px-3 py-2.5 font-medium outline-none ring-2 ring-rose-200 placeholder-rose-400 transition';
    }
    return 'w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-3 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b] transition';
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Resident Account & Profile Settings
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Edit your resident details, change your profile picture, and keep your household records up to date.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 shadow-xs animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Profile details and account updates saved successfully!</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-50 border-2 border-rose-300 p-3.5 rounded-2xl text-xs text-rose-800 font-semibold flex items-start gap-2.5 shadow-xs animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Change Profile Photo Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <User className="w-5 h-5 text-[#0c532b]" />
          <h2 className="text-base font-bold text-gray-900">Change Profile Photo</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-100 shadow-md bg-gray-100 flex items-center justify-center">
              {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
          </div>

          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div>
              <h3 className="text-sm font-bold text-gray-900">{currentUser?.name}</h3>
              <p className="text-xs text-gray-500 font-mono">Resident ID: {currentUser?.residentIdNumber}</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <label className="cursor-pointer px-4 py-2 bg-[#0c532b] hover:bg-[#083c1f] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom Photo</span>
                <input type="file" accept="image/*" onChange={handleUpdatePhoto} className="hidden" />
              </label>

              {currentUser?.avatarUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setPhotoUrl('');
                    updateUserProfile({ avatarUrl: '' });
                  }}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition"
                >
                  Remove Picture
                </button>
              )}
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-semibold text-gray-500 mb-2">Or pick standard avatar preset:</p>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#0c532b] hover:scale-105 transition"
                  >
                    <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Full Profile Details Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0c532b]" />
            <h2 className="text-base font-bold text-gray-900">Edit Resident Information & Details</h2>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Editable Profile
          </span>
        </div>

        <form onSubmit={handleSaveProfileDetails} noValidate className="space-y-5 text-xs">
          {/* Personal & Legal Particulars */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
              Personal & Legal Particulars
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`block font-bold ${touched.name && errors.name ? 'text-rose-600' : 'text-gray-700'}`}>
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  {touched.name && errors.name && (
                    <span className="text-[11px] font-bold text-rose-600">{errors.name}</span>
                  )}
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={getFieldClass('name')}
                  placeholder="Juan Carlos Dela Cruz"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`block font-bold ${touched.email && errors.email ? 'text-rose-600' : 'text-gray-700'}`}>
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  {touched.email && errors.email && (
                    <span className="text-[11px] font-bold text-rose-600">{errors.email}</span>
                  )}
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={getFieldClass('email')}
                  placeholder="name@email.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`block font-bold ${touched.contactNumber && errors.contactNumber ? 'text-rose-600' : 'text-gray-700'}`}>
                    Mobile Contact (12 Digits Max) <span className="text-rose-500">*</span>
                  </label>
                  {touched.contactNumber && errors.contactNumber ? (
                    <span className="text-[11px] font-bold text-rose-600">{errors.contactNumber}</span>
                  ) : (
                    <span className="text-[10px] text-gray-400">{formData.contactNumber.length}/12 digits</span>
                  )}
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    maxLength={12}
                    placeholder="09171234567 or 639171234567"
                    value={formData.contactNumber}
                    onBlur={() => setTouched(prev => ({ ...prev, contactNumber: true }))}
                    onChange={handleContactChange}
                    className={`${getFieldClass('contactNumber')} pl-9`}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`block font-bold ${touched.nationality && errors.nationality ? 'text-rose-600' : 'text-gray-700'}`}>
                    Nationality <span className="text-rose-500">*</span>
                  </label>
                  {touched.nationality && errors.nationality && (
                    <span className="text-[11px] font-bold text-rose-600">{errors.nationality}</span>
                  )}
                </div>
                <div className="relative">
                  <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.nationality}
                    onBlur={() => setTouched(prev => ({ ...prev, nationality: true }))}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className={`${getFieldClass('nationality')} pl-9 font-semibold`}
                  >
                    {NATIONALITY_OPTIONS.map(nat => (
                      <option key={nat} value={nat}>{nat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`block font-bold ${touched.purok && errors.purok ? 'text-rose-600' : 'text-gray-700'}`}>
                    Purok / Zone <span className="text-rose-500">*</span>
                  </label>
                  {touched.purok && errors.purok && (
                    <span className="text-[11px] font-bold text-rose-600">{errors.purok}</span>
                  )}
                </div>
                <select
                  value={formData.purok}
                  onBlur={() => setTouched(prev => ({ ...prev, purok: true }))}
                  onChange={(e) => setFormData({ ...formData, purok: e.target.value })}
                  className={`${getFieldClass('purok')} font-semibold`}
                >
                  {BUGO_PUROKS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Voter Registration Status</label>
                <select
                  value={formData.voterStatus}
                  onChange={(e) => setFormData({ ...formData, voterStatus: e.target.value as any })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                >
                  <option value="Registered">Registered Voter (COMELEC Bugo)</option>
                  <option value="Unregistered">Unregistered / Transfer Pending</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`block font-bold ${touched.address && errors.address ? 'text-rose-600' : 'text-gray-700'}`}>
                  Street Address <span className="text-rose-500">*</span>
                </label>
                {touched.address && errors.address && (
                  <span className="text-[11px] font-bold text-rose-600">{errors.address}</span>
                )}
              </div>
              <input
                type="text"
                value={formData.address}
                onBlur={() => setTouched(prev => ({ ...prev, address: true }))}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={getFieldClass('address')}
                placeholder="House No., Street Name, Bugo, Cagayan de Oro City"
              />
            </div>
          </div>

          {/* Household & Socioeconomic Details */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
              Household & Socioeconomic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`block font-bold ${touched.householdIncome && errors.householdIncome ? 'text-rose-600' : 'text-gray-700'}`}>
                    Monthly Household Income (Select Bracket) <span className="text-rose-500">*</span>
                  </label>
                  {touched.householdIncome && errors.householdIncome && (
                    <span className="text-[11px] font-bold text-rose-600">{errors.householdIncome}</span>
                  )}
                </div>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.householdIncome}
                    onBlur={() => setTouched(prev => ({ ...prev, householdIncome: true }))}
                    onChange={(e) => setFormData({ ...formData, householdIncome: e.target.value })}
                    className={`${getFieldClass('householdIncome')} pl-9 font-semibold`}
                  >
                    {MONTHLY_INCOME_OPTIONS.map((inc) => (
                      <option key={inc} value={inc}>{inc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Family Dependents Count</label>
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={formData.familyMembersCount}
                  onChange={(e) => setFormData({ ...formData, familyMembersCount: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Occupation / Employment</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
                    placeholder="e.g. Market Vendor, Teacher, Carpenter"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="15"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 font-semibold outline-none focus:ring-2 focus:ring-[#0c532b]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              Changes will update your active resident profile immediately.
            </span>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0c532b] hover:bg-[#083c1f] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Update Profile Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ----------------------------------------------------
// 5. RESIDENT HELP & SUPPORT VIEW
// ----------------------------------------------------
export const ResidentHelpView: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [ticketQuery, setTicketQuery] = useState('');

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setTicketQuery('');
      setFeedbackSent(false);
    }, 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Citizen Help Center & Assistance Guide
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Everything you need to know about registering, uploading ID verification, and claiming barangay assistance.
        </p>
      </div>

      {/* Official Helpdesk & Precinct Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0c532b] flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Barangay Bugo Hall Desk</h3>
          <p className="text-xs text-gray-500">National Highway, Bugo, CDO</p>
          <p className="text-xs font-bold text-[#0c532b] bg-gray-50 p-2 rounded-xl border border-gray-200 text-center">Tel: (088) 855-2244</p>
          <p className="text-[11px] text-gray-400 text-center">Mon - Fri • 8:00 AM - 5:00 PM</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">PNP Precinct 6 Bugo</h3>
          <p className="text-xs text-gray-500">Barangay Security & Patrol</p>
          <p className="text-xs font-bold text-blue-700 bg-gray-50 p-2 rounded-xl border border-gray-200 text-center">Mobile: 0917-882-9911</p>
          <p className="text-[11px] text-gray-400 text-center">24/7 Police Assistance</p>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#0c532b]" />
          <span>Step-by-Step Guide for Barangay Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-gray-50 p-4 rounded-2xl space-y-2 border border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-[#0c532b] text-white font-bold flex items-center justify-center text-xs">
              1
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Upload Front & Back ID</h3>
            <p className="text-gray-600 leading-relaxed">
              When applying for assistance, attach clear photos of the Front and Back of your valid government ID (PhilSys, Driver's License, Voter's ID, or Barangay ID).
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-2 border border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-[#0c532b] text-white font-bold flex items-center justify-center text-xs">
              2
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Administrative Verification</h3>
            <p className="text-gray-600 leading-relaxed">
              Barangay Bugo evaluators review all submitted requirements and eligibility data. You will receive live notifications when approved.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-2 border border-gray-100">
            <div className="w-7 h-7 rounded-lg bg-[#0c532b] text-white font-bold flex items-center justify-center text-xs">
              3
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Claim Voucher or Cash</h3>
            <p className="text-gray-600 leading-relaxed">
              Present your Reference Code and Digital ID at the Barangay Cashier or Authorized Merchant to claim your aid.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-gray-900">Send an Inquiry or Support Message</h2>
        <p className="text-xs text-gray-500">
          Have a question about your application or need assistance? Send a message directly to the Barangay Officer on duty.
        </p>

        {feedbackSent ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Thank you! Your inquiry has been forwarded to the Barangay Officer on duty.</span>
          </div>
        ) : (
          <form onSubmit={handleSendFeedback} className="space-y-3 text-xs">
            <textarea
              rows={3}
              required
              value={ticketQuery}
              onChange={(e) => setTicketQuery(e.target.value)}
              placeholder="Describe your inquiry or question here..."
              className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 font-medium outline-none focus:ring-2 focus:ring-[#0c532b]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0c532b] hover:bg-[#083c1f] text-white font-bold rounded-xl transition shadow-xs flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 6. RESIDENT PROFILE & DIGITAL RESIDENT ID CARD (Used in Drawer / Upper Right)
// ----------------------------------------------------
export const ResidentProfileView: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();
  const [photoUrl, setPhotoUrl] = useState(currentUser?.avatarUrl || '');

  const handleUpdatePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
          updateUserProfile({ avatarUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Official Digital Resident ID & Information
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Your centralized digital citizen identity and records in Barangay Bugo, CDO.
        </p>
      </div>

      {/* ID Card Front */}
      <div className="bg-linear-to-br from-[#0c532b] via-[#0f6837] to-[#083a1e] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-emerald-400/30">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-400/30">
          <div>
            <p className="text-[10px] tracking-widest uppercase font-bold text-emerald-200">Republic of the Philippines</p>
            <h2 className="text-base font-extrabold tracking-tight">BARANGAY BUGO</h2>
            <p className="text-[10px] text-emerald-200">Cagayan de Oro City • Northern Mindanao</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white text-[#0c532b] font-extrabold flex items-center justify-center text-lg shadow-sm">
            BG
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/20 border-2 border-white/40 overflow-hidden flex items-center justify-center text-3xl font-extrabold text-white flex-shrink-0 shadow-md">
            {currentUser?.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              currentUser?.name.slice(0, 2).toUpperCase()
            )}
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Official Resident ID</span>
            <h3 className="text-xl font-extrabold tracking-tight">{currentUser?.name}</h3>
            <p className="text-xs text-emerald-100 font-medium">{currentUser?.purok}</p>
            <p className="text-[11px] text-emerald-200/80">{currentUser?.address}</p>
            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="px-2.5 py-0.5 bg-white/20 text-white rounded-md text-[10px] font-mono font-bold">
                {currentUser?.residentIdNumber}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-400 text-emerald-950 rounded-md text-[10px] font-bold">
                Voter: {currentUser?.voterStatus || 'Registered'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                currentUser?.isVerified ? 'bg-emerald-300 text-emerald-950' : 'bg-amber-300 text-amber-950'
              }`}>
                {currentUser?.isVerified ? 'Verified Citizen' : 'Pending Verification'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-400/30 flex justify-between items-center text-[10px] text-emerald-200">
          <span>Registered: {currentUser?.registeredDate}</span>
          <span className="font-bold text-white uppercase">Valid & Certified</span>
        </div>
      </div>

      {/* Household & Economic Summary */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Resident Registry Particulars</h3>
          <label className="cursor-pointer text-[#0c532b] hover:underline font-bold text-xs">
            <span>Change Photo</span>
            <input type="file" accept="image/*" onChange={handleUpdatePhoto} className="hidden" />
          </label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400 block">Monthly Household Income:</span>
            <span className="font-bold text-gray-900 text-sm">{currentUser?.householdIncome || '₱8,500.00'}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Dependents Count:</span>
            <span className="font-bold text-gray-900 text-sm">{currentUser?.familyMembersCount || 4} Members</span>
          </div>
          <div>
            <span className="text-gray-400 block">Email Address:</span>
            <span className="font-medium text-gray-800">{currentUser?.email}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Contact Phone:</span>
            <span className="font-medium text-gray-800">{currentUser?.contactNumber}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Occupation:</span>
            <span className="font-medium text-gray-800">{currentUser?.occupation || 'Resident'}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Civil Status:</span>
            <span className="font-medium text-gray-800">Verified Citizen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
