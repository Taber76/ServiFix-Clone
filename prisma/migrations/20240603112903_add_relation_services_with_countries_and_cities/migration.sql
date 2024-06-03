-- AlterTable
ALTER TABLE "services" ADD COLUMN     "city_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "country_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
