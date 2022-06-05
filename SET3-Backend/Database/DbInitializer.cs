using Microsoft.EntityFrameworkCore;
using SET3_Backend.Models;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SET3_Backend.Database
{
    public class DbInitializer{
    private readonly ModelBuilder modelBuilder;

    public DbInitializer(ModelBuilder modelBuilder)
    {
        this.modelBuilder = modelBuilder;
    }

    public void Seed()
    {
        modelBuilder.Entity<RoleModel>().HasData(
                new RoleModel(1,RoleType.User.ToString(), true, false, false),
                new RoleModel(2,RoleType.Admin.ToString(), true, true, true),
                new RoleModel(3,RoleType.ShopAdmin.ToString(), true, true, true),
                new RoleModel(4,RoleType.StockAdmin.ToString(), true, true, true)
        );

        modelBuilder.Entity<SecurityQuestionModel>().HasData(
             new SecurityQuestionModel(1,"What is your favourite animal?"),
                 new SecurityQuestionModel(2,"What is your favourite color?") ,
                 new SecurityQuestionModel(3,"What is your mothers name?") ,
                 new SecurityQuestionModel(4,"What is your dream destination?") ,
                 new SecurityQuestionModel(5,"What is your dream car?") 
        );
        modelBuilder.Entity<CategoryModel>().HasData(
                 new CategoryModel(1,CategoryType.Food.ToString(), 0.17),
                 new CategoryModel(2,CategoryType.Hygiene.ToString(), 0.17),
                 new CategoryModel(3,CategoryType.Clothes.ToString(), 0.17)
        );
        modelBuilder.Entity<StockModel>().HasData(
            new StockModel(1,"Warehouse")
        );
        modelBuilder.Entity<MeasuringUnit>().HasData(
new MeasuringUnit(1,MeasuringUnitName.Units.ToString()),
new MeasuringUnit(2,MeasuringUnitName.Grams.ToString()),
new MeasuringUnit(3,MeasuringUnitName.Kilograms.ToString()),
new MeasuringUnit(4,MeasuringUnitName.Milliliters.ToString()),
new MeasuringUnit(5,MeasuringUnitName.Liters.ToString()),
new MeasuringUnit(6,MeasuringUnitName.Jars.ToString())
        );
        modelBuilder.Entity<ShopModel>().HasData(
            new ShopModel(1,"Bingo", "Dzemala Bijedica St 160 71000 Sarajevo ", 1, false, "Bosanski"),
            new ShopModel(2,"Konzum", "Hercegovacka ul. 78 21000 Split Croatia", 1, false, "Hrvatski")
        );
        
        modelBuilder.Entity<CashRegisterModel>().HasData(
new CashRegisterModel(1,1, false, "Register 1", "Description", false),
new CashRegisterModel(2,1, false, "Register 2", "Description", false),
 new CashRegisterModel(3,1, false, "Register 3", "Description", false),
new CashRegisterModel(4,1, false, "Register 4", "Description", false),
new CashRegisterModel(5,1, false, "Register 5", "Description", false),
new CashRegisterModel(6,2, false, "Register 1", "Description", false),
new CashRegisterModel(7,2, false, "Register 2", "Description", false),
  new CashRegisterModel(8,2, false, "Register 3", "Description", false),
new CashRegisterModel(9,2, false, "Register 4", "Description", false)
        );
        modelBuilder.Entity<TableModel>().HasData(
new TableModel(1,"Unit 1", 1, false),
new TableModel(2,"Unit 2", 1, false),
new TableModel(3,"Unit 3", 1, false),
new TableModel(4,"Unit 4", 1, false),
new TableModel(5,"Unit 5", 1, false),
new TableModel(6,"Unit 1", 2, false),
new TableModel(7,"Unit 2", 2, false),
new TableModel(8,"Unit 3", 2, false),
new TableModel(9,"Unit 4", 2, false)
        );
        modelBuilder.Entity<ProductModel>().HasData(
new ProductModel(1,1, "Banana", CategoryType.Food.ToString(), false, 0, "", "", 2.5f, MeasuringUnitName.Kilograms.ToString()),
new ProductModel(2,1, "Tide", CategoryType.Hygiene.ToString(), false, 0, "", "", 5f, MeasuringUnitName.Liters.ToString()),
new ProductModel(3,1, "White shirt", CategoryType.Clothes.ToString(), false, 0, "", "", 15f, MeasuringUnitName.Units.ToString()),
new ProductModel(4,1, "Chocolate", CategoryType.Food.ToString(), false, 0, "", "", 2f, MeasuringUnitName.Units.ToString()),
                new ProductModel(5,1, "Soap", CategoryType.Hygiene.ToString(), false, 0, "", "", 3f, MeasuringUnitName.Units.ToString())
        );
                var sha = SHA256.Create();
                var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("password")));


        modelBuilder.Entity<UserModel>().HasData(
new UserModel(1,"admin@gmail.com", "Admin", "Admin", passwordHash, 1, "Odgovor", false, RoleType.Admin.ToString(), ""),
new UserModel(2,"shopAdmin@gmail.com", "Shop", "Admin", passwordHash, 1, "Odgovor", false, RoleType.ShopAdmin.ToString(), ""),
new UserModel(3,"stockAdmin@gmail.com", "Stock", "Admin", passwordHash, 1, "Odgovor", false, RoleType.StockAdmin.ToString(), "")
        );
    }
}
}