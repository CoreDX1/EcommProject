using System.Security.Claims;
using EcommEntity.Models;

namespace ClientService.Interface;
public interface IHome
{
    public Task<List<Home>> GetHome();
    public Task<Home> InsertProducts(CreateProduct add);
    public Task<Home> DeleteProducts(int id);
    public Task<dynamic> ValidarToken(ClaimsIdentity identity);
}
