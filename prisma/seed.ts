import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const projectSlug = 'spj-vedatam-premier-commercial-and-retail-hub-in-sector-14-gurugram';

const whoShouldConsider = `Who Should Consider SPJ Vedatam?

SPJ Vedatam is ideal for:
- Retail leaders & flagship brands seeking high-footfall commercial spaces
- Restaurant and F&B operators looking for prime dining zones
- Entertainment and cinema chains seeking upper-level multiplex space
- Commercial property investors targeting strong rental returns
- Service providers & office users who need flexible commercial configurations

Whether you want retail investment, business expansion, or commercial rental income, SPJ Vedatam delivers value with strategic advantage and long-term growth potential.

Enquire Now – Discover SPJ Vedatam Gurgaon

Fill out the enquiry form to receive:
- Current prices & floor plans
- Unit availability
- Payment plan details
- Exclusive offers for early bookings`;

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
  },
  // Location Advantage section
  localHeading: 'Location Advantage – Sector 14, Gurugram',
  localContent: `SPJ Vedatam enjoys one of the most strategically located commercial addresses in Gurugram.

🚗 Connectivity & Accessibility
Situated on Old Delhi Road / Delhi–Gurgaon Expressway — offering high frontage and maximum visibility.

Minutes from HUDA City Centre & IFFCO Chowk Metro Stations, ensuring strong public transport access for customers and tenants.

Quick access to NH-48, MG Road, Dwarka Expressway, Cyber City, and other major commercial hubs across Gurugram.

Approximately 15–20 minutes from IGI Airport via major highways, making it accessible for business travelers and guests.

Surrounding dense residential sectors and established neighborhoods provide a steady, consistent stream of customers and tenants — positioning SPJ Vedatam as a top choice for retail brands, F&B businesses, entertainment venues, and investors.`,
  // Who Should Consider + misc → longFormContent
  longFormTitle: 'Who Should Consider SPJ Vedatam?',
  longFormContent: whoShouldConsider,
};

const projectData = {
  slug: projectSlug,
  title: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
  subtitle: 'High-visibility mixed-use commercial destination on Old Delhi Road, Gurugram',
  // Short intro shown just below the title/address
  description:
    'SPJ Vedatam is a landmark mixed-use commercial development located on Old Delhi Road, Sector 14, Gurugram. Spread over approximately 4.15–4.5 acres, this high-visibility destination blends premium retail shops, food & beverage zones, entertainment experiences, multiplex space, and serviced apartments — all designed to generate continuous footfall and long-term investment returns.',
  category: 'COMMERCIAL' as const,
  status: 'PLANNED' as const,
  address: 'Old Delhi Road, Sector 14',
  locality: 'Sector 14',
  city: 'Gurugram',
  state: 'Haryana',
  featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop',
  galleryImages: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&h=900&fit=crop',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&h=900&fit=crop',
  ],
  basePrice: null,
  priceRange: '₹50 Lakhs – ₹5.5 Cr+',
  bannerTitle: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
  bannerSubtitle: 'Premium high-street retail, dining, entertainment & serviced apartments',
  bannerDescription:
    'A 4.15–4.5 acre mixed-use commercial hub with high frontage on Old Delhi Road, strong metro & highway connectivity, and future-ready investment potential.',
  // Project Overview section
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
  landArea: '4.15 Acres',
  minRatePsf: null,
  maxRatePsf: null,
  reraId: 'RERA-APPROVED',
  developerName: 'SPJ Group',
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
};

const highlightsData = [
  {
    label: 'First organized retail hub in Sector 14 — first-mover advantage in high-traffic zone',
    icon: '📌',
    sortOrder: 1,
  },
  { label: 'Strong rental potential — high footfall and dense residential catchment', icon: '📌', sortOrder: 2 },
  { label: 'Flexible payment plans — accessible for both small and large investors', icon: '📌', sortOrder: 3 },
  { label: 'Developer reputation — SPJ Group with decades of diversified experience', icon: '📌', sortOrder: 4 },
];

const amenitiesData = [
  { category: 'Parking', name: 'Multi-level basement parking (1,000+ cars) across two or three levels', sortOrder: 1 },
  { category: 'Infrastructure', name: 'High-speed elevators & escalators for seamless movement', sortOrder: 2 },
  { category: 'Safety', name: '24×7 security & CCTV surveillance', sortOrder: 3 },
  { category: 'Utilities', name: 'Power backup for uninterrupted operations', sortOrder: 4 },
  { category: 'Open Spaces', name: 'Landscaped sit-out areas and open public spaces', sortOrder: 5 },
  { category: 'Flexibility', name: 'Flexible unit layouts to suit different business needs', sortOrder: 6 },
];

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

const pricingData = [
  { type: 'Retail Shops', reraArea: '300 – 1,465 Sq.ft', price: '₹50 Lakhs – ₹2.9 Cr+', pricePerSqft: null },
  { type: 'Food Court Units', reraArea: '300+ Sq.ft', price: '₹65 Lakhs+', pricePerSqft: null },
  { type: 'Multiplex & Anchor Spaces', reraArea: 'Custom sizes', price: 'On Request', pricePerSqft: null },
  { type: 'Serviced Apartments', reraArea: '2,200 – 2,400 Sq.ft', price: '₹4.6 Cr – ₹5.5 Cr+', pricePerSqft: null },
];

const nearbyPointsData = [
  { type: 'METRO' as const, name: 'HUDA City Centre Metro Station' },
  { type: 'METRO' as const, name: 'IFFCO Chowk Metro Station' },
  { type: 'ROAD' as const, name: 'NH-48 / Delhi–Gurgaon Expressway' },
  { type: 'ROAD' as const, name: 'MG Road' },
  { type: 'ROAD' as const, name: 'Dwarka Expressway' },
  { type: 'OFFICE_HUB' as const, name: 'Cyber City' },
  { type: 'AIRPORT' as const, name: 'IGI Airport', travelTimeMin: 20 },
];

const faqsData = [
  {
    question: 'Where is SPJ Vedatam located?',
    answer:
      'SPJ Vedatam is located on Old Delhi Road, Sector 14, Gurugram — on the Delhi–Gurgaon Expressway with high frontage and visibility.',
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
    answer: 'Yes, SPJ Vedatam is RERA approved. Please contact us for the latest RERA registration details.',
    sortOrder: 4,
  },
  {
    question: 'Who is the developer of SPJ Vedatam?',
    answer:
      'SPJ Vedatam is developed by SPJ Group, a diversified real estate developer with decades of experience in delivering high-quality commercial and residential projects.',
    sortOrder: 5,
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
      faqs: { deleteMany: {}, create: faqsData },
      seo: {
        upsert: {
          create: seoData,
          update: seoData,
        },
      },
    },
  });

  console.log(`✅ Project seeded successfully: ${projectSlug}`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
