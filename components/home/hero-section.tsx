'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectSearchBar from './project-search';
import { banners } from '@/data/banners';

type HeroSectionProps = {
  className?: string;
};

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const slides = [...banners].sort((a, b) => a.sortOrder - b.sortOrder);
  if (!slides.length) return null;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className={`relative pb-6 sm:pb-6 md:pb-12 ${className}`}>
      <div className="relative w-full">
        <div className="relative h-[62vh] sm:h-[64vh] md:h-125 lg:h-130 w-full overflow-hidden">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Link href={slide.link} className="absolute inset-0 z-10" aria-label="View banner" />
              <picture className="absolute inset-0 block">
                <source media="(min-width: 1920px)" srcSet={slide.tvImage || slide.desktopImage} />
                <source media="(min-width: 1280px)" srcSet={slide.desktopImage} />
                <source media="(min-width: 768px)" srcSet={slide.tabletImage || slide.mobileImage} />
                <img
                  src={slide.mobileImage || slide.tabletImage || slide.desktopImage}
                  alt="Hero Banner"
                  className="h-full w-full object-cover object-center"
                  loading={idx === activeIndex ? 'eager' : 'lazy'}
                />
              </picture>
            </div>
          ))}

          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveIndex((i) => (i - 1 + slides.length) % slides.length)}
              className="pointer-events-auto inline-flex items-center justify-center px-3 py-4 text-white/90 hover:text-white transition drop-shadow-sm"
              aria-label="Previous banner"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14.5 5L7.5 12L14.5 19"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((i) => (i + 1) % slides.length)}
              className="pointer-events-auto inline-flex items-center justify-center px-3 py-4 text-white/90 hover:text-white transition drop-shadow-sm"
              aria-label="Next banner"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9.5 5L16.5 12L9.5 19"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden md:block absolute left-1/2 bottom-0 z-30 -translate-x-1/2 translate-y-1/2 w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-0">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar />
          </div>
        </div>

        <div className="md:hidden pt-10 pb-2 px-4 bg-white">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
