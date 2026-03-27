-- AddColumn
ALTER TABLE "PricingTable" ADD COLUMN "availabilityStatus" TEXT;

-- Backfill data from availableUnits
UPDATE "PricingTable"
SET "availabilityStatus" = CASE
  WHEN "availableUnits" IS NULL THEN NULL
  WHEN "availableUnits" > 0 THEN 'available'
  ELSE 'not-available'
END;

-- DropColumn
ALTER TABLE "PricingTable" DROP COLUMN "availableUnits";
