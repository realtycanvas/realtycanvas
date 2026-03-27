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
    desktopImage: '/banner/extended/7desktop.webp',
    mobileImage: '/banner/mobile/2mobile.webp',
    link: '/projects',
    sortOrder: 1,
  },
];
