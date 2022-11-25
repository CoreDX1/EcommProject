namespace EcommEntity.Models;

public class Category
{
    public int id_category { get; set; }
    public string? name { get; set; }

    public IEnumerable<SubCategory>? subCategories { get; set;}
}
