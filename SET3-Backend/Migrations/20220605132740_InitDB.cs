using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SET3_Backend.Migrations
{
    public partial class InitDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActionModels",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    actionType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionModels", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "BrRac",
                columns: table => new
                {
                    IdRac = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BrOznRac = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OznPosPr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OznNapUr = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrRac", x => x.IdRac);
                });

            migrationBuilder.CreateTable(
                name: "CashRegisterModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Installed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashRegisterModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoryModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tax = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExportShopModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CashRegisterId = table.Column<int>(type: "int", nullable: false),
                    TableId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExportShopModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MeasuringUnits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeasuringUnitName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeasuringUnits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StockId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    Barcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BarcodeText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    MeasuringUnit = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductShopIntertables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductShopIntertables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductUserOrderIntertables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserOrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductUserOrderIntertables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReadAccess = table.Column<bool>(type: "bit", nullable: false),
                    WriteAccess = table.Column<bool>(type: "bit", nullable: false),
                    DeleteAccess = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SecurityQuestionModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecurityQuestionModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShopModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StockId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    ReceiptType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StockModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TableModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    Taken = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TableModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TFA = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserOrderModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Done = table.Column<bool>(type: "bit", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CashRegisterId = table.Column<int>(type: "int", nullable: false),
                    TableId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOrderModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zaglavlje",
                columns: table => new
                {
                    IdZag = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdPoruke = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumVrijeme = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaglavlje", x => x.IdZag);
                });

            migrationBuilder.CreateTable(
                name: "Racun",
                columns: table => new
                {
                    IdRacun = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OIB = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    USustPdv = table.Column<bool>(type: "bit", nullable: true),
                    DatVrijeme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OznSlijed = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    brojRacunaIdRac = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IznosUkupno = table.Column<double>(type: "float", nullable: false),
                    NacinPlac = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OibOper = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZastKod = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Racun", x => x.IdRacun);
                    table.ForeignKey(
                        name: "FK_Racun_BrRac_brojRacunaIdRac",
                        column: x => x.brojRacunaIdRac,
                        principalTable: "BrRac",
                        principalColumn: "IdRac",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LoggingModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserModelId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ActionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoggingModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoggingModels_ActionModels_ActionId",
                        column: x => x.ActionId,
                        principalTable: "ActionModels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LoggingModels_UserModels_UserModelId",
                        column: x => x.UserModelId,
                        principalTable: "UserModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FiscalBillModels",
                columns: table => new
                {
                    IdFiscal = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ZaglavljeIdZag = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RacunIdRacun = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    JIR = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FiscalBillModels", x => x.IdFiscal);
                    table.ForeignKey(
                        name: "FK_FiscalBillModels_Racun_RacunIdRacun",
                        column: x => x.RacunIdRacun,
                        principalTable: "Racun",
                        principalColumn: "IdRacun",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FiscalBillModels_Zaglavlje_ZaglavljeIdZag",
                        column: x => x.ZaglavljeIdZag,
                        principalTable: "Zaglavlje",
                        principalColumn: "IdZag",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Porez",
                columns: table => new
                {
                    IdPorez = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Stopa = table.Column<double>(type: "float", nullable: false),
                    Osnovica = table.Column<double>(type: "float", nullable: false),
                    Iznos = table.Column<double>(type: "float", nullable: false),
                    RacunIdRacun = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Porez", x => x.IdPorez);
                    table.ForeignKey(
                        name: "FK_Porez_Racun_RacunIdRacun",
                        column: x => x.RacunIdRacun,
                        principalTable: "Racun",
                        principalColumn: "IdRacun");
                });

            migrationBuilder.InsertData(
                table: "CashRegisterModels",
                columns: new[] { "Id", "Deleted", "Description", "Installed", "Name", "ShopId" },
                values: new object[,]
                {
                    { 1, false, "Description", false, "Register 1", 1 },
                    { 2, false, "Description", false, "Register 2", 1 },
                    { 3, false, "Description", false, "Register 3", 1 },
                    { 4, false, "Description", false, "Register 4", 1 },
                    { 5, false, "Description", false, "Register 5", 1 },
                    { 6, false, "Description", false, "Register 1", 2 },
                    { 7, false, "Description", false, "Register 2", 2 },
                    { 8, false, "Description", false, "Register 3", 2 },
                    { 9, false, "Description", false, "Register 4", 2 }
                });

            migrationBuilder.InsertData(
                table: "CategoryModels",
                columns: new[] { "Id", "Name", "Tax" },
                values: new object[,]
                {
                    { 1, "Food", 0.17000000000000001 },
                    { 2, "Hygiene", 0.17000000000000001 },
                    { 3, "Clothes", 0.17000000000000001 }
                });

            migrationBuilder.InsertData(
                table: "MeasuringUnits",
                columns: new[] { "Id", "MeasuringUnitName" },
                values: new object[,]
                {
                    { 1, "Units" },
                    { 2, "Grams" },
                    { 3, "Kilograms" },
                    { 4, "Milliliters" },
                    { 5, "Liters" },
                    { 6, "Jars" }
                });

            migrationBuilder.InsertData(
                table: "ProductModels",
                columns: new[] { "Id", "Barcode", "BarcodeText", "CategoryName", "Deleted", "MeasuringUnit", "Name", "Price", "Quantity", "StockId" },
                values: new object[,]
                {
                    { 1, "", "", "Food", false, "Kilograms", "Banana", 2.5f, 0.0, 1 },
                    { 2, "", "", "Hygiene", false, "Liters", "Tide", 5f, 0.0, 1 },
                    { 3, "", "", "Clothes", false, "Units", "White shirt", 15f, 0.0, 1 },
                    { 4, "", "", "Food", false, "Units", "Chocolate", 2f, 0.0, 1 },
                    { 5, "", "", "Hygiene", false, "Units", "Soap", 3f, 0.0, 1 }
                });

            migrationBuilder.InsertData(
                table: "RoleModels",
                columns: new[] { "Id", "DeleteAccess", "ReadAccess", "RoleName", "WriteAccess" },
                values: new object[,]
                {
                    { 1, false, true, "User", false },
                    { 2, true, true, "Admin", true },
                    { 3, true, true, "ShopAdmin", true },
                    { 4, true, true, "StockAdmin", true }
                });

            migrationBuilder.InsertData(
                table: "SecurityQuestionModels",
                columns: new[] { "Id", "Question" },
                values: new object[,]
                {
                    { 1, "What is your favourite animal?" },
                    { 2, "What is your favourite color?" },
                    { 3, "What is your mothers name?" },
                    { 4, "What is your dream destination?" },
                    { 5, "What is your dream car?" }
                });

            migrationBuilder.InsertData(
                table: "ShopModels",
                columns: new[] { "Id", "Adress", "Deleted", "Name", "ReceiptType", "StockId" },
                values: new object[,]
                {
                    { 1, "Dzemala Bijedica St 160 71000 Sarajevo ", false, "Bingo", "Bosanski", 1 },
                    { 2, "Hercegovacka ul. 78 21000 Split Croatia", false, "Konzum", "Hrvatski", 1 }
                });

            migrationBuilder.InsertData(
                table: "StockModels",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Warehouse" });

            migrationBuilder.InsertData(
                table: "TableModels",
                columns: new[] { "Id", "Name", "ShopId", "Taken" },
                values: new object[,]
                {
                    { 1, "Unit 1", 1, false },
                    { 2, "Unit 2", 1, false },
                    { 3, "Unit 3", 1, false },
                    { 4, "Unit 4", 1, false },
                    { 5, "Unit 5", 1, false },
                    { 6, "Unit 1", 2, false },
                    { 7, "Unit 2", 2, false }
                });

            migrationBuilder.InsertData(
                table: "TableModels",
                columns: new[] { "Id", "Name", "ShopId", "Taken" },
                values: new object[,]
                {
                    { 8, "Unit 3", 2, false },
                    { 9, "Unit 4", 2, false }
                });

            migrationBuilder.InsertData(
                table: "UserModels",
                columns: new[] { "Id", "Answer", "Deleted", "Email", "FirstName", "LastName", "Password", "QuestionId", "RoleName", "TFA" },
                values: new object[,]
                {
                    { 1, "Odgovor", false, "admin@gmail.com", "Admin", "Admin", "^?H??(qQ??o??)'s`=\rj???*?rB?", 1, "Admin", "" },
                    { 2, "Odgovor", false, "shopAdmin@gmail.com", "Shop", "Admin", "^?H??(qQ??o??)'s`=\rj???*?rB?", 1, "ShopAdmin", "" },
                    { 3, "Odgovor", false, "stockAdmin@gmail.com", "Stock", "Admin", "^?H??(qQ??o??)'s`=\rj???*?rB?", 1, "StockAdmin", "" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_FiscalBillModels_RacunIdRacun",
                table: "FiscalBillModels",
                column: "RacunIdRacun");

            migrationBuilder.CreateIndex(
                name: "IX_FiscalBillModels_ZaglavljeIdZag",
                table: "FiscalBillModels",
                column: "ZaglavljeIdZag");

            migrationBuilder.CreateIndex(
                name: "IX_LoggingModels_ActionId",
                table: "LoggingModels",
                column: "ActionId");

            migrationBuilder.CreateIndex(
                name: "IX_LoggingModels_UserModelId",
                table: "LoggingModels",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Porez_RacunIdRacun",
                table: "Porez",
                column: "RacunIdRacun");

            migrationBuilder.CreateIndex(
                name: "IX_Racun_brojRacunaIdRac",
                table: "Racun",
                column: "brojRacunaIdRac");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CashRegisterModels");

            migrationBuilder.DropTable(
                name: "CategoryModels");

            migrationBuilder.DropTable(
                name: "DeliveryModels");

            migrationBuilder.DropTable(
                name: "ExportShopModels");

            migrationBuilder.DropTable(
                name: "FiscalBillModels");

            migrationBuilder.DropTable(
                name: "LoggingModels");

            migrationBuilder.DropTable(
                name: "MeasuringUnits");

            migrationBuilder.DropTable(
                name: "OrderModels");

            migrationBuilder.DropTable(
                name: "Porez");

            migrationBuilder.DropTable(
                name: "ProductModels");

            migrationBuilder.DropTable(
                name: "ProductShopIntertables");

            migrationBuilder.DropTable(
                name: "ProductUserOrderIntertables");

            migrationBuilder.DropTable(
                name: "RoleModels");

            migrationBuilder.DropTable(
                name: "SecurityQuestionModels");

            migrationBuilder.DropTable(
                name: "ShopModels");

            migrationBuilder.DropTable(
                name: "StockModels");

            migrationBuilder.DropTable(
                name: "TableModels");

            migrationBuilder.DropTable(
                name: "UserOrderModels");

            migrationBuilder.DropTable(
                name: "Zaglavlje");

            migrationBuilder.DropTable(
                name: "ActionModels");

            migrationBuilder.DropTable(
                name: "UserModels");

            migrationBuilder.DropTable(
                name: "Racun");

            migrationBuilder.DropTable(
                name: "BrRac");
        }
    }
}
