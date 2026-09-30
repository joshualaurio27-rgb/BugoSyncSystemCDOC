import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, CheckCircle2, User, Mail, Phone, MapPin, DollarSign, Lock, AlertCircle, Globe } from 'lucide-react';
import { BugoLogo, BugoSealEmblem } from '../BugoLogo';
import { useApp } from '../../context/AppContext';
import { BUGO_PUROKS, MONTHLY_INCOME_OPTIONS, NATIONALITY_OPTIONS } from '../../data/mockData';

export const RegisterPage: React.FC = () => {
  const { setAuthView, registerResidentAccount } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    nationality: 'Filipino',
    purok: BUGO_PUROKS[0],
    address: '',
    householdIncome: MONTHLY_INCOME_OPTIONS[2], // ₱8,500.00 (Informal / Low Income)
    familyMembersCount: 4,
    password: '',
    confirmPassword: '',
    certified: true
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

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
    errors.contactNumber = 'Enter at least 10-12 digits (e.g. 09171234567)';
  } else if (formData.contactNumber.length > 12) {
    errors.contactNumber = 'Contact number must not exceed 12 digits';
  }

  if (!formData.nationality) errors.nationality = 'Nationality is required';
  if (!formData.purok) errors.purok = 'Purok / Zone selection is required';
  if (!formData.address.trim()) errors.address = 'Residential street address is required';
  if (!formData.householdIncome) errors.householdIncome = 'Select a monthly income bracket';
  
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!formData.certified) {
    errors.certified = 'You must certify your information under oath';
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strictly numbers only, max 12 digits
    const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 12);
    setFormData(prev => ({ ...prev, contactNumber: numericOnly }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Mark all as touched
    const allTouched: Record<string, boolean> = {
      name: true,
      email: true,
      contactNumber: true,
      nationality: true,
      purok: true,
      address: true,
      householdIncome: true,
      password: true,
      confirmPassword: true,
      certified: true
    };
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      setErrorMsg('Please complete all highlighted fields marked in red.');
      return;
    }

    registerResidentAccount({
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      nationality: formData.nationality,
      purok: formData.purok,
      address: formData.address,
      householdIncome: formData.householdIncome,
      familyMembersCount: Number(formData.familyMembersCount),
      password: formData.password
    });

    setSuccess(true);
  };

  const getFieldClass = (field: string) => {
    const isRed = touched[field] && Boolean(errors[field]);
    if (isRed) {
      return 'w-full bg-rose-50/50 border-2 border-rose-500 text-rose-950 rounded-xl px-3 py-2.5 font-medium outline-none ring-2 ring-rose-200 placeholder-rose-400 transition';
    }
    return 'w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-3 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#0c532b] transition';
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col justify-between items-center p-6 text-gray-800">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between py-2">
        <button
          onClick={() => setAuthView('welcome')}
          className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Welcome</span>
        </button>
        <BugoLogo size="sm" />
      </div>

      {/* Registration Form Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6 my-6">
        <div className="text-center space-y-1">
          <div className="flex justify-center mb-3">
            <BugoSealEmblem sizePx={64} className="hover:scale-105 transition-transform" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Register Barangay Resident Account
          </h1>
          <p className="text-xs text-gray-500">
            Create an official resident profile for online assistance requests and digital services.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border-2 border-rose-300 p-3.5 rounded-2xl text-xs text-rose-800 font-semibold flex items-start gap-2.5 shadow-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
          {/* Personal Info Grid */}
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
                placeholder="e.g. Juan Carlos Dela Cruz"
                value={formData.name}
                onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={getFieldClass('name')}
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
                placeholder="juan.delacruz@gmail.com"
                value={formData.email}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={getFieldClass('email')}
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
              <div className="flex justify-between items-center mb-1">
                <label className={`block font-bold ${touched.familyMembersCount && errors.familyMembersCount ? 'text-rose-600' : 'text-gray-700'}`}>
                  Family Dependents Count <span className="text-rose-500">*</span>
                </label>
              </div>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.familyMembersCount}
                onChange={(e) => setFormData({ ...formData, familyMembersCount: Number(e.target.value) })}
                className={getFieldClass('familyMembersCount')}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block font-bold ${touched.address && errors.address ? 'text-rose-600' : 'text-gray-700'}`}>
                Residential Street Address <span className="text-rose-500">*</span>
              </label>
              {touched.address && errors.address && (
                <span className="text-[11px] font-bold text-rose-600">{errors.address}</span>
              )}
            </div>
            <input
              type="text"
              placeholder="House / Lot No., Street Name, Barangay Bugo, CDO"
              value={formData.address}
              onBlur={() => setTouched(prev => ({ ...prev, address: true }))}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={getFieldClass('address')}
            />
          </div>

          {/* Monthly Income List */}
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
            <p className="text-[10px] text-gray-400 mt-1">
              Selected income is used for eligibility assessment for financial and emergency assistance grants.
            </p>
          </div>

          {/* Password Security */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`block font-bold ${touched.password && errors.password ? 'text-rose-600' : 'text-gray-700'}`}>
                  Create Password (Min 6 chars) <span className="text-rose-500">*</span>
                </label>
                {touched.password && errors.password && (
                  <span className="text-[11px] font-bold text-rose-600">{errors.password}</span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`${getFieldClass('password')} pl-9 font-mono`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`block font-bold ${touched.confirmPassword && errors.confirmPassword ? 'text-rose-600' : 'text-gray-700'}`}>
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="text-[11px] font-bold text-rose-600">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`${getFieldClass('confirmPassword')} pl-9 font-mono`}
                />
              </div>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl flex items-start gap-2.5 transition border ${
            touched.certified && errors.certified ? 'bg-rose-50 border-rose-300' : 'bg-gray-50 border-gray-200'
          }`}>
            <input
              type="checkbox"
              id="certifyCheck"
              checked={formData.certified}
              onChange={(e) => setFormData({ ...formData, certified: e.target.checked })}
              className="mt-0.5 rounded text-[#0c532b] focus:ring-[#0c532b]"
            />
            <label htmlFor="certifyCheck" className={`text-[11px] cursor-pointer ${touched.certified && errors.certified ? 'text-rose-800 font-bold' : 'text-gray-600'}`}>
              I hereby certify under oath that all information submitted is true, correct, and represents my actual residency in Barangay Bugo, Cagayan de Oro City.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Create Resident Account & Enter Portal</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setAuthView('login')}
              className="text-[#0c532b] font-bold hover:underline"
            >
              Sign In here
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-2">
        Barangay Bugo Citizen & Administrative Portal • 2026
      </div>
    </div>
  );
};
