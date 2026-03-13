import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const projectSlug = 'spj-vedatam-sector-14-gurgaon';

// ─── SEO ───────────────────────────────────────────────────────────────────
const seoData = {
  metaTitle: 'SPJ Vedatam Sector 14 Gurugram – Premium Commercial & Retail Property',
  metaDescription:
    'Explore SPJ Vedatam – a 4.15-acre commercial hub in Sector 14 Gurugram. Premium retail, dining, entertainment & multiplex spaces. RERA approved. Enquire now!',
  metaKeywords: [
    'SPJ Vedatam Sector 14 Gurgaon',
    'Commercial property in Gurugram',
    'Retail shops for sale Gurgaon',
    'High-street retail in Sector 14',
    'Food court space in Gurugram',
    'Multiplex & entertainment hub Gurgaon',
    'Commercial investment Gurgaon',
    'Serviced apartments Gurugram commercial',
  ],
  canonicalUrl: 'https://www.realtysquare.in/projects/spj-vedatam-sector-14-gurgaon',
  ogTitle: 'SPJ Vedatam – Commercial & Retail Hub, Sector 14 Gurugram',
  ogDescription:
    'A 4.15-acre mixed-use commercial destination in Sector 14 Gurugram with premium retail, F&B, multiplex & serviced apartments. RERA approved.',
  ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
  twitterCard: 'summary_large_image',
  schemaMarkup: {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: 'SPJ Vedatam Sector 14 Gurugram',
    description:
      'Premium mixed-use commercial development offering retail, F&B, entertainment and serviced apartments in Sector 14, Gurugram.',
    url: 'https://www.realtysquare.in/projects/spj-vedatam-sector-14-gurgaon',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Old Delhi Road',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
  },
  h1Tag: 'SPJ Vedatam – Commercial & Retail Spaces in Sector 14 Gurugram',
  h2Tags: [
    'Project Overview – SPJ Vedatam Gurugram',
    'Location Advantage – Sector 14, Gurugram',
    'Retail, F&B & Commercial Spaces at SPJ Vedatam',
    'Price & Unit Size Overview',
    'Amenities & Features',
    'Why Invest in SPJ Vedatam, Gurgaon?',
    'Who Should Consider SPJ Vedatam?',
  ],
  featuredImgAlt: 'SPJ Vedatam – Commercial & Retail Hub Sector 14 Gurugram',
  imageAltMap: {
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop':
      'SPJ Vedatam Commercial Hub Sector 14 Gurugram',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop':
      'SPJ Vedatam Retail Space Interior Gurugram',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&h=900&fit=crop':
      'SPJ Vedatam Food Court Dining Zone Gurgaon',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&h=900&fit=crop':
      'SPJ Vedatam Serviced Apartments Sector 14',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&h=900&fit=crop':
      'SPJ Vedatam Site Plan & Location Overview',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&h=900&fit=crop':
      'SPJ Vedatam Multiplex & Entertainment Zone',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&h=900&fit=crop':
      'SPJ Vedatam Developer Office Building',
  },
  localHeading: 'Location Advantage – Sector 14, Gurugram',
  localContent: `SPJ Vedatam enjoys one of the most strategically located commercial addresses in Gurugram.

🚗 Connectivity & Accessibility:
- Situated on Old Delhi Road / Delhi–Gurgaon Expressway — offering high frontage and maximum visibility.

- Minutes from HUDA City Centre & IFFCO Chowk Metro Stations, ensuring strong public transport access for customers and tenants.

- Quick access to NH-48, MG Road, Dwarka Expressway, Cyber City, and other major commercial hubs across Gurugram.

- Approximately 15–20 minutes from IGI Airport via major highways, making it accessible for business travelers and guests.

Surrounding dense residential sectors and established neighborhoods provide a steady, consistent stream of customers and tenants — positioning SPJ Vedatam as a top choice for retail brands, F&B businesses, entertainment venues, and investors.`,
  longFormTitle: 'Who Should Consider SPJ Vedatam?',
  longFormContent: `SPJ Vedatam is ideal for:
- Retail leaders & flagship brands seeking high-footfall commercial spaces
- Restaurant and F&B operators looking for prime dining zones
- Entertainment and cinema chains seeking upper-level multiplex space
- Commercial property investors targeting strong rental returns
- Service providers & office users who need flexible commercial configurations`,
  isIndexable: true,
  sitemapPriority: 0.9,
};

