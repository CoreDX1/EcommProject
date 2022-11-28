using EcommEntity.Models;
using ClientService.Interface;

using EcommData.Data;

namespace ClientService.Services;
public class Products : IProduct<Category>
{

    private DataContext dbpost;

    public Products(DataContext data)
    {
        this.dbpost = data;
    }

    public IEnumerable<Category> Get()
    {
        var res = from c in dbpost.Categories
                  select c;
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
