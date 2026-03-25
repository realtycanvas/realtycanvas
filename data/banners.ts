export type BannerItem = {
  id: string;
  desktopImage: string;
  mobileImage: string;
  link: string;
  sortOrder: number;
};

export const banners: BannerItem[] = [
  {
    id: 'home-hero-1',
    desktopImage: '/banner/extended/aipl.webp',
    mobileImage: '/banner/mobile/aipl.webp',
    link: '/projects',
    sortOrder: 1,
  },
  {
    id: 'home-hero-2',
    desktopImage: '/banner/extended/downtown.webp',
    mobileImage: '/banner/mobile/downtown.webp',
    link: '/projects',
    sortOrder: 2,
  },
];
