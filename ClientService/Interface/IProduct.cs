
using EcommEntity.Models;

namespace ClientService.Interface;
public interface IProduct<T>
{
    public IQueryable Get();
    public Task<T> Insert(Category insertCategory);
}
