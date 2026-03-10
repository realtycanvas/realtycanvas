'use client';

import React, { useState, useEffect } from 'react';
import Preloader from '@/components/common/Preloader';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Max duration: hide after 3 seconds regardless
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Also hide preloader when page is fully loaded
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>{children}</div>
    </>
  );
};

export default ClientLayout;
