CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

BEGIN TRANSACTION;

CREATE TABLE "ActionModels" (
    "id" INTEGER NOT NULL CONSTRAINT "PK_ActionModels" PRIMARY KEY AUTOINCREMENT,
    "actionType" INTEGER NOT NULL
);

CREATE TABLE "BrRac" (
    "IdRac" TEXT NOT NULL CONSTRAINT "PK_BrRac" PRIMARY KEY,
    "BrOznRac" TEXT NOT NULL,
    "OznPosPr" TEXT NOT NULL,
    "OznNapUr" TEXT NOT NULL
);

CREATE TABLE "CashRegisterModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_CashRegisterModels" PRIMARY KEY AUTOINCREMENT,
    "ShopId" INTEGER NOT NULL,
    "Deleted" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Installed" INTEGER NOT NULL
);

CREATE TABLE "CategoryModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_CategoryModels" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Tax" REAL NOT NULL
);

CREATE TABLE "DeliveryModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_DeliveryModels" PRIMARY KEY AUTOINCREMENT,
    "Date" TEXT NOT NULL,
    "Quantity" REAL NOT NULL,
    "ProductId" INTEGER NOT NULL
);

CREATE TABLE "ExportShopModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_ExportShopModels" PRIMARY KEY AUTOINCREMENT,
    "ShopId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "Quantity" REAL NOT NULL,
    "DateTime" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "CashRegisterId" INTEGER NOT NULL,
    "TableId" INTEGER NOT NULL
);

CREATE TABLE "MeasuringUnits" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_MeasuringUnits" PRIMARY KEY AUTOINCREMENT,
    "MeasuringUnitName" TEXT NOT NULL
);

CREATE TABLE "OrderModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_OrderModels" PRIMARY KEY AUTOINCREMENT,
    "ShopId" INTEGER NOT NULL,
    "Date" TEXT NOT NULL,
    "Quantity" REAL NOT NULL,
    "ProductId" INTEGER NOT NULL
);

CREATE TABLE "ProductModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_ProductModels" PRIMARY KEY AUTOINCREMENT,
    "StockId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Deleted" INTEGER NOT NULL,
    "Quantity" REAL NOT NULL,
    "Barcode" TEXT NOT NULL,
    "BarcodeText" TEXT NOT NULL,
    "Price" REAL NOT NULL,
    "MeasuringUnit" TEXT NOT NULL
);

CREATE TABLE "ProductShopIntertables" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_ProductShopIntertables" PRIMARY KEY AUTOINCREMENT,
    "ShopId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "Quantity" REAL NOT NULL
);

CREATE TABLE "ProductUserOrderIntertables" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_ProductUserOrderIntertables" PRIMARY KEY AUTOINCREMENT,
    "UserOrderId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "Quantity" REAL NOT NULL
);

CREATE TABLE "RoleModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_RoleModels" PRIMARY KEY AUTOINCREMENT,
    "RoleName" TEXT NOT NULL,
    "ReadAccess" INTEGER NOT NULL,
    "WriteAccess" INTEGER NOT NULL,
    "DeleteAccess" INTEGER NOT NULL
);

CREATE TABLE "SecurityQuestionModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_SecurityQuestionModels" PRIMARY KEY AUTOINCREMENT,
    "Question" TEXT NOT NULL
);

CREATE TABLE "ShopModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_ShopModels" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Adress" TEXT NOT NULL,
    "StockId" INTEGER NOT NULL,
    "Deleted" INTEGER NOT NULL,
    "ReceiptType" TEXT NOT NULL
);

CREATE TABLE "StockModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_StockModels" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL
);

CREATE TABLE "TableModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_TableModels" PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "ShopId" INTEGER NOT NULL,
    "Taken" INTEGER NOT NULL
);

CREATE TABLE "UserModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_UserModels" PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "QuestionId" INTEGER NOT NULL,
    "Answer" TEXT NOT NULL,
    "Deleted" INTEGER NOT NULL,
    "RoleName" TEXT NOT NULL,
    "TFA" TEXT NOT NULL
);

CREATE TABLE "UserOrderModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_UserOrderModels" PRIMARY KEY AUTOINCREMENT,
    "UpdatedDate" TEXT NOT NULL,
    "Done" INTEGER NOT NULL,
    "ShopId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "CashRegisterId" INTEGER NOT NULL,
    "TableId" INTEGER NOT NULL
);

CREATE TABLE "Zaglavlje" (
    "IdZag" TEXT NOT NULL CONSTRAINT "PK_Zaglavlje" PRIMARY KEY,
    "IdPoruke" TEXT NOT NULL,
    "DatumVrijeme" TEXT NOT NULL
);

