'use client';

import Image from 'next/image';
import ProjectSearchBar from './project-search';

type HeroSectionProps = {
  className?: string;
  onSearch?: (filters: { category: string; status: string; priceRange: { min: number; max: number } }) => void;
  headingStart?: string;
  headingAccent?: string;
  description?: string;
  exploreHref?: string;
  contactHref?: string;
  backgroundDesktopSrc?: string;
  backgroundMobileSrc?: string;
};

const HeroSection = ({
  className = '',
  onSearch,
  headingStart = 'Find Your',
  headingAccent = 'Dream Project',
  description = 'Discover premium residential homes and commercial spaces across Gurgaon with India’s most trusted real estate consultant.',
  exploreHref = '/projects',
  contactHref = '/contact',
  backgroundDesktopSrc = '/home/homepage.webp',
  backgroundMobileSrc = '/home/home-mobile.webp',
}: HeroSectionProps) => {
  return (
    <section className={`relative pb-10 flex items-center justify-center min-h-screen ${className}`}>
      <Image
        src={backgroundDesktopSrc}
        alt="Hero Background"
        width={100000}
        height={100000}
        className="hidden sm:block absolute inset-0 w-full h-full object-cover object-center"
      />
      <Image
        src={backgroundMobileSrc}
        alt="Hero Background Mobile"
        width={100000}
        height={100000}
        className="block sm:hidden absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/20 -z-10" />
      <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-black/50 via-[#112D48]/20 to-transparent z-10" />
      <div className="block lg:hidden absolute inset-0 bg-linear-to-b from-black/50 via-[#112D48]/20 to-transparent z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center lg:items-start justify-center h-full mt-20">
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10 w-full lg:w-[60%]">
          <div className="space-y-3 sm:space-y-5 max-w-4xl mx-auto lg:mx-0 lg:mr-auto">
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-2 sm:gap-0 flex-wrap">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white drop-shadow-lg text-center lg:text-left">
                {headingStart}
              </h1>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold -mt-5 leading-tight bg-linear-to-r from-[#FBB70F] to-[#FBB70F] bg-clip-text text-transparent drop-shadow-sm text-center lg:text-left">
                {headingAccent}
              </span>
            </div>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-100 leading-tight max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto lg:mx-0 lg:mr-auto drop-shadow-md text-center lg:text-left">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto lg:mx-0 lg:mr-auto">
            <a
              href={exploreHref}
              className="w-full sm:w-auto rounded text-sm sm:text-base px-6 py-3 min-w-40 shadow-lg bg-[#FBB70F] text-[#112D48] font-semibold hover:bg-[#e5a60d] hover:scale-105 transition-transform text-center"
            >
              Explore Projects
            </a>
            <a
              href={contactHref}
              className="w-full sm:w-auto rounded text-sm sm:text-base px-6 py-3 min-w-40 shadow-lg bg-[#112D48] text-white font-semibold hover:bg-[#091a30] hover:scale-105 transition-transform text-center"
            >
              Get In Touch
            </a>
          </div>

          <div className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto lg:mx-0 lg:mr-auto mt-4 sm:mt-8 px-2 sm:px-0">
            <ProjectSearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