// ─── PROJECT ────────────────────────────────────────────────────────────────
const projectData = {
  slug: projectSlug,
  title: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
  subtitle: 'High-visibility mixed-use commercial destination on Old Delhi Road, Gurugram',
  description:
    'SPJ Vedatam is a landmark mixed-use commercial development located on Old Delhi Road, Gurugram. Spread over approximately 4.15–4.5 acres, this high-visibility destination blends premium retail shops, food & beverage zones, entertainment experiences, multiplex space, and serviced apartments — all designed to generate continuous footfall and long-term investment returns.',
  category: 'COMMERCIAL' as const,
  status: 'PLANNED' as const,
  reraId: 'RC/REP/HARERA/GGM/927/659/2025/30',
  developerName: 'SPJ Group',
  developerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
  possessionDate: new Date('2027-12-31'),
  launchDate: new Date('2025-01-15'),
  address: 'Old Delhi Road',
  locality: 'Sector 14',
  city: 'Gurugram',
  state: 'Haryana',
  latitude: 28.4595,
  longitude: 77.0266,
  currency: 'INR',
  featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop',
  galleryImages: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&h=900&fit=crop',
  ],
  // 3 YouTube links + 4 example direct video links = 7 total
  videoUrls: [
    // ── YouTube ──
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // YouTube full URL
    'https://youtu.be/ScMzIvxBSi4', // YouTube short URL
    'https://www.youtube.com/embed/9bZkp7q19f0', // YouTube embed URL
    // ── Direct / example video files ──
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  ],
  basePrice: '₹50 Lakhs onwards',
  priceRange: '₹50 Lakhs – ₹5.5 Cr+',
  priceMin: 5000000, // ₹50 Lakhs
  priceMax: 55000000, // ₹5.5 Cr
  bannerTitle: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
  bannerSubtitle: 'Premium high-street retail, dining, entertainment & serviced apartments',
  bannerDescription:
    'A 4.15–4.5 acre mixed-use commercial hub with high frontage on Old Delhi Road, strong metro & highway connectivity, and future-ready investment potential.',
  aboutTitle: 'Project Overview – SPJ Vedatam Gurugram',
  aboutDescription: `SPJ Vedatam is developed by SPJ Group, a diversified real estate developer known for delivering high-quality projects with strong strategic positioning. The project is planned as a high-street commercial and lifestyle destination for brands, businesses, and investors alike.

This multi-level hub offers:
• Premium high-street retail spaces for flagship brands and lifestyle outlets
• Vibrant food court and restaurant clusters to anchor daily footfall
• A state-of-the-art multiplex and entertainment zone on upper levels
• Well-designed serviced apartments for business travelers and long-stay guests
• Ample parking with 1,000+ car capacity and customer convenience features`,
  sitePlanTitle: 'Location & Site Plan – SPJ Vedatam',
  sitePlanImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&h=900&fit=crop',
  sitePlanDescription:
    'Located on Old Delhi Road with direct access to metro stations, NH-48, MG Road, Dwarka Expressway, and Cyber City.',
  minRatePsf: '₹16,500',
  maxRatePsf: '₹23,500',
  minUnitArea: 300,
  maxUnitArea: 2400,
  totalUnits: 320,
  soldUnits: 87,
  availableUnits: 233,
  landArea: '4.15 Acres',
  numberOfTowers: 1,
  numberOfFloors: 9,
  numberOfApartments: 48,
  seoTitle: 'SPJ Vedatam Sector 14 Gurugram – Premium Commercial & Retail Property',
  seoDescription:
    'Explore SPJ Vedatam – a 4.15-acre commercial hub in Sector 14 Gurugram. Premium retail, dining, entertainment & multiplex spaces. RERA approved. Enquire now!',
  seoKeywords: [
    'SPJ Vedatam Sector 14 Gurgaon',
    'Commercial property in Gurugram',
    'Retail shops for sale Gurgaon',
    'High-street retail in Sector 14',
    'Food court space in Gurugram',
    'Multiplex & entertainment hub Gurgaon',
    'Commercial investment Gurgaon',
  ],
  isTrending: true,
};

