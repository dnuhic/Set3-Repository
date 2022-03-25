using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;

namespace SET3_Backend
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBackendServices(this IServiceCollection services)
        {
            services.AddDbContext<Context>(options =>
            {
                //Treba dodati connection string na bazu umjesto 'dbConnString'
                var dbConnString = @"Data Source=(localdb)\ProjectsV13;Initial Catalog=LokalnaBaza;";
                options.UseSqlServer(dbConnString,
                    dboContextOptions => dboContextOptions.EnableRetryOnFailure(2));
            });

            //Ovdje se dodaju servisi za dependency injection

            return services;
        }
    }
}
