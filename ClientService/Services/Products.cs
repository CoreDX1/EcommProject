using EcommEntity.Models;
using ClientService.Interface;

using EcommData.Data;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class Products : IProduct<Category>
{

    private DataContext dbpost;

    public Products(DataContext data)
    {
        this.dbpost = data;
    }

    public async Task<List<Category>> Get()
    {
        List<Category> data = await dbpost.Categories.ToListAsync();
        return data;
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
