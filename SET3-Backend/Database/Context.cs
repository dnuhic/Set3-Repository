
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

        public Context([NotNull] DbContextOptions<Context> options) : base(options) {
            var conn = (Microsoft.Data.SqlClient.SqlConnection)Database.GetDbConnection();

            if (!conn.DataSource.Contains("localdb", StringComparison.OrdinalIgnoreCase))
            { 
                //conn.AccessToken = new Microsoft.Azure.Services.AppAuthentication.AzureServiceTokenProvider().GetAccessTokenAsync("https://database.windows.net/").Result;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            //Ovdje idu relacije u bazi
        }

        //Ukoliko zelite da se spojite na lokalnu bazu u DependencyInjection.cs morate promijeniti dbConnString u 'Data Source=(localdb)\ProjectsV13;Initial Catalog=LokalnaBaza;'
        //i u metodi dole isto, nakon toga pratite komentare u metodi ispod

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //Ovaj dio koda kreira lokalnu bazu
            //run the following command in Package Manager Console. (tools->NuGet Package Manager -> Packet manager console)
            //Add-Migration Initial
            //Update-Database
            var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            optionsBuilder.UseSqlServer(dbConnString);

            //Da vidite gdje vam se nalazi baza:
            //View->Sql server object explorer
            //ima baza (localdb)\Set3 StoreDB je ime lokalnaBaza
        }
    }
}
