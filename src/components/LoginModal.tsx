import React, { useState } from 'react';
import { X, Landmark, User, ShieldCheck, UserCheck, ArrowRight, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BUGO_PUROKS } from '../data/mockData';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginModalMode, 
    setLoginModalMode, 
    loginAsResident, 
    loginAsStaff, 
    loginAsCaptain,
    registerResident
  } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotSent, setForgotSent] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regPurok, setRegPurok] = useState(BUGO_PUROKS[0]);
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAgreed, setRegAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Please enter both username/email and password.');
      return;
    }
    setErrorMsg('');

    // Check staff credentials or resident
    if (identifier.toLowerCase().includes('staff') || identifier.toLowerCase().includes('admin')) {
      loginAsStaff();
    } else if (identifier.toLowerCase().includes('captain') || identifier.toLowerCase().includes('punong')) {
      loginAsCaptain();
    } else {
      loginAsResident();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regContact || !regAddress) {
      setErrorMsg('Please fill in all required registration fields.');
      return;
    }
    if (!regAgreed) {
      setErrorMsg('Please certify that you are a bonafide resident of Barangay Bugo.');
      return;
    }

    registerResident({
      name: regName,
      email: regEmail,
      username: regUsername || regEmail.split('@')[0],
      contactNumber: regContact,
      purok: regPurok,
      address: regAddress
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-[460px] my-8 relative">
        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center flex flex-col gap-1.5">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-1">
              <Landmark className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Barangay Bugo
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {loginModalMode === 'login' ? 'Resident & Official Portal Login' : 'Resident Portal Registration'}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 text-rose-700 text-xs px-3.5 py-2.5 rounded-lg border border-rose-200 font-semibold">
              {errorMsg}
            </div>
          )}

          {loginModalMode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              {/* Email/Username Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase" htmlFor="username">
                  Email or Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* Options Row */}
              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-blue-600 hover:text-blue-700 hover:underline font-bold"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-sm font-bold py-3 rounded-lg hover:bg-blue-700 transition-all active:scale-[0.98] mt-1 shadow-xs"
              >
                Sign In
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juanita D. Reyes"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="juanita@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0917XXXXXXX"
                    value={regContact}
                    onChange={(e) => setRegContact(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Purok / Sitio in Bugo *</label>
                <select
                  value={regPurok}
                  onChange={(e) => setRegPurok(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                >
                  {BUGO_PUROKS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Detailed House Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House No., Street / Block & Lot"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Create Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <label className="flex items-start gap-2 text-[11px] text-gray-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={regAgreed}
                  onChange={(e) => setRegAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <span>I declare under oath that I am a bonafide resident of Barangay Bugo and the information provided is true and verifiable.</span>
              </label>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-sm font-bold py-3 rounded-lg hover:bg-blue-700 transition-all active:scale-[0.98] mt-2 shadow-xs"
              >
                Complete Registration
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-3 text-xs text-gray-400 font-medium">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Registration / Login Mode Switch Link */}
          <div className="text-center text-xs text-gray-600">
            {loginModalMode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setLoginModalMode('register'); setErrorMsg(''); }}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-bold transition-all"
                >
                  Create an Account
                </button>
              </>
            ) : (
              <>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setLoginModalMode('login'); setErrorMsg(''); }}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-bold transition-all"
                >
                  Login to Portal
                </button>
              </>
            )}
          </div>

          {/* Fast Demo Logins for evaluators */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center mb-2.5">
              Instant Demo Access
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={loginAsResident}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                  <User className="w-3.5 h-3.5" /> Resident
                </div>
                <div className="text-[10px] text-gray-500 truncate mt-0.5">Maria Santos</div>
              </button>
              <button
                type="button"
                onClick={loginAsStaff}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                  <UserCheck className="w-3.5 h-3.5" /> Staff
                </div>
                <div className="text-[10px] text-gray-500 truncate mt-0.5">Social Officer</div>
              </button>
              <button
                type="button"
                onClick={loginAsCaptain}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Captain
                </div>
                <div className="text-[10px] text-gray-500 truncate mt-0.5">Barangay Head</div>
              </button>
            </div>
          </div>
        </div>

        {/* Contextual Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-gray-400" /> Secure Resident Access System • Barangay Bugo
          </p>
        </div>
      </div>

      {/* Forgot Password Sub-Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 bg-gray-900/60 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
            <h3 className="font-bold text-base text-gray-900 mb-2">Password Reset</h3>
            {forgotSent ? (
              <div className="space-y-3">
                <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                  A verification link and OTP has been dispatched to your registered email & phone number.
                </p>
                <button
                  onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
                  className="w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-gray-500">
                  Enter your registered Bugo Resident ID, Username, or Email to receive password assistance.
                </p>
                <input
                  type="text"
                  placeholder="e.g. maria.santos@gmail.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="text-xs px-3 py-1.5 text-gray-500 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setForgotSent(true)}
                    className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                  >
                    Send Reset Link
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
