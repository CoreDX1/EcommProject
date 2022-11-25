using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommEntity.Models;

[Table("category")]
public class Category
{
    [Key]
    public int id_category { get; set; }
    public string? name { get; set; }

    public ICollection<SubCategory>? subCategories { get; set;}
}
