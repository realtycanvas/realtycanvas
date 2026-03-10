'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandButton } from '@/components/ui/BrandButton';
import { BanknoteIcon, BuildingIcon, ChevronDown, MagnifyIcon } from '../ui/icon';

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

type DropdownOption = { value: string; label: string };

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

const categoryOptions: DropdownOption[] = projectCategories.map((c) => ({
  value: c,
  label: categoryDisplayNames[c] || c,
}));

const statusOptions: DropdownOption[] = projectStatuses.map((s) => ({
  value: s,
  label: statusDisplayNames[s] || s,
}));

const budgetOptions: DropdownOption[] = priceRanges.map((r) => ({
  value: r.label,
  label: r.label,
}));

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CustomDropdown({
  options,
  value,
  onChange,
  icon,
  compact,
}: {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={
          compact
            ? 'relative w-full flex items-center pl-8 pr-8 h-8 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#FBB70F]'
            : 'relative h-10 w-full flex items-center pl-8 sm:pl-10 pr-8 sm:pr-10 text-xs sm:text-sm border border-gray-200 rounded focus:ring-2 focus:ring-[#FBB70F] focus:outline-none bg-gray-50 text-gray-900 transition-all duration-200'
        }
      >
        <span
          className={
            compact
              ? 'absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none'
              : 'absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none'
          }
        >
          {icon}
        </span>
        <span className="flex-1 truncate text-left">{selectedLabel}</span>
        <ChevronDown
          className={
            compact
              ? 'absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none'
              : 'absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none'
          }
        />
      </button>
      {open && (
        <ul className="absolute right-0 mt-1 min-w-full bg-white border border-gray-200 rounded shadow-lg z-50 py-1">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#FBB70F]/10 transition-colors whitespace-nowrap ${
                  value === opt.value ? 'font-semibold text-[#112D48]' : 'text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
          <CustomDropdown
            options={categoryOptions}
            value={projectCategory}
            onChange={setProjectCategory}
            icon={<BuildingIcon className="w-4 h-4 text-gray-400" />}
            compact
          />
        </div>

        <div>
          <label className="text-xs font-medium text-black mb-1 block">Status</label>
          <CustomDropdown
            options={statusOptions}
            value={projectStatus}
            onChange={setProjectStatus}
            icon={<InfoIcon className="w-4 h-4 text-gray-400" />}
            compact
          />
        </div>

        <div>
          <label className="text-xs font-medium text-black mb-1 block">Budget</label>
          <CustomDropdown
            options={budgetOptions}
            value={selectedPriceRange.label}
            onChange={(val) => {
              const chosen = priceRanges.find((r) => r.label === val);
              if (chosen) setSelectedPriceRange(chosen);
            }}
            icon={<BanknoteIcon className="w-4 h-4 text-gray-400" />}
            compact
          />
        </div>

        <BrandButton
          variant="primary"
          onClick={handleSearch}
          className="w-full rounded text-xs border-0"
          shimmerDuration="2s"
        >
          <MagnifyIcon className="w-3 h-3 mr-2 inline-block" />
          Search Projects
        </BrandButton>
      </div>
    );
  }

  return (
    <div className={`bg-white/20 backdrop-blur-md rounded shadow p-3 sm:p-4 border border-white/30 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-2 sm:gap-3 items-end">
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-semibold text-white">Category</label>
          <CustomDropdown
            options={categoryOptions}
            value={projectCategory}
            onChange={setProjectCategory}
            icon={<BuildingIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-semibold text-white">Status</label>
          <CustomDropdown
            options={statusOptions}
            value={projectStatus}
            onChange={setProjectStatus}
            icon={<InfoIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs font-semibold text-white">Budget</label>
          <CustomDropdown
            options={budgetOptions}
            value={selectedPriceRange.label}
            onChange={(val) => {
              const chosen = priceRanges.find((r) => r.label === val);
              if (chosen) setSelectedPriceRange(chosen);
            }}
            icon={<BanknoteIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
          />
        </div>

        <div className="flex self-end">
          <BrandButton
            variant="primary"
            onClick={handleSearch}
            className="w-full rounded text-xs border-0 h-10 px-4 py-0"
            shimmerDuration="2s"
          >
            <MagnifyIcon className="w-4 h-4 mr-2 inline-block -mt-0.5" />
            Search Projects
          </BrandButton>
        </div>
      </div>
    </div>
  );
}
