namespace EcommEntity.Models;
public class SubCategory
{
    public int id_sub_category { get; set; }
    public string? name { get; set; }

    // Foreign Key Category
    public int id_category { get; set; }
    // public Category? Category { get; set; }

    //
    // public List<TypeProduct>? typeProducts { get; set; }
}
