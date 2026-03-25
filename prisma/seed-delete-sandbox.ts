import 'dotenv/config';
import { PrismaClient, ProjectCategory, ProjectStatus } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const args = process.argv.slice(2);
const cleanupMode = args.includes('--cleanup');
const dryRun = args.includes('--dry-run');

const countArg = args.find((arg) => arg.startsWith('--count='));
const parsedCount = countArg ? Number(countArg.split('=')[1]) : 15;
const projectCount = Number.isFinite(parsedCount) ? Math.min(20, Math.max(10, parsedCount)) : 15;

const rawDatabaseUrl = process.env.DATABASE_URL || '';
const slugPrefix = process.env.DELETE_TEST_SLUG_PREFIX || 'admin-delete-test-';

function ensureSafeDatabase(databaseUrl: string) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required.');
  }

  const parsed = new URL(databaseUrl);
  const dbName = parsed.pathname.replace(/^\/+/, '').trim().toLowerCase();
  const host = parsed.hostname.toLowerCase();
  const isLocalHost = host === 'localhost' || host === '127.0.0.1' || host === '::1';
  const blocked = ['prod', 'production'].includes(dbName);

  if (!dbName || blocked || !isLocalHost) {
    throw new Error(`Unsafe target "${host}/${dbName}". Use a local non-production database.`);
  }
}

function buildProjects(total: number) {
  const categories = [ProjectCategory.COMMERCIAL, ProjectCategory.RESIDENTIAL];
  const statuses = [ProjectStatus.PLANNED, ProjectStatus.UNDER_CONSTRUCTION, ProjectStatus.READY];
  const nowSeed = Date.now().toString(36);

  return Array.from({ length: total }, (_, index) => {
    const position = index + 1;
    const category = categories[index % categories.length];
    const status = statuses[index % statuses.length];

    return {
      slug: `${slugPrefix}${nowSeed}-${position}`,
      title: `Delete Test Project ${position}`,
      description: `Temporary sandbox project ${position} for delete verification`,
      category,
      status,
      address: `Delete Test Address ${position}, Gurugram`,
      city: 'Gurugram',
      state: 'Haryana',
      featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      developerName: 'Sandbox Developer',
      projectTags: ['DELETE_TEST', 'SANDBOX'],
      isActive: true,
    };
  });
}

async function run() {
  ensureSafeDatabase(rawDatabaseUrl);

  const pool = new Pool({ connectionString: rawDatabaseUrl });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    if (cleanupMode) {
      if (dryRun) {
        const count = await prisma.project.count({ where: { slug: { startsWith: slugPrefix } } });
        console.log(`[dry-run] ${count} records match prefix "${slugPrefix}" and would be deleted.`);
        return;
      }

      const deleted = await prisma.project.deleteMany({
        where: {
          slug: { startsWith: slugPrefix },
        },
      });
      console.log(`Deleted ${deleted.count} sandbox test projects.`);
      return;
    }

    const projects = buildProjects(projectCount);

    if (dryRun) {
      console.log(`[dry-run] Would create ${projects.length} projects in local DB from DATABASE_URL.`);
      console.log(`[dry-run] Example slug: ${projects[0]?.slug}`);
      return;
    }

    const created = await prisma.project.createMany({
      data: projects,
      skipDuplicates: true,
    });

    const totalNow = await prisma.project.count({ where: { slug: { startsWith: slugPrefix } } });
    console.log(`Inserted ${created.count} delete-test projects.`);
    console.log(`Current delete-test records: ${totalNow}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Seed failed');
  process.exit(1);
});
