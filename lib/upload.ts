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
  return isDev ? `/uploads/${fileName}` : `${process.env.UPLOAD_BASE_URL}/${fileName}`;
}

export async function ensureUploadDir() {
  const dir = getUploadDir();
  await fs.mkdir(dir, { recursive: true });
}