// ─── HIGHLIGHTS ──────────────────────────────────────────────────────────────
const highlightsData = [
  {
    label: 'First organized retail hub in Sector 14 — first-mover advantage in high-traffic zone',
    icon: '📌',
    sortOrder: 1,
  },
  { label: 'RERA approved — RC/REP/HARERA/GGM/927/659/2025/30', icon: '✅', sortOrder: 2 },
  { label: 'Strong rental potential — high footfall and dense residential catchment', icon: '💰', sortOrder: 3 },
  { label: 'Flexible payment plans — accessible for both small and large investors', icon: '📋', sortOrder: 4 },
  { label: 'Developer reputation — SPJ Group with decades of diversified experience', icon: '🏆', sortOrder: 5 },
  { label: 'Metro connectivity — HUDA City Centre & IFFCO Chowk within minutes', icon: '🚇', sortOrder: 6 },
  { label: '1,000+ car basement parking — maximum customer convenience', icon: '🅿️', sortOrder: 7 },
  { label: 'High frontage on Old Delhi Road — maximum brand visibility', icon: '🌟', sortOrder: 8 },
];

// ─── AMENITIES ───────────────────────────────────────────────────────────────
const amenitiesData = [
  {
    category: 'Parking',
    name: 'Multi-level basement parking (1,000+ cars) across two or three levels',
    details: 'Dedicated visitor & tenant parking with EV charging points',
    sortOrder: 1,
  },
  {
    category: 'Infrastructure',
    name: 'High-speed elevators & escalators for seamless movement',
    details: '6 high-speed elevators and 4 escalators across all levels',
    sortOrder: 2,
  },
  {
    category: 'Safety',
    name: '24×7 security & CCTV surveillance',
    details: 'Multi-layer security with trained guards and 200+ CCTV cameras',
    sortOrder: 3,
  },
  {
    category: 'Utilities',
    name: 'Power backup for uninterrupted operations',
    details: '100% DG backup with auto-changeover for all retail and commercial units',
    sortOrder: 4,
  },
  {
    category: 'Open Spaces',
    name: 'Landscaped sit-out areas and open public spaces',
    details: 'Curated green zones and pedestrian plazas on ground and terrace levels',
    sortOrder: 5,
  },
  {
    category: 'Flexibility',
    name: 'Flexible unit layouts to suit different business needs',
    details: 'Open-plan shell units with customizable interiors',
    sortOrder: 6,
  },
  {
    category: 'Entertainment',
    name: 'State-of-the-art multiplex and entertainment zone',
    details: 'Dedicated upper-floor multiplex with 5 screens and gaming zone',
    sortOrder: 7,
  },
  {
    category: 'Dining',
    name: 'Centralized food court with premium F&B zones',
    details: 'Separate dining clusters for QSR, fine-dine and café outlets',
    sortOrder: 8,
  },
  {
    category: 'Sustainability',
    name: 'Rainwater harvesting and solar panels',
    details: 'Green building features targeting IGBC certification',
    sortOrder: 9,
  },
  {
    category: 'Connectivity',
    name: 'High-speed fibre internet infrastructure throughout',
    details: 'Gigabit fibre backbone ready for all tenants',
    sortOrder: 10,
  },
];

