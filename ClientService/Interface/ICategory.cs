
using EcommEntity.Models;

namespace ClientService.Interface;
public interface ICategory<T>
{
    public Task<List<T>> Get();
    public Task<T> Insert(Category insertCategory);
}
