export const PROJECT_TAGS = [
  { value: 'FEATURED', label: 'Featured', color: 'bg-yellow-100 text-yellow-800', emoji: '⭐' },
  { value: 'TRENDING', label: 'Trending', color: 'bg-orange-100 text-orange-800', emoji: '🔥' },
  { value: 'RECOMMENDED', label: 'Recommended', color: 'bg-blue-100 text-blue-800', emoji: '👍' },
  { value: 'NEW', label: 'New Launch', color: 'bg-green-100 text-green-800', emoji: '🆕' },
  { value: 'DREAM', label: 'Dream', color: 'bg-purple-100 text-purple-800', emoji: '✨' },
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number]['value'];

export const getTagMeta = (value: string) => PROJECT_TAGS.find((t) => t.value === value);
