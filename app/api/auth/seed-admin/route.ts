import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET || '';
    const provided = request.headers.get('x-admin-secret') || '';
    if (!adminSecret || provided !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { email, password, role } = await request.json();
    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) {
      return NextResponse.json({ created: false, message: 'User exists' }, { status: 200 });
    }
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        role: role || 'admin',
      },
    });
    const hash = await bcrypt.hash(password, 10);
    const keyId = `email:${email.toLowerCase()}`;
    await prisma.key.create({
      data: {
        id: keyId,
        userId: user.id,
        hashedPassword: hash,
      },
    });
    return NextResponse.json({ created: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
