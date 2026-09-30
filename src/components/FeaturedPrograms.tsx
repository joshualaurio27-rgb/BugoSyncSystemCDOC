import React from 'react';
import { Calendar, School, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AssistanceProgram } from '../types';

export const FeaturedPrograms: React.FC = () => {
  const { programs, setActiveTab, setSelectedProgramForDetail, setSelectedProgramForApply } = useApp();

  const handleReadRequirements = (prog: AssistanceProgram) => {
    setSelectedProgramForDetail(prog);
  };

  const handleApplyNow = (prog: AssistanceProgram) => {
    setSelectedProgramForApply(prog);
  };

  const featured = programs.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
            Featured Priority Programs
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Active community initiatives currently accepting resident applications.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('programs')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors"
        >
          View All ({programs.length}) <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((prog, index) => (
          <div
            key={prog.id}
            className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image banner with badge */}
            <div className="h-48 relative overflow-hidden bg-gray-100">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${prog.imageUrl}')` }}
              />
              <div className="absolute top-3 right-3 bg-gray-900/90 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-xs">
                {prog.badgeText}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {prog.title}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 shrink-0 border border-blue-100">
                    {prog.maxBenefitAmount}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {prog.description}
                </p>
              </div>

              {/* Card Footer row */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                  {index === 0 ? (
                    <>
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Deadline: {prog.deadline}</span>
                    </>
                  ) : (
                    <>
                      <School className="w-4 h-4 text-gray-400" />
                      <span>{prog.targetAudience}</span>
                    </>
                  )}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleReadRequirements(prog)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 hover:underline"
                  >
                    Requirements
                  </button>
                  <button
                    onClick={() => handleApplyNow(prog)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Process Workflow Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">
              How the Digital Assistance Portal Works
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl leading-relaxed">
              Complete your online submission in 4 easy steps, attach digital documents, and receive real-time updates without queuing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('programs')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-xs"
            >
              Browse All Programs
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
            >
              Track Application
            </button>
          </div>
        </div>

        {/* 3 Step Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Select & Fill Form</p>
              <p className="text-gray-500 mt-1 leading-relaxed">Choose your program and submit resident identification details.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Attach Requirements</p>
              <p className="text-gray-500 mt-1 leading-relaxed">Upload clear photos or scans of your Barangay Indigency, ID, and certificates.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Track & Claim Benefit</p>
              <p className="text-gray-500 mt-1 leading-relaxed">Monitor approval progress in real-time and download your official disbursement slip.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
