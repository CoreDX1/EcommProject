using EcommData.Data;
using ClientService.Interface;
using ClientService.Services;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters{
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
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

builder.Services.AddScoped<ICategory<Category>, CategorySer>();
builder.Services.AddScoped<ISubCategory<SubCategory>, Subcategory>();
builder.Services.AddScoped<ITypeProduct<TypeProduct>, TypeProductSer>();
builder.Services.AddScoped<IProduct<Product>, ProductSer>();
builder.Services.AddScoped<IMenuDinamic, MenuDinamic>();
builder.Services.AddScoped<IUsuario<Usuario>, UsuarioSer>();

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
app.UseAuthentication();
app.UseCors(_Mycors);

app.UseAuthorization();

app.MapControllers();

app.Run();
