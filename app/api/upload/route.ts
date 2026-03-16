import path from 'path';
import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { getUploadDir, getFileUrl, ensureUploadDir } from '@/lib/upload';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  const ext = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${ext}`;
  await ensureUploadDir();
  const buffer = new Uint8Array(await file.arrayBuffer());
  await fs.writeFile(path.join(getUploadDir(), fileName), buffer);
  return NextResponse.json({ url: getFileUrl(fileName) });
}
