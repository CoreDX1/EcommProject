using EcommEntity.Models;

public interface IUsuario
{
    public Task<List<Usuario>> GetUsuario();
    public Task<Usuario> GetByUser(string username , string password);
    public Task<Usuario> CreateUser(Register add);
}
