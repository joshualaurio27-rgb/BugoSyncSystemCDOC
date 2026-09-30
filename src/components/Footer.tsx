import React from 'react';
import { Landmark, Phone, Mail, MapPin, Shield, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setIsCitizenCharterOpen, setIsPrivacyPolicyOpen } = useApp();

  return (
    <footer className="bg-white border-t border-gray-200 w-full py-8 md:py-10 mt-auto transition-colors no-print">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-100">
          {/* Col 1: Barangay Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0c532b] text-white flex items-center justify-center shadow-xs">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Barangay Bugo
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-md leading-relaxed">
              Official Web-Based Resident Assistance Application and Management Portal. Delivering transparent, fast, and accessible public services for all bonafide Bugon-ons.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0c532b]" />
                National Highway, Bugo, Cagayan de Oro City, 9000
              </span>
            </div>
          </div>

          {/* Col 2: Public Assistance Desks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Assistance Desks</h4>
            <ul className="text-xs text-gray-500 space-y-1.5">
              <li className="hover:text-[#0c532b] transition-colors cursor-pointer">Emergency Financial Assistance</li>
              <li className="hover:text-[#0c532b] transition-colors cursor-pointer">Barangay Youth Scholarship Office</li>
              <li className="hover:text-[#0c532b] transition-colors cursor-pointer">OSCA & PWD Social Helpdesk</li>
              <li className="hover:text-[#0c532b] transition-colors cursor-pointer">BDRRMC Calamity Relief Office</li>
              <li className="hover:text-[#0c532b] transition-colors cursor-pointer">Bugo Health Center Pharmacy</li>
            </ul>
          </div>

          {/* Col 3: Contact Channels */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0c532b]" />
              <span>Contact Channels</span>
            </h4>
            <div className="text-xs text-gray-500 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>Barangay Hall: (088) 855-2341</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>Health Center: (088) 855-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>helpdesk@bugo.cdo.gov.ph</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="text-xs text-gray-600 font-medium text-center md:text-left">
            © 2026 Barangay Bugo Resident Assistance Management System. All rights reserved.
          </div>
          
          <nav className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <button 
              onClick={() => setIsCitizenCharterOpen(true)}
              className="text-gray-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Citizen Charter
            </button>
            <button 
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="text-gray-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="text-gray-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Terms of Service
            </button>
            <a 
              href="mailto:contact@bugo.cdo.gov.ph"
              className="text-gray-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="https://www.officialgazette.gov.ph" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 hover:underline transition-colors flex items-center gap-1"
            >
              Official Gazette <ExternalLink className="w-3 h-3" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
