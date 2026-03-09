'use client';

import { useState } from 'react';
import { BanknoteIcon, BuildingIcon, ChevronDown, HomeIcon, MagnifyIcon } from '../ui/icon';

type SearchFilters = {
  category: string;
  status: string;
  priceRange: {
    min: number;
    max: number;
  };
};

type ProjectSearchBarProps = {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
  compact?: boolean;
};

const projectCategories = ['All Categories', 'COMMERCIAL', 'RESIDENTIAL'];

const projectStatuses = ['All Status', 'UNDER_CONSTRUCTION', 'READY'];

const categoryDisplayNames: Record<string, string> = {
  'All Categories': 'All Categories',
  COMMERCIAL: 'Commercial',
  RESIDENTIAL: 'Residential',
};

const statusDisplayNames: Record<string, string> = {
  'All Status': 'All Status',
  UNDER_CONSTRUCTION: 'Under Construction',
  READY: 'Ready',
};

const priceRanges = [
  { label: 'Any Price', min: 0, max: 0 },
  { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr - ₹5Cr', min: 10000000, max: 50000000 },
  { label: '₹5Cr - ₹10Cr', min: 50000000, max: 100000000 },
  { label: '₹10Cr - ₹25Cr', min: 100000000, max: 250000000 },
  { label: '₹25Cr+', min: 250000000, max: 1000000000 },
];

export default function ProjectSearchBar({ onSearch, className = '', compact = false }: ProjectSearchBarProps) {
  const [projectCategory, setProjectCategory] = useState('All Categories');
  const [projectStatus, setProjectStatus] = useState('All Status');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);

  const handleSearch = () => {
    const filters: SearchFilters = {
      category: projectCategory,
      status: projectStatus,
      priceRange: {
        min: selectedPriceRange.min,
        max: selectedPriceRange.max,
      },
    };
    onSearch?.(filters);
  };

  if (compact) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div>
          <label className="text-xs font-medium text-black mb-1 block">Category</label>
          <div className="relative">
            <BuildingIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={projectCategory}
              onChange={(event) => setProjectCategory(event.target.value)}
              className="w-full appearance-none pl-8 pr-8 h-8 border border-gray-200 rounded-md bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FBB70F]"
            >
              {projectCategories.map((category) => (
                <option key={category} value={category}>
                  {categoryDisplayNames[category] || category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-black mb-1 block">Status</label>
          <div className="relative">
            <HomeIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={projectStatus}
              onChange={(event) => setProjectStatus(event.target.value)}
              className="w-full appearance-none pl-8 pr-8 h-8 border border-gray-200 rounded-md bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FBB70F]"
            >
              {projectStatuses.map((status) => (
                <option key={status} value={status}>
                  {statusDisplayNames[status] || status}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-black mb-1 block">Budget</label>
          <div className="relative">
            <BanknoteIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedPriceRange.label}
              onChange={(event) => {
                const chosen = priceRanges.find((range) => range.label === event.target.value);
                if (chosen) setSelectedPriceRange(chosen);
              }}
              className="w-full appearance-none pl-8 pr-8 h-8 border border-gray-200 rounded-md bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FBB70F]"
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full h-9 bg-[#FBB70F] text-[#112D48] rounded-md hover:bg-[#e5a60d] transition-colors text-xs font-semibold"
        >
          <MagnifyIcon className="w-3 h-3 mr-2 inline-block" />
          Search Projects
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white/20 backdrop-blur-md rounded shadow-xl p-3 sm:p-4 border border-white/30 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3 items-end">
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-semibold text-white">Category</label>
          <div className="relative">
            <BuildingIcon className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            <select
              value={projectCategory}
              onChange={(event) => setProjectCategory(event.target.value)}
              className="h-10 w-full appearance-none pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded focus:ring-2 focus:ring-[#FBB70F] focus:border-transparent bg-gray-50 text-gray-900 transition-all duration-200"
            >
              {projectCategories.map((category) => (
                <option key={category} value={category}>
                  {categoryDisplayNames[category] || category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-semibold text-white">Status</label>
          <div className="relative">
            <HomeIcon className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            <select
              value={projectStatus}
              onChange={(event) => setProjectStatus(event.target.value)}
              className="h-10 w-full appearance-none pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded focus:ring-2 focus:ring-[#FBB70F] focus:border-transparent bg-gray-50 text-gray-900 transition-all duration-200"
            >
              {projectStatuses.map((status) => (
                <option key={status} value={status}>
                  {statusDisplayNames[status] || status}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-semibold text-white">Budget</label>
          <div className="relative">
            <BanknoteIcon className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            <select
              value={selectedPriceRange.label}
              onChange={(event) => {
                const chosen = priceRanges.find((range) => range.label === event.target.value);
                if (chosen) setSelectedPriceRange(chosen);
              }}
              className="h-10 w-full appearance-none pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded focus:ring-2 focus:ring-[#FBB70F] focus:border-transparent bg-gray-50 text-gray-900 transition-all duration-200"
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex self-end">
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto rounded px-4 py-2 text-xs font-semibold bg-[#FBB70F] text-[#112D48] hover:bg-[#e5a60d] transition-colors shadow-lg h-10 flex items-center justify-center cursor-pointer"
          >
            <MagnifyIcon className="w-5 h-5 mr-2 inline-block -mt-0.5" />
            Search Projects
          </button>
        </div>
      </div>
    </div>
  );
}
