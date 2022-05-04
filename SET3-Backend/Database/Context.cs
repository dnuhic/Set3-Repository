using Microsoft.EntityFrameworkCore;
using SET3_Backend.Models;
using System.Diagnostics.CodeAnalysis;

namespace SET3_Backend.Database
{
    public class Context : DbContext
    {
        //Tabele u bazi
        public virtual DbSet<ActionModel> ActionModels { get; set; }
        public virtual DbSet<LoggingModel> LoggingModels { get; set; }
        public virtual DbSet<RoleModel> RoleModels { get; set; }
        public virtual DbSet<SecurityQuestionModel> SecurityQuestionModels { get; set; }
        public virtual DbSet<UserModel> UserModels { get; set; }
        public virtual DbSet<CashRegisterModel> CashRegisterModels { get; set; }
        public virtual DbSet<CategoryModel> CategoryModels { get; set; }
        public virtual DbSet<ProductModel> ProductModels { get; set; }
        public virtual DbSet<ShopModel> ShopModels { get; set; }
        public virtual DbSet<StockModel> StockModels { get; set; }
        public virtual DbSet<OrderModel> OrderModels { get; set; }
        public virtual DbSet<DeliveryModel> DeliveryModels { get; set; }
        public virtual DbSet<ProductShopIntertable> ProductShopIntertables { get; set; }
        public virtual DbSet<UserOrderModel> UserOrderModels { get; set; }
        public virtual DbSet<ProductUserOrderIntertable> ProductUserOrderIntertables { get; set; }
        public virtual DbSet<MeasuringUnit> MeasuringUnits { get; set; }
        public virtual DbSet<TableModel> TableModels { get; set; }
        public virtual DbSet<FiscalBillModel> FiscalBillModels { get; set; }
        public Context([NotNull] DbContextOptions<Context> options) : base(options) {
            var conn = (Microsoft.Data.SqlClient.SqlConnection)Database.GetDbConnection();
        }

        //Ukoliko zelite da se spojite na lokalnu bazu u DependencyInjection.cs morate promijeniti dbConnString u 'Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LokalnaBaza;'
        //i u metodi dole isto, nakon toga pratite komentare u metodi ispod

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //Ovaj dio koda kreira lokalnu bazu







            //var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

            //var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            var dbConnString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LokalnaBaza;";
            optionsBuilder.UseSqlServer(dbConnString);

            // za globalnu konekciju
            //var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            //optionsBuilder.UseSqlServer(dbConnString);
            //

            //Da vidite gdje vam se nalazi baza:
            //View->Sql server object explorer
            //ima baza (localdb)\Set3 StoreDB je ime lokalnaBaza
        }

        //Ukoliko zelite da se spojite na lokalnu bazu u DependencyInjection.cs morate promijeniti dbConnString u 'Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LokalnaBaza;'
        //i u metodi dole isto, nakon toga pratite komentare u metodi ispod




        //Ukoliko zelite da se spojite na lokalnu bazu u DependencyInjection.cs morate promijeniti dbConnString u 'Data Source=(localdb)\ProjectsV13;Initial Catalog=LokalnaBaza;'
        //i u metodi dole isto, nakon toga pratite komentare u metodi ispod

        
    }
}
