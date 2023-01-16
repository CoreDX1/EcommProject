using ClientService.Interface;
using EcommData.Context;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;
public class ProductSer : IProduct
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
