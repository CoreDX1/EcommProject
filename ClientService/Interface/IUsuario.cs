public interface IUsuario<T>
{
    public Task<List<T>> GetUsuario();
}
