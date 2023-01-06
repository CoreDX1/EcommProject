using EcommEntity.Models;

using EcommData.Data;
using Microsoft.EntityFrameworkCore;
using ClientService.Interface;
using Newtonsoft.Json;

namespace ClientService.Services;

public class MenuDinamic : IMenuDinamic
{
  private DataContext dbpost;

  public MenuDinamic(DataContext data)
  {
    this.dbpost = data;
  }

  public async Task<List<Menu>> GetCategorySubCategory()
  {
    // Crear lista vacía
    List<Dictionary<string, object>> categories = new List<Dictionary<string, object>>();

    // Obtener lista de categorías y subcategorías de la base de datos
    List<Category> category = await dbpost.Categories.ToListAsync();
    List<SubCategory> subCategories = await dbpost.SubCategories.ToListAsync();

    // Iterar sobre cada categoría
    var linqDate = from c in category
                   select new
                   {
                     c.id_category,
                     c.name,
                     submenu = from s in subCategories
                               where s.id_category == c.id_category
                               select s
                   };
    /// Lo convierto a JSON
    var json = JsonConvert.SerializeObject(linqDate);
    /// Lo convierto a una lista de objetos
    List<Menu> menu = JsonConvert.DeserializeObject<List<Menu>>(json);
    return menu;
  }
}
