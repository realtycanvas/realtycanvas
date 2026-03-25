'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import ProjectSearchBar from './project-search';
import { banners } from '@/data/banners';
import { BrandButton } from '@/components/ui/BrandButton';

type HeroSectionProps = {
  className?: string;
  onSearch?: (filters: { category: string; status: string; priceRange: { min: number; max: number } }) => void;
};

const HeroSection = ({ className = '', onSearch }: HeroSectionProps) => {
  const slides = useMemo(() => [...banners].sort((a, b) => a.sortOrder - b.sortOrder), []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handleSearch = (filters: { category: string; status: string; priceRange: { min: number; max: number } }) => {
    if (onSearch) {
      onSearch(filters);
      return;
    }

    const params = new URLSearchParams();

    if (filters.category && filters.category !== 'All Categories') {
      params.set('category', filters.category);
    }

    if (filters.status && filters.status !== 'All Status') {
      params.set('status', filters.status);
    }

    if (filters.priceRange.min > 0) {
      params.set('minPrice', filters.priceRange.min.toString());
    }

    if (filters.priceRange.max > 0) {
      params.set('maxPrice', filters.priceRange.max.toString());
    }

    const query = params.toString();
    window.location.href = query ? `/projects?${query}` : '/projects';
  };

  return (
    <section className={`relative ${className}`}>
      <div className="w-full">
        <div className="relative w-full">
          <div className="relative h-[75vh] w-full overflow-hidden aspect-4/5 md:aspect-video">
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-full h-full relative">
                  <Link href={slide.link} className="block w-full h-full relative">
                    <Image
                      src={slide.desktopImage}
                      alt="Hero Banner"
                      fill
                      sizes="100vw"
                      className="hidden md:block object-cover object-center hover:scale-105 transition-transform duration-500"
                      priority={activeIndex === 0}
                    />
                    <Image
                      src={slide.mobileImage}
                      alt="Hero Banner"
                      fill
                      sizes="100vw"
                      className="md:hidden object-cover object-center hover:scale-105 transition-transform duration-500"
                      priority={activeIndex === 0}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors flex items-center justify-center"
                  aria-label="Previous banner"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors flex items-center justify-center"
                  aria-label="Next banner"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            ) : null}
          </div>
          <div className="absolute inset-0 z-10 bg-linear-to-r from-slate-950/35 via-slate-900/70 to-slate-950/35" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex w-full flex-col items-center justify-center space-y-6 pt-24 text-center sm:space-y-8 md:pt-20 lg:space-y-10">
                <div className="mx-auto max-w-4xl space-y-3 sm:space-y-4">
                  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 md:gap-4 flex-wrap">
                    <h1 className="text-center text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                      Find Your
                    </h1>
                    <span className="bg-linear-to-r from-brand-primary to-brand-primary bg-clip-text text-center text-3xl font-bold leading-tight text-transparent drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                      Dream Project
                    </span>
                  </div>

                  <p className="mx-auto max-w-xs text-center text-sm font-medium leading-relaxed text-gray-100 drop-shadow-md sm:max-w-xl sm:text-base md:max-w-2xl md:text-lg lg:max-w-3xl lg:text-xl">
                    Discover premium residential homes and commercial spaces across Gurgaon with India&apos;s most
                    trusted real estate consultant.
                  </p>
                </div>

                <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:max-w-md sm:flex-row sm:gap-4 md:max-w-lg">
                  <Link href="/projects" className="w-full sm:w-auto">
                    <BrandButton
                      variant="primary"
                      size="lg"
                      className="rounded-xl text-sm sm:text-base px-6 py-3 sm:py-4 w-full sm:w-auto min-w-40 shadow-lg hover:scale-105 transition-transform"
                    >
                      Explore Projects
                    </BrandButton>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <BrandButton
                      variant="secondary"
                      size="lg"
                      className="rounded-xl text-sm sm:text-base px-6 py-3 sm:py-4 w-full sm:w-auto min-w-40 bg-[#112D48]! text-white! hover:bg-[#091a30]! shadow-lg hover:scale-105 transition-transform"
                    >
                      Get In Touch
                    </BrandButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute left-1/2 bottom-0 z-30 -translate-x-1/2 translate-y-1/2 w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-0">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div className="md:hidden mt-12 px-4">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
