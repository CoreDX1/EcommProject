using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class ProductSer : IProduct<Product>
{
    private DataContext dbpost;
    public ProductSer(DataContext context)
    {
        dbpost = context;
    }

    public async Task<List<Product>> GetAll()
    {
        var response = await dbpost.Products.ToListAsync();
        return response;
    }
}
