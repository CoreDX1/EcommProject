
namespace ClientService.Interface;
public interface IProduct<T>{
    public Task<T> Get();
}
