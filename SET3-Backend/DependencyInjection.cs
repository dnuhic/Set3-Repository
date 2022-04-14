using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Settings;
using SET3_Backend.Services;

namespace SET3_Backend
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddBackendServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<Context>(options =>
            {
                //Treba dodati connection string na bazu umjesto 'dbConnString'
                //var dbConnString = @"Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
                var dbConnString = @"Data Source=(localdb)\ProjectsV13;Initial Catalog=LokalnaBaza;";
                options.UseSqlServer(dbConnString,
                    dboContextOptions => dboContextOptions.EnableRetryOnFailure(2));
            });

            services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins(new string[] { "https://localhost:3000" , "https://set3front.azurewebsites.net"});
                }));

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            services.AddTransient<IMailService, Services.MailService>();
            //Ovdje se dodaju servisi za dependency injection

            return services;
        }
    }
}
