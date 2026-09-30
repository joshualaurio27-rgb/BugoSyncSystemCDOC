import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { BugoSealEmblem } from '../BugoLogo';
import { useApp } from '../../context/AppContext';

export const LoginPage: React.FC = () => {
  const { setAuthView, loginWithCredentials } = useApp();
  const [email, setEmail] = useState('resident@bugo.gov.ph');
  const [password, setPassword] = useState('Resident@Bugo2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const emailError = (!email.trim() ? 'Email address is required' : !email.includes('@') ? 'Enter a valid email address' : '');
  const passwordError = !password ? 'Password is required' : '';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (emailError || passwordError) {
      setErrorMsg('Please fill in all required fields marked in red.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = loginWithCredentials(email, password);
      if (!res || !res.success) {
        setErrorMsg(res?.message || 'Invalid email or password. Please check your credentials.');
        setIsLoading(false);
      }
    }, 300);
  };

  const showEmailRed = touched.email && Boolean(emailError);
  const showPasswordRed = touched.password && Boolean(passwordError);

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col justify-between items-center p-6 text-gray-800">
      {/* Top Header */}
      <div className="w-full max-w-md flex items-center justify-start py-2">
        <button
          onClick={() => setAuthView('welcome')}
          className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Welcome</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6 my-auto">
        <div className="text-center space-y-1">
          <div className="flex justify-center mb-3">
            <BugoSealEmblem sizePx={72} className="hover:scale-105 transition-transform" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Sign In to Bugo Portal
          </h1>
          <p className="text-xs text-gray-500">
            Enter your credentials to access your account.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border-2 border-rose-300 p-3.5 rounded-2xl text-xs text-rose-800 font-semibold flex items-start gap-2.5 shadow-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} noValidate className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block font-bold ${showEmailRed ? 'text-rose-600' : 'text-gray-700'}`}>
                Email Address <span className="text-rose-500">*</span>
              </label>
              {showEmailRed && (
                <span className="text-[11px] font-bold text-rose-600 animate-in fade-in">
                  {emailError}
                </span>
              )}
            </div>
            <div className="relative">
              <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${showEmailRed ? 'text-rose-500' : 'text-gray-400'}`} />
              <input
                type="email"
                value={email}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className={`w-full rounded-xl pl-9 pr-4 py-2.5 font-medium outline-none transition ${
                  showEmailRed
                    ? 'bg-rose-50/50 border-2 border-rose-500 text-rose-900 placeholder-rose-400 ring-2 ring-rose-200'
                    : 'bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-[#0c532b]'
                }`}
                placeholder="name@bugo.gov.ph"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block font-bold ${showPasswordRed ? 'text-rose-600' : 'text-gray-700'}`}>
                Password <span className="text-rose-500">*</span>
              </label>
              {showPasswordRed && (
                <span className="text-[11px] font-bold text-rose-600 animate-in fade-in">
                  {passwordError}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${showPasswordRed ? 'text-rose-500' : 'text-gray-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className={`w-full rounded-xl pl-9 pr-10 py-2.5 font-mono outline-none transition ${
                  showPasswordRed
                    ? 'bg-rose-50/50 border-2 border-rose-500 text-rose-900 placeholder-rose-400 ring-2 ring-rose-200'
                    : 'bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-[#0c532b]'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#0c532b] hover:bg-[#083c1f] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            Don't have a resident account yet?{' '}
            <button
              onClick={() => setAuthView('register')}
              className="text-[#0c532b] font-bold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>

      {/* Bottom info */}
      <div className="text-center text-xs text-gray-400 py-4">
        Barangay Bugo Citizen & Administrative Portal • 2026
      </div>
    </div>
  );
};
