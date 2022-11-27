using EcommEntity.Models;
using ClientService.Interface;

using EcommData.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ClientService.Services;
public class Products : IProduct<Category>
{

    private DataContext dbpost;

    public Products(DataContext data)
    {
        this.dbpost = data;
    }

    public IQueryable Get()
    {
        var connet = dbpost;
        var res = from s in connet.SubCategories
                  join s2 in connet.Categories
                  on s.id_category equals s2.id_category
                  select new
                  {
                      id_sub = s.id_sub_category,
                      sub_name = s.name,
                      id_category = s2.id_category,
                      name_Category = s2.name
                  };

        return res;
    }

    public async Task<Category> Insert(Category insertCategory)
    {
        Category data = new Category()
        {
            id_category = insertCategory.id_category,
            name = insertCategory.name
        };
        await dbpost.Categories.AddAsync(data);
        await dbpost.SaveChangesAsync();
        return data;
    }
}
