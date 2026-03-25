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
    desktopImage: '/home/homepage.webp',
    mobileImage: '/home/homepage.webp',
    link: '/projects',
    sortOrder: 1,
  },
];
