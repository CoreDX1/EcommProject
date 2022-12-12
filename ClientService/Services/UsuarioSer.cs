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

    public Usuario GetByUser(string email, string password)
    {
        var data = dbpost.Usuarios
            .Where(x => x.email == email && x.password == password)
            .FirstOrDefault();
        return data;
    }

    public async Task<Usuario> CreateUser(Register add)
    {
    //    SI El usuario Existe no se va a crear el Usuario
    var data = await dbpost.Usuarios
        .Where(x => x.username == add.username)
        .FirstOrDefaultAsync();
    if (data == null){
        return null;
    } 
    // Si el usuario no existe se va a crear el usuario
        Usuario user = new Usuario()
        {
            username = add.username,
            password = add.password,
            rol = "empleado"
        };

        await dbpost.Usuarios.AddRangeAsync(user);
        await dbpost.SaveChangesAsync();
        return user;
    }
}
