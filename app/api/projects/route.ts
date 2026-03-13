import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache, revalidatePath } from 'next/cache';

// ─── Cache Tag ────────────────────────────────────────────────────────────────
const PROJECTS_TAG = 'projects-list';

// ─── Cached DB Fetch ──────────────────────────────────────────────────────────
function getProjectsFromDB(filters: {
  page: number;
  limit: number;
  search: string;
  category: string;
  status: string;
  city: string;
}) {
  return unstable_cache(
    async () => {
      const { page, limit, search, category, status, city } = filters;
      const skip = (page - 1) * limit;

      const where: any = {};

      if (search.length >= 2) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
          { developerName: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (category !== 'ALL') where.category = category;
      if (status !== 'ALL') where.status = status;
      if (city) where.city = { contains: city, mode: 'insensitive' };

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

      return {
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
    },
    // Cache key — unique per filter combo
    [PROJECTS_TAG, JSON.stringify(filters)],
    {
      revalidate: 60, // 60 seconds TTL
      tags: [PROJECTS_TAG], // revalidateTag se instantly clear hoga
    }
  )();
}

// ─── GET ──────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = 6;
    const search = searchParams.get('search')?.trim() || '';
    const category = searchParams.get('category') || 'ALL';
    const status = searchParams.get('status') || 'ALL';
    const city = searchParams.get('city')?.trim() || '';
    const slug = searchParams.get('slug')?.trim() || '';

    // ── Slug fetch — no cache needed (admin/detail use) ──
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

    // ── Listing — cached ──
    const responseData = await getProjectsFromDB({
      page,
      limit,
      search,
      category,
      status,
      city,
    });

    return NextResponse.json(responseData, {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// ─── POST ─────────────────────────────────────────────────────────────────────
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

    const existingProject = await prisma.project.findUnique({ where: { slug } });
    if (existingProject) {
      return NextResponse.json({ error: 'Project with this slug already exists' }, { status: 409 });
    }

    const project = await prisma.project.create({
      data: {
        title: body.title.trim(),
        subtitle: body.subtitle?.trim() || null,
        slug,
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

    console.log(`[Projects API] Project created: ${project.id} (slug: ${project.slug})`);

    revalidatePath('/projects');

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
