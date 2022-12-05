using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommData.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
    public DbSet<TypeProduct> TypeProducts { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Category>(entity =>
        {
            entity.ToTable("category").HasKey(c => c.id_category);
        });

        builder.Entity<SubCategory>(entity =>
        {
            entity.ToTable("subcategory").HasKey(c => c.id_sub_category);
        });

        builder.Entity<TypeProduct>(entity =>
        {
            entity.ToTable("typeproduct").HasKey(p => p.id_type_prod);
        });

        builder.Entity<Product>(entity =>
        {
            entity.ToTable("product").HasKey(p => p.id_product);
        });

        base.OnModelCreating(builder);
    }
}
