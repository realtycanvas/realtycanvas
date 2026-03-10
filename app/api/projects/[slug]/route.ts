import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim();

    console.log(`[Project API] Fetching project with slug: "${normalizedSlug}"`);

    // Fetch project with all related data
    const project = await prisma.project.findUnique({
      where: { slug: normalizedSlug },
      include: {
        amenities: {
          orderBy: { sortOrder: 'asc' },
        },
        highlights: {
          orderBy: { sortOrder: 'asc' },
        },
        faqs: {
          orderBy: { sortOrder: 'asc' },
        },
        media: {
          orderBy: { sortOrder: 'asc' },
        },
        pricingTable: true,
        nearbyPoints: true,
      },
    });

    if (!project) {
      console.error(`[Project API] Project not found with slug: "${normalizedSlug}"`);
      return NextResponse.json({ error: `Project with slug '${slug}' not found` }, { status: 404 });
    }

    console.log(`[Project API] Found project: ${project.title}`);

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
