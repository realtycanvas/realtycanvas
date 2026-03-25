import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const sort = searchParams.get('sort') === 'asc' ? 'asc' : 'desc';
    const skip = (page - 1) * limit;

    const [rows, totalCount] = await Promise.all([
      prisma.lead.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: sort },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          timeline: true,
          createdAt: true,
        },
      }),
      prisma.lead.count(),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

    return NextResponse.json({
      data: rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        message: row.timeline || null,
        createdAt: row.createdAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
        hasPrevious: page > 1,
      },
    });
  } catch (error) {
    console.error('[LEADS] Failed to fetch leads', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
