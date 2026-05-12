-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "area" REAL DEFAULT 0,
    "bedrooms" INTEGER NOT NULL DEFAULT 0,
    "bathrooms" INTEGER NOT NULL DEFAULT 0,
    "floor" TEXT NOT NULL DEFAULT 'الطابق',
    "city" TEXT NOT NULL DEFAULT 'المدينة المحلية',
    "region" TEXT NOT NULL DEFAULT 'المنطقة المحلية',
    CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("area", "bathrooms", "bedrooms", "category", "createdAt", "description", "floor", "id", "location", "ownerId", "price", "status", "title", "type") SELECT "area", coalesce("bathrooms", 0) AS "bathrooms", coalesce("bedrooms", 0) AS "bedrooms", "category", "createdAt", "description", coalesce("floor", 'الطابق') AS "floor", "id", "location", "ownerId", "price", "status", "title", "type" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
