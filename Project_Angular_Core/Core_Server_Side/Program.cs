using Core_Server_Side.HostedService;
using Core_Server_Side.Models;
using Core_Server_Side.Repositories;
using Core_Server_Side.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<BookSellerDbContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("db")));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddHostedService<DbSeederHostedService>();
builder.Services.AddCors(p => p.AddPolicy("EnableCors", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddControllers()
     .AddNewtonsoftJson(option => {
         option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
         option.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
     });
var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseCors("EnableCors");

app.MapControllers();

app.Run();