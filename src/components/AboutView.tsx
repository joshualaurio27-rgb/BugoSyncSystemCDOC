import React from 'react';
import { Landmark, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
          Local Governance & Public Service Innovation
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          About the Barangay Bugo Resident Assistance System
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-3xl leading-relaxed">
          The Web-Based Resident Assistance Application and Management System is designed to modernize the delivery of public services in Barangay Bugo, Cagayan de Oro City.
        </p>
      </div>

      {/* Main Narrative & Capstone Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            1.1 Background & Purpose
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Barangays provide various services and assistance programs to support the needs of their residents, including cash assistance, educational support, medical aid, livelihood programs, and emergency relief during calamities.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Traditionally, applying for assistance requires residents to personally visit the barangay hall to submit requirements, inquire about available programs, and follow up on the status of their requests. This system provides an organized digital gateway so residents can apply and monitor progress from home.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            1.2 Specific System Objectives
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">Online Application:</strong> Submit requests and upload certificates digitally.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">Centralized Management:</strong> Empower barangay staff to verify, organize, and evaluate records.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">Transparent Tracking:</strong> Real-time reference code lookup and payout schedules.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">Efficiency:</strong> Reduce queuing time, processing delays, and paper handling costs.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Barangay Information & Contact */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Barangay Bugo Official Citizen Services Information
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-600">
          <div className="space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-blue-600" /> Location
            </div>
            <p className="text-xs text-gray-600">Sayre Highway, Bugo, Cagayan de Oro City, Misamis Oriental, 9000</p>
          </div>

          <div className="space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-blue-600" /> Office & Helpdesk
            </div>
            <p className="text-xs text-gray-600">Monday to Friday: 8:00 AM – 5:00 PM</p>
            <p className="text-xs text-emerald-600 font-semibold">Online Portal: Available 24/7</p>
          </div>

          <div className="space-y-1.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs uppercase tracking-wider">
              <Phone className="w-4 h-4 text-blue-600" /> Contact Channels
            </div>
            <p className="text-xs text-gray-600">Barangay Hall: (088) 855-2341</p>
            <p className="text-xs text-gray-600">Health Center: (088) 855-5678</p>
            <p className="text-xs text-gray-600">Email: assistance@barangaybugo.gov.ph</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('programs')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs"
          >
            Browse Available Programs <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-700 text-xs font-bold px-5 py-2.5 rounded-lg transition-all"
          >
            Track Existing Application
          </button>
        </div>
      </div>
    </div>
  );
};
