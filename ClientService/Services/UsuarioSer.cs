using ClientService.Domain.Validators;
using EcommData.Context;
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
    var data = await dbpost.Usuarios
        .Where(x => x.email == add.email)
        .FirstOrDefaultAsync();

    // Si el Email no existe se va a crear el usuario
    if (data != null) return null;

    // Validar los datos
    UsuarioRequestValidator.Validate(add);

    // Crear el usuario
        Usuario user = new Usuario()
        {
            username = add.username,
            email = add.email,
            password = add.password,
            rol = "empleado",
        };

        // Guardar el usuario
        await dbpost.Usuarios.AddAsync(user);
        // Guardar los cambios
        await dbpost.SaveChangesAsync();
        // Retornar el usuario
        return user;
    }
}
