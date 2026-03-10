'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

type Highlight = {
  id: string;
  label: string;
  icon: string | null;
};

type Amenity = {
  id: string;
  category: string;
  name: string;
  details: string | null;
};

type FAQ = {
  id: string;
  question: string;
  answer: string | null;
};

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

type NearbyPoint = {
  id: string;
  type: string;
  name: string;
  distanceKm: number | null;
  travelTimeMin: number | null;
};

type Offering = {
  id: string;
  icon: string | null;
  title: string;
  description: string;
  sortOrder: number;
};

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

type ProjectDetailClientProps = {
  project: Project;
  slug: string;
};

const formatCategory = (value: string) => value.replace(/_/g, ' ');

const getStatusStyle = (status: string) => {
  if (status === 'READY') {
    return 'bg-green-100 text-green-800';
  }
  if (status === 'UNDER_CONSTRUCTION') {
    return 'bg-yellow-100 text-yellow-800';
  }
  return 'bg-brand-primary text-black';
};

const formatNumber = (value: number | null) => {
  if (value === null || value === undefined) return null;
  return value.toLocaleString();
};

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewAllPhotos, setViewAllPhotos] = useState(false);

  const galleryImages = useMemo(() => {
    const images = project.galleryImages?.length ? project.galleryImages : [];
    if (project.featuredImage && !images.includes(project.featuredImage)) {
      return [project.featuredImage, ...images];
    }
    return images.length ? images : project.featuredImage ? [project.featuredImage] : [];
  }, [project.featuredImage, project.galleryImages]);

  const imageAltMap = project.seo?.imageAltMap ?? {};
  const defaultAlt = project.seo?.featuredImgAlt || project.seo?.h1Tag || project.title;
  const primaryHeading = project.seo?.h1Tag || project.title;
  const overviewTitle = project.aboutTitle || project.seo?.h2Tags?.[0] || 'Project Overview';
  const overviewText = project.aboutDescription || project.description;
  const bannerTitle = project.bannerTitle || project.title;
  const bannerSubtitle = project.bannerSubtitle || project.subtitle;

  const getImageAlt = (src: string) => imageAltMap[src] || defaultAlt;

  const amenityCategories = useMemo(() => {
    const set = new Set(project.amenities.map((a) => a.category));
    return Array.from(set);
  }, [project.amenities]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Projects
          </Link>
          <div className="flex items-center gap-3">
            <a href="#enquiry" className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold">
              Enquire Now
            </a>
            <a href="tel:9555562626" className="px-4 py-2 rounded bg-green-600 text-white font-semibold">
              Call Now
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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

              <div className="absolute right-3 top-3 z-10 flex justify-center">
                <span className={`px-3 py-1 rounded text-sm font-semibold ${getStatusStyle(project.status)}`}>
                  {formatCategory(project.status)}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/30" />
              {galleryImages.length > 1 && (
                <button
                  onClick={() => setViewAllPhotos(true)}
                  className="hidden md:block cursor-pointer absolute bottom-6 right-6 bg-white hover:bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium"
                >
                  View All Photos
                </button>
              )}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {galleryImages.slice(0, 5).map((img, index) => (
                    <button
                      key={img}
                      onClick={() => setActiveImageIndex(index)}
                      className={`cursor-pointer rounded border-2 ${activeImageIndex === index ? 'border-blue-500' : 'border-white/60'}`}
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
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{primaryHeading}</h1>
              <p className="text-gray-600 text-sm flex gap-1 tems-center">
                <MapPin size={16} className="mt-px" />
                {project.address}
                {project.locality ? `, ${project.locality}` : ''}
                {project.city ? `, ${project.city}` : ''}
                {project.state ? `, ${project.state}` : ''}
              </p>
              {/* {bannerSubtitle && <p className="text-xl text-gray-700 mt-3">{bannerSubtitle}</p>} */}
            </div>

            <section className="bg-white rounded p-6 shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{overviewTitle}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.description}</p>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mt-4">{overviewText}</p>
              {project.bannerDescription && (
                <p className="text-gray-700 leading-relaxed mt-4 whitespace-pre-wrap">{project.bannerDescription}</p>
              )}
            </section>

            {project.offerings.length > 0 && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Retail, F&B & Commercial Spaces</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.offerings.map((offering) => (
                    <div key={offering.id} className="border border-gray-200 rounded p-5">
                      <div className="text-2xl mb-2">{offering.icon || '•'}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{offering.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{offering.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.highlights.length > 0 && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight) => (
                    <div key={highlight.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded">
                      <span className="text-2xl">{highlight.icon || '✓'}</span>
                      <p className="text-gray-700">{highlight.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.amenities.length > 0 && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {amenityCategories.map((category) => (
                    <div key={category} className="border border-gray-200 rounded p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                      <ul className="space-y-2">
                        {project.amenities
                          .filter((amenity) => amenity.category === category)
                          .map((amenity) => (
                            <li key={amenity.id} className="text-gray-700 flex items-start gap-2">
                              <span>•</span>
                              <span>{amenity.name}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(project.basePrice || project.priceRange || project.priceMin || project.pricingTable.length > 0) && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Price & Unit Size</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {project.basePrice && (
                      <div className="flex justify-between bg-gray-50 px-4 py-3 rounded">
                        <span className="text-gray-600">Base Price</span>
                        <span className="font-semibold text-gray-900">{project.basePrice}</span>
                      </div>
                    )}
                    {project.priceRange && (
                      <div className="flex justify-between bg-gray-50 px-4 py-3 rounded">
                        <span className="text-gray-600">Price Range</span>
                        <span className="font-semibold text-gray-900">{project.priceRange}</span>
                      </div>
                    )}
                    {project.priceMin && project.priceMax && (
                      <div className="flex justify-between bg-gray-50 px-4 py-3 rounded">
                        <span className="text-gray-600">Pricing Band</span>
                        <span className="font-semibold text-gray-900">
                          ₹{formatNumber(project.priceMin)} - ₹{formatNumber(project.priceMax)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {project.minRatePsf && (
                      <div className="flex justify-between bg-gray-50 px-4 py-3 rounded">
                        <span className="text-gray-600">Min Rate (Sq.ft)</span>
                        <span className="font-semibold text-gray-900">{project.minRatePsf}</span>
                      </div>
                    )}
                    {project.maxRatePsf && (
                      <div className="flex justify-between bg-gray-50 px-4 py-3 rounded">
                        <span className="text-gray-600">Max Rate (Sq.ft)</span>
                        <span className="font-semibold text-gray-900">{project.maxRatePsf}</span>
                      </div>
                    )}
                  </div>
                </div>

                {project.pricingTable.length > 0 && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-600 border-b">
                          <th className="py-3 pr-4">Type</th>
                          <th className="py-3 pr-4">RERA Area</th>
                          <th className="py-3 pr-4">Price</th>
                          <th className="py-3 pr-4">Price / Sq.ft</th>
                          <th className="py-3 pr-4">Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.pricingTable.map((row) => (
                          <tr key={row.id} className="border-b last:border-b-0 text-gray-700">
                            <td className="py-3 pr-4 font-medium text-gray-900">{row.type}</td>
                            <td className="py-3 pr-4">{row.reraArea}</td>
                            <td className="py-3 pr-4">{row.price}</td>
                            <td className="py-3 pr-4">{row.pricePerSqft || 'N/A'}</td>
                            <td className="py-3 pr-4">{row.availableUnits ?? 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {project.floorPlans.length > 0 && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Floor Plans & Layouts</h2>
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
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {plan.level}
                          {plan.title ? ` • ${plan.title}` : ''}
                        </h3>
                        {plan.details && <p className="text-gray-600 mt-2">{plan.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded p-8 shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Connectivity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded p-4">
                    <p className="text-gray-700 font-medium">{project.address}</p>
                    <p className="text-gray-600">
                      {project.locality ? `${project.locality}, ` : ''}
                      {project.city ? `${project.city}, ` : ''}
                      {project.state || ''}
                    </p>
                  </div>
                  {project.nearbyPoints.length > 0 && (
                    <div className="space-y-2">
                      {project.nearbyPoints.map((point) => (
                        <div key={point.id} className="flex justify-between text-sm text-gray-700">
                          <span>{point.name}</span>
                          <span>
                            {point.distanceKm ? `${point.distanceKm} km` : 'N/A'}
                            {point.travelTimeMin ? ` • ${point.travelTimeMin} min` : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {project.sitePlanImage && (
                  <div className="relative aspect-video rounded overflow-hidden">
                    <Image
                      src={project.sitePlanImage}
                      alt={getImageAlt(project.sitePlanImage)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            </section>

            {project.seo?.localContent && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {project.seo.localHeading || 'Why This Location'}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.seo.localContent}</p>
              </section>
            )}

            {project.seo?.longFormContent && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {project.seo.longFormTitle || 'Project Overview'}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.seo.longFormContent}</div>
              </section>
            )}

            {project.faqs.length > 0 && (
              <section className="bg-white rounded p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {project.faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded p-5">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="enquiry" className="bg-yellow-50 border-2 border-yellow-200 rounded p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Interested in {project.title}?</h2>
                <p className="text-center text-gray-700 mb-8">
                  Fill in your details below to get exclusive pricing, floor plans, and latest updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded transition">
                    Send Enquiry
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded shadow">
                <div className="space-y-4">
                  <div className="text-center bg-gray-200 p-6">
                    <div className="text-2xl font-bold text-brand-primary">
                      {project.basePrice || project.priceRange || 'Contact for Pricing'}
                    </div>
                  </div>
                  <div className="flex justify-between flex-wrap pb-3 px-3 gap-3">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-lg font-semibold text-gray-900">{project.landArea || 'N/A'}</p>
                      <p className="text-xs text-gray-500">Land Area</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-lg font-semibold text-gray-900">{project.numberOfFloors || 'N/A'}</p>
                      <p className="text-xs text-gray-500">Floors</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-lg font-semibold text-gray-900">{project.totalUnits || 'N/A'}</p>
                      <p className="text-xs text-gray-500">Total Units</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-lg font-semibold text-gray-900">{project.availableUnits || 'N/A'}</p>
                      <p className="text-xs text-gray-500">Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {project.highlights.length > 0 && (
                <div className="bg-white rounded p-6 shadow">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {project.highlights.slice(0, 4).map((highlight) => (
                      <li key={highlight.id} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>{highlight.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3">
                <Link href="#enquiry" className="block text-center bg-yellow-500 text-white font-semibold py-3 rounded">
                  Request Callback
                </Link>
                <Link
                  href="https://wa.me/919555562626"
                  className="block text-center bg-green-600 text-white font-semibold py-3 rounded"
                >
                  WhatsApp Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewAllPhotos && galleryImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Photo Gallery</h3>
              <button
                onClick={() => setViewAllPhotos(false)}
                className="cursor-pointer px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
            <div className="flex-1 grid grid-rows-[1fr_auto]">
              <div className="relative bg-black">
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={getImageAlt(galleryImages[activeImageIndex])}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                <button
                  onClick={() =>
                    setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length)
                  }
                  className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActiveImageIndex((activeImageIndex + 1) % galleryImages.length)}
                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100  text-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
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
                      className={`cursor-pointer rounded border ${index === activeImageIndex ? 'border-blue-500' : 'border-gray-200'}`}
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
