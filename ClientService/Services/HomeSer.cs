using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class HomeSer : IHome<Home>
{
    private DataContext dbpost;

    public HomeSer(DataContext _dbpost)
    {
        this.dbpost = _dbpost;
    }

    public async Task<List<Home>> GetHome()
    {
        var data = await dbpost.Homes.ToListAsync();
        return data;
    }

    public async Task<Home> InsertProducts(CreateProduct add)
    {
        Home data = new Home()
        {
            title = add.title,
            image = add.image,
            price = add.price
        };
        await dbpost.Homes.AddAsync(data);
        await dbpost.SaveChangesAsync();
        return data;
    }
}
