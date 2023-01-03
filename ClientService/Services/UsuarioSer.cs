using ClientService.Domain.Validators;
using ClientService.Interface;
using EcommData.Data;
using EcommEntity.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;

public class UsuarioSer : IUsuario
{
    private DataContext dbpost;

    public UsuarioSer(DataContext _dbpost)
    {
        this.dbpost = _dbpost;
    }

    /// <summary>
    /// You get the complete list of users
    /// </summary>
    /// <returns> Json User </returns>
    public Task<List<Usuario>> GetUsuario()
    {
        var data = dbpost.Usuarios.ToListAsync();
        return data;
    }

    /// <summary>
    /// You get the user by email and password
    /// </summary>
    /// <param name="email"> Email user </param>
    /// <param name="password"> Password user </param>
    /// <returns> Json Usuario </returns>
    public async Task<Usuario> GetByUser(string email, string password)
    {
        Usuario data = await dbpost.Usuarios
            .Where(x => x.email == email && x.password == password)
            .FirstOrDefaultAsync();
        return data;
    }

    /// <summary>
    /// You create a new user
    /// </summary>
    /// <param name="add">Enter the data to register</param>
    /// <returns> Data entered</returns>
    public async Task<Usuario> CreateUser(Register add)
    {
    // SI El Email Existe no se va a crear el Usuario
    UsuarioRequestValidator.Validate(add);

    var data = await dbpost.Usuarios
        .Where(x => x.email == add.email)
        .FirstOrDefaultAsync();
    if (data != null) return null;
    // Si el Email no existe se va a crear el usuario
        Usuario user = new Usuario()
        {
            username = add.username,
            email = add.email,
            password = add.password,
            rol = "empleado",
        };

        await dbpost.Usuarios.AddAsync(user);
        await dbpost.SaveChangesAsync();
        return user;
    }
}
