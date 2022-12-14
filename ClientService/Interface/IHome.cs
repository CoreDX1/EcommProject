using System.Security.Claims;
using EcommEntity.Models;

namespace ClientService.Interface;
public interface IHome<T>
{
    public Task<List<T>> GetHome();
    public Task<T> InsertProducts(CreateProduct add);
    public Task<T> DeleteProducts(int id);
    public Task<dynamic> ValidarToken(ClaimsIdentity identity);
}
