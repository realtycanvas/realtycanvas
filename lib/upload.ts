import path from 'path';
import fs from 'node:fs/promises';

export function getUploadDir(): string {
  const uploadDir = process.env.UPLOAD_DIR!;
  if (uploadDir.startsWith('.')) {
    return path.join(process.cwd(), uploadDir);
  }
  return uploadDir;
}

export function getFileUrl(fileName: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const base = (process.env.UPLOAD_BASE_URL || '').trim().replace(/\/+$/, '');
  if (isProd) return `${base}/${fileName}`;
  return `/uploads/${fileName}`;
}

export async function ensureUploadDir() {
  const dir = getUploadDir();
  await fs.mkdir(dir, { recursive: true });
}
