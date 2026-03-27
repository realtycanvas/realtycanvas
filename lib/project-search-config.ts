export const projectCategories = ['All Categories', 'COMMERCIAL', 'RESIDENTIAL'] as const;

export const projectStatuses = ['All Status', 'UNDER_CONSTRUCTION', 'READY'] as const;

export const categoryDisplayNames: Record<string, string> = {
  'All Categories': 'All Categories',
  COMMERCIAL: 'Commercial',
  RESIDENTIAL: 'Residential',
};

export const statusDisplayNames: Record<string, string> = {
  'All Status': 'All Status',
  UNDER_CONSTRUCTION: 'Under Construction',
  READY: 'Ready',
};

export const priceRanges = [
  { label: 'Any Price', min: 0, max: 0 },
  { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr - ₹5Cr', min: 10000000, max: 50000000 },
  { label: '₹5Cr - ₹10Cr', min: 50000000, max: 100000000 },
  { label: '₹10Cr - ₹25Cr', min: 100000000, max: 250000000 },
  { label: '₹25Cr+', min: 250000000, max: 0 },
];

export const mapTypeToProjectTag = (typeValue: string) => {
  const normalized = typeValue.trim().toUpperCase();
  if (normalized === 'TRENDING') return 'TRENDING';
  if (normalized === 'NEW') return 'NEW';
  if (normalized === 'NEW_LAUNCH') return 'NEW';
  if (normalized === 'DREAM') return 'DREAM';
  if (normalized === 'DREAM_PROJECT') return 'DREAM';
  return '';
};
