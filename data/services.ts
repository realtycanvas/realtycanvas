import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  HandRaisedIcon,
} from '@heroicons/react/24/outline';
import { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface Service {
  icon: IconComponent;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: HomeIcon,
    title: 'Understand Your Goals',
    description: 'Residential home or commercial investment? Budget analysis and requirement mapping',
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Curated Recommendations',
    description: 'Handpicked properties matching your criteria from our exclusive inventory',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Site Visits & Analysis',
    description: 'Guided property tours with complete market analysis and ROI projections',
  },
  {
    icon: DocumentTextIcon,
    title: 'Seamless Documentation',
    description: 'End-to-end legal support, RERA verification, and booking assistance',
  },
  {
    icon: HandRaisedIcon,
    title: 'Possession & Beyond',
    description: 'Handover support and rental assistance',
  },
];
