ALTER TABLE "Project"
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

UPDATE "Project"
SET "isActive" = true
WHERE "isActive" IS DISTINCT FROM true;

CREATE INDEX "idx_project_is_active" ON "Project"("isActive");
