import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { lucia } from '@/lib/auth/lucia';
import { revalidatePath, revalidateTag } from 'next/cache';

const BANNERS_TAG = 'banners';

async function getSessionUser(request: NextRequest) {
  const sessionId = request.cookies.get('rc_session')?.value || '';
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  if (!session || !user) return null;
  return user;
}

export async function GET(request: NextRequest) {
  try {
    const includeInactive = request.nextUrl.searchParams.get('includeInactive') === '1';
    const user = includeInactive ? await getSessionUser(request) : null;

    if (includeInactive && !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const banners = await prisma.banner.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        desktopImage: true,
        mobileImage: true,
        link: true,
        sortOrder: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ data: banners }, { headers: { 'Cache-Control': 'public, max-age=30' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as Partial<{
      desktopImage: string;
      mobileImage: string | null;
      link: string | null;
      sortOrder: number;
      isActive: boolean;
    }>;

    const desktopImage = body.desktopImage?.trim();
    if (!desktopImage) {
      return NextResponse.json({ error: 'desktopImage is required' }, { status: 400 });
    }

    const banner = await prisma.banner.create({
      data: {
        desktopImage,
        mobileImage: body.mobileImage?.trim() || null,
        link: body.link?.trim() || null,
        sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0,
        isActive: body.isActive ?? true,
      },
      select: {
        id: true,
        desktopImage: true,
        mobileImage: true,
        link: true,
        sortOrder: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidatePath('/');
    revalidateTag(BANNERS_TAG, 'default');

    return NextResponse.json({ ok: true, banner }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}
