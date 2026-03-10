'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import FaqItem from './faq-item';
import { usePathname } from 'next/navigation';
import LeadModal from '../common/lead-modal';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

// ─── Types ────────────────────────────────────────────────────────────────────

type Highlight = { id: string; label: string; icon: string | null };
type Amenity = { id: string; category: string; name: string; details: string | null };
type FAQ = { id: string; question: string; answer: string | null; sortOrder?: number };
type FloorPlan = {
  id: string;
  level: string;
  title: string | null;
  imageUrl: string;
  details: string | null;
  sortOrder: number;
};
type PricingTableRow = {
  id: string;
  type: string;
  reraArea: string;
  price: string;
  pricePerSqft: string | null;
  availableUnits: number | null;
  floorNumbers: string | null;
  features: unknown;
};
type NearbyPoint = { id: string; type: string; name: string; distanceKm: number | null; travelTimeMin: number | null };
type Offering = { id: string; icon: string | null; title: string; description: string; sortOrder: number };
type ProjectSeo = {
  h1Tag: string | null;
  h2Tags: string[];
  featuredImgAlt: string | null;
  imageAltMap: Record<string, string> | null;
  localHeading: string | null;
  localContent: string | null;
  longFormTitle: string | null;
  longFormContent: string | null;
};

type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  category: string;
  status: string;
  address: string;
  locality: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  featuredImage: string;
  galleryImages: string[];
  videoUrls: string[];
  basePrice: string | null;
  priceRange: string | null;
  priceMin: number | null;
  priceMax: number | null;
  bannerTitle: string | null;
  bannerSubtitle: string | null;
  bannerDescription: string | null;
  aboutTitle: string | null;
  aboutDescription: string | null;
  sitePlanTitle: string | null;
  sitePlanImage: string | null;
  sitePlanDescription: string | null;
  minRatePsf: string | null;
  maxRatePsf: string | null;
  totalUnits: number | null;
  soldUnits: number | null;
  availableUnits: number | null;
  landArea: string | null;
  numberOfTowers: number | null;
  numberOfFloors: number | null;
  numberOfApartments: number | null;
  reraId: string | null;
  developerName: string | null;
  highlights: Highlight[];
  amenities: Amenity[];
  faqs: FAQ[];
  floorPlans: FloorPlan[];
  pricingTable: PricingTableRow[];
  nearbyPoints: NearbyPoint[];
  offerings: Offering[];
  seo: ProjectSeo | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCategory = (value: string) =>
  value
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getStatusStyle = (status: string) => {
  if (status === 'READY') return 'bg-green-100 text-green-800';
  if (status === 'UNDER_CONSTRUCTION') return 'bg-yellow-100 text-yellow-800';
  return 'bg-brand-primary text-black';
};

const formatNumber = (value: number | null) => (value != null ? value.toLocaleString() : null);

