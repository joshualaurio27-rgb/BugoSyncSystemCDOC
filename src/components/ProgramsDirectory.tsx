import React, { useState } from 'react';
import { Search, Filter, Calendar, Users, CheckCircle2, ArrowRight, BookOpen, AlertCircle, Coins } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AssistanceProgram, ProgramCategory } from '../types';

export const ProgramsDirectory: React.FC = () => {
  const { programs, setSelectedProgramForDetail, setSelectedProgramForApply } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Emergency', 'Education', 'Medical', 'Livelihood'];

  const filteredPrograms = programs.filter(prog => {
    const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
    const matchesSearch = 
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
              Barangay Bugo Social Services
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Community Assistance Programs
            </h1>
            <p className="text-sm text-gray-500 mt-1 max-w-2xl">
              Browse available community subsidies, educational grants, and emergency welfare programs administered by the Barangay Council of Bugo.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search programs by title or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      {filteredPrograms.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">No programs found</h3>
          <p className="text-xs text-gray-500 mt-1">Try adjusting your search terms or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map(prog => (
            <div
              key={prog.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group shadow-sm"
            >
              {/* Image & Header */}
              <div>
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${prog.imageUrl}')` }}
                  />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <span className="bg-gray-900/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {prog.badgeText}
                    </span>
                    <span className="bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                      {prog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {prog.title}
                    </h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {prog.maxBenefitAmount}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {prog.description}
                  </p>

                  {/* Requirements preview pills */}
                  <div className="mb-4">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Key Documents Needed:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.requirements.slice(0, 2).map((req, i) => (
                        <span key={i} className="text-[11px] bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span className="truncate max-w-[200px]">{req}</span>
                        </span>
                      ))}
                      {prog.requirements.length > 2 && (
                        <span className="text-[11px] text-gray-500 self-center">
                          +{prog.requirements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quota & Target */}
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 flex items-center justify-between border border-gray-100">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>{prog.targetAudience}</span>
                    </span>
                    <span className="font-bold text-blue-700">
                      {prog.slotsAvailable} slots available
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Deadline: {prog.deadline}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProgramForDetail(prog)}
                    className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Guidelines
                  </button>
                  <button
                    onClick={() => setSelectedProgramForApply(prog)}
                    className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-1 shadow-xs"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