// ─── OFFERINGS ───────────────────────────────────────────────────────────────
const offeringsData = [
  {
    icon: '🛍',
    title: 'High-Street Retail Shops',
    description:
      'Designed for maximum street frontage, visibility, and customer engagement — ideal for flagship stores, fashion brands, showrooms, and lifestyle outlets.',
    sortOrder: 1,
  },
  {
    icon: '🍽',
    title: 'Food Court & Dining Zones',
    description:
      'Dedicated areas for multi-cuisine dining, cafes, and sit-down restaurants that anchor customer traffic throughout the day.',
    sortOrder: 2,
  },
  {
    icon: '🎬',
    title: 'Multiplex & Entertainment Floors',
    description:
      'State-of-the-art cinema and entertainment zones on upper levels to attract continuous visitors and drive consistent foot traffic.',
    sortOrder: 3,
  },
  {
    icon: '🏙',
    title: 'Serviced Apartments',
    description:
      'Premium serviced residences offering convenience for business travelers and long-stay guests, adding lifestyle value to the complex.',
    sortOrder: 4,
  },
];

// ─── PRICING TABLE ───────────────────────────────────────────────────────────
const pricingData = [
  {
    type: 'Retail Shops',
    reraArea: '300 – 1,465 Sq.ft',
    price: '₹50 Lakhs – ₹2.9 Cr+',
    pricePerSqft: '₹16,500 – ₹19,800',
    availableUnits: 142,
    floorNumbers: 'Ground – 3rd Floor',
    features: { highlight: 'High-footfall ground floor units available', paymentPlan: '30:70 Construction Linked' },
  },
  {
    type: 'Food Court Units',
    reraArea: '300+ Sq.ft',
    price: '₹65 Lakhs+',
    pricePerSqft: '₹21,500',
    availableUnits: 38,
    floorNumbers: '4th Floor (Dedicated F&B Level)',
    features: { highlight: 'Dedicated food court level with shared seating', paymentPlan: '25:75 Construction Linked' },
  },
  {
    type: 'Multiplex & Anchor Spaces',
    reraArea: 'Custom sizes',
    price: 'On Request',
    pricePerSqft: null,
    availableUnits: 5,
    floorNumbers: '5th – 7th Floor',
    features: {
      highlight: 'Suitable for entertainment brands, gyms, and anchor tenants',
      paymentPlan: 'Custom negotiated',
    },
  },
  {
    type: 'Serviced Apartments',
    reraArea: '2,200 – 2,400 Sq.ft',
    price: '₹4.6 Cr – ₹5.5 Cr+',
    pricePerSqft: '₹20,900 – ₹22,900',
    availableUnits: 48,
    floorNumbers: '8th – 9th Floor',
    features: {
      highlight: '3 BHK premium serviced residences with hotel-grade amenities',
      paymentPlan: '20:80 Construction Linked',
    },
  },
];

// ─── NEARBY POINTS ───────────────────────────────────────────────────────────
const nearbyPointsData = [
  { type: 'METRO' as const, name: 'HUDA City Centre Metro Station', distanceKm: 3.2, travelTimeMin: 8 },
  { type: 'METRO' as const, name: 'IFFCO Chowk Metro Station', distanceKm: 2.8, travelTimeMin: 7 },
  { type: 'ROAD' as const, name: 'NH-48 / Delhi–Gurgaon Expressway', distanceKm: 0.5, travelTimeMin: 2 },
  { type: 'ROAD' as const, name: 'MG Road', distanceKm: 2.1, travelTimeMin: 6 },
  { type: 'ROAD' as const, name: 'Dwarka Expressway', distanceKm: 5.4, travelTimeMin: 14 },
  { type: 'OFFICE_HUB' as const, name: 'Cyber City (DLF)', distanceKm: 4.5, travelTimeMin: 12 },
  { type: 'AIRPORT' as const, name: 'IGI Airport', distanceKm: 14.2, travelTimeMin: 20 },
  { type: 'MALL' as const, name: 'Ambience Mall Gurugram', distanceKm: 4.0, travelTimeMin: 11 },
  { type: 'HOTEL' as const, name: 'Leela Ambience Gurugram Hotel', distanceKm: 3.8, travelTimeMin: 10 },
];

