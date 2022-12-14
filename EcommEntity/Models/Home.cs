namespace EcommEntity.Models;

public class Home{
  public int id_home { get; set; }
  public string? title { get; set; } 
  public int price { get; set; }
  public string? image { get; set; }
}

public class CreateProduct{
    public string? title { get; set; } 
    public int price { get; set; }
    public string? image { get; set; }
}
