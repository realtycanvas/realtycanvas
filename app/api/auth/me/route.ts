import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { lucia } from '@/lib/auth/lucia';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('rc_session')?.value || '';
    
    console.log('[AUTH/ME] Session Cookie:', {
      hasSession: !!sessionId,
      timestamp: new Date().toISOString(),
    });
    
    if (!sessionId) {
      console.log('[AUTH/ME] No session cookie found');
      return NextResponse.json({ user: null }, { status: 200 });
    }
    
    const { user, session } = await lucia.validateSession(sessionId);

    // Session is invalid or expired
    if (!session) {
      console.log('[AUTH/ME] Session invalid or expired:', { sessionId: sessionId.substring(0, 10) });
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // User attributes should be populated from lucia config
    if (!user) {
      console.log('[AUTH/ME] User not found for session:', { sessionId: sessionId.substring(0, 10) });
      return NextResponse.json({ user: null }, { status: 200 });
    }

    console.log('[AUTH/ME] User authenticated:', { email: user.email });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('[AUTH/ME] Error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
