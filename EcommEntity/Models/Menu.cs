namespace EcommEntity.Models;

  public class Menu{
    public int id_category {get; set;}
    public string name {get; set;}
    public List<SubCategory> submenu {get; set;}
  }
