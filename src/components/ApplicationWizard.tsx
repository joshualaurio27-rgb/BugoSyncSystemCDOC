import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Trash2, 
  Plus, 
  Eye, 
  Printer, 
  Sparkles,
  QrCode,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { BUGO_PUROKS } from '../data/mockData';
import { UploadedDocument } from '../types';

export const ApplicationWizard: React.FC = () => {
  const { 
    selectedProgramForApply, 
    setSelectedProgramForApply, 
    currentUser, 
    submitNewApplication, 
    setActiveTab, 
    setSelectedApplicationForTracking,
    lookupApplicationByRef 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [generatedRefCode, setGeneratedRefCode] = useState<string | null>(null);

  // Form Fields
  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [contactNumber, setContactNumber] = useState(currentUser?.contactNumber || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [purok, setPurok] = useState(currentUser?.purok || BUGO_PUROKS[0]);
  const [address, setAddress] = useState(currentUser?.address || '');
  const [householdIncome, setHouseholdIncome] = useState('₱8,500.00');
  const [familyCount, setFamilyCount] = useState<number>(4);
  const [purpose, setPurpose] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');
  const [priorityLevel, setPriorityLevel] = useState<'Normal' | 'High' | 'Urgent'>('Normal');
  const [isDeclarationAgreed, setIsDeclarationAgreed] = useState(false);
  const [formError, setFormError] = useState('');

  // Uploaded Documents state
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    {
      id: `doc-${Date.now()}-1`,
      name: 'Barangay_Bugo_Indigency_Certificate.pdf',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      verified: true
    },
    {
      id: `doc-${Date.now()}-2`,
      name: 'Valid_Government_ID_Front_Back.jpg',
      type: 'Image',
      size: '2.1 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      verified: true
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  if (!selectedProgramForApply) return null;
  const prog = selectedProgramForApply;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setTimeout(() => {
      const fileList = Array.from(files) as File[];
      const newDocs: UploadedDocument[] = fileList.map((file, idx) => ({
        id: `doc-${Date.now()}-${idx}`,
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : 'Image',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        verified: true
      }));

      setDocuments(prev => [...prev, ...newDocs]);
      setIsUploading(false);
    }, 600);
  };

  const handleRemoveDoc = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const handleAddSampleRequirement = (reqTitle: string) => {
    const sampleDoc: UploadedDocument = {
      id: `doc-${Date.now()}`,
      name: `${reqTitle.replace(/\s+/g, '_')}_Verified.pdf`,
      type: 'PDF',
      size: '1.4 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      verified: true
    };
    setDocuments(prev => [...prev, sampleDoc]);
  };

  const handleNext = () => {
    setFormError('');
    if (currentStep === 1) {
      if (!applicantName.trim() || !contactNumber.trim() || !address.trim()) {
        setFormError('Please fill out all applicant personal & residency fields.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!purpose.trim() || purpose.trim().length < 10) {
        setFormError('Please provide a detailed explanation (at least 10 characters) of the circumstance or reason for assistance.');
        return;
      }
    }
    if (currentStep === 3) {
      if (documents.length === 0) {
        setFormError('Please attach at least one supporting document (e.g., Barangay Indigency, ID, or Proof of Need).');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleFinalSubmit = () => {
    if (!isDeclarationAgreed) {
      setFormError('You must agree to the honest submission declaration before proceeding.');
      return;
    }

    const refCode = submitNewApplication({
      programId: prog.id,
      programTitle: prog.title,
      programCategory: prog.category,
      applicantId: currentUser?.id || `user-guest-${Date.now()}`,
      applicantName,
      contactNumber,
      email: email || 'resident@bugo.gov.ph',
      purok,
      address,
      householdMonthlyIncome: householdIncome,
      familyMembersCount: familyCount,
      purposeOrDiagnosis: purpose,
      requestedAmount: requestedAmount || prog.maxBenefitAmount,
      status: 'Submitted',
      documents,
      priorityScore: priorityLevel
    });

    setGeneratedRefCode(refCode);
    setCurrentStep(5); // Success step

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleTrackNow = () => {
    if (generatedRefCode) {
      const app = lookupApplicationByRef(generatedRefCode);
      if (app) {
        setSelectedApplicationForTracking(app);
      }
    }
    setSelectedProgramForApply(null);
    setActiveTab('tracking');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-[#c0c9bb] rounded-xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden relative flex flex-col">
        {/* Top Header */}
        <div className="bg-blue-700 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
              Digital Assistance Submission
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {prog.title}
            </h2>
          </div>
          <button
            onClick={() => setSelectedProgramForApply(null)}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        {currentStep < 5 && (
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3.5">
            <div className="flex items-center justify-between text-xs">
              {[
                { num: 1, label: 'Resident Profile' },
                { num: 2, label: 'Assistance Details' },
                { num: 3, label: 'Document Uploads' },
                { num: 4, label: 'Review & Certify' }
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition-colors ${
                      currentStep === step.num
                        ? 'bg-blue-600 text-white shadow-xs'
                        : currentStep > step.num
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-400'
                    }`}
                  >
                    {currentStep > step.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <span className={`hidden sm:inline text-xs font-semibold ${currentStep === step.num ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Alert */}
        {formError && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {/* STEP 1: Applicant Profile */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 1: Resident & Household Profile</h3>
                <p className="text-xs text-gray-500">Verify your identity and Bugo address records.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Maria Clara Santos"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Mobile Contact Number *</label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="0917 555 4321"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Purok / Sitio in Bugo *</label>
                  <select
                    value={purok}
                    onChange={(e) => setPurok(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    {BUGO_PUROKS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Complete House Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Block & Lot, Street name, Barangay Bugo, CDO"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Estimated Household Monthly Income</label>
                  <input
                    type="text"
                    value={householdIncome}
                    onChange={(e) => setHouseholdIncome(e.target.value)}
                    placeholder="e.g. ₱8,500.00"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Number of Family Dependents</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={familyCount}
                    onChange={(e) => setFamilyCount(Number(e.target.value))}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Assistance Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 2: Purpose & Assistance Justification</h3>
                <p className="text-xs text-gray-500">Describe the specific reason and urgency for your request.</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Detailed Statement of Need / Circumstance *
                </label>
                <textarea
                  rows={4}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Explain clearly your current situation (e.g. disaster damage, medical diagnosis, semester tuition support, or livelihood equipment need)..."
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Requested Benefit Grant (Max: {prog.maxBenefitAmount})
                  </label>
                  <input
                    type="text"
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(e.target.value)}
                    placeholder={prog.maxBenefitAmount}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Urgency Priority Level
                  </label>
                  <select
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value as any)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="Normal">Normal Triage (3-5 business days)</option>
                    <option value="High">High Priority (2-3 business days)</option>
                    <option value="Urgent">Emergency / Urgent Calamity (24-48 hours)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Document Uploads */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 3: Digital Requirement Uploads</h3>
                <p className="text-xs text-gray-500">Upload photos or PDF scans of the required documents.</p>
              </div>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-gray-300 hover:border-blue-600 rounded-xl p-6 text-center bg-gray-50 hover:bg-blue-50/20 transition-all relative cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-gray-800">
                  Click or drag files here to upload
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Supports JPG, PNG, or PDF files (Max 10MB each)
                </p>
                {isUploading && (
                  <p className="text-xs text-blue-600 font-bold mt-2 animate-pulse">
                    Uploading & validating digital attachment...
                  </p>
                )}
              </div>

              {/* Recommended requirements quick-add */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <p className="text-[11px] font-bold text-gray-600 mb-2">
                  Checklist of recommended documents for {prog.title}:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {prog.requirements.map((req, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddSampleRequirement(req)}
                      className="text-[10px] font-medium bg-white hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 border border-gray-300 text-gray-700 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all shadow-2xs"
                    >
                      <Plus className="w-3 h-3 text-blue-600" />
                      Attach: {req.substring(0, 24)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Attached List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-900">Attached Documents ({documents.length}):</p>
                {documents.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No files attached yet. Please upload required certificates.</p>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="font-semibold text-gray-900 block truncate max-w-[240px] sm:max-w-md">{doc.name}</span>
                          <span className="text-[10px] text-gray-400">{doc.type} • {doc.size} • Uploaded {doc.uploadDate}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc(doc.id)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Review & Certification */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">Step 4: Application Summary & Sworn Certification</h3>
                <p className="text-xs text-gray-500">Review your submission before transmission to the Barangay Bugo Council.</p>
              </div>

              {/* Summary Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 pb-2.5 border-b border-gray-200">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Program:</span>
                    <span className="font-bold text-gray-900">{prog.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Applicant:</span>
                    <span className="font-bold text-gray-900">{applicantName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Purok:</span>
                    <span className="font-semibold text-gray-800">{purok}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Contact:</span>
                    <span className="font-semibold text-gray-800">{contactNumber}</span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Need Statement / Reason:</span>
                  <p className="text-gray-700 mt-1 bg-white p-2.5 rounded-lg border border-gray-200 leading-relaxed">{purpose}</p>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Attached Documents ({documents.length}):</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {documents.map((d, i) => (
                      <span key={i} className="bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-md text-[10px] font-medium">
                        ✓ {d.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sworn Declaration */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <label className="flex items-start gap-2.5 text-xs text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDeclarationAgreed}
                    onChange={(e) => setIsDeclarationAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="leading-relaxed">
                    <strong className="text-gray-900">Sworn Declaration:</strong> I hereby certify under penalty of administrative disqualification and applicable Philippine laws that all statements, personal entries, and supporting documents attached herein are genuine, truthful, and correct.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Success & Tracking Code */}
          {currentStep === 5 && generatedRefCode && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7 text-emerald-600" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  Application Successfully Filed
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  Reference Code Issued
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                  Your assistance request has been submitted to the Barangay Bugo Social Welfare evaluation queue.
                </p>
              </div>

              {/* Reference Code Ticket Box */}
              <div className="bg-gray-50 border border-blue-200 rounded-2xl p-5 max-w-sm mx-auto shadow-sm">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Official Tracking Code</span>
                <div className="font-mono text-2xl font-bold text-blue-700 tracking-wider my-1.5">
                  {generatedRefCode}
                </div>
                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-600 mt-2 pt-2.5 border-t border-gray-200">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <span>Digital QR Acknowledgment Generated</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 max-w-md mx-auto text-left text-xs text-gray-600 space-y-1">
                <p className="font-bold text-gray-900">Next Steps:</p>
                <p>1. The Desk Officer will verify your submitted documents within 24–48 hours.</p>
                <p>2. You will receive an SMS and in-portal notification once scheduled for payout.</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          {currentStep < 5 ? (
            <>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200/60 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedProgramForApply(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4" /> Submit Application
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-between items-center">
              <button
                type="button"
                onClick={() => setSelectedProgramForApply(null)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                Back to Home
              </button>
              <button
                type="button"
                onClick={handleTrackNow}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs"
              >
                Track Live Status Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
