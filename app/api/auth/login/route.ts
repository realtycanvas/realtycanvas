import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { lucia } from '@/lib/auth/lucia';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('[LOGIN] Attempt:', { email, timestamp: new Date().toISOString() });
    
    if (!email || !password) {
      console.log('[LOGIN] Missing credentials');
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }
    
    const keyId = `email:${email.toLowerCase()}`;
    const key = await prisma.key.findUnique({ where: { id: keyId } });
    
    if (!key || !key.hashedPassword) {
      console.log('[LOGIN] Key not found:', { keyId });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const valid = await bcrypt.compare(password, key.hashedPassword);
    
    if (!valid) {
      console.log('[LOGIN] Invalid password for:', { email });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const session = await lucia.createSession(key.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const user = await prisma.user.findUnique({ where: { id: key.userId } });
    
    console.log('[LOGIN] Success:', { email, userId: key.userId, sessionId: session.id });
    
    const res = NextResponse.json({ user: { email: user?.email, role: user?.role } }, { status: 200 });
    res.headers.append('Set-Cookie', sessionCookie.serialize());
    return res;
  } catch (error) {
    console.error('[LOGIN] Error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