// ─── FLOOR PLANS ─────────────────────────────────────────────────────────────
const floorPlansData = [
  {
    level: 'Ground Floor',
    title: 'High-Street Retail Zone',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    details: {
      totalArea: '42,000 Sq.ft',
      units: 68,
      usage: 'Premium retail shops & anchor stores',
      unitSizes: '300 – 900 Sq.ft',
    },
    sortOrder: 1,
  },
  {
    level: 'First Floor',
    title: 'Retail & Lifestyle Level',
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop',
    details: {
      totalArea: '38,500 Sq.ft',
      units: 52,
      usage: 'Fashion, electronics & lifestyle brands',
      unitSizes: '400 – 1,200 Sq.ft',
    },
    sortOrder: 2,
  },
  {
    level: 'Second Floor',
    title: 'Retail & Service Level',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    details: {
      totalArea: '36,000 Sq.ft',
      units: 44,
      usage: 'Service retail, salons, clinics & offices',
      unitSizes: '350 – 1,465 Sq.ft',
    },
    sortOrder: 3,
  },
  {
    level: 'Third Floor',
    title: 'Retail Upper Level',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    details: {
      totalArea: '34,000 Sq.ft',
      units: 38,
      usage: 'Specialty retail & experience zones',
      unitSizes: '400 – 1,400 Sq.ft',
    },
    sortOrder: 4,
  },
  {
    level: 'Fourth Floor',
    title: 'Food Court & Dining Zone',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    details: {
      totalArea: '30,000 Sq.ft',
      units: 38,
      usage: 'Multi-cuisine food court, QSR & fine-dine restaurants',
      seatingCapacity: '800+',
    },
    sortOrder: 5,
  },
  {
    level: 'Fifth – Seventh Floor',
    title: 'Multiplex & Entertainment Zone',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    details: {
      totalArea: '90,000 Sq.ft',
      screens: 5,
      usage: 'Multiplex cinema, gaming zone & entertainment hub',
      capacity: '1,500 seats',
    },
    sortOrder: 6,
  },
  {
    level: 'Eighth – Ninth Floor',
    title: 'Serviced Apartments',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    details: {
      totalArea: '115,200 Sq.ft',
      units: 48,
      usage: 'Premium 3 BHK serviced apartments',
      unitSizes: '2,200 – 2,400 Sq.ft',
    },
    sortOrder: 7,
  },
];

// ─── DOCUMENTS ───────────────────────────────────────────────────────────────
const documentsData = [
  {
    docType: 'APPROVAL' as const,
    title: 'RERA Registration Certificate',
    fileUrl: 'https://example.com/documents/spj-vedatam-rera-certificate.pdf',
    number: 'RC/REP/HARERA/GGM/927/659/2025/30',
    issueDate: new Date('2025-01-10'),
    expiryDate: new Date('2028-12-31'),
  },
  {
    docType: 'BROCHURE' as const,
    title: 'SPJ Vedatam Project Brochure',
    fileUrl: 'https://example.com/documents/spj-vedatam-brochure-2025.pdf',
    number: null,
    issueDate: new Date('2025-02-01'),
    expiryDate: null,
  },
  {
    docType: 'SPEC' as const,
    title: 'Technical Specifications & Construction Details',
    fileUrl: 'https://example.com/documents/spj-vedatam-tech-specs.pdf',
    number: 'SPEC/SPJ/2025/01',
    issueDate: new Date('2025-01-20'),
    expiryDate: null,
  },
  {
    docType: 'TITLE' as const,
    title: 'Title Clearance Certificate',
    fileUrl: 'https://example.com/documents/spj-vedatam-title-clearance.pdf',
    number: 'TCC/GGM/2024/112',
    issueDate: new Date('2024-11-15'),
    expiryDate: null,
  },
];

