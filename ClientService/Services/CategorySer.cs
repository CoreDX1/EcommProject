using EcommEntity.Models;
using ClientService.Interface;

using EcommData.Data;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;

public class CategorySer : ICategory<Category>
{

    private DataContext dbpost;

    public CategorySer(DataContext data)
    {
        this.dbpost = data;
    }

    public async Task<List<Category>> Get()
    {
        var response = await dbpost.Categories.ToListAsync();
        return response;
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
