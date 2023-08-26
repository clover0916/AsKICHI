/*
  Warnings:

  - Added the required column `floor` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "crowded" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Events" ("createdAt", "crowded", "host", "id", "place", "title", "updatedAt") SELECT "createdAt", "crowded", "host", "id", "place", "title", "updatedAt" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
CREATE UNIQUE INDEX "Events_id_key" ON "Events"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
