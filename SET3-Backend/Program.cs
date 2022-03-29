using Microsoft.AspNetCore.HttpOverrides;
using Serilog;
using SET3_Backend;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

// Add services to the container.

builder.Logging.ClearProviders();
builder.Logging.AddSerilog();

builder.Services.AddControllers();
//Load dependency injection
builder.Services.AddBackendServices();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
