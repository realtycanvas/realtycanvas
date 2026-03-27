'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectSearchBar from './project-search';
import { banners as dataBanners } from '@/data/banners';

type HeroSectionProps = {
  className?: string;
  onSearch?: (filters: { category: string; status: string; priceRange: { min: number; max: number } }) => void;
};

const HeroSection = ({ className = '', onSearch }: HeroSectionProps) => {
  const uiExtra = useMemo(
    () => ({
      id: 'home-hero-downtown',
      desktopImage: '/banner/extended/downtown-desktop.webp',
      mobileImage: '/banner/mobile/downtown-Mobile.webp',
      link: '/projects',
      sortOrder: 2,
    }),
    []
  );

  const slides = useMemo(() => {
    const base = [...dataBanners].sort((a, b) => a.sortOrder - b.sortOrder);
    base.push(uiExtra);
    return base;
  }, [uiExtra]);

  const hasMultiple = slides.length > 1;
  const trackSlides = useMemo(() => {
    if (!hasMultiple) return slides;
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides, hasMultiple]);

  const [activeIndex, setActiveIndex] = useState(hasMultiple ? 1 : 0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev >= slides.length + 1 ? 2 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [hasMultiple, slides.length]);

  useEffect(() => {
    setIsAnimating(true);
    setActiveIndex(hasMultiple ? 1 : 0);
  }, [hasMultiple]);

  const onTransitionEnd = () => {
    if (!hasMultiple) return;
    if (activeIndex === 0) {
      setIsAnimating(false);
      setActiveIndex(slides.length);
      return;
    }
    if (activeIndex === slides.length + 1) {
      setIsAnimating(false);
      setActiveIndex(1);
    }
  };

  const handleSearch = (filters: { category: string; status: string; priceRange: { min: number; max: number } }) => {
    if (onSearch) {
      onSearch(filters);
      return;
    }
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All Categories') params.set('category', filters.category);
    if (filters.status && filters.status !== 'All Status') params.set('status', filters.status);
    if (filters.priceRange.min > 0) params.set('minPrice', filters.priceRange.min.toString());
    if (filters.priceRange.max > 0) params.set('maxPrice', filters.priceRange.max.toString());

    const query = params.toString();
    window.location.href = query ? `/projects?${query}` : '/projects';
  };

  if (slides.length === 0) return null;

  return (
    <section className={`relative pb-6 sm:pb-6 md:pb-12 ${className}`}>
      <div className="relative w-full">
        <div className="relative h-[62vh] sm:h-[64vh] md:h-125 lg:h-130 w-full overflow-hidden">
          <div
            className={`flex h-full ${isAnimating ? 'transition-transform duration-700 ease-out' : ''}`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            onTransitionEnd={onTransitionEnd}
          >
            {trackSlides.map((slide, idx) => (
              <div key={`${slide.id}-${idx}`} className="min-w-full h-full relative">
                <Link href={slide.link} className="block w-full h-full relative" aria-label="View banner">
                  <div className="block md:hidden absolute inset-0">
                    <Image
                      src={slide.mobileImage}
                      alt="Hero Banner"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="100vw"
                      quality={100}
                      unoptimized
                    />
                  </div>
                  <div className="hidden md:block absolute inset-0">
                    <Image
                      src={slide.desktopImage}
                      alt="Hero Banner"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="100vw"
                      quality={100}
                      unoptimized
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/20 via-transparent to-black/20" />
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
