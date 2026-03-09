'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type NavItem = {
  name: string;
  href: string;
};

type DemoNavbarProps = {
  brandName?: string;
  logoLightSrc?: string;
  logoDarkSrc?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  navItems?: NavItem[];
  currentPath?: string;
};

const defaultNavItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function formatWhatsappLink(value: string) {
  const digits = value.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

function formatPhoneLink(value: string) {
  const digits = value.replace(/\D/g, '');
  return `tel:${digits}`;
}

function BarsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      ></path>
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907l9.566-5.478M7.217 13.093l9.566 5.478M6.75 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm14.25-7.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm0 15a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      className="h-5 w-5"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
    </svg>
  );
}

export default function Navbar({
  brandName = 'Realty Canvas',
  logoLightSrc = '/logo/logo-white.webp',
  logoDarkSrc = 'logo//logo-original.webp',
  phoneNumber = '9555562626',
  whatsappNumber = '9555562626',
  navItems = defaultNavItems,
  currentPath = '/',
}: DemoNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = currentPath === '/';
  const showSolidNav = isScrolled || !isHomePage;

  const telHref = useMemo(() => formatPhoneLink(phoneNumber), [phoneNumber]);
  const waHref = useMemo(() => formatWhatsappLink(whatsappNumber), [whatsappNumber]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleShare = async () => {
    const data = {
      title: brandName,
      text: `Check out ${brandName}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      if (navigator.clipboard && data.url) {
        await navigator.clipboard.writeText(data.url);
      }
    } catch {}
  };

  return (
    <nav
      className={`${showSolidNav ? 'bg-white shadow-lg' : 'bg-transparent'} fixed top-0 w-full z-50 transition-all duration-300`}
    >
      <div
        className={`max-w-7xl mx-auto px-2 sm:px-4 ${showSolidNav ? 'bg-transparent' : 'bg-transparent hover:bg-black/20'} rounded-lg mx-4 mt-2 transition-colors duration-300`}
      >
        <div className="h-16 px-4 lg:px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center no-underline hover:no-underline focus:no-underline">
            {/* Logo - Light version only */}
            <Image
              src={showSolidNav ? '/logo/logo-original.webp' : '/logo/logo-white.webp'}
              alt="Reality Canvas"
              width={1200}
              height={100}
              className={`w-40 h-10 ${showSolidNav ? '' : ''}`}
              priority
            />
          </Link>

          <div className="hidden lg:flex lg:items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${showSolidNav ? 'text-gray-700' : 'text-white'} hover:text-[#FBB70F] px-4 py-2 text-base font-medium transition-colors duration-200 relative group no-underline`}
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FBB70F] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4 pr-10">
            <a
              href={telHref}
              className="flex items-center gap-2 bg-[#FBB70F] hover:bg-[#e5a60d] text-[#112D48] font-medium px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 animate-pulse hover:animate-none whitespace-nowrap shadow-lg"
            >
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              <WhatsappIcon className="h-4 w-4" />
              {whatsappNumber}
            </a>
            <button
              onClick={handleShare}
              className={`w-full ${showSolidNav ? 'text-gray-600 bg-[#F0F0F0]' : 'text-white bg-white/20 hover:bg-white/30'} p-3 flex items-center justify-center rounded-full transition-colors`}
            >
              <ShareIcon className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-[#FBB70F] hover:text-[#e5a60d] transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <CloseIcon className="h-10 w-10" /> : <BarsIcon className="h-10 w-10" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#FBB70F] hover:bg-gray-50 rounded-md transition-colors duration-200 no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-2 bg-[#FBB70F] hover:bg-[#e5a60d] text-[#112D48] font-medium py-3 rounded-lg text-center w-full mb-2 transition-all duration-300 transform hover:scale-105 animate-pulse hover:animate-none shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PhoneIcon className="h-5 w-5" />
                  Call Now: {phoneNumber}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg text-center w-full mb-2 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <WhatsappIcon className="h-5 w-5" />
                  {whatsappNumber}
                </a>
                <button
                  onClick={handleShare}
                  className="w-full bg-gray-100 text-gray-700 p-3 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-200"
                >
                  <ShareIcon className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
