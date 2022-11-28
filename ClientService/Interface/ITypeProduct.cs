
namespace ClientService.Interface;
public interface ITypeProduct<T>
{
    public Task<List<T>> GetAll();
    // public Task<T> Insert(T form);
}
