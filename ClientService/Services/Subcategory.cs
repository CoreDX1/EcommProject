using ClientService.Interface;
using EcommEntity.Models;
using Npgsql;

using EcommData.Data;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class Subcategory : ISubCategory<SubCategory>
{

    private DataContext dbpost;

    public Subcategory(DataContext data)
    {
        this.dbpost = data;
    }

    public async Task<List<SubCategory>> GetSubCategory()
    {
        List<SubCategory> data = await dbpost.SubCategories.ToListAsync();
        return data;
    }

    public async Task<SubCategory> Insert(SubCategory form)
    {
        SubCategory data = new SubCategory()
        {
            id_sub_category = form.id_sub_category,
            name = form.name,
            id_category = form.id_category
        };
        await dbpost.SubCategories.AddAsync(data);
        await dbpost.SaveChangesAsync();
        return data;
    }
}
