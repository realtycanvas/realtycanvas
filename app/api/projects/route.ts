import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createHash } from 'crypto';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60000;

function createCacheKey(filters: any): string {
  return createHash('md5').update(JSON.stringify(filters)).digest('hex');
}

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
  if (cache.size > 50) {
    const oldestKey = Array.from(cache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp)[0]?.[0];
    if (oldestKey) cache.delete(oldestKey);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = 6;
    const skip = (page - 1) * limit;
    const search = searchParams.get('search')?.trim() || '';
    const category = searchParams.get('category') || 'ALL';
    const status = searchParams.get('status') || 'ALL';
    const city = searchParams.get('city')?.trim() || '';
    const slug = searchParams.get('slug')?.trim() || '';

    if (slug) {
      const normalized = decodeURIComponent(slug)
        .trim()
        .replace(/^\/+|\/+$/g, '');
      const project = await prisma.project.findFirst({
        where: { slug: { equals: normalized, mode: 'insensitive' } },
        include: {
          amenities: { orderBy: { sortOrder: 'asc' } },
          highlights: { orderBy: { sortOrder: 'asc' } },
          faqs: { orderBy: { sortOrder: 'asc' } },
          media: { orderBy: { sortOrder: 'asc' } },
          pricingTable: true,
          nearbyPoints: true,
        },
      });
      if (!project) {
        return NextResponse.json({ error: `Project with slug '${slug}' not found` }, { status: 404 });
      }
      return NextResponse.json(project);
    }

    // Create cache key
    const cacheKey = createCacheKey({ page, search, category, status, city, limit });

    // Check cache
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, max-age=60',
          'X-Cache': 'HIT',
        },
      });
    }

    // Build where clause
    const where: any = {};

    if (search.length >= 2) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { developerName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category && category !== 'ALL') {
      where.category = category;
    }

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    // Fetch projects and total count
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          category: true,
          status: true,
          address: true,
          city: true,
          state: true,
          featuredImage: true,
          basePrice: true,
          minRatePsf: true,
          maxRatePsf: true,
          developerName: true,
          locality: true,
          createdAt: true,
        },
      }),
      prisma.project.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const responseData = {
      data: projects.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
        hasPrevious: page > 1,
      },
    };

    // Cache the response
    setCachedData(cacheKey, responseData);

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, max-age=60',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'slug', 'description', 'address', 'featuredImage'];
    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const slug = body.slug.toLowerCase().trim();
    console.log(`[Projects API] Creating project with slug: "${slug}"`);

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json({ error: 'Project with this slug already exists' }, { status: 409 });
    }

    // Create the project
    const project = await prisma.project.create({
      data: {
        title: body.title.trim(),
        subtitle: body.subtitle?.trim() || null,
        slug, // Use lowercase trimmed slug
        description: body.description.trim(),
        category: body.category || 'COMMERCIAL',
        status: body.status || 'PLANNED',
        address: body.address.trim(),
        locality: body.locality?.trim() || null,
        city: body.city?.trim() || null,
        state: body.state?.trim() || null,
        developerName: body.developerName?.trim() || null,
        reraId: body.reraId?.trim() || null,
        basePrice: body.basePrice?.trim() || null,
        priceRange: body.priceRange?.trim() || null,
        priceMin: body.priceMin || null,
        priceMax: body.priceMax || null,
        featuredImage: body.featuredImage.trim(),
        landArea: body.landArea?.trim() || null,
        totalUnits: body.totalUnits || null,
        soldUnits: body.soldUnits || null,
        availableUnits: body.availableUnits || null,
        numberOfTowers: body.numberOfTowers || null,
        numberOfFloors: body.numberOfFloors || null,
        minRatePsf: body.minRatePsf?.trim() || null,
        maxRatePsf: body.maxRatePsf?.trim() || null,
        minUnitArea: body.minUnitArea || null,
        maxUnitArea: body.maxUnitArea || null,
        bannerTitle: body.bannerTitle?.trim() || null,
        bannerSubtitle: body.bannerSubtitle?.trim() || null,
        bannerDescription: body.bannerDescription?.trim() || null,
        aboutTitle: body.aboutTitle?.trim() || null,
        aboutDescription: body.aboutDescription?.trim() || null,
        sitePlanTitle: body.sitePlanTitle?.trim() || null,
        sitePlanImage: body.sitePlanImage?.trim() || null,
        sitePlanDescription: body.sitePlanDescription?.trim() || null,
        seoTitle: body.seoTitle?.trim() || null,
        seoDescription: body.seoDescription?.trim() || null,
        seoKeywords: body.seoKeywords || [],
      },
    });

    console.log(`[Projects API] Project created successfully: ${project.id} (slug: ${project.slug})`);

    // Clear cache for all project listings
    cache.clear();

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
