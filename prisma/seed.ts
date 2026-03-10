import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const projectSlug = 'spj-vedatam';

const longFormContent = `SPJ Vedatam is a landmark mixed-use commercial development located on Old Delhi Road, Sector 14, Gurugram. Spread over approximately 4.15–4.5 acres, this high-visibility destination blends premium retail shops, food & beverage zones, entertainment experiences, multiplex space, and serviced apartments — all designed to generate continuous footfall and long-term investment returns.

Project Overview – SPJ Vedatam Gurugram
SPJ Vedatam is developed by SPJ Group, a diversified real estate developer known for delivering high-quality projects with strong strategic positioning. The project is planned as a high-street commercial and lifestyle destination for brands, businesses, and investors alike. This multi-level hub offers premium high-street retail spaces, vibrant food court and restaurant clusters, a state-of-the-art multiplex and entertainment zone, well-designed serviced apartments, ample parking and customer convenience features.

Location Advantage – Sector 14, Gurugram
SPJ Vedatam enjoys one of the most strategically located commercial addresses in Gurugram. Situated on Old Delhi Road / Delhi–Gurgaon Expressway with high frontage and visibility, it is minutes from HUDA City Centre & IFFCO Chowk Metro Stations. The project offers quick access to NH-48, MG Road, Dwarka Expressway, Cyber City, and other major commercial hubs, and is approximately 15–20 minutes from IGI Airport via major highways. Surrounding dense residential sectors and established neighborhoods provide a steady stream of customers and tenants.

Retail, F&B & Commercial Spaces at SPJ Vedatam
SPJ Vedatam caters to diverse commercial needs with thoughtfully configured units: premium high-street retail shops for maximum street frontage, vibrant food courts and dining zones, multiplex and entertainment floors on upper levels, and serviced apartments for business travelers and long-stay guests.

Price & Unit Size Overview
Retail Shops: 300 – 1,465 Sq.ft, ₹50 Lakhs* – ₹2.9 Cr*+
Food Court Units: 300+ Sq.ft, ₹65 Lakhs*+
Multiplex & Anchor Spaces: Custom sizes, On Request
Serviced Apartments: 2,200 – 2,400 Sq.ft, ₹4.6 Cr* – ₹5.5 Cr*+
Prices and sizes are indicative and subject to change at developer discretion.

Amenities & Features
Multi-level basement parking (1,000+ cars), high-speed elevators & escalators, 24×7 security, CCTV surveillance, power backup, landscaped sit-out areas, open public spaces, and flexible unit layouts to suit different business needs.

Why Invest in SPJ Vedatam, Gurgaon?
First organized retail hub in Sector 14, strong rental potential due to high footfall, flexible payment plans, and the developer’s strong reputation. SPJ Vedatam delivers value with strategic advantage and long-term growth potential.`;

