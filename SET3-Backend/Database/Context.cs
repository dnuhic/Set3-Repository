
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Models;

namespace SET3_Backend.Database
{
    public class Context : DbContext
    {
        //Tabele u bazi
        public DbSet<ActionModel> ActionModels { get; set; }
        public DbSet<LoggingModel> LoggingModels { get; set; }
        public DbSet<RoleModel> RoleModels { get; set; }
        public DbSet<SecurityQuestionModel> SecurityQuestionModels { get; set; }
        public DbSet<UserModel> UserModels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //Ovaj dio koda kreira lokalnu bazu
            //run the following command in Package Manager Console. (tools->NuGet Package Manager -> Packet manager console)
            //Add-Migration Initial
            //Update-Database
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\ProjectsV13;Initial Catalog=LokalnaBaza;");

            //View->Sql server object explorer
            //ima baza (localdb)\Set3 StoreDB je ime lokalnaBaza
        }
    }
}
