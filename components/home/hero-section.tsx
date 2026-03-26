'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import ProjectSearchBar from './project-search';

type HeroSectionProps = {
  className?: string;
  onSearch?: (filters: { category: string; status: string; priceRange: { min: number; max: number } }) => void;
};

const HeroSection = ({ className = '', onSearch }: HeroSectionProps) => {
  const initialSlides = useMemo(
    () => [
      {
        id: 'banner-2',
        desktopImage: '/banner/extended/7desktop.webp',
        mobileImage: '/banner/mobile/2mobile.webp',
        link: '/projects',
      },
    ],
    []
  );
  const [slides, setSlides] = useState(initialSlides);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const response = await fetch('/api/banners', { cache: 'no-store' });
        const data = (await response.json()) as { data?: any[] };
        if (!response.ok) return;
        if (!Array.isArray(data.data) || data.data.length === 0) return;

        const nextSlides = data.data
          .map((row) => ({
            id: String(row?.id || ''),
            desktopImage: String(row?.desktopImage || ''),
            mobileImage: String(row?.mobileImage || row?.desktopImage || ''),
            link: String(row?.link || '/projects'),
            sortOrder: typeof row?.sortOrder === 'number' ? row.sortOrder : 0,
          }))
          .filter((row) => row.id && row.desktopImage && row.mobileImage);

        nextSlides.sort((a, b) => a.sortOrder - b.sortOrder);
        if (nextSlides.length > 0) {
          setSlides(nextSlides);
        }
      } catch {}
    };

    loadBanners();
  }, [initialSlides]);

  const infiniteSlides = useMemo(() => {
    if (slides.length <= 1) return slides;
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides]);

  const [activeIndex, setActiveIndex] = useState(slides.length > 1 ? 1 : 0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    setActiveIndex(slides.length > 1 ? 1 : 0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev >= slides.length + 1 ? 2 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goPrev = () => {
    if (slides.length <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev <= 0 ? Math.max(1, slides.length - 1) : prev - 1));
  };

  const goNext = () => {
    if (slides.length <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev >= slides.length + 1 ? 2 : prev + 1));
  };

  const handleTrackTransitionEnd = () => {
    if (slides.length <= 1) return;
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

  useEffect(() => {
    if (isAnimating) return;
    const frame = window.requestAnimationFrame(() => {
      setIsAnimating(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isAnimating]);

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
    <section className={`relative pb-6 sm:pb-6 md:pb-12 ${className}`}>
      <div className="w-full relative">
        <div className="relative w-full">
          <div className="relative h-[62vh] sm:h-[64vh] md:h-[500px] lg:h-[520px] w-full overflow-hidden">
            <div
              className={`flex h-full ${isAnimating ? 'transition-transform duration-700 ease-out' : ''}`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {infiniteSlides.map((slide, index) => (
                <div key={`${slide.id}-${index}`} className="min-w-full h-full relative">
                  <Link href={slide.link} className="block w-full h-full relative">
                    <Image
                      src={slide.desktopImage}
                      alt="Hero Banner"
                      fill
                      sizes="100vw"
                      quality={100}
                      unoptimized
                      className="hidden md:block object-cover object-center"
                      priority={index === 1}
                    />
                    <Image
                      src={slide.mobileImage}
                      alt="Hero Banner"
                      fill
                      sizes="100vw"
                      quality={100}
                      unoptimized
                      className="md:hidden object-cover object-center"
                      priority={index === 1}
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
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/35 text-white hover:bg-black/55 transition-colors flex items-center justify-center z-30"
                  aria-label="Previous banner"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/35 text-white hover:bg-black/55 transition-colors flex items-center justify-center z-30"
                  aria-label="Next banner"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            ) : null}
          </div>
          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/20 via-transparent to-black/20" />
        </div>

        <div className="hidden md:block absolute left-1/2 bottom-0 z-30 -translate-x-1/2 translate-y-1/2 w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-0">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar onSearch={handleSearch} />
          </div>
        </div>
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
