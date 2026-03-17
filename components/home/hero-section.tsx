'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import ProjectSearchBar from './project-search';
import { banners } from '@/data/banners';

type HeroSectionProps = {
  className?: string;
  onSearch?: (filters: { category: string; status: string; priceRange: { min: number; max: number } }) => void;
};

const HeroSection = ({
  className = '',
  onSearch,
}: HeroSectionProps) => {
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

  return (
    <section className={`relative ${className}`}>
      <div className="w-full">
        <div className="relative w-full">
          <div className="relative h-[75vh] w-full overflow-hidden">
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-full h-full relative">
                  <Link href={slide.link} className="block w-full h-full relative">
                    <Image src={slide.bannerImage} alt="Hero Banner" fill sizes="100vw" className="object-cover hover:scale-105 transition-transform duration-500" />
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

        </div>

        <div className="absolute left-1/2 top-[75vh] -translate-x-1/2 -translate-y-1/2 w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-0">
          <div className="rounded-2xl shadow-xl bg-white">
            <ProjectSearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
