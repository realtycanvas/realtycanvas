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
      return trimmed.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }
  return trimmed ? [trimmed] : [];
};

const normalizeEnum = <T extends string>(value: string, allowed: readonly T[], fallback: T): T => {
  const trimmed = value.trim();
  return (allowed.includes(trimmed as T) ? trimmed : fallback) as T;
};

const uniqueStrings = (items: string[]) => Array.from(new Set(items.filter((item) => item.trim())));

const seed = async () => {
  const projects = await readCsv('Project_rows.csv');
  const highlights = await readCsv('Highlight_rows.csv');
  const amenities = await readCsv('Amenity_rows.csv');
  const faqs = await readCsv('Faq_rows.csv');
  const floorPlans = await readCsv('FloorPlan_rows.csv');
  const media = await readCsv('Media_rows.csv');
  const leads = await readCsv('Lead_rows.csv');

  for (const row of projects) {
    const galleryImages = parseArray(row.galleryImages);
    const videoUrls = uniqueStrings([
      ...parseArray(row.videoUrls),
      row.videoUrl?.trim(),
    ]);

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

    const projectData = {
      slug: row.slug.trim(),
      title: row.title.trim() || row.slug.trim(),
      subtitle: row.subtitle?.trim() || null,
      description: row.description?.trim() || row.title.trim() || 'Project description',
      category,
      status,
      reraId: row.reraId?.trim() || null,
      developerName: row.developerName?.trim() || null,
      developerLogo: row.developerLogo?.trim() || null,
      possessionDate: toDate(row.possessionDate) || null,
      launchDate: toDate(row.launchDate) || null,
      address: row.address?.trim() || row.locality?.trim() || row.city?.trim() || row.title.trim(),
      locality: row.locality?.trim() || null,
      city: row.city?.trim() || null,
      state: row.state?.trim() || null,
      latitude: toNumber(row.latitude) ?? null,
      longitude: toNumber(row.longitude) ?? null,
      currency: row.currency?.trim() || 'INR',
      featuredImage: row.featuredImage?.trim() || galleryImages[0] || '',
      galleryImages,
      videoUrls,
      basePrice: row.basePrice?.trim() || null,
      priceRange: row.priceRange?.trim() || null,
      priceMin,
      priceMax,
      bannerTitle: row.bannerTitle?.trim() || null,
      bannerSubtitle: row.bannerSubtitle?.trim() || null,
      bannerDescription: row.bannerDescription?.trim() || null,
      aboutTitle: row.aboutTitle?.trim() || null,
      aboutDescription: row.aboutDescription?.trim() || null,
      sitePlanTitle: row.sitePlanTitle?.trim() || null,
      sitePlanImage: row.sitePlanImage?.trim() || null,
      sitePlanDescription: row.sitePlanDescription?.trim() || null,
      minRatePsf: row.minRatePsf?.trim() || null,
      maxRatePsf: row.maxRatePsf?.trim() || null,
      minUnitArea: toInt(row.minUnitArea),
      maxUnitArea: toInt(row.maxUnitArea),
      totalUnits: toInt(row.totalUnits),
      soldUnits: toInt(row.soldUnits),
      availableUnits: toInt(row.availableUnits),
      landArea: row.landArea?.trim() || null,
      numberOfTowers: toInt(row.numberOfTowers),
      numberOfFloors: toInt(row.numberOfFloors),
      numberOfApartments: toInt(row.numberOfApartments),
      seoTitle: row.seoTitle?.trim() || null,
      seoDescription: row.seoDescription?.trim() || null,
      seoKeywords: parseArray(row.seoKeywords),
      projectTags: [],
      totalClicks: toInt(row.totalClicks) ?? 0,
    };

    await prisma.project.upsert({
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
