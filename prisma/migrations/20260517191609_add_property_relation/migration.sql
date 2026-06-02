-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VerificationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "rejectedReason" TEXT,
    "idType" TEXT NOT NULL,
    "idNumber" TEXT,
    "frontImage" TEXT NOT NULL,
    "backImage" TEXT NOT NULL,
    "propertyId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VerificationRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_VerificationRequest" ("adminNotes", "backImage", "createdAt", "frontImage", "id", "idNumber", "idType", "status", "updatedAt", "userId") SELECT "adminNotes", "backImage", "createdAt", "frontImage", "id", "idNumber", "idType", "status", "updatedAt", "userId" FROM "VerificationRequest";
DROP TABLE "VerificationRequest";
ALTER TABLE "new_VerificationRequest" RENAME TO "VerificationRequest";
CREATE UNIQUE INDEX "VerificationRequest_userId_key" ON "VerificationRequest"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
