using EcommEntity.Models;

public interface IUsuario<T>
{
    public Task<List<T>> GetUsuario();
    public T GetByUser(string username , string password);
    public Task<T> CreateUser(Register add);
}
