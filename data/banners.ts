export type BannerItem = {
  id: string;
  bannerImage: string;
  link: string;
  sortOrder: number;
};

export const banners: BannerItem[] = [
  {
    id: 'home-hero-1',
    bannerImage: '/home/homepage.webp',
    link: '/projects',
    sortOrder: 1,
  },
  {
    id: 'home-hero-2',
    bannerImage: '/home/bannernew.webp',
    link: '/projects',
    sortOrder: 2,
  },
];
