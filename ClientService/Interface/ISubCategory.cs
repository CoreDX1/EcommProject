
namespace ClientService.Interface;
public interface ISubCategory<T>
{
    public Task<List<T>> GetSubCategory();
    public Task<T> Insert(T form);
}
