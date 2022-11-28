
using EcommEntity.Models;

namespace ClientService.Interface;
public interface ICategory<T>
{
    public IEnumerable<T> Get();
    public Task<T> Insert(Category insertCategory);
}
