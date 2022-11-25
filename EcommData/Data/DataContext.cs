using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommEntity.Data;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
    public DbSet<TypeProduct> TypeProducts { get; set; }
    public DbSet<Product> Products { get; set; }
}