// ─── MEDIA ───────────────────────────────────────────────────────────────────
const mediaData = [
  // Gallery Images
  {
    type: 'IMAGE' as const,
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop',
    caption: 'SPJ Vedatam – Exterior Facade & Main Entrance',
    tags: ['exterior', 'facade', 'featured'],
    floor: null,
    sortOrder: 1,
  },
  {
    type: 'IMAGE' as const,
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop',
    caption: 'Premium Retail Interior – Ground Floor',
    tags: ['retail', 'interior', 'ground-floor'],
    floor: 'Ground Floor',
    sortOrder: 2,
  },
  {
    type: 'IMAGE' as const,
    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&h=900&fit=crop',
    caption: 'Food Court & Dining Zone – 4th Floor',
    tags: ['food-court', 'dining', '4th-floor'],
    floor: 'Fourth Floor',
    sortOrder: 3,
  },
  {
    type: 'IMAGE' as const,
    url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&h=900&fit=crop',
    caption: 'Serviced Apartments – Premium Living Spaces',
    tags: ['apartments', 'premium', '8th-floor'],
    floor: 'Eighth Floor',
    sortOrder: 4,
  },
  {
    type: 'IMAGE' as const,
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&h=900&fit=crop',
    caption: 'Multiplex & Entertainment Floor Overview',
    tags: ['multiplex', 'entertainment', '5th-floor'],
    floor: 'Fifth Floor',
    sortOrder: 5,
  },
  {
    type: 'IMAGE' as const,
    url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&h=900&fit=crop',
    caption: 'SPJ Group Developer Office',
    tags: ['developer', 'spj-group'],
    floor: null,
    sortOrder: 6,
  },
  // Videos
  {
    type: 'VIDEO' as const,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'SPJ Vedatam – Official Project Walkthrough',
    tags: ['walkthrough', 'official', 'youtube'],
    floor: null,
    sortOrder: 1,
  },
  {
    type: 'VIDEO' as const,
    url: 'https://youtu.be/ScMzIvxBSi4',
    caption: 'SPJ Vedatam – Location & Connectivity Tour',
    tags: ['location', 'connectivity', 'youtube'],
    floor: null,
    sortOrder: 2,
  },
  {
    type: 'VIDEO' as const,
    url: 'https://www.youtube.com/embed/9bZkp7q19f0',
    caption: 'SPJ Vedatam – Retail & F&B Spaces Showcase',
    tags: ['retail', 'showcase', 'youtube'],
    floor: null,
    sortOrder: 3,
  },
  {
    type: 'VIDEO' as const,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'SPJ Vedatam – Construction Progress Update (Mar 2025)',
    tags: ['construction', 'progress'],
    floor: null,
    sortOrder: 4,
  },
  {
    type: 'VIDEO' as const,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    caption: 'SPJ Vedatam – 3D Architectural Render Tour',
    tags: ['3d', 'render', 'architecture'],
    floor: null,
    sortOrder: 5,
  },
  {
    type: 'VIDEO' as const,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    caption: 'SPJ Vedatam – Floor-wise Layout Walkthrough',
    tags: ['layout', 'floor-plan'],
    floor: null,
    sortOrder: 6,
  },
  {
    type: 'VIDEO' as const,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    caption: 'SPJ Vedatam – Investor Briefing & ROI Analysis',
    tags: ['investor', 'roi'],
    floor: null,
    sortOrder: 7,
  },
  // Floor Plans
  {
    type: 'PLAN' as const,
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    caption: 'Ground Floor Plan – Retail Zone',
    tags: ['floor-plan', 'ground-floor'],
    floor: 'Ground Floor',
    sortOrder: 1,
  },
  {
    type: 'PLAN' as const,
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    caption: 'Fourth Floor Plan – Food Court Level',
    tags: ['floor-plan', 'food-court'],
    floor: 'Fourth Floor',
    sortOrder: 2,
  },
  {
    type: 'PLAN' as const,
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    caption: 'Eighth Floor Plan – Serviced Apartments',
    tags: ['floor-plan', 'apartments'],
    floor: 'Eighth Floor',
    sortOrder: 3,
  },
  // Brochure
  {
    type: 'BROCHURE' as const,
    url: 'https://example.com/documents/spj-vedatam-brochure-2025.pdf',
    caption: 'SPJ Vedatam – Full Project Brochure 2025',
    tags: ['brochure', 'download'],
    floor: null,
    sortOrder: 1,
  },
  // Virtual Tour
  {
    type: 'VIRTUAL_TOUR' as const,
    url: 'https://example.com/virtual-tour/spj-vedatam-360',
    caption: 'SPJ Vedatam – 360° Virtual Site Tour',
    tags: ['virtual-tour', '360'],
    floor: null,
    sortOrder: 1,
  },
];

