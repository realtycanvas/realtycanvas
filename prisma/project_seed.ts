import 'dotenv/config';
import { PrismaClient, type Prisma, type MediaType, type LeadStatus } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'node:fs/promises';
import path from 'node:path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type CsvRow = Record<string, string>;

const parseCsv = (content: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    if (inQuotes) {
      if (char === '"') {
        const nextChar = content[i + 1];
        if (nextChar === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ',') {
      row.push(field);
      field = '';
      continue;
    }

    if (char === '\n') {
      row.push(field);
      field = '';
      if (row.length > 1 || (row[0] ?? '').trim() !== '') {
        rows.push(row);
      }
      row = [];
      continue;
    }

    if (char === '\r') {
      const nextChar = content[i + 1];
      if (nextChar === '\n') i += 1;
      row.push(field);
      field = '';
      if (row.length > 1 || (row[0] ?? '').trim() !== '') {
        rows.push(row);
      }
      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.length > 1 || (row[0] ?? '').trim() !== '') {
      rows.push(row);
    }
  }

  return rows;
};

const rowsToObjects = (rows: string[][]): CsvRow[] => {
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((values) => {
    const entry: CsvRow = {};
    headers.forEach((header, idx) => {
      entry[header] = values[idx] ?? '';
    });
    return entry;
  });
};

const readCsv = async (fileName: string): Promise<CsvRow[]> => {
  const filePath = path.join(process.cwd(), 'rc', fileName);
  const content = await fs.readFile(filePath, 'utf8');
  return rowsToObjects(parseCsv(content));
};

const toDate = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? null : date;
};

const toNumber = (value: string): number | null => {
  const cleaned = value.replace(/[^\d.-]/g, '');
  if (!cleaned) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
};

const toInt = (value: string): number | null => {
  const num = toNumber(value);
  return num == null ? null : Math.trunc(num);
};

const parseArray = (value: string): string[] => {
  const trimmed = value.trim();
  if (!trimmed) return [];
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed.map((item) => String(item));
    if (typeof parsed === 'string') return [parsed];
  } catch {
    if (trimmed.includes(',')) {
      return trimmed
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return trimmed ? [trimmed] : [];
};

const normalizeEnum = <T extends string>(value: string, allowed: readonly T[], fallback: T): T => {
  const trimmed = value.trim();
  return (allowed.includes(trimmed as T) ? trimmed : fallback) as T;
};

const uniqueStrings = (items: string[]) => Array.from(new Set(items.filter((item) => item.trim())));

const cleanText = (value: string | null | undefined) =>
  value
    ?.replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*[-|]\s*/g, ' – ')
    .trim() || '';

