namespace ClientService.Interface;
using EcommEntity.Models;

public interface IProduct
{
    public Task<List<Product>> GetAll();
}
