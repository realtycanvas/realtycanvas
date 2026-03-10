import { NextRequest, NextResponse } from 'next/server';
import { lucia } from '@/lib/auth/lucia';

export async function POST(request: NextRequest) {
  try {
    const cookie = request.cookies.get('rc_session')?.value || '';
    if (!cookie) {
      const blank = lucia.createBlankSessionCookie();
      const res = NextResponse.json({ ok: true }, { status: 200 });
      res.headers.append('Set-Cookie', blank.serialize());
      return res;
    }
    await lucia.invalidateSession(cookie);
    const blank = lucia.createBlankSessionCookie();
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.headers.append('Set-Cookie', blank.serialize());
    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