const titleCase = (value: string) =>
  cleanText(value)
    .split(' ')
    .map((word) => {
      if (!word) return word;
      if (word === word.toUpperCase() && word.length <= 5) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

const formatCategoryLabel = (category: string) => {
  switch (category) {
    case 'COMMERCIAL':
      return 'Commercial & Retail Hub';
    case 'RETAIL_ONLY':
      return 'Retail Destination';
    case 'MIXED_USE':
      return 'Mixed-Use Development';
    case 'RESIDENTIAL':
      return 'Residential Development';
    default:
      return titleCase(category.replace(/_/g, ' '));
  }
};

const formatStatusLabel = (status: string) => titleCase(status.replace(/_/g, ' '));

const buildLocationLabel = (locality: string, city: string, state: string) =>
  [cleanText(locality), cleanText(city), cleanText(state)].filter(Boolean).slice(0, 2).join(', ');

const includesIgnoreCase = (source: string, target: string) => source.toLowerCase().includes(target.toLowerCase());

const buildProjectTitle = (baseTitle: string, categoryLabel: string, locationLabel: string) => {
  const normalizedBase = titleCase(baseTitle);
  const needsCategory = !includesIgnoreCase(normalizedBase, categoryLabel);
  const needsLocation = locationLabel && !includesIgnoreCase(normalizedBase, locationLabel);
  if (!needsCategory && !needsLocation) return normalizedBase;
  const suffixParts = [needsCategory ? categoryLabel : '', needsLocation ? `in ${locationLabel}` : ''].filter(Boolean);
  return `${normalizedBase} – ${suffixParts.join(' ')}`.trim();
};

const buildSubtitle = (statusLabel: string, categoryLabel: string, locationLabel: string) =>
  [statusLabel, categoryLabel.toLowerCase(), locationLabel ? `in ${locationLabel}` : '']
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

const buildProjectDescription = ({
  title,
  locationLabel,
  developerName,
  categoryLabel,
  statusLabel,
  basePrice,
  priceRange,
}: {
  title: string;
  locationLabel: string;
  developerName: string;
  categoryLabel: string;
  statusLabel: string;
  basePrice: string;
  priceRange: string;
}) => {
  const pricing = basePrice || priceRange ? ` Pricing starts from ${basePrice || priceRange}.` : '';
  return `${title} is a ${statusLabel.toLowerCase()} ${categoryLabel.toLowerCase()} ${
    locationLabel ? `located in ${locationLabel}` : 'project'
  }${developerName ? ` by ${developerName}` : ''}, designed for buyers and investors seeking strong long-term value.${pricing}`.trim();
};

const buildProjectOverview = ({
  title,
  developerName,
  locationLabel,
  categoryLabel,
  statusLabel,
  totalUnits,
  numberOfTowers,
  landArea,
  basePrice,
  priceRange,
}: {
  title: string;
  developerName: string;
  locationLabel: string;
  categoryLabel: string;
  statusLabel: string;
  totalUnits: number | null;
  numberOfTowers: number | null;
  landArea: string;
  basePrice: string;
  priceRange: string;
}) => {
  const intro = `${title} is ${developerName ? `being developed by ${developerName}` : 'a landmark development'}${
    locationLabel ? ` in ${locationLabel}` : ''
  }. It is planned as a ${statusLabel.toLowerCase()} ${categoryLabel.toLowerCase()} tailored for end-users and investors.`;

  const bullets = uniqueStrings([
    numberOfTowers ? `• ${numberOfTowers} tower${numberOfTowers > 1 ? 's' : ''} planned for the development` : '',
    totalUnits ? `• Approx. ${totalUnits} unit${totalUnits > 1 ? 's' : ''} in the project inventory` : '',
    landArea ? `• Project spread across ${landArea} acres / site area` : '',
    priceRange || basePrice ? `• Indicative pricing starts from ${basePrice || priceRange}` : '',
    `• ${categoryLabel} with strong design, usability, and long-term value potential`,
  ]);

  return [intro, '', 'Key project highlights:', ...bullets].join('\n').trim();
};

const buildLocationAdvantages = ({
  title,
  locality,
  city,
  address,
  categoryLabel,
}: {
  title: string;
  locality: string;
  city: string;
  address: string;
  categoryLabel: string;
}) => {
  const area = locality || city || address || 'its micro-market';
  return [
    `${title} enjoys a strategic address in ${area}${city && locality && !includesIgnoreCase(area, city) ? `, ${city}` : ''}.`,
    '',
    'Connectivity & Accessibility:',
    `• Located in a well-established catchment with strong access to key roads and daily-use infrastructure around ${area}.`,
    `• Suitable for buyers evaluating ${categoryLabel.toLowerCase()} opportunities with better livability, visibility, and future appreciation.`,
    `• Supported by nearby schools, hospitals, work hubs, retail zones, and lifestyle destinations depending on the surrounding micro-market.`,
    `• Easy movement for residents, customers, employees, and investors across major parts of Gurugram / NCR.`,
  ].join('\n');
};

const buildWhoShouldConsider = ({
  title,
  category,
  basePrice,
  priceRange,
}: {
  title: string;
  category: string;
  basePrice: string;
  priceRange: string;
}) => {
  const audience =
    category === 'COMMERCIAL' || category === 'RETAIL_ONLY'
      ? [
          '• Retail brands, showroom operators, and F&B businesses seeking better visibility and footfall.',
          '• Investors looking for rental income potential and long-term capital appreciation.',
          '• Business owners who want a strategic commercial address in Gurugram.',
        ]
      : [
          '• End-users seeking a premium address with modern amenities and strong connectivity.',
          '• Families looking for well-planned residences in an established growth corridor.',
          '• Investors targeting long-term appreciation in a strong micro-market.',
        ];

  const pricing =
    basePrice || priceRange ? `• Buyers comfortable with an indicative budget from ${basePrice || priceRange}.` : '';

  return [`${title} is ideal for the following audience profiles:`, '', ...audience, pricing]
    .filter(Boolean)
    .join('\n');
};

const buildSeoDescription = ({
  title,
  locationLabel,
  categoryLabel,
  statusLabel,
  basePrice,
  priceRange,
}: {
  title: string;
  locationLabel: string;
  categoryLabel: string;
  statusLabel: string;
  basePrice: string;
  priceRange: string;
}) => {
  const pricing = basePrice || priceRange ? ` Price range: ${basePrice || priceRange}.` : '';
  return `Explore ${title}${locationLabel ? ` in ${locationLabel}` : ''}. ${statusLabel} ${categoryLabel.toLowerCase()} with location advantages, project highlights, amenities and pricing details.${pricing}`.trim();
};

const buildSeoKeywords = (title: string, locality: string, city: string, categoryLabel: string) =>
  uniqueStrings([
    title,
    locality ? `${title} ${locality}` : '',
    city ? `${title} ${city}` : '',
    city ? `${categoryLabel} in ${city}` : categoryLabel,
    locality && city ? `${categoryLabel} ${locality} ${city}` : '',
  ]);

const toAreaLabel = (value: string | null | undefined) => {
  const cleaned = cleanText(value);
  if (!cleaned) return '';
  const numeric = cleaned.match(/[\d.]+(?:\s*-\s*[\d.]+)?/g)?.join(' – ');
  const hasSq = /sq|meter|sqm|sqft|ft/i.test(cleaned);
  if (numeric && hasSq) return `${numeric} Sq.ft`;
  return cleaned;
};

const makeId = (...parts: string[]) =>
  parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const buildOfferingsFromUnits = (projectId: string, category: string, units: CsvRow[]) => {
  const typeMap = new Map<string, { type: string; floors: Set<string>; count: number }>();
  for (const unit of units) {
    const type = cleanText(unit.type) || (category === 'RESIDENTIAL' ? 'Residence' : 'Space');
    const floor = cleanText(unit.floor);
    const key = type.toUpperCase();
    if (!typeMap.has(key)) {
      typeMap.set(key, { type, floors: new Set<string>(), count: 0 });
    }
    const entry = typeMap.get(key)!;
    if (floor) entry.floors.add(floor);
    entry.count += 1;
  }

  const fallback =
    category === 'COMMERCIAL' || category === 'RETAIL_ONLY'
      ? [
          {
            icon: '🛍',
            title: 'Retail Shops & Showrooms',
            description: 'Designed for visibility, walk-ins, and brand presence.',
            sortOrder: 1,
          },
          {
            icon: '🏢',
            title: 'Commercial Spaces',
            description: 'Suitable for offices, studios, and business operations.',
            sortOrder: 2,
          },
        ]
      : [
          {
            icon: '🏡',
            title: 'Premium Residences',
            description: 'Spacious residences designed for modern family living.',
            sortOrder: 1,
          },
        ];

  if (!typeMap.size) {
    return fallback.map((item) => ({
      id: makeId(projectId, 'offering', item.sortOrder.toString()),
      projectId,
      ...item,
    }));
  }

  return Array.from(typeMap.values())
    .slice(0, 4)
    .map((entry, index) => ({
      id: makeId(projectId, 'offering', entry.type, String(index + 1)),
      projectId,
      icon:
        entry.type.toUpperCase().includes('RETAIL') || entry.type.toUpperCase().includes('ANCHOR')
          ? '🛍'
          : entry.type.toUpperCase().includes('APARTMENT')
            ? '🏡'
            : '🏢',
      title: titleCase(entry.type.replace(/_/g, ' ')),
      description: `Includes ${entry.count} planned/unitised ${entry.type.toLowerCase()} option${
        entry.count > 1 ? 's' : ''
      }${entry.floors.size ? ` across ${Array.from(entry.floors).slice(0, 2).join(', ')}` : ''}.`,
      sortOrder: index + 1,
    }));
};

const buildPricingTableFromUnits = (projectId: string, units: CsvRow[], projectBasePrice: string) => {
  const groups = new Map<string, CsvRow[]>();
  for (const unit of units) {
    const key = `${cleanText(unit.type) || 'Space'}|${cleanText(unit.floor) || 'Multiple Floors'}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(unit);
  }

  return Array.from(groups.entries())
    .slice(0, 6)
    .map(([key, rows], index) => {
      const [type, floor] = key.split('|');
      const areas = rows.map((row) => toAreaLabel(row.areaSqFt)).filter(Boolean);
      const rates = rows.map((row) => cleanText(row.ratePsf)).filter(Boolean);
      const prices = rows.map((row) => cleanText(row.priceTotal)).filter(Boolean);
      return {
        id: makeId(projectId, 'pricing', type, floor, String(index + 1)),
        projectId,
        type: titleCase(type),
        reraArea: uniqueStrings(areas).slice(0, 2).join(' / ') || 'On Request',
        price: prices[0] || projectBasePrice || 'On Request',
        pricePerSqft: rates[0] || null,
        availableUnits:
          rows.filter((row) => cleanText(row.availability).toUpperCase() === 'AVAILABLE').length || rows.length,
        floorNumbers: floor || null,
        features: {
          note: cleanText(rows[0]?.notes) || null,
          availability: cleanText(rows[0]?.availability) || 'Available',
        } as Prisma.InputJsonValue,
      };
    });
};

const buildProjectTags = (row: CsvRow, category: string, status: string, priceMin: number | null) => {
  const existingTags = parseArray(row.projectTags || '');
  const derived: string[] = [];
  if (status === 'READY' || status === 'UNDER_CONSTRUCTION') derived.push('TRENDING');
  if (status === 'PLANNED') derived.push('NEW');
  if (category === 'COMMERCIAL') derived.push('COMMERCIAL_GURUGRAM');
  if (category === 'RESIDENTIAL') derived.push('DREAM');
  if (priceMin != null && priceMin <= 10000000) derived.push('BUDGET');
  return uniqueStrings([...existingTags, ...derived]);
};

const seed = async () => {
  const projects = await readCsv('Project_rows.csv');
  const highlights = await readCsv('Highlight_rows.csv');
  const amenities = await readCsv('Amenity_rows.csv');
  const faqs = await readCsv('Faq_rows.csv');
  const floorPlans = await readCsv('FloorPlan_rows.csv');
  const media = await readCsv('Media_rows.csv');
  const leads = await readCsv('Lead_rows.csv');
  const projectClicks = await readCsv('ProjectClick_rows.csv');
  const units = await readCsv('Unit_rows.csv');
  const unitsByProject = new Map<string, CsvRow[]>();

  for (const row of units) {
    const projectId = row.projectId?.trim();
    if (!projectId) continue;
    if (!unitsByProject.has(projectId)) unitsByProject.set(projectId, []);
    unitsByProject.get(projectId)!.push(row);
  }

  for (const row of projects) {
    const galleryImages = parseArray(row.galleryImages);
    const videoUrls = uniqueStrings([...parseArray(row.videoUrls), row.videoUrl?.trim()]);

    const category = normalizeEnum(
      row.category,
      ['COMMERCIAL', 'RETAIL_ONLY', 'MIXED_USE', 'RESIDENTIAL'],
      'COMMERCIAL'
    );
    const status = normalizeEnum(row.status, ['PLANNED', 'UNDER_CONSTRUCTION', 'READY'], 'PLANNED');

    const createdAt = toDate(row.createdAt);
    const updatedAt = toDate(row.updatedAt);
    const priceMin = toInt(row.priceMin);
    const priceMax = toInt(row.priceMax);
    const locality = cleanText(row.locality);
    const city = cleanText(row.city);
    const state = cleanText(row.state);
    const locationLabel = buildLocationLabel(locality, city, state);
    const categoryLabel = formatCategoryLabel(category);
    const statusLabel = formatStatusLabel(status);
    const rawTitle = cleanText(row.title) || titleCase(row.slug);
    const standardizedTitle = buildProjectTitle(rawTitle, categoryLabel, locationLabel);
    const subtitle = cleanText(row.subtitle) || buildSubtitle(statusLabel, categoryLabel, locationLabel);
    const basePrice = cleanText(row.basePrice);
    const priceRange = cleanText(row.priceRange);
    const landArea = cleanText(row.landArea);
    const description =
      cleanText(row.description) ||
      buildProjectDescription({
        title: standardizedTitle,
        locationLabel,
        developerName: cleanText(row.developerName),
        categoryLabel,
        statusLabel,
        basePrice,
        priceRange,
      });
    const bannerTitle = cleanText(row.bannerTitle) || standardizedTitle;
    const bannerSubtitle =
      cleanText(row.bannerSubtitle) || `${categoryLabel}${locationLabel ? ` in ${locationLabel}` : ''}`;
    const bannerDescription =
      cleanText(row.bannerDescription) || `${description}${description.endsWith('.') ? '' : '.'}`;
    const overviewContent = buildProjectOverview({
      title: rawTitle,
      developerName: cleanText(row.developerName),
      locationLabel,
      categoryLabel,
      statusLabel,
      totalUnits: toInt(row.totalUnits),
      numberOfTowers: toInt(row.numberOfTowers),
      landArea,
      basePrice,
      priceRange,
    });
    const aboutTitle = `Project Overview – ${rawTitle}`;
    const aboutDescription = cleanText(row.aboutDescription)
      ? `${overviewContent}\n\n${cleanText(row.aboutDescription)}`
      : overviewContent;
    const sitePlanTitle = cleanText(row.sitePlanTitle) || `Location & Site Plan – ${rawTitle}`;
    const sitePlanDescription =
      cleanText(row.sitePlanDescription) ||
      `${rawTitle}${locationLabel ? ` is located in ${locationLabel}` : ''} with strong connectivity and access to key destinations.`;
    const seoTitle = cleanText(row.seoTitle) || standardizedTitle;
    const seoDescription =
      cleanText(row.seoDescription) ||
      buildSeoDescription({
        title: rawTitle,
        locationLabel,
        categoryLabel,
        statusLabel,
        basePrice,
        priceRange,
      });
    const seoKeywords = parseArray(row.seoKeywords).length
      ? parseArray(row.seoKeywords)
      : buildSeoKeywords(rawTitle, locality, city, categoryLabel);
    const projectTags = buildProjectTags(row, category, status, priceMin);
    const projectUnits = unitsByProject.get(row.id) || [];
    const generatedOfferings = buildOfferingsFromUnits(row.id, category, projectUnits);
    const generatedPricing = buildPricingTableFromUnits(row.id, projectUnits, basePrice || priceRange);
    const localHeading = `Location Advantage – ${locality || city || 'Project Address'}`;
    const localContent = buildLocationAdvantages({
      title: rawTitle,
      locality,
      city,
      address: cleanText(row.address),
      categoryLabel,
    });
    const longFormTitle = `Who Should Consider ${rawTitle}?`;
    const longFormContent = buildWhoShouldConsider({
      title: rawTitle,
      category,
      basePrice,
      priceRange,
    });
    const h1Tag = `${rawTitle}${locationLabel ? ` in ${locationLabel}` : ''}`;
    const h2Tags = [
      `Project Overview – ${rawTitle}`,
      localHeading,
      `${categoryLabel} at ${rawTitle}`,
      'Price & Unit Size Overview',
      'Amenities & Features',
      `Why Invest in ${rawTitle}?`,
      longFormTitle,
    ];
    const featuredImgAlt = `${rawTitle}${locationLabel ? ` – ${locationLabel}` : ''}`;
    const imageAltMap = Object.fromEntries(
      uniqueStrings([row.featuredImage?.trim() || '', ...galleryImages])
        .filter(Boolean)
        .map((imageUrl, index) => [
          imageUrl,
          `${rawTitle} image ${index + 1}${locationLabel ? ` in ${locationLabel}` : ''}`,
        ])
    );

    const projectData = {
      slug: row.slug.trim(),
      title: standardizedTitle,
      subtitle: subtitle || null,
      description,
      category,
      status,
      reraId: row.reraId?.trim() || null,
      developerName: row.developerName?.trim() || null,
      developerLogo: row.developerLogo?.trim() || null,
      possessionDate: toDate(row.possessionDate) || null,
      launchDate: toDate(row.launchDate) || null,
      address: cleanText(row.address) || locality || city || rawTitle,
      locality: locality || null,
      city: city || null,
      state: state || null,
      latitude: toNumber(row.latitude) ?? null,
      longitude: toNumber(row.longitude) ?? null,
      currency: row.currency?.trim() || 'INR',
      featuredImage: row.featuredImage?.trim() || galleryImages[0] || '',
      galleryImages,
      videoUrls,
      basePrice: basePrice || null,
      priceRange: priceRange || null,
      priceMin,
      priceMax,
      bannerTitle,
      bannerSubtitle,
      bannerDescription,
      aboutTitle,
      aboutDescription,
      sitePlanTitle,
      sitePlanImage: row.sitePlanImage?.trim() || null,
      sitePlanDescription,
      minRatePsf: row.minRatePsf?.trim() || null,
      maxRatePsf: row.maxRatePsf?.trim() || null,
      minUnitArea: toInt(row.minUnitArea),
      maxUnitArea: toInt(row.maxUnitArea),
      totalUnits: toInt(row.totalUnits),
      soldUnits: toInt(row.soldUnits),
      availableUnits: toInt(row.availableUnits),
      landArea: landArea || null,
      numberOfTowers: toInt(row.numberOfTowers),
      numberOfFloors: toInt(row.numberOfFloors),
      numberOfApartments: toInt(row.numberOfApartments),
      seoTitle,
      seoDescription,
      seoKeywords,
      projectTags,
      totalClicks: toInt(row.totalClicks) ?? 0,
    };

    const project = await prisma.project.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        ...projectData,
        ...(createdAt ? { createdAt } : {}),
        ...(updatedAt ? { updatedAt } : {}),
      },
      update: {
        ...projectData,
        ...(updatedAt ? { updatedAt } : {}),
      },
    });

    await prisma.projectSeo.upsert({
      where: { projectId: project.id },
      create: {
        projectId: project.id,
        metaTitle: seoTitle,
        metaDescription: seoDescription,
        metaKeywords: seoKeywords,
        canonicalUrl: `/projects/${project.slug}`,
        ogTitle: seoTitle,
        ogDescription: seoDescription,
        ogImage: row.featuredImage?.trim() || galleryImages[0] || null,
        twitterCard: 'summary_large_image',
        schemaMarkup: {
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: rawTitle,
          description: seoDescription,
          url: `/projects/${project.slug}`,
          image: row.featuredImage?.trim() || galleryImages[0] || null,
        } as Prisma.InputJsonValue,
        h1Tag,
        h2Tags,
        featuredImgAlt,
        imageAltMap: imageAltMap as Prisma.InputJsonValue,
        localHeading,
        localContent,
        longFormTitle,
        longFormContent,
        isIndexable: true,
        sitemapPriority: 0.8,
      },
      update: {
        metaTitle: seoTitle,
        metaDescription: seoDescription,
        metaKeywords: seoKeywords,
        canonicalUrl: `/projects/${project.slug}`,
        ogTitle: seoTitle,
        ogDescription: seoDescription,
        ogImage: row.featuredImage?.trim() || galleryImages[0] || null,
        twitterCard: 'summary_large_image',
        schemaMarkup: {
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: rawTitle,
          description: seoDescription,
          url: `/projects/${project.slug}`,
          image: row.featuredImage?.trim() || galleryImages[0] || null,
        } as Prisma.InputJsonValue,
        h1Tag,
        h2Tags,
        featuredImgAlt,
        imageAltMap: imageAltMap as Prisma.InputJsonValue,
        localHeading,
        localContent,
        longFormTitle,
        longFormContent,
        isIndexable: true,
        sitemapPriority: 0.8,
      },
    });

    for (const offering of generatedOfferings) {
      await prisma.offering.upsert({
        where: { id: offering.id },
        create: offering,
        update: {
          projectId: offering.projectId,
          icon: offering.icon,
          title: offering.title,
          description: offering.description,
          sortOrder: offering.sortOrder,
        },
      });
    }

    for (const pricingRow of generatedPricing) {
      await prisma.pricingTable.upsert({
        where: { id: pricingRow.id },
        create: pricingRow,
        update: {
          projectId: pricingRow.projectId,
          type: pricingRow.type,
          reraArea: pricingRow.reraArea,
          price: pricingRow.price,
          pricePerSqft: pricingRow.pricePerSqft,
          availableUnits: pricingRow.availableUnits,
          floorNumbers: pricingRow.floorNumbers,
          features: pricingRow.features,
        },
      });
    }
  }

  for (const row of highlights) {
    await prisma.highlight.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        projectId: row.projectId,
        label: row.label.trim(),
        icon: row.icon?.trim() || null,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
      update: {
        projectId: row.projectId,
        label: row.label.trim(),
        icon: row.icon?.trim() || null,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
    });
  }

  for (const row of amenities) {
    await prisma.amenity.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        projectId: row.projectId,
        category: row.category.trim(),
        name: row.name.trim(),
        details: row.details?.trim() || null,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
      update: {
        projectId: row.projectId,
        category: row.category.trim(),
        name: row.name.trim(),
        details: row.details?.trim() || null,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
    });
  }

  for (const row of faqs) {
    await prisma.faq.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        projectId: row.projectId,
        question: row.question.trim(),
        answer: row.answer.trim(),
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
      update: {
        projectId: row.projectId,
        question: row.question.trim(),
        answer: row.answer.trim(),
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
    });
  }

  for (const row of floorPlans) {
    const detailsValue = row.details?.trim();
    let details: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined = undefined;
    if (detailsValue) {
      try {
        details = JSON.parse(detailsValue) as Prisma.InputJsonValue;
      } catch {
        details = detailsValue;
      }
    }

    await prisma.floorPlan.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        projectId: row.projectId,
        level: row.level.trim(),
        title: row.title?.trim() || null,
        imageUrl: row.imageUrl.trim(),
        details,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
      update: {
        projectId: row.projectId,
        level: row.level.trim(),
        title: row.title?.trim() || null,
        imageUrl: row.imageUrl.trim(),
        details,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
    });
  }

  for (const row of media) {
    const mediaType = normalizeEnum(
      row.type,
      ['IMAGE', 'VIDEO', 'PLAN', 'BROCHURE', 'VIRTUAL_TOUR'] as const,
      'IMAGE'
    ) as MediaType;
    await prisma.media.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        projectId: row.projectId,
        type: mediaType,
        url: row.url.trim(),
        caption: row.caption?.trim() || null,
        tags: parseArray(row.tags),
        floor: row.floor?.trim() || null,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
      update: {
        projectId: row.projectId,
        type: mediaType,
        url: row.url.trim(),
        caption: row.caption?.trim() || null,
        tags: parseArray(row.tags),
        floor: row.floor?.trim() || null,
        sortOrder: toInt(row.sortOrder) ?? 0,
      },
    });
  }

  for (const row of leads) {
    const createdAt = toDate(row.createdAt);
    const leadStatus = normalizeEnum(
      row.status,
      ['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'ARCHIVED'] as const,
      'NEW'
    ) as LeadStatus;
    await prisma.lead.upsert({
      where: { id: row.id },
      create: {
        id: row.id,
        name: row.name.trim(),
        phone: row.phone.trim(),
        email: row.email.trim(),
        propertyType: row.propertyType.trim(),
        city: row.city.trim(),
        state: row.state.trim(),
        timeline: row.timeline?.trim() || null,
        projectSlug: row.projectSlug?.trim() || null,
        projectTitle: row.projectTitle?.trim() || null,
        sourcePath: row.sourcePath?.trim() || null,
        status: leadStatus,
        ...(createdAt ? { createdAt } : {}),
      },
      update: {
        name: row.name.trim(),
        phone: row.phone.trim(),
        email: row.email.trim(),
        propertyType: row.propertyType.trim(),
        city: row.city.trim(),
        state: row.state.trim(),
        timeline: row.timeline?.trim() || null,
        projectSlug: row.projectSlug?.trim() || null,
        projectTitle: row.projectTitle?.trim() || null,
        sourcePath: row.sourcePath?.trim() || null,
        status: leadStatus,
        ...(createdAt ? { createdAt } : {}),
      },
    });
  }

  for (const row of projectClicks) {
    const projectId = row.projectId?.trim();
    const clickDate = toDate(row.clickDate);
    if (!projectId || !clickDate) continue;

    const lastClickAt = toDate(row.lastClickAt) || clickDate;
    const createdAt = toDate(row.createdAt);
    const clickCount = toInt(row.clickCount) ?? 1;
    const id = row.id?.trim();
    const where = id
      ? { id }
      : {
          projectId_clickDate: {
            projectId,
            clickDate,
          },
        };

    await prisma.projectClick.upsert({
      where,
      create: {
        id: id || undefined,
        projectId,
        clickCount,
        clickDate,
        lastClickAt,
        clientIP: row.clientIP?.trim() || null,
        ...(createdAt ? { createdAt } : {}),
      },
      update: {
        projectId,
        clickCount,
        clickDate,
        lastClickAt,
        clientIP: row.clientIP?.trim() || null,
        ...(createdAt ? { createdAt } : {}),
      },
    });
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
