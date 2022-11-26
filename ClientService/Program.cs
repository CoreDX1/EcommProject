using EcommData.Data;
using ClientService.Interface;
using ClientService.Services;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string _Mycors = "Mycors";

builder.Services.AddCors(options =>
        {
            options.AddPolicy(
                    name: _Mycors,
                    builder =>
                    {
                        builder
                            .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                    }
                    );
        });

builder.Services.AddScoped<IProduct<Category>, Products>();
builder.Services.AddScoped<ISubCategory<SubCategory>, Subcategory>();

builder.Services.AddDbContext<DataContext>(
        opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQLConnection"))
        );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(_Mycors);


app.UseAuthorization();

app.MapControllers();

app.Run();
