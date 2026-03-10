import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { lucia } from '@/lib/auth/lucia';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('rc_session')?.value || '';
    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    const { user, session } = await lucia.validateSession(sessionId);

    // Session is invalid or expired
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // User attributes should be populated from lucia config
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