CREATE TABLE "Racun" (
    "IdRacun" TEXT NOT NULL CONSTRAINT "PK_Racun" PRIMARY KEY,
    "OIB" TEXT NOT NULL,
    "USustPdv" INTEGER NULL,
    "DatVrijeme" TEXT NOT NULL,
    "OznSlijed" TEXT NOT NULL,
    "brojRacunaIdRac" TEXT NOT NULL,
    "IznosUkupno" REAL NOT NULL,
    "NacinPlac" TEXT NOT NULL,
    "OibOper" TEXT NOT NULL,
    "ZastKod" TEXT NOT NULL,
    CONSTRAINT "FK_Racun_BrRac_brojRacunaIdRac" FOREIGN KEY ("brojRacunaIdRac") REFERENCES "BrRac" ("IdRac") ON DELETE CASCADE
);

CREATE TABLE "LoggingModels" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_LoggingModels" PRIMARY KEY AUTOINCREMENT,
    "Date" TEXT NOT NULL,
    "UserModelId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ActionId" INTEGER NOT NULL,
    CONSTRAINT "FK_LoggingModels_ActionModels_ActionId" FOREIGN KEY ("ActionId") REFERENCES "ActionModels" ("id") ON DELETE CASCADE,
    CONSTRAINT "FK_LoggingModels_UserModels_UserModelId" FOREIGN KEY ("UserModelId") REFERENCES "UserModels" ("Id") ON DELETE CASCADE
);

CREATE TABLE "FiscalBillModels" (
    "IdFiscal" TEXT NOT NULL CONSTRAINT "PK_FiscalBillModels" PRIMARY KEY,
    "ZaglavljeIdZag" TEXT NOT NULL,
    "RacunIdRacun" TEXT NOT NULL,
    "JIR" TEXT NOT NULL,
    CONSTRAINT "FK_FiscalBillModels_Racun_RacunIdRacun" FOREIGN KEY ("RacunIdRacun") REFERENCES "Racun" ("IdRacun") ON DELETE CASCADE,
    CONSTRAINT "FK_FiscalBillModels_Zaglavlje_ZaglavljeIdZag" FOREIGN KEY ("ZaglavljeIdZag") REFERENCES "Zaglavlje" ("IdZag") ON DELETE CASCADE
);

CREATE TABLE "Porez" (
    "IdPorez" TEXT NOT NULL CONSTRAINT "PK_Porez" PRIMARY KEY,
    "Stopa" REAL NOT NULL,
    "Osnovica" REAL NOT NULL,
    "Iznos" REAL NOT NULL,
    "RacunIdRacun" TEXT NULL,
    CONSTRAINT "FK_Porez_Racun_RacunIdRacun" FOREIGN KEY ("RacunIdRacun") REFERENCES "Racun" ("IdRacun")
);

CREATE INDEX "IX_FiscalBillModels_RacunIdRacun" ON "FiscalBillModels" ("RacunIdRacun");

CREATE INDEX "IX_FiscalBillModels_ZaglavljeIdZag" ON "FiscalBillModels" ("ZaglavljeIdZag");

CREATE INDEX "IX_LoggingModels_ActionId" ON "LoggingModels" ("ActionId");

CREATE INDEX "IX_LoggingModels_UserModelId" ON "LoggingModels" ("UserModelId");

CREATE INDEX "IX_Porez_RacunIdRacun" ON "Porez" ("RacunIdRacun");

CREATE INDEX "IX_Racun_brojRacunaIdRac" ON "Racun" ("brojRacunaIdRac");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20220527232524_initial', '6.0.4');

INSERT INTO "CategoryModels" VALUES (1, "Food", 0.17);

INSERT INTO "CategoryModels" VALUES (2, "Hygiene", 0.17);

INSERT INTO "CategoryModels" VALUES (3, "Clothes", 0.17);

INSERT INTO "MeasuringUnits" VALUES (1, "Units");

INSERT INTO "MeasuringUnits" VALUES (2, "Grams");

INSERT INTO "MeasuringUnits" VALUES (3, "Kilograms");

INSERT INTO "MeasuringUnits" VALUES (4, "Milliliters");

INSERT INTO "MeasuringUnits" VALUES (5, "Liters");

INSERT INTO "MeasuringUnits" VALUES (6, "Jars");

INSERT INTO "RoleModels" VALUES (1, "User", 1, 0, 0);

INSERT INTO "RoleModels" VALUES (2, "Admin", 1, 1, 1);

INSERT INTO "RoleModels" VALUES (3, "ShopAdmin", 1, 1, 1);

INSERT INTO "RoleModels" VALUES (4, "StockAdmin", 1, 1, 1);

INSERT INTO "SecurityQuestionModels" VALUES (1, "What is your favourite animal?");

INSERT INTO "SecurityQuestionModels" VALUES (2, "What is your favourite color?");

INSERT INTO "StockModels" VALUES (1, "Warehouse");

COMMIT;
