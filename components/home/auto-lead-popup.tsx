'use client';

import { useEffect, useState } from 'react';
import LeadModal from '@/components/common/lead-modal';

const SESSION_KEY = 'rc_auto_lead_popup_seen';

export default function AutoLeadPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === '1';
    if (alreadySeen) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, '1');
    }
  };

  return <LeadModal isOpen={isOpen} onClose={close} projectTitle="Ready to Start Your Journey?" />;
}
