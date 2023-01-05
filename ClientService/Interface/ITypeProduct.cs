using EcommEntity.Models;
namespace ClientService.Interface;

public interface ITypeProduct
{
    public Task<List<TypeProduct>> GetAll();
}
