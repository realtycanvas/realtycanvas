'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProjectSearchBar from './project-search';
import { banners } from '@/data/banners';

type HeroSectionProps = {
  className?: string;
  onSearch?: (filters: {
    category: string;
    status: string;
    priceRange: { min: number; max: number };
  }) => void;
};

const HeroSection = ({ className = '', onSearch }: HeroSectionProps) => {
  const banner = banners[0];

  const handleSearch = (filters: {
    category: string;
    status: string;
    priceRange: { min: number; max: number };
  }) => {
    if (onSearch) {
      onSearch(filters);
      return;
    }
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All Categories')
      params.set('category', filters.category);
    if (filters.status && filters.status !== 'All Status')
      params.set('status', filters.status);
    if (filters.priceRange.min > 0)
      params.set('minPrice', filters.priceRange.min.toString());
    if (filters.priceRange.max > 0)
      params.set('maxPrice', filters.priceRange.max.toString());

    const query = params.toString();
    window.location.href = query ? `/projects?${query}` : '/projects';
  };

  if (!banner) return null;

  return (
    <section className={`relative pb-6 sm:pb-6 md:pb-12 ${className}`}>
      <div className="relative w-full">

        {/* Banner Container */}
        <div className="relative h-[62vh] sm:h-[64vh] md:h-125 lg:h-130 w-full overflow-hidden">

          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src={banner.mobileImage}
              alt="Hero Banner"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={100}
              unoptimized
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src={banner.desktopImage}
              alt="Hero Banner"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={100}
              unoptimized
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/20 via-transparent to-black/20" />

          {/* Clickable Link Overlay */}
          <Link
            href={banner.link}
            className="absolute inset-0 z-20"
            aria-label="View banner"
          />
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:block absolute left-1/2 bottom-0 z-30 -translate-x-1/2 translate-y-1/2 w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-0">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pt-10 pb-2 px-4 bg-white">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;