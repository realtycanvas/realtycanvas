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

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const body = (await request.json()) as Partial<{
      desktopImage: string;
      mobileImage: string | null;
      link: string | null;
      sortOrder: number;
      isActive: boolean;
    }>;

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        desktopImage: typeof body.desktopImage === 'string' ? body.desktopImage.trim() : undefined,
        mobileImage:
          typeof body.mobileImage === 'string' ? body.mobileImage.trim() : body.mobileImage === null ? null : undefined,
        link: typeof body.link === 'string' ? body.link.trim() : body.link === null ? null : undefined,
        sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : undefined,
        isActive: typeof body.isActive === 'boolean' ? body.isActive : undefined,
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

    return NextResponse.json({ ok: true, banner });
  } catch {
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const totalBanners = await prisma.banner.count();
    if (totalBanners <= 1) {
      return NextResponse.json({ error: 'Cannot delete the last remaining banner' }, { status: 400 });
    }

    await prisma.banner.delete({ where: { id } });

    revalidatePath('/');
    revalidateTag(BANNERS_TAG, 'default');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
