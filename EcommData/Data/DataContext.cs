using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommData.Data;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
    public DbSet<TypeProduct> TypeProducts { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        // builder.Entity<Category>()
        //     .ToTable("category")
        //     .HasKey(c => c.id_category)
        //     .HasName("id_category");

        builder.Entity<SubCategory>()
            .ToTable("subcategory")
            .HasOne(e => e.category)
            .WithMany(e => e.subCategories).
            HasForeignKey(e => e.id_category);

        builder.Entity<TypeProduct>(entity =>
        {
            entity.ToTable("typeproduct");
            entity.HasKey(p => p.id_type_prod);
        });

        builder.Entity<Product>(entity =>
        {
            entity.ToTable("product");
            entity.HasKey(p => p.id_product);
        });

        base.OnModelCreating(builder);
    }


}
