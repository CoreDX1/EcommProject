namespace EcommEntity.Models;
public class TypeProduct
{
    public int id_type_prod { get; set; }
    public string? name { get; set; }

    // Foreign Key SubCategory
    public int id_sub_category { get; set; }

    // public SubCategory? subCategory { get; set; }

    // public IEnumerable<Product>? products { get; set; }
}
