using EcommEntity.Models;
namespace ClientService.Interface;

public interface ITypeProduct
{
    public Task<List<TypeProduct>> GetAll();
    // public Task<T> Insert(T form);
}
