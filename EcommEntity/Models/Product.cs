namespace EcommEntity.Models;

public class Product
{
    public int id_product { get; set; }
    public string? clave { get; set; }
    public int price { get; set; }
    public int quantity { get; set; }
    public DateTime date_create { get; set; }
    // Foreign Key TypeProduct
    public int id_type_prod { get; set; }
}
