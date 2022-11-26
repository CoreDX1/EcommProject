using ClientService.Interface;
using EcommEntity.Models;

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
}
