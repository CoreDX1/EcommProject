using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;

public class TypeProductSer : ITypeProduct {

    private DataContext dbpost;

    public TypeProductSer(DataContext context)
    {
        this.dbpost = context;
    }

    public async Task<List<TypeProduct>> GetAll()
    {
        var response = await dbpost.TypeProducts.ToListAsync();
        return response;
    }
}