// ─── FAQS ────────────────────────────────────────────────────────────────────
const faqsData = [
  {
    question: 'Where is SPJ Vedatam located?',
    answer:
      'SPJ Vedatam is located on Old Delhi Road, Gurugram — on the Delhi–Gurgaon Expressway with high frontage and visibility.',
    sortOrder: 1,
  },
  {
    question: 'What types of spaces are available at SPJ Vedatam?',
    answer:
      'SPJ Vedatam offers high-street retail shops, food court and dining zones, multiplex & entertainment floors, and premium serviced apartments.',
    sortOrder: 2,
  },
  {
    question: 'What is the indicative price range?',
    answer:
      'Retail shops start from ₹50 Lakhs (300 Sq.ft), food court units from ₹65 Lakhs+, and serviced apartments range from ₹4.6 Cr to ₹5.5 Cr+. Prices are indicative and subject to change.',
    sortOrder: 3,
  },
  {
    question: 'Is SPJ Vedatam RERA approved?',
    answer:
      'Yes, SPJ Vedatam is RERA approved under registration number RC/REP/HARERA/GGM/927/659/2025/30. Please contact us for the latest RERA registration details.',
    sortOrder: 4,
  },
  {
    question: 'Who is the developer of SPJ Vedatam?',
    answer:
      'SPJ Vedatam is developed by SPJ Group, a diversified real estate developer with decades of experience in delivering high-quality commercial and residential projects.',
    sortOrder: 5,
  },
  {
    question: 'What is the expected possession date?',
    answer:
      'The expected possession date for SPJ Vedatam is December 2027, subject to timely completion and RERA-approved timelines.',
    sortOrder: 6,
  },
  {
    question: 'How many floors does SPJ Vedatam have?',
    answer:
      'SPJ Vedatam is a 9-floor development — Ground to 3rd floor for retail, 4th floor for food court, 5th–7th floor for multiplex & entertainment, and 8th–9th floor for serviced apartments.',
    sortOrder: 7,
  },
  {
    question: 'What is the total land area of the project?',
    answer: 'SPJ Vedatam is spread over approximately 4.15 acres on Old Delhi Road, Gurugram.',
    sortOrder: 8,
  },
];

async function main() {
  console.log(`🌱 Seeding project: ${projectSlug}...`);

  await prisma.project.upsert({
    where: { slug: projectSlug },
    create: {
      ...projectData,
      highlights: { create: highlightsData },
      amenities: { create: amenitiesData },
      offerings: { create: offeringsData },
      pricingTable: { create: pricingData },
      nearbyPoints: { create: nearbyPointsData },
      floorPlans: { create: floorPlansData },
      documents: { create: documentsData },
      media: { create: mediaData },
      faqs: { create: faqsData },
      seo: { create: seoData },
    },
    update: {
      ...projectData,
      highlights: { deleteMany: {}, create: highlightsData },
      amenities: { deleteMany: {}, create: amenitiesData },
      offerings: { deleteMany: {}, create: offeringsData },
      pricingTable: { deleteMany: {}, create: pricingData },
      nearbyPoints: { deleteMany: {}, create: nearbyPointsData },
      floorPlans: { deleteMany: {}, create: floorPlansData },
      documents: { deleteMany: {}, create: documentsData },
      media: { deleteMany: {}, create: mediaData },
      faqs: { deleteMany: {}, create: faqsData },
      seo: {
        upsert: {
          create: seoData,
          update: seoData,
        },
      },
    },
  });

  console.log(`Project seeded successfully: ${projectSlug}`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
