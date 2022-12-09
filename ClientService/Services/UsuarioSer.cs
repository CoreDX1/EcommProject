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
    //    SI El usuario Existe no se va a crear el Usuario
    bool data = await dbpost.Usuarios.AnyAsync(x => x.name == add.name);
    if (data){
        return null;
    } 
    // Si el usuario no existe se va a crear el usuario
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
