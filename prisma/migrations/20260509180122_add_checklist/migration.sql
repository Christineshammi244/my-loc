/*
  Warnings:

  - You are about to drop the column `otherPartyPhone` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "otherPartyName" TEXT,
    "otherPartyAddress" TEXT,
    "userId" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "isIdentityVerified" BOOLEAN NOT NULL DEFAULT false,
    "isTitleDeedValid" BOOLEAN NOT NULL DEFAULT false,
    "isPriceMatched" BOOLEAN NOT NULL DEFAULT false,
    "isSigned" BOOLEAN NOT NULL DEFAULT false,
    "isContractReviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "createdAt", "id", "otherPartyAddress", "otherPartyName", "propertyId", "reference", "status", "type", "updatedAt", "userId") SELECT "amount", "createdAt", "id", "otherPartyAddress", "otherPartyName", "propertyId", "reference", "status", "type", "updatedAt", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_reference_key" ON "Transaction"("reference");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
