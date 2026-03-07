-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('COMMERCIAL', 'RETAIL_ONLY', 'MIXED_USE', 'RESIDENTIAL');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNED', 'UNDER_CONSTRUCTION', 'READY');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'PLAN', 'BROCHURE', 'VIRTUAL_TOUR');

-- CreateEnum
CREATE TYPE "DocType" AS ENUM ('APPROVAL', 'BROCHURE', 'SPEC', 'TITLE');

-- CreateEnum
CREATE TYPE "NearbyType" AS ENUM ('METRO', 'MALL', 'OFFICE_HUB', 'HOTEL', 'ROAD', 'AIRPORT');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "category" "ProjectCategory" NOT NULL DEFAULT 'COMMERCIAL',
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNED',
    "reraId" TEXT,
    "developerName" TEXT,
    "developerLogo" TEXT,
    "possessionDate" TIMESTAMP(3),
    "launchDate" TIMESTAMP(3),
    "address" TEXT NOT NULL,
    "locality" TEXT,
    "city" TEXT,
    "state" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "featuredImage" TEXT NOT NULL,
    "galleryImages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "videoUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "basePrice" TEXT,
    "priceRange" TEXT,
    "priceMin" INTEGER,
    "priceMax" INTEGER,
    "bannerTitle" TEXT,
    "bannerSubtitle" TEXT,
    "bannerDescription" TEXT,
    "aboutTitle" TEXT,
    "aboutDescription" TEXT,
    "sitePlanTitle" TEXT,
    "sitePlanImage" TEXT,
    "sitePlanDescription" TEXT,
    "minRatePsf" TEXT,
    "maxRatePsf" TEXT,
    "minUnitArea" INTEGER,
    "maxUnitArea" INTEGER,
    "totalUnits" INTEGER,
    "soldUnits" INTEGER,
    "availableUnits" INTEGER,
    "landArea" TEXT,
    "numberOfTowers" INTEGER,
    "numberOfFloors" INTEGER,
    "numberOfApartments" INTEGER,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "floor" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FloorPlan" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT NOT NULL,
    "details" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FloorPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "docType" "DocType" NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "number" TEXT,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NearbyPoint" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "NearbyType" NOT NULL,
    "name" TEXT NOT NULL,
    "distanceKm" DOUBLE PRECISION,
    "travelTimeMin" INTEGER,

    CONSTRAINT "NearbyPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingTable" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reraArea" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "pricePerSqft" TEXT,
    "availableUnits" INTEGER,
    "floorNumbers" TEXT,
    "features" JSONB,

    CONSTRAINT "PricingTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSeo" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "canonicalUrl" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "twitterCard" TEXT NOT NULL DEFAULT 'summary_large_image',
    "schemaMarkup" JSONB,
    "h1Tag" TEXT,
    "h2Tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featuredImgAlt" TEXT,
    "imageAltMap" JSONB,
    "localHeading" TEXT,
    "localContent" TEXT,
    "longFormTitle" TEXT,
    "longFormContent" TEXT,
    "isIndexable" BOOLEAN NOT NULL DEFAULT true,
    "sitemapPriority" DOUBLE PRECISION NOT NULL DEFAULT 0.8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectClick" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 1,
    "clickDate" TIMESTAMP(3) NOT NULL,
    "lastClickAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientIP" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "timeline" TEXT,
    "projectSlug" TEXT,
    "projectTitle" TEXT,
    "sourcePath" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offering" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Offering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "idx_project_created_at" ON "Project"("createdAt");

-- CreateIndex
CREATE INDEX "idx_project_updated_at" ON "Project"("updatedAt");

-- CreateIndex
CREATE INDEX "idx_project_status" ON "Project"("status");

-- CreateIndex
CREATE INDEX "idx_project_category" ON "Project"("category");

-- CreateIndex
CREATE INDEX "idx_project_status_updated" ON "Project"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "idx_project_trending" ON "Project"("isTrending");

-- CreateIndex
CREATE INDEX "idx_project_price_min" ON "Project"("priceMin");

-- CreateIndex
CREATE INDEX "idx_project_price_max" ON "Project"("priceMax");

-- CreateIndex
CREATE INDEX "idx_project_price_range" ON "Project"("priceMin", "priceMax");

-- CreateIndex
CREATE INDEX "idx_project_city" ON "Project"("city");

-- CreateIndex
CREATE INDEX "Highlight_projectId_idx" ON "Highlight"("projectId");

-- CreateIndex
CREATE INDEX "Amenity_projectId_idx" ON "Amenity"("projectId");

-- CreateIndex
CREATE INDEX "Faq_projectId_idx" ON "Faq"("projectId");

-- CreateIndex
CREATE INDEX "Media_projectId_idx" ON "Media"("projectId");

-- CreateIndex
CREATE INDEX "Media_projectId_type_idx" ON "Media"("projectId", "type");

-- CreateIndex
CREATE INDEX "FloorPlan_projectId_idx" ON "FloorPlan"("projectId");

-- CreateIndex
CREATE INDEX "Document_projectId_idx" ON "Document"("projectId");

-- CreateIndex
CREATE INDEX "NearbyPoint_projectId_idx" ON "NearbyPoint"("projectId");

-- CreateIndex
CREATE INDEX "PricingTable_projectId_idx" ON "PricingTable"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSeo_projectId_key" ON "ProjectSeo"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectClick_projectId_clickDate_key" ON "ProjectClick"("projectId", "clickDate");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_projectSlug_idx" ON "Lead"("projectSlug");

-- CreateIndex
CREATE INDEX "Offering_projectId_idx" ON "Offering"("projectId");

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenity" ADD CONSTRAINT "Amenity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FloorPlan" ADD CONSTRAINT "FloorPlan_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NearbyPoint" ADD CONSTRAINT "NearbyPoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingTable" ADD CONSTRAINT "PricingTable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSeo" ADD CONSTRAINT "ProjectSeo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectClick" ADD CONSTRAINT "ProjectClick_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
