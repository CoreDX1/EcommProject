namespace ClientService.Interface;
public interface IHome<T>
{
    public Task<List<T>> GetHome();
}