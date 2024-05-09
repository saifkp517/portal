-- CreateTable
CREATE TABLE "property" (
    "id" TEXT NOT NULL,
    "building_name" TEXT NOT NULL,
    "asset_type" TEXT NOT NULL,
    "investment_size" TEXT NOT NULL,
    "lockin" TEXT NOT NULL,
    "entry_yeild" INTEGER NOT NULL,
    "irr" DOUBLE PRECISION NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "minimum_investment" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "tenant" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "floorplan" JSONB NOT NULL,
    "tenant_details" JSONB NOT NULL,
    "images" TEXT[],
    "tables" JSONB NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
