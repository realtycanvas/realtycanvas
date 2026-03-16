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
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) return `/uploads/${fileName}`;
  const rawBase = (process.env.UPLOAD_BASE_URL || '').trim().replace(/^`|`$/g, '');
  const base = rawBase.replace(/\/+$/, '');
  if (!base) return `/uploads/${fileName}`;
  if (base.endsWith('/uploads')) return `${base}/${fileName}`;
  return `${base}/uploads/${fileName}`;
}

export async function ensureUploadDir() {
  const dir = getUploadDir();
  await fs.mkdir(dir, { recursive: true });
}
