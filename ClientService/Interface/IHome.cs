using EcommEntity.Models;

namespace ClientService.Interface;
public interface IHome<T>
{
    public Task<List<T>> GetHome();
    public Task<T> InsertProducts(CreateProduct add);
}