// ─── Section Wrapper ──────────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white rounded p-8 shadow">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
    {children}
  </section>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewAllPhotos, setViewAllPhotos] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  const pathname = usePathname();

  const projectPropertyType: 'COMMERCIAL' | 'RESIDENTIAL' | '' =
    project.category === 'RESIDENTIAL' ? 'RESIDENTIAL' : 'COMMERCIAL';

  const galleryImages = useMemo(() => {
    const images = project.galleryImages?.length ? project.galleryImages : [];
    if (project.featuredImage && !images.includes(project.featuredImage)) {
      return [project.featuredImage, ...images];
    }
    return images.length ? images : project.featuredImage ? [project.featuredImage] : [];
  }, [project.featuredImage, project.galleryImages]);

  const imageAltMap = project.seo?.imageAltMap ?? {};
  const defaultAlt = project.seo?.featuredImgAlt || project.title;
  const primaryHeading = project.seo?.h1Tag || project.title;
  const getImageAlt = (src: string) => imageAltMap[src] || defaultAlt;

  const amenityCategories = useMemo(
    () => Array.from(new Set(project.amenities.map((a) => a.category))),
    [project.amenities]
  );

  const leadFormDefaults = {
    propertyType: projectPropertyType,
    city: project.city || '',
    state: project.state || '',
    projectSlug: project.slug,
    projectTitle: project.title,
    sourcePath: typeof window !== 'undefined' ? window.location.href : pathname,
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: project?.title ?? 'Project',
      text: project?.subtitle ?? 'Check out this project',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast('Share dialog opened');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Link copied to clipboard');
      }
    } catch {
      showToast('Unable to share');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        projectTitle={project.title}
        defaultValues={leadFormDefaults}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
        {/* Back + CTA */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Projects
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold"
            >
              Enquire Now
            </button>
            <a href="tel:9555562626" className="px-4 py-2 rounded bg-green-600 text-white font-semibold">
              Call Now
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="relative h-[60vh] rounded overflow-hidden">
              {galleryImages[activeImageIndex] && (
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={getImageAlt(galleryImages[activeImageIndex])}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              )}
              <div className="absolute top-3 right-3 z-10 flex items-center space-x-3">
                <button
                  onClick={handleShare}
                  className="cursor-pointer w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ClipboardDocumentIcon className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="absolute inset-0 bg-black/25" />
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => setViewAllPhotos(true)}
                    className="hidden md:block cursor-pointer absolute bottom-6 right-6 bg-white hover:bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium z-10"
                  >
                    View All Photos
                  </button>
                  <div className="absolute bottom-6 left-6 flex gap-2 z-10">
                    {galleryImages.slice(0, 5).map((img, index) => (
                      <button
                        key={img}
                        onClick={() => setActiveImageIndex(index)}
                        className={`cursor-pointer rounded border-2 ${activeImageIndex === index ? 'border-yellow-400' : 'border-white/60'}`}
                      >
                        <Image
                          src={img}
                          alt={getImageAlt(img)}
                          width={64}
                          height={64}
                          className="w-10 h-10 md:w-16 md:h-16 object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Title + Address */}
            <div>
              <div className="mb-2 flex gap-2 ">
                {project.reraId && (
                  <span className="inline-block text-[12px] bg-green-100 font-semibold text-green-800 px-2 py-1 rounded">
                    RERA: {project.reraId}
                  </span>
                )}

                <div className="">
                  <span className={`inline-block text-[12px] bg-brand-primary/50 font-semibold px-2 py-1 rounded`}>
                    {formatCategory(project.status)}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{primaryHeading}</h1>
              <p className="text-gray-600 text-sm flex gap-1 items-center">
                <MapPin size={16} className="mt-px shrink-0" />
                {[project.address, project.locality, project.city, project.state].filter(Boolean).join(', ')}
              </p>
            </div>

            {/* Short Description */}
            <div className="bg-white rounded p-6 shadow">
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* 1. Project Overview */}
            {(project.aboutTitle || project.aboutDescription) && (
              <Section title={project.aboutTitle || 'Project Overview'}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.aboutDescription}</p>
              </Section>
            )}

            {/* 2. Location Advantage */}
            {project.seo?.localContent && (
              <Section title={project.seo.localHeading || 'Location Advantage'}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.seo.localContent}</p>
                {project.sitePlanImage && (
                  <div className="relative aspect-video rounded overflow-hidden mt-6">
                    <Image
                      src={project.sitePlanImage}
                      alt={getImageAlt(project.sitePlanImage)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                )}
                {project.nearbyPoints.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {project.nearbyPoints.map((point) => (
                      <div
                        key={point.id}
                        className="flex justify-between text-sm text-gray-700 py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="font-medium">{point.name}</span>
                        <span className="text-gray-500">
                          {point.distanceKm ? `${point.distanceKm} km` : ''}
                          {point.travelTimeMin ? ` • ${point.travelTimeMin} min` : ''}
                          {!point.distanceKm && !point.travelTimeMin ? 'Nearby' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {/* 3. Retail, F&B & Commercial Spaces */}
            {project.offerings.length > 0 && (
              <Section title="Retail, F&B & Commercial Spaces">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.offerings.map((offering) => (
                    <div
                      key={offering.id}
                      className="border border-gray-200 rounded p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="text-3xl mb-3">{offering.icon || '•'}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{offering.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{offering.description}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* 4. Price & Unit Size Overview */}
            {(project.basePrice || project.priceRange || project.priceMin || project.pricingTable.length > 0) && (
              <Section title="Price & Unit Size Overview">
                {(project.priceRange || project.basePrice) && (
                  <div className="flex flex-wrap gap-4 mb-6">
                    {project.priceRange && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded px-5 py-3">
                        <p className="text-xs text-gray-500 mb-1">Price Range</p>
                        <p className="text-lg font-bold text-yellow-700">{project.priceRange}</p>
                      </div>
                    )}
                    {project.basePrice && (
                      <div className="bg-gray-50 border border-gray-200 rounded px-5 py-3">
                        <p className="text-xs text-gray-500 mb-1">Base Price</p>
                        <p className="text-lg font-bold text-gray-900">{project.basePrice}</p>
                      </div>
                    )}
                    {project.priceMin && project.priceMax && (
                      <div className="bg-gray-50 border border-gray-200 rounded px-5 py-3">
                        <p className="text-xs text-gray-500 mb-1">Pricing Band</p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{formatNumber(project.priceMin)} – ₹{formatNumber(project.priceMax)}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {project.pricingTable.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-left text-gray-600">
                          <th className="py-3 px-4 font-semibold rounded-tl">Property Type</th>
                          <th className="py-3 px-4 font-semibold">Approx Unit Size</th>
                          <th className="py-3 px-4 font-semibold">Indicative Price</th>
                          <th className="py-3 px-4 font-semibold">Price / Sq.ft</th>
                          <th className="py-3 px-4 font-semibold rounded-tr">Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.pricingTable.map((row, idx) => (
                          <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="py-3 px-4 font-medium text-gray-900">{row.type}</td>
                            <td className="py-3 px-4 text-gray-700">{row.reraArea}</td>
                            <td className="py-3 px-4 text-yellow-700 font-semibold">{row.price}</td>
                            <td className="py-3 px-4 text-gray-600">{row.pricePerSqft || '—'}</td>
                            <td className="py-3 px-4 text-gray-600">{row.availableUnits ?? '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-gray-400 mt-3">
                      * Prices and sizes are indicative and subject to change at developer discretion.
                    </p>
                  </div>
                )}
              </Section>
            )}

            {/* 5. Amenities & Features */}
            {project.amenities.length > 0 && (
              <Section title="Amenities & Features">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {amenityCategories.map((category) => (
                    <div key={category} className="border border-gray-200 rounded p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-3">{category}</h3>
                      <ul className="space-y-2">
                        {project.amenities
                          .filter((a) => a.category === category)
                          .map((amenity) => (
                            <li key={amenity.id} className="text-gray-700 text-sm flex items-start gap-2">
                              <span className="text-yellow-500 mt-0.5">•</span>
                              <span>{amenity.name}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* 6. Why Invest */}
            {project.highlights.length > 0 && (
              <Section title="Why Invest in SPJ Vedatam, Gurgaon?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight) => (
                    <div
                      key={highlight.id}
                      className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded"
                    >
                      <span className="text-xl shrink-0">{highlight.icon || '📌'}</span>
                      <p className="text-gray-700 text-sm leading-relaxed">{highlight.label}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* 7. Who Should Consider (longFormContent) */}
            {project.seo?.longFormContent && (
              <Section title={project.seo.longFormTitle || 'Who Should Consider SPJ Vedatam?'}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.seo.longFormContent}</p>
              </Section>
            )}

            {/* 8. Floor Plans (if any) */}
            {project.floorPlans.length > 0 && (
              <Section title="Floor Plans & Layouts">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.floorPlans.map((plan) => (
                    <div key={plan.id} className="border border-gray-200 rounded overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={plan.imageUrl}
                          alt={`${plan.level} floor plan`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-900">
                          {plan.level}
                          {plan.title ? ` • ${plan.title}` : ''}
                        </h3>
                        {plan.details && <p className="text-gray-600 text-sm mt-1">{plan.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* 9. FAQs */}
            {project.faqs.length > 0 && (
              <Section title="Frequently Asked Questions">
                <div className="space-y-3">
                  {project.faqs.map((faq) => (
                    <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* ── Right Sticky Sidebar ─────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded shadow overflow-hidden">
                <div className="text-center bg-gray-900 p-6">
                  {/* <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Starting From</p> */}
                  <div className="text-2xl font-bold text-yellow-400">
                    {project.basePrice || project.priceRange || 'Contact for Pricing'}
                  </div>
                  {project.developerName && <p className="text-gray-400 text-sm mt-1">by {project.developerName}</p>}
                </div>
                <div className="flex flex-wrap justify-around p-4 gap-3">
                  {[
                    { label: 'Land Area', value: project.landArea },
                    { label: 'Floors', value: project.numberOfFloors },
                    { label: 'Total Units', value: project.totalUnits },
                    { label: 'Category', value: formatCategory(project.category) },
                  ]
                    .filter(({ value }) => value !== null && value !== undefined && value !== '')
                    .map(({ label, value }) => (
                      <div key={label} className="bg-gray-50 rounded p-3 text-center min-w-20">
                        <p className="text-base font-semibold text-gray-900">{value}</p>
                        <p className="text-xs text-gray-500">{label}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Key Features */}
              {project.highlights.length > 0 && (
                <div className="bg-white rounded p-6 shadow">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Key Highlights</h4>
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 4).map((highlight) => (
                      <li key={highlight.id} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                        <span>{highlight.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3">
                <Link
                  href="https://wa.me/919555562626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition"
                >
                  WhatsApp Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {viewAllPhotos && galleryImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Photo Gallery ({activeImageIndex + 1} / {galleryImages.length})
              </h3>
              <button
                onClick={() => setViewAllPhotos(false)}
                className="cursor-pointer px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
              >
                ✕ Close
              </button>
            </div>
            <div className="flex-1 grid grid-rows-[1fr_auto] overflow-hidden">
              <div className="relative bg-black overflow-hidden">
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={getImageAlt(galleryImages[activeImageIndex])}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <button
                  onClick={() =>
                    setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length)
                  }
                  className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActiveImageIndex((activeImageIndex + 1) % galleryImages.length)}
                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold"
                >
                  ›
                </button>
              </div>
              <div className="p-4 overflow-x-auto bg-white border-t">
                <div className="flex gap-3">
                  {galleryImages.map((img, index) => (
                    <button
                      key={img}
                      onClick={() => setActiveImageIndex(index)}
                      className={`cursor-pointer rounded border-2 shrink-0 ${index === activeImageIndex ? 'border-yellow-500' : 'border-gray-200'}`}
                    >
                      <Image
                        src={img}
                        alt={getImageAlt(img)}
                        width={96}
                        height={80}
                        className="w-24 h-20 object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
