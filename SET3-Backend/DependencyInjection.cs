using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Settings;
using SET3_Backend.Services;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

namespace SET3_Backend
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddBackendServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<Context>(options =>
            {
                //Treba dodati connection string na bazu umjesto 'dbConnString'
                //var dbConnString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=LokalnaBaza;";
                var dbConnString = "Server=set3.database.windows.net;Initial Catalog=Set3Baza;Persist Security Info=False;User ID=set3admin;Password=prir0da#aj;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
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
                    .WithOrigins("https://localhost:3000", "https://si-set3.herokuapp.com/");
                }));

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            services.AddTransient<IMailService, Services.MailService>();
            //Ovdje se dodaju servisi za dependency injection
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();

            });
            return services;
        }
    }
}
