CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TYPE "Role" AS ENUM ('CUSTOMER','ADMIN');
CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED','CANCELLED');
CREATE TABLE "User" ("id" TEXT PRIMARY KEY,"email" TEXT NOT NULL UNIQUE,"passwordHash" TEXT NOT NULL,"role" "Role" NOT NULL DEFAULT 'CUSTOMER');
CREATE TABLE "Service" ("id" TEXT PRIMARY KEY,"name" TEXT NOT NULL,"durationMin" INTEGER NOT NULL CHECK ("durationMin" > 0),"isActive" BOOLEAN NOT NULL DEFAULT true);
CREATE TABLE "BusinessHour" ("id" TEXT PRIMARY KEY,"serviceId" TEXT NOT NULL REFERENCES "Service"("id"),"weekday" INTEGER NOT NULL CHECK ("weekday" BETWEEN 0 AND 6),"openMin" INTEGER NOT NULL,"closeMin" INTEGER NOT NULL,CHECK ("openMin" < "closeMin"),UNIQUE ("serviceId","weekday"));
CREATE TABLE "Booking" ("id" TEXT PRIMARY KEY,"userId" TEXT NOT NULL REFERENCES "User"("id"),"serviceId" TEXT NOT NULL REFERENCES "Service"("id"),
 "startsAt" TIMESTAMPTZ(3) NOT NULL,"endsAt" TIMESTAMPTZ(3) NOT NULL,"status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',"createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
 CHECK ("startsAt" < "endsAt"));
CREATE INDEX "Booking_userId_startsAt_idx" ON "Booking"("userId","startsAt");
CREATE INDEX "Booking_serviceId_startsAt_idx" ON "Booking"("serviceId","startsAt");
ALTER TABLE "Booking" ADD CONSTRAINT booking_no_overlap
 EXCLUDE USING gist ("serviceId" WITH =, tstzrange("startsAt","endsAt",'[)') WITH &&) WHERE ("status" = 'CONFIRMED');
