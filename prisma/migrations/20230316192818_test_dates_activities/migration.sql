/*
  Warnings:

  - You are about to drop the `Activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activities" DROP CONSTRAINT "Activities_dateId_fkey";

-- DropForeignKey
ALTER TABLE "ChosenActivities" DROP CONSTRAINT "ChosenActivities_activitesId_fkey";

-- DropTable
DROP TABLE "Activities";

-- DropTable
DROP TABLE "Dates";

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "dateId" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activities_dateId_idx" ON "activities"("dateId");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "dates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChosenActivities" ADD CONSTRAINT "ChosenActivities_activitesId_fkey" FOREIGN KEY ("activitesId") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
