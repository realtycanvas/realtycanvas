'use client';

import { useEffect, useMemo, useState } from 'react';
import SmartImage from '../ui/SmartImage';
import Link from 'next/link';

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 4.5a2.25 2.25 0 012.25-2.25h2.152a2.25 2.25 0 012.166 1.638l.58 2.03a2.25 2.25 0 01-.574 2.261l-1.11 1.11a16.02 16.02 0 006.435 6.435l1.11-1.11a2.25 2.25 0 012.262-.573l2.03.58a2.25 2.25 0 011.637 2.165V19.5a2.25 2.25 0 01-2.25 2.25h-.75C10.066 21.75 2.25 13.934 2.25 4.5v0z"
      />
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
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25A9.75 9.75 0 004.05 17.7L2.4 21.6l4.05-1.59A9.75 9.75 0 1012 2.25zm0 17.625c-1.462 0-2.886-.39-4.14-1.13l-.297-.173-2.404.944.98-2.327-.194-.31a8.072 8.072 0 1113.83.01A8.05 8.05 0 0112 19.875zm4.433-5.98c-.243-.122-1.439-.712-1.662-.793-.223-.081-.385-.121-.548.122-.162.243-.628.793-.77.956-.142.162-.284.183-.527.06-.243-.121-1.027-.378-1.957-1.207-.724-.646-1.214-1.444-1.356-1.687-.142-.243-.015-.374.107-.496.11-.108.243-.284.365-.426.122-.142.162-.243.244-.406.08-.162.04-.304-.02-.426-.061-.122-.548-1.321-.75-1.808-.197-.472-.397-.407-.548-.414l-.467-.008a.896.896 0 00-.648.304c-.223.243-.851.833-.851 2.03 0 1.197.872 2.354.994 2.516.122.162 1.717 2.625 4.16 3.68.582.251 1.036.401 1.39.513.584.186 1.115.16 1.535.097.468-.07 1.44-.588 1.643-1.156.203-.569.203-1.056.142-1.156-.06-.102-.223-.163-.466-.284z" />
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
      className={`${showSolidNav ? 'bg-white shadow-lg' : 'bg-transparent'} fixed w-full z-50 transition-all duration-300`}
    >
      <div
        className={`max-w-7xl mx-auto px-2 sm:px-4 ${showSolidNav ? 'bg-transparent' : 'bg-transparent hover:bg-black/20'} rounded-lg mx-4 mt-2 transition-colors duration-300`}
      >
        <div className="h-16 px-4 lg:px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center no-underline hover:no-underline focus:no-underline">
            {/* Logo - Light version only */}
            <SmartImage
              src={showSolidNav ? '/logo-original.webp' : '/logo-white.webp'}
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
