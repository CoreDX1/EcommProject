using EcommEntity.Models;

using EcommData.Data;
using Microsoft.EntityFrameworkCore;
using ClientService.Interface;

namespace ClientService.Services;

public class MenuDinamic : IMenuDinamic
{
    private DataContext dbpost;

    public MenuDinamic(DataContext data)
    {
        this.dbpost = data;
    }

    public async Task<List<Dictionary<string, object>>> GetCategorySubCategory()
    {
        // Crear lista vacía
        List<Dictionary<string, object>> categories = new List<Dictionary<string, object>>();

        // Obtener lista de categorías y subcategorías de la base de datos
        List<Category> category = await dbpost.Categories.ToListAsync();
        List<SubCategory> subCategories = await dbpost.SubCategories.ToListAsync();

        // Iterar sobre cada categoría
        foreach (Category c in category)
        {
            // Crear diccionario para almacenar información de la categoría
            Dictionary<string, object> category_info = new Dictionary<string, object>();
            category_info["id_category"] = c.id_category;
            category_info["name"] = c.name;
            category_info["submenu"] = new List<string>();

            // Buscar subcategorías correspondientes a esta categoría
            foreach (SubCategory subcategory in subCategories)
            {
                if (subcategory.id_category == c.id_category)
                {
                    // Añadir subcategoría a la lista de subcategorías de esta categoría
                    ((List<string>)category_info["submenu"]).Add(subcategory.name);
                }
            }

            // Añadir diccionario con información de la categoría a la lista de categorías
            categories.Add(category_info);
        }

        // Devolver lista de categorías en formato JSON
        return categories;
    }
}
