namespace ClientService.Interface;

public interface IProduct<T>
{
    public Task<List<T>> GetAll();
}
