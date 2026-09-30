import React from 'react';
import { 
  UserPlus, 
  LogIn, 
  ShieldCheck, 
  Building2,
  FileCheck2,
  Users,
  PhoneCall
} from 'lucide-react';
import { BugoLogo, BugoSealEmblem } from '../BugoLogo';
import { useApp } from '../../context/AppContext';
import realBarangayHallImg from '../../assets/images/real_barangay_hall_1788172230992.jpg';

export const WelcomePage: React.FC = () => {
  const { setAuthView } = useApp();

  return (
    <div className="min-h-screen bg-[#f3f6f9] flex flex-col justify-between text-gray-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Simple Navigation Bar */}
      <header className="bg-white border-b border-gray-200/90 px-6 sm:px-12 py-3.5 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BugoLogo size="md" />

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center text-xs font-semibold text-gray-600 bg-gray-100/90 px-3.5 py-1.5 rounded-full border border-gray-200/60">
              <span>Bugo, Cagayan de Oro City</span>
            </span>

            <button
              onClick={() => setAuthView('login')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-950 hover:bg-gray-100 rounded-xl transition-all"
            >
              <LogIn className="w-4 h-4 text-[#0c532b]" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Content in Landscape Web Format */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col items-center justify-center">
        
        {/* Main Card Container */}
        <div className="w-full bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Re-arranged & Centered Brand & Action Controls */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between items-center text-center space-y-6">
            
            {/* Center Area: Official Seal, Welcome To, Bugo Sync List, and Tagline */}
            <div className="w-full flex flex-col items-center space-y-4 my-auto">
              
              {/* Prominent Official Seal Badge */}
              <div className="relative group cursor-default mb-1">
                <BugoSealEmblem 
                  sizePx={148} 
                  className="relative transform transition-transform duration-300 group-hover:scale-105" 
                />
              </div>

              {/* "Welcome to" + Title + Tagline (Recreated to match reference exactly) */}
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-normal text-gray-800 tracking-normal">
                  Welcome to
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c532b] tracking-tight leading-tight">
                  Bugo Sync List
                </h1>
                <p className="text-sm sm:text-base font-medium text-gray-600 max-w-sm mx-auto">
                  Stronger Community, Better Services
                </p>
              </div>

              {/* Action Buttons (Login & Create Account) */}
              <div className="w-full max-w-sm space-y-3 pt-2">
                {/* 1. Login Primary Solid Button */}
                <button
                  onClick={() => setAuthView('login')}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#0c532b] hover:bg-[#083c1f] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>

                {/* 2. Create an Account Secondary Button */}
                <button
                  onClick={() => setAuthView('register')}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-emerald-50/70 active:scale-[0.99] border-2 border-[#0c532b] text-[#0c532b] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create an Account</span>
                </button>
              </div>
            </div>

            {/* Bottom Highlights & Quality Indicators */}
            <div className="w-full pt-4 border-t border-gray-100 flex items-center justify-center gap-6 text-[11px] text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0c532b]" />
                Official Portal
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#0c532b]" />
                Direct Verification
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0c532b]" />
                Citizen Support
              </span>
            </div>

          </div>

          {/* Right Column: Real Photorealistic Barangay Bugo Hall Photo Card */}
          <div className="lg:col-span-6 bg-slate-900 relative min-h-[340px] lg:min-h-full overflow-hidden flex flex-col justify-end p-6 sm:p-10 group">
            
            {/* Real Barangay Hall of Bugo Photograph */}
            <img 
              src={realBarangayHallImg} 
              alt="Barangay Bugo Hall, Cagayan de Oro City" 
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />

            {/* Aesthetic Gradient Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

            {/* Information Overlay Content */}
            <div className="relative z-10 text-white space-y-3 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/90 text-white text-[11px] font-bold backdrop-blur-xs shadow-sm border border-emerald-500/40">
                <Building2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Barangay Bugo Civic & Administration Center</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md leading-tight">
                Barangay Hall of Bugo
              </h2>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal drop-shadow-xs">
                Located in Bugo, Cagayan de Oro City, Misamis Oriental. Dedicated to serving our community with reliable public governance, real-time resident record assistance, and expedited barangay clearances.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Standard Footer with Emergency Hotline */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-xs text-gray-500 space-y-2">
        <div>
          <p className="font-bold text-gray-800 text-xs sm:text-sm">
            Bugo Sync List • Sangguniang Barangay of Bugo
          </p>
          <p className="mt-0.5 text-[11px] text-gray-500">
            City of Cagayan de Oro, Misamis Oriental • Official Resident Management & Public Services
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
          <a
            href="tel:09922998282"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 rounded-full font-bold text-xs transition shadow-2xs group"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse group-hover:scale-110 transition-transform" />
            <span>Emergency Hotline: <strong className="font-extrabold text-rose-900">0992 299 8282</strong></span>
          </a>
        </div>
      </footer>
    </div>
  );
};
