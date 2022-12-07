using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;

public class UsuarioSer : IUsuario<Usuario>
{
    private DataContext dbpost;

    public UsuarioSer(DataContext _dbpost)
    {
        this.dbpost = _dbpost;
    }

    public Task<List<Usuario>> GetUsuario()
    {
        var data = dbpost.Usuarios.ToListAsync();
        return data;
    }

    public Usuario GetByUser(string username, string password)
    {
        var data = dbpost.Usuarios
            .Where(x => x.name == username && x.password == password)
            .FirstOrDefault();
        return data;
    }

    public async Task<Usuario> CreateUser(Register add)
    {
        Usuario user = new Usuario()
        {
            name = add.name,
            password = add.password,
            rol = "empleado"
        };

        await dbpost.Usuarios.AddRangeAsync(user);
        await dbpost.SaveChangesAsync();
        return user;
    }
}