async function main() {
  await prisma.project.upsert({
    where: { slug: projectSlug },
    create: {
      slug: projectSlug,
      title: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
      subtitle: 'High-visibility mixed-use commercial destination in Gurugram',
      description:
        'SPJ Vedatam is a landmark mixed-use commercial development located on Old Delhi Road, Sector 14, Gurugram. It blends premium retail, dining, entertainment, multiplex space, and serviced apartments for strong footfall and investment returns.',
      category: 'COMMERCIAL',
      status: 'PLANNED',
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
      priceRange: '₹50 Lakhs* – ₹5.5 Cr*+',
      bannerTitle: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
      bannerSubtitle: 'Premium high-street retail, dining, entertainment & serviced apartments',
      bannerDescription:
        'A 4.15–4.5 acre commercial hub with high visibility, strong connectivity, and future-ready investment potential.',
      aboutTitle: 'Project Overview – SPJ Vedatam Gurugram',
      aboutDescription:
        'SPJ Vedatam is planned as a high-street commercial and lifestyle destination with premium retail, food & beverage zones, multiplex entertainment floors, and serviced apartments.',
      sitePlanTitle: 'Location Map',
      sitePlanImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&h=900&fit=crop',
      sitePlanDescription:
        'Located on Old Delhi Road with quick access to metro stations, NH-48, MG Road, and major commercial hubs.',
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
      highlights: {
        create: [
          { label: 'First organized retail hub in Sector 14', icon: '📌', sortOrder: 1 },
          { label: 'Strong rental potential with high footfall', icon: '📌', sortOrder: 2 },
          { label: 'Flexible payment plans for investors', icon: '📌', sortOrder: 3 },
          { label: 'Developer reputation: SPJ Group', icon: '📌', sortOrder: 4 },
        ],
      },
      amenities: {
        create: [
          { category: 'Parking', name: 'Multi-level basement parking (1,000+ cars)', sortOrder: 1 },
          { category: 'Infrastructure', name: 'High-speed elevators & escalators', sortOrder: 2 },
          { category: 'Safety', name: '24×7 security & CCTV surveillance', sortOrder: 3 },
          { category: 'Utilities', name: 'Power backup', sortOrder: 4 },
          { category: 'Open Spaces', name: 'Landscaped sit-out areas', sortOrder: 5 },
          { category: 'Flexibility', name: 'Flexible unit layouts', sortOrder: 6 },
        ],
      },
      offerings: {
        create: [
          {
            icon: '🛍',
            title: 'High-Street Retail Shops',
            description:
              'Designed for maximum street frontage, visibility, and customer engagement for flagship brands.',
            sortOrder: 1,
          },
          {
            icon: '🍽',
            title: 'Food Court & Dining Zones',
            description: 'Dedicated multi-cuisine dining spaces and restaurant clusters to anchor daily footfall.',
            sortOrder: 2,
          },
          {
            icon: '🎬',
            title: 'Multiplex & Entertainment Floors',
            description: 'Upper-level entertainment zones to drive continuous visitor traffic and high retention.',
            sortOrder: 3,
          },
          {
            icon: '🏙',
            title: 'Serviced Apartments',
            description: 'Premium serviced residences for business travelers and long-stay guests.',
            sortOrder: 4,
          },
        ],
      },
      pricingTable: {
        create: [
          {
            type: 'Retail Shops',
            reraArea: '300 – 1,465 Sq.ft',
            price: '₹50 Lakhs* – ₹2.9 Cr*+',
            pricePerSqft: null,
          },
          {
            type: 'Food Court Units',
            reraArea: '300+ Sq.ft',
            price: '₹65 Lakhs*+',
            pricePerSqft: null,
          },
          {
            type: 'Multiplex & Anchor Spaces',
            reraArea: 'Custom sizes',
            price: 'On Request',
            pricePerSqft: null,
          },
          {
            type: 'Serviced Apartments',
            reraArea: '2,200 – 2,400 Sq.ft',
            price: '₹4.6 Cr* – ₹5.5 Cr*+',
            pricePerSqft: null,
          },
        ],
      },
      nearbyPoints: {
        create: [
          { type: 'METRO', name: 'HUDA City Centre Metro Station' },
          { type: 'METRO', name: 'IFFCO Chowk Metro Station' },
          { type: 'ROAD', name: 'NH-48 / Delhi–Gurgaon Expressway' },
          { type: 'ROAD', name: 'MG Road' },
          { type: 'ROAD', name: 'Dwarka Expressway' },
          { type: 'OFFICE_HUB', name: 'Cyber City' },
          { type: 'AIRPORT', name: 'IGI Airport', travelTimeMin: 20 },
        ],
      },
      faqs: {
        create: [
          {
            question: 'Where is SPJ Vedatam located?',
            answer: 'SPJ Vedatam is located on Old Delhi Road, Sector 14, Gurugram.',
          },
          {
            question: 'What types of spaces are available?',
            answer:
              'High-street retail shops, food court and dining zones, multiplex & entertainment floors, and serviced apartments.',
          },
          {
            question: 'What is the indicative price range?',
            answer:
              'Retail shops start from ₹50 Lakhs* and serviced apartments go up to ₹5.5 Cr*+. Prices are indicative.',
          },
        ],
      },
      seo: {
        create: {
          metaTitle: 'SPJ Vedatam Sector 14 Gurugram – Premium Commercial & Retail Property',
          metaDescription:
            'Explore SPJ Vedatam – a 4.15-acre commercial hub in Sector 14 Gurugram. Premium retail, dining, entertainment & multiplex spaces. RERA approved. Enquire now!',
          metaKeywords: [
            'commercial property in Sector 14 Gurugram',
            'retail space for sale Gurgaon',
            'SPJ Vedatam retail investment',
            'commercial property in Gurugram',
            'retail shops for sale Gurgaon',
          ],
          h1Tag: 'SPJ Vedatam – Commercial & Retail Spaces in Sector 14 Gurugram',
          h2Tags: [
            'Location & Connectivity in Gurugram',
            'Amenities & Features',
            'Investment Highlights & Why SPJ Vedatam',
            'Floor Plans & Price Range',
          ],
          featuredImgAlt: 'Retail Shop Space SPJ Vedatam Sector 14 Gurugram',
          imageAltMap: {
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop':
              'Retail Shop Space SPJ Vedatam Sector 14 Gurugram',
          },
          localHeading: 'Why Sector 14 Gurugram?',
          localContent:
            'Sector 14 enjoys direct connectivity to MG Road Metro, NH-48, Dwarka Expressway, and IGI Airport, with strong surrounding residential and office catchments that drive consistent footfall.',
          longFormTitle: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
          longFormContent: longFormContent,
        },
      },
    },
    update: {
      title: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
      subtitle: 'High-visibility mixed-use commercial destination in Gurugram',
      description:
        'SPJ Vedatam is a landmark mixed-use commercial development located on Old Delhi Road, Sector 14, Gurugram. It blends premium retail, dining, entertainment, multiplex space, and serviced apartments for strong footfall and investment returns.',
      category: 'COMMERCIAL',
      status: 'PLANNED',
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
      priceRange: '₹50 Lakhs* – ₹5.5 Cr*+',
      bannerTitle: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
      bannerSubtitle: 'Premium high-street retail, dining, entertainment & serviced apartments',
      bannerDescription:
        'A 4.15–4.5 acre commercial hub with high visibility, strong connectivity, and future-ready investment potential.',
      aboutTitle: 'Project Overview – SPJ Vedatam Gurugram',
      aboutDescription:
        'SPJ Vedatam is planned as a high-street commercial and lifestyle destination with premium retail, food & beverage zones, multiplex entertainment floors, and serviced apartments.',
      sitePlanTitle: 'Location Map',
      sitePlanImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&h=900&fit=crop',
      sitePlanDescription:
        'Located on Old Delhi Road with quick access to metro stations, NH-48, MG Road, and major commercial hubs.',
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
      highlights: {
        deleteMany: {},
        create: [
          { label: 'First organized retail hub in Sector 14', icon: '📌', sortOrder: 1 },
          { label: 'Strong rental potential with high footfall', icon: '📌', sortOrder: 2 },
          { label: 'Flexible payment plans for investors', icon: '📌', sortOrder: 3 },
          { label: 'Developer reputation: SPJ Group', icon: '📌', sortOrder: 4 },
        ],
      },
      amenities: {
        deleteMany: {},
        create: [
          { category: 'Parking', name: 'Multi-level basement parking (1,000+ cars)', sortOrder: 1 },
          { category: 'Infrastructure', name: 'High-speed elevators & escalators', sortOrder: 2 },
          { category: 'Safety', name: '24×7 security & CCTV surveillance', sortOrder: 3 },
          { category: 'Utilities', name: 'Power backup', sortOrder: 4 },
          { category: 'Open Spaces', name: 'Landscaped sit-out areas', sortOrder: 5 },
          { category: 'Flexibility', name: 'Flexible unit layouts', sortOrder: 6 },
        ],
      },
      offerings: {
        deleteMany: {},
        create: [
          {
            icon: '🛍',
            title: 'High-Street Retail Shops',
            description:
              'Designed for maximum street frontage, visibility, and customer engagement for flagship brands.',
            sortOrder: 1,
          },
          {
            icon: '🍽',
            title: 'Food Court & Dining Zones',
            description: 'Dedicated multi-cuisine dining spaces and restaurant clusters to anchor daily footfall.',
            sortOrder: 2,
          },
          {
            icon: '🎬',
            title: 'Multiplex & Entertainment Floors',
            description: 'Upper-level entertainment zones to drive continuous visitor traffic and high retention.',
            sortOrder: 3,
          },
          {
            icon: '🏙',
            title: 'Serviced Apartments',
            description: 'Premium serviced residences for business travelers and long-stay guests.',
            sortOrder: 4,
          },
        ],
      },
      pricingTable: {
        deleteMany: {},
        create: [
          {
            type: 'Retail Shops',
            reraArea: '300 – 1,465 Sq.ft',
            price: '₹50 Lakhs* – ₹2.9 Cr*+',
            pricePerSqft: null,
          },
          {
            type: 'Food Court Units',
            reraArea: '300+ Sq.ft',
            price: '₹65 Lakhs*+',
            pricePerSqft: null,
          },
          {
            type: 'Multiplex & Anchor Spaces',
            reraArea: 'Custom sizes',
            price: 'On Request',
            pricePerSqft: null,
          },
          {
            type: 'Serviced Apartments',
            reraArea: '2,200 – 2,400 Sq.ft',
            price: '₹4.6 Cr* – ₹5.5 Cr*+',
            pricePerSqft: null,
          },
        ],
      },
      nearbyPoints: {
        deleteMany: {},
        create: [
          { type: 'METRO', name: 'HUDA City Centre Metro Station' },
          { type: 'METRO', name: 'IFFCO Chowk Metro Station' },
          { type: 'ROAD', name: 'NH-48 / Delhi–Gurgaon Expressway' },
          { type: 'ROAD', name: 'MG Road' },
          { type: 'ROAD', name: 'Dwarka Expressway' },
          { type: 'OFFICE_HUB', name: 'Cyber City' },
          { type: 'AIRPORT', name: 'IGI Airport', travelTimeMin: 20 },
        ],
      },
      faqs: {
        deleteMany: {},
        create: [
          {
            question: 'Where is SPJ Vedatam located?',
            answer: 'SPJ Vedatam is located on Old Delhi Road, Sector 14, Gurugram.',
          },
          {
            question: 'What types of spaces are available?',
            answer:
              'High-street retail shops, food court and dining zones, multiplex & entertainment floors, and serviced apartments.',
          },
          {
            question: 'What is the indicative price range?',
            answer:
              'Retail shops start from ₹50 Lakhs* and serviced apartments go up to ₹5.5 Cr*+. Prices are indicative.',
          },
        ],
      },
      seo: {
        upsert: {
          create: {
            metaTitle: 'SPJ Vedatam Sector 14 Gurugram – Premium Commercial & Retail Property',
            metaDescription:
              'Explore SPJ Vedatam – a 4.15-acre commercial hub in Sector 14 Gurugram. Premium retail, dining, entertainment & multiplex spaces. RERA approved. Enquire now!',
            metaKeywords: [
              'commercial property in Sector 14 Gurugram',
              'retail space for sale Gurgaon',
              'SPJ Vedatam retail investment',
              'commercial property in Gurugram',
              'retail shops for sale Gurgaon',
            ],
            h1Tag: 'SPJ Vedatam – Commercial & Retail Spaces in Sector 14 Gurugram',
            h2Tags: [
              'Location & Connectivity in Gurugram',
              'Amenities & Features',
              'Investment Highlights & Why SPJ Vedatam',
              'Floor Plans & Price Range',
            ],
            featuredImgAlt: 'Retail Shop Space SPJ Vedatam Sector 14 Gurugram',
            imageAltMap: {
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop':
                'Retail Shop Space SPJ Vedatam Sector 14 Gurugram',
            },
            localHeading: 'Why Sector 14 Gurugram?',
            localContent:
              'Sector 14 enjoys direct connectivity to MG Road Metro, NH-48, Dwarka Expressway, and IGI Airport, with strong surrounding residential and office catchments that drive consistent footfall.',
            longFormTitle: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
            longFormContent: longFormContent,
          },
          update: {
            metaTitle: 'SPJ Vedatam Sector 14 Gurugram – Premium Commercial & Retail Property',
            metaDescription:
              'Explore SPJ Vedatam – a 4.15-acre commercial hub in Sector 14 Gurugram. Premium retail, dining, entertainment & multiplex spaces. RERA approved. Enquire now!',
            metaKeywords: [
              'commercial property in Sector 14 Gurugram',
              'retail space for sale Gurgaon',
              'SPJ Vedatam retail investment',
              'commercial property in Gurugram',
              'retail shops for sale Gurgaon',
            ],
            h1Tag: 'SPJ Vedatam – Commercial & Retail Spaces in Sector 14 Gurugram',
            h2Tags: [
              'Location & Connectivity in Gurugram',
              'Amenities & Features',
              'Investment Highlights & Why SPJ Vedatam',
              'Floor Plans & Price Range',
            ],
            featuredImgAlt: 'Retail Shop Space SPJ Vedatam Sector 14 Gurugram',
            imageAltMap: {
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop':
                'Retail Shop Space SPJ Vedatam Sector 14 Gurugram',
            },
            localHeading: 'Why Sector 14 Gurugram?',
            localContent:
              'Sector 14 enjoys direct connectivity to MG Road Metro, NH-48, Dwarka Expressway, and IGI Airport, with strong surrounding residential and office catchments that drive consistent footfall.',
            longFormTitle: 'SPJ Vedatam – Premier Commercial & Retail Hub in Sector 14, Gurugram',
            longFormContent: longFormContent,
          },
        },
      },
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
